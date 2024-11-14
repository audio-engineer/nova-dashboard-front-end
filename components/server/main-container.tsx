import type { PropsWithChildren, ReactElement } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

const MainContainer = ({
  children,
}: Readonly<PropsWithChildren>): ReactElement => {
  return (
    <Stack>
      <Box component="main" flexGrow="1">
        <Container maxWidth="lg">
          <Stack width="100%" sx={{ py: 2 }}>
            <Toolbar />
            {children}
          </Stack>
        </Container>
      </Box>
    </Stack>
  );
};

export default MainContainer;
