import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  // noinspection JSClassNamingConvention // The name is short, but not defined by us
  interface JWT {
    accessToken?: string;
    expiresAt: number | undefined;
    refreshToken?: string;
    error?: "RefreshTokenError";
  }
}
