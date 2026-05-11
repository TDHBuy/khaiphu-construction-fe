import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  console.log("🔧 [Middleware] Incoming request:", {
    url: request.url,
    pathname: request.nextUrl.pathname,
  });
  const intlResponse = handleI18nRouting(request);
  console.log("🔧 [Middleware] intlResponse status:", intlResponse.status);
  // Pass locale redirects through unchanged
  if (intlResponse.status >= 300 && intlResponse.status < 400) {
    return intlResponse;
  }

  // Inject current pathname as request header so getRequestConfig can detect the page
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("pathname", request.nextUrl.pathname);
  console.log(
    "🔧 [Middleware] Setting x-middleware-request-pathname header:",
    request.nextUrl.pathname,
  );
  const rewriteUrl = intlResponse.headers.get("x-middleware-rewrite");
  console.log("🔧 [Middleware] Rewrite URL:", rewriteUrl);
  const response = rewriteUrl
    ? NextResponse.rewrite(new URL(rewriteUrl), {
        request: { headers: requestHeaders },
      })
    : NextResponse.next({ request: { headers: requestHeaders } });

  // Forward next-intl response headers (locale cookie, etc.)
  intlResponse.headers.forEach((value, key) => {
    if (key !== "x-middleware-rewrite") {
      response.headers.set(key, value);
    }
  });
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
