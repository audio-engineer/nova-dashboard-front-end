import DailyHourlySales from "@/components/client/charts/daily-hourly-sales";
import type { ReactElement } from "react";
import Grid from "@mui/material/Grid2";
import SectionCard from "@/components/server/section-card";
import Calendar from "@/components/client/charts/calendar";
import DailyCategorySales from "@/components/client/charts/daily-category-sales";
import TotalDailySales from "@/components/client/charts/total-daily-sales";
import TotalSalesNumber from "@/components/client/total-sales-number";
import TotalDailyRevenue from "@/components/client/charts/total-daily-revenue";
import TotalRevenueNumber from "@/components/client/total-revenue-number";

const HomePage = (): ReactElement => {
  return (
    <>
      <Grid size={{ xs: 6 }}>
        <SectionCard
          title="Total Revenue"
          value={<TotalRevenueNumber />}
          caption="In the selected date range"
          height={100}
        >
          <TotalDailyRevenue />
        </SectionCard>
      </Grid>
      <Grid size={{ xs: 6 }}>
        <SectionCard
          title="Total Sales"
          value={<TotalSalesNumber />}
          caption="In the selected date range"
          height={100}
        >
          <TotalDailySales />
        </SectionCard>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <SectionCard
          title="Daily Sales by Category"
          caption="In the selected date range"
          height={500}
        >
          <DailyCategorySales />
        </SectionCard>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <SectionCard
          title="Daily Sales by Time"
          caption="In the selected date range"
          height={500}
        >
          <DailyHourlySales />
        </SectionCard>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <SectionCard title="Daily Sales" caption="YTD" height={200}>
          <Calendar />
        </SectionCard>
      </Grid>
    </>
  );
};

export default HomePage;
