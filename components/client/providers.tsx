"use client";

import type { PropsWithChildren, ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { NotificationProvider } from "@/components/client/notification-context";

const queryClient = new QueryClient();

const Providers = ({
  children,
}: Readonly<PropsWithChildren>): ReactElement | null => {
  return (
    <SessionProvider>
      <NotificationProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </NotificationProvider>
    </SessionProvider>
  );
};

export default Providers;
