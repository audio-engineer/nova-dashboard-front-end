import Grid from "@mui/material/Grid2";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import type { PropsWithChildren, ReactElement } from "react";
import Toolbar from "@/components/client/toolbar";

const DashboardPageLayout = ({
  children,
}: Readonly<PropsWithChildren>): ReactElement => {
  return (
    <DashboardLayout defaultSidebarCollapsed>
      <PageContainer slots={{ toolbar: Toolbar }}>
        <Grid container spacing={2} columns={12}>
          {children}
        </Grid>
      </PageContainer>
    </DashboardLayout>
  );
};

export default DashboardPageLayout;
