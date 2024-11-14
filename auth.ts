import type { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";
import Cognito from "next-auth/providers/cognito";

const secondsToMillisecondsMultiplier = 1000;

interface CognitoTokenResponse {
  id_token: string;
  access_token: string;
  expires_in: number;
  token_type: string;
}

const fetchNewToken = async (
  currentToken: Readonly<JWT>,
): Promise<CognitoTokenResponse | undefined> => {
  if (undefined === currentToken.refreshToken) {
    throw new TypeError("Missing refresh token");
  }

  if (
    undefined === process.env.AUTH_COGNITO_ID ||
    undefined === process.env.AUTH_COGNITO_SECRET
  ) {
    throw new Error(
      "Missing AUTH_COGNITO_ID or AUTH_COGNITO_SECRET environment variables",
    );
  }

  const headers = new Headers();

  headers.append(
    "Authorization",
    `Basic ${btoa(`${process.env.AUTH_COGNITO_ID}:${process.env.AUTH_COGNITO_SECRET}`)}`,
  );
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  let response = null;

  try {
    response = await fetch(
      "https://nova-dashboard.auth.eu-north-1.amazoncognito.com/oauth2/token",
      {
        method: "POST",
        headers,
        body: new URLSearchParams({
          grant_type: "refresh_token",
          client_id: process.env.AUTH_COGNITO_ID,
          refresh_token: currentToken.refreshToken,
        }),
      },
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching new token: ${error.message}`);
    }

    return undefined;
  }

  if (!response.ok) {
    throw new Error(`Error fetching new token: ${response.status}`);
  }

  return (await response.json()) as CognitoTokenResponse;
};

export const { handlers, auth } = NextAuth({
  providers: [
    Cognito({
      checks: ["none"],
      authorization: { params: { scope: "email openid phone" } },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    authorized: (params) => {
      return !!params.auth?.user;
    },
    // Auth.js TypeScript support sucks...
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    jwt: async (params) => {
      const { token: currentToken, account } = params;

      /**
       * Auth.js sucks:
       *
       * console.log(undefined === account) // true
       * console.log(null === account) // false
       */
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (undefined !== account) {
        return {
          ...currentToken,
          accessToken: account?.access_token,
          expiresAt: account?.expires_at,
          refreshToken: account?.refresh_token,
        };
      }

      if (
        undefined !== currentToken.expiresAt &&
        Date.now() < currentToken.expiresAt * secondsToMillisecondsMultiplier
      ) {
        return currentToken;
      }

      let newToken = undefined;

      try {
        newToken = await fetchNewToken(currentToken);
      } catch (error) {
        console.error(error);
      }

      if (undefined === newToken) {
        return currentToken;
      }

      return {
        ...currentToken,
        accessToken: newToken.access_token,
        expiresAt: Math.floor(
          Date.now() / secondsToMillisecondsMultiplier + newToken.expires_in,
        ),
      };
    },
    // Auth.js TypeScript support sucks...
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    session: (params) => {
      const { session, token } = params;

      session.user.accessToken = token.accessToken;

      return session;
    },
  },
});
