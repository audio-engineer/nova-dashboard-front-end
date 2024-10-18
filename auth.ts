import type { DefaultSession, Session } from "next-auth";
import NextAuth from "next-auth";
import Cognito from "next-auth/providers/cognito";
import type { Awaitable } from "@auth/core/types";
import type { JWT } from "next-auth/jwt";

export const { handlers, auth, signOut } = NextAuth({
  providers: [
    Cognito({
      checks: ["none"],
      authorization: { params: { scope: "email openid phone" } },
    }),
  ],
  callbacks: {
    // Auth.js TypeScript support sucks...
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    jwt: (params): Awaitable<null | JWT> => {
      const { token, account } = params;

      /**
       * Auth.js sucks:
       *
       * console.log(undefined === account) // true
       * console.log(null === account) // false
       */
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (undefined !== account) {
        // @ts-expect-error Error happens due to wrong Auth.js type
        return { ...token, accessToken: account.access_token };
      }

      return token;
    },
    // Auth.js TypeScript support sucks...
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    session: (params): Awaitable<Session | DefaultSession> => {
      const { session, token } = params;

      session.user.accessToken = token.accessToken;

      return session;
    },
  },
});
