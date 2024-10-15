import type { ReactElement } from "react";
import LoginButton from "@/components/client/login-button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const LoginPage = (): ReactElement | null => {
  return (
    <Box>
      <Box
        component="main"
        display="flex"
        height="calc(100vh - 64px)"
        maxHeight="1200px"
      >
        <Container maxWidth="sm">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            width="100%"
            height="100%"
            sx={{ py: 2 }}
          >
            <LoginButton />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LoginPage;
