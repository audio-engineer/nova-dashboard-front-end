import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/account"];
const publicRoutes = ["/"];

export const middleware = (request: NextRequest): NextResponse => {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const sessionCookieValue = request.cookies.get("session")?.value;

  if (isProtectedRoute && undefined === sessionCookieValue) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (isPublicRoute && undefined !== sessionCookieValue) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
