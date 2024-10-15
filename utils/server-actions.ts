"use server";

import { deleteSession } from "@/utils/session";

export const deleteSessionCookie = async (): Promise<void> => {
  await deleteSession();
};
