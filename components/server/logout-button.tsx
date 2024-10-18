import type { ReactElement } from "react";
import { signOut } from "@/auth";

const LogoutButton = (): ReactElement | null => {
  return (
    <form
      action={async () => {
        "use server";

        await signOut();
      }}
    >
      <button type="submit">Log Out</button>
    </form>
  );
};

export default LogoutButton;
