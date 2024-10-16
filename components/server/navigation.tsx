import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import type { ReactElement } from "react";
import ColorMode from "@/components/client/color-mode";
import LogoutButton from "@/components/server/logout-button";
import CsvUploadButton from "@/components/client/csv-upload-button";

const Navigation = (): ReactElement | null => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h5"
          component="a"
          href="/"
          sx={{
            mr: "1.5rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Nova Dashboard
        </Typography>
        <Box flexGrow="1" />
        <CsvUploadButton
          endpointPath={`${process.env.NEXT_PUBLIC_BACKEND_API_HOST}/api/orders`}
        >
          Upload Orders
        </CsvUploadButton>
        <CsvUploadButton
          endpointPath={`${process.env.NEXT_PUBLIC_BACKEND_API_HOST}/api/order-lines`}
        >
          Upload Order-lines
        </CsvUploadButton>
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
