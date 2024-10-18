import type { NextRequest } from "next/server";
import type { Session } from "next-auth";

declare module "next-auth" {
  interface User {
    accessToken?: string;
  }

  export interface NextAuthRequest extends NextRequest {
    auth: Session | null;
  }
}

declare module "next-auth/jwt" {
  // noinspection JSClassNamingConvention // The name is short, but not defined by us
  export interface JWT {
    accessToken?: string;
  }
}
