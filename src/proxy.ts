import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { productRedirectMap } from "./config/redirects";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export function proxy(request: NextRequest) {
  let pathname: string;
  try {
    pathname = decodeURIComponent(request.nextUrl.pathname);
  } catch (error) {
    if (error instanceof URIError) return handleI18nRouting(request);
    throw error;
  }
  const legacyPath = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const productDestination = productRedirectMap[legacyPath];
  if (productDestination) {
    return NextResponse.redirect(new URL(productDestination, request.url), 301);
  }
  if (legacyPath.startsWith("/ar/المنتجات/")) {
    return NextResponse.redirect(new URL("/ar/products", request.url), 301);
  }
  const canonicalPath = request.nextUrl.pathname.replace(/\/+$/, "");
  if (canonicalPath && canonicalPath !== request.nextUrl.pathname) {
    const url = new URL(request.url);
    url.pathname = canonicalPath;
    return NextResponse.redirect(url, 308);
  }

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
