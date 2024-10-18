import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextAuthRequest } from "next-auth";

const protectedRoutes = ["/"];
const publicRoutes = ["/"];

export default auth((request: NextAuthRequest) => {
  const path = request.nextUrl.pathname;
  const isLoggedIn = !!request.auth;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  if ((isProtectedRoute || isPublicRoute) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
