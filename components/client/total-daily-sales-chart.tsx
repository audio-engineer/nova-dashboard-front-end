"use client";

import type { ReactElement } from "react";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import type {
  EmbeddedTotalDailySales,
  PaginatedResponse,
} from "@/types/response";
import { useDateRange } from "@/hooks/use-date-range";
import Spinner from "@/components/client/spinner";
import { useTotalDailySales } from "@/hooks/use-total-daily-sales";

const transformResponse = (
  data: PaginatedResponse<EmbeddedTotalDailySales> | undefined,
): number[] | undefined => {
  if (undefined === data?._embedded) {
    return undefined;
  }

  return data._embedded.tupleBackedMaps.map(
    (totalDailySalesProjection) => totalDailySalesProjection.totalSales,
  );
};

const TotalDailySalesChart = (): ReactElement => {
  const { formattedDateRange } = useDateRange();

  const { isLoading, data } = useTotalDailySales(formattedDateRange);

  if (null === formattedDateRange.from || null === formattedDateRange.to) {
    return <div>Select a date range</div>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <SparkLineChart
      data={transformResponse(data) ?? []}
      height={100}
      colors={["green"]}
    />
  );
};

export default TotalDailySalesChart;
