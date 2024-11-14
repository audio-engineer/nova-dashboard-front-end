"use client";

import type { PropsWithChildren, ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { NotificationsProvider } from "@toolpad/core/useNotifications";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/da";
import { Account } from "@toolpad/core/Account";
import { DateRangeProvider } from "@/components/client/providers/date-range-provider";

const queryClient = new QueryClient();

const Providers = ({ children }: Readonly<PropsWithChildren>): ReactElement => {
  return (
    <SessionProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="da">
        <NotificationsProvider>
          <DateRangeProvider>
            <QueryClientProvider client={queryClient}>
              <Account />
              {children}
            </QueryClientProvider>
          </DateRangeProvider>
        </NotificationsProvider>
      </LocalizationProvider>
    </SessionProvider>
  );
};

export default Providers;
