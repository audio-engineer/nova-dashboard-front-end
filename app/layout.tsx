import type { Metadata } from "next";
import type { PropsWithChildren, ReactElement } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/app/theme";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import Providers from "@/components/client/providers";

export const metadata: Metadata = {
  title: "Nova Dashboard",
  description: "Business intelligence web application",
};

const RootLayout = ({
  children,
}: Readonly<PropsWithChildren>): ReactElement | null => {
  return (
    <html lang="en">
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Providers>{children}</Providers>
          </ThemeProvider>
        </AppRouterCacheProvider>
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
