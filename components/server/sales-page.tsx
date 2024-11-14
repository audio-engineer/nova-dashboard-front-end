import Grid from "@mui/material/Grid2";
import type { ReactElement } from "react";
import Order from "@/components/client/grids/order";
import SectionCard from "@/components/server/section-card";

const SalesPage = (): ReactElement => {
  return (
    <>
      <Grid size={{ xs: 12 }}>
        <SectionCard title={"Orders"}>
          <Order />
        </SectionCard>
      </Grid>
    </>
  );
};

export default SalesPage;
