import { createOpenGraphImage } from "@/lib/open-graph-image";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  return createOpenGraphImage(locale, "products", slug);
}
