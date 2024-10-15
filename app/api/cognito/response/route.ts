import { redirect } from "next/navigation";
import { cookies } from "next/headers";

interface TokenResponse {
  token: string;
}

export const GET = async (request: Request): Promise<void> => {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_HOST}/authentication/callback?code=${code}`,
  );

  const responseJson = (await response.json()) as TokenResponse;

  cookies().set("session", responseJson.token);

  redirect("/dashboard");
};
