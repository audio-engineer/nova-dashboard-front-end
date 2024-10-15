"use client";

import type { ReactElement } from "react";
import Button from "@mui/material/Button";
import { deleteSessionCookie } from "@/utils/server-actions";
import { useRouter } from "next/navigation";

const signOut = async (): Promise<void> => {
  await deleteSessionCookie();
};

const LogoutButton = (): ReactElement | null => {
  const router = useRouter();

  const handleSignOut = (): void => {
    signOut().catch((error: unknown) => {
      console.error(error);
    });

    router.push("/");
    router.refresh();
  };

  return (
    <Button variant="contained" onClick={handleSignOut}>
      Log Out
    </Button>
  );
};

export default LogoutButton;
