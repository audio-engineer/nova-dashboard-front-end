import CategoryGrid from "@/components/client/category-grid";
import CsvUploadButton from "@/components/client/csv-upload-button";
import ProductGrid from "@/components/client/product-grid";
import type { ReactElement } from "react";
import Grid from "@mui/material/Grid2";
import ButtonGroup from "@mui/material/ButtonGroup";
import CategoryForm from "@/components/client/category-form";
import SectionCard from "@/components/server/section-card";

const SettingsPage = (): ReactElement => {
  return (
    <>
      <Grid size={{ xs: 12 }}>
        <SectionCard title={"Import"}>
          <ButtonGroup variant="contained">
            <CsvUploadButton
              endpointPath={"/api/orders"}
              allowedFileNamePrefix={"orders"}
            >
              Orders
            </CsvUploadButton>
            <CsvUploadButton
              endpointPath={"/api/order-lines"}
              allowedFileNamePrefix={"orderlines"}
            >
              Order Lines
            </CsvUploadButton>
          </ButtonGroup>
        </SectionCard>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <SectionCard title={"Categories"}>
          <CategoryForm />
          <CategoryGrid />
        </SectionCard>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <SectionCard title={"Products"} minHeight={400}>
          <ProductGrid />
        </SectionCard>
      </Grid>
    </>
  );
};

export default SettingsPage;
