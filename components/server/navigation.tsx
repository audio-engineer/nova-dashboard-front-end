import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import type { ReactElement } from "react";
import ColorMode from "@/components/client/color-mode";
import LogoutButton from "@/components/client/logout-button";
import UploadButton from "@/components/client/upload-button";

const Navigation = (): ReactElement | null => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h5"
          component="a"
          href="/dashboard"
          sx={{
            mr: "1.5rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Nova Dashboard
        </Typography>
        <Box flexGrow="1" />
        <UploadButton />
        <Box
          display="flex"
          alignItems="center"
          marginX={{ md: "1rem" }}
          width={{ xs: "3rem", sm: "5.5rem", lg: "5.5rem" }}
        >
          <ColorMode />
        </Box>
        <LogoutButton />
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
