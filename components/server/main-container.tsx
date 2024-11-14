import type { PropsWithChildren, ReactElement } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

export const drawerWidth = 210;

const MainContainer = ({
  children,
}: Readonly<PropsWithChildren>): ReactElement => {
  return (
    <Box display="flex">
      <Box component="main" flexGrow="1">
        <Container maxWidth="lg">
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            sx={{ py: 2 }}
          >
            <Toolbar />
            {children}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default MainContainer;
