import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export function proxy(request: NextRequest) {
  try {
    return handleI18nRouting(request);
  } catch {
    const url = request.nextUrl.clone();
    const firstSegment = url.pathname.split("/")[1];
    if (firstSegment === "ar" || firstSegment === "en") return NextResponse.next();
    url.pathname = `/en${url.pathname === "/" ? "" : url.pathname}`;
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: "/((?!api|_next|.*\\..*).*)",
};
