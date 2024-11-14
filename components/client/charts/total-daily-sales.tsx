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
  data: PaginatedResponse<EmbeddedTotalDailySales>,
): number[] => {
  return data._embedded.tupleBackedMaps.map(
    (totalDailySalesProjection) => totalDailySalesProjection.totalSales,
  );
};

const TotalDailySales = (): ReactElement => {
  const { formattedDateRange } = useDateRange();

  const { data } = useTotalDailySales(formattedDateRange, transformResponse);

  if (undefined === data) {
    return <Spinner />;
  }

  return <SparkLineChart data={data} height={100} colors={["green"]} />;
};

export default TotalDailySales;
