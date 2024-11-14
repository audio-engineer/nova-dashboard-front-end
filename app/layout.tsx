import type { Metadata } from "next";
import type { PropsWithChildren, ReactElement } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/app/theme";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import Providers from "@/components/client/providers/providers";
import { SessionProvider, signIn, signOut } from "next-auth/react";
import type { Branding, Navigation } from "@toolpad/core/AppProvider";
import { AppProvider } from "@toolpad/core/AppProvider";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { auth } from "@/auth";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";

export const metadata: Metadata = {
  title: "Nova Dashboard",
  description: "Business intelligence web application",
};

const branding: Branding = {
  title: "Nova Dashboard",
};

const navigation: Navigation = [
  {
    kind: "header",
    title: "Analytics",
  },
  {
    title: "Dashboard",
    icon: <AnalyticsRoundedIcon />,
  },
  {
    segment: "sales",
    title: "Sales",
    icon: <FormatListNumberedIcon />,
  },
  {
    kind: "header",
    title: "Settings",
  },
  {
    segment: "settings",
    title: "Settings",
    icon: <SettingsRoundedIcon />,
  },
];

const RootLayout = async ({
  children,
}: Readonly<PropsWithChildren>): Promise<ReactElement> => {
  const session = await auth();

  return (
    <html lang="en">
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* TODO add auth() session to Session provider? */}
            <SessionProvider session={session}>
              <Providers>
                <AppProvider
                  branding={branding}
                  navigation={navigation}
                  session={session}
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  authentication={{ signIn, signOut }}
                  theme={theme}
                >
                  {children}
                </AppProvider>
              </Providers>
            </SessionProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
