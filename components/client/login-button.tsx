"use client";

import type { ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import Spinner from "@/components/client/spinner";

const getCognitoUri = async (): Promise<string> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_HOST}/authentication/cognito-sign-in`,
  );

  return (await response.json()) as string;
};

const LoginButton = (): ReactElement => {
  const { isLoading, data } = useQuery({
    queryKey: ["remoteFen"],
    queryFn: getCognitoUri,
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Button href={data} variant="contained">
      Log In
    </Button>
  );
};

export default LoginButton;
