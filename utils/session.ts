import "server-only";

import { cookies } from "next/headers";

// eslint-disable-next-line @typescript-eslint/require-await
export const deleteSession = async (): Promise<void> => {
  cookies().delete("session");
};
