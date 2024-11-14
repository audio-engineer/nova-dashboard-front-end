import DailyHourlySalesChart from "@/components/client/daily-hourly-sales-chart";
import type { ReactElement } from "react";
import Grid from "@mui/material/Grid2";
import SectionCard from "@/components/server/section-card";
import Calendar from "@/components/client/calendar";
import DailyCategorySalesChart from "@/components/client/daily-category-sales-chart";
import TotalDailySalesChart from "@/components/client/total-daily-sales-chart";

const HomePage = (): ReactElement => {
  return (
    <>
      <Grid size={{ xs: 6 }}>
        <SectionCard title="Overview">Some content</SectionCard>
      </Grid>
      <Grid size={{ xs: 6 }}>
        <SectionCard
          title="Total Sales"
          value={247}
          caption="In the selected date range"
        >
          <TotalDailySalesChart />
        </SectionCard>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <SectionCard
          title="Daily Sales by Category"
          caption="In the selected date range"
          height={500}
        >
          <DailyCategorySalesChart />
        </SectionCard>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <SectionCard
          title="Daily Sales by Time"
          caption="In the selected date range"
          height={500}
        >
          <DailyHourlySalesChart />
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
