import Grid from "@mui/material/Grid2";
import type { ReactElement } from "react";
import OrderGrid from "@/components/client/order-grid";
import SectionCard from "@/components/server/section-card";

const SalesPage = (): ReactElement => {
  return (
    <>
      <Grid size={{ xs: 12 }}>
        <SectionCard title={"Orders"}>
          <OrderGrid />
        </SectionCard>
      </Grid>
    </>
  );
};

export default SalesPage;
