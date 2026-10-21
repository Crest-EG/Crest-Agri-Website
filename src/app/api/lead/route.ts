import { z } from "zod";

const text = (max: number) => z.string().trim().max(max).default("");
const requiredText = (max: number) => z.string().trim().min(1).max(max);
const base = z.object({
  event: z.literal("lead"),
  leadId: z.string().uuid(),
  locale: z.enum(["en", "ar"]),
  type: z.enum(["quote", "inquiry", "contact"]),
  name: requiredText(120),
  company: text(160),
  country: text(100),
  contact: requiredText(200),
  product: text(80),
  quantity: text(100),
  message: text(2000),
  page: text(300),
  registrationCode: text(200),
});
const channel = z.object({ event: z.literal("channel"), leadId: z.string().uuid(), channel: z.enum(["whatsapp", "email"]) });
const payloadSchema = z.discriminatedUnion("event", [base, channel]);
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 12;

function json(body: object, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = request.headers.get("x-real-ip")?.trim() || forwarded || "unknown";
  const now = Date.now();
  const previous = hits.get(ip);
  if (previous && previous.resetAt > now && previous.count >= MAX_REQUESTS) {
    return json({ accepted: false, error: "rate_limited" }, 429);
  }
  hits.set(ip, previous && previous.resetAt > now ? { count: previous.count + 1, resetAt: previous.resetAt } : { count: 1, resetAt: now + WINDOW_MS });
  if (hits.size > 5000) for (const [key, value] of hits) if (value.resetAt <= now) hits.delete(key);

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    console.warn("Lead endpoint received invalid JSON.");
    return json({ accepted: false }, 400);
  }
  const result = payloadSchema.safeParse(raw);
  if (!result.success) {
    console.warn("Lead endpoint rejected an invalid payload.");
    return json({ accepted: false }, 400);
  }
  if (result.data.event === "lead" && result.data.registrationCode) return json({ accepted: true }, 202);

  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  const secret = process.env.LEADS_SECRET;
  if (!webhookUrl || !secret) {
    console.error("Lead forwarding is not configured; set LEADS_WEBHOOK_URL and LEADS_SECRET.");
    return json({ accepted: false, error: "forwarding_not_configured" }, 503);
  }

  const leadPayload: Record<string, unknown> = { ...result.data };
  delete leadPayload.registrationCode;
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...leadPayload, secret }),
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error(`Lead webhook returned HTTP ${response.status}.`);
      return json({ accepted: false, error: "webhook_http_error", status: response.status }, 502);
    }

    let webhookResult: unknown;
    try {
      webhookResult = await response.json();
    } catch {
      console.error("Lead webhook returned an unreadable response.");
      return json({ accepted: false, error: "webhook_invalid_response" }, 502);
    }
    if (typeof webhookResult !== "object" || webhookResult === null || !("ok" in webhookResult) || webhookResult.ok !== true) {
      console.error("Lead webhook did not confirm the event.");
      return json({ accepted: false, error: "webhook_not_confirmed" }, 502);
    }
    return json({ accepted: true }, 202);
  } catch (error) {
    console.error("Lead webhook request failed.", error instanceof Error ? error.name : "unknown error");
    return json({ accepted: false, error: "webhook_request_failed" }, 502);
  }
}
