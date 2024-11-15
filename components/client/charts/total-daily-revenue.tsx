"use client";

import type { ReactElement } from "react";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import type {
  EmbeddedTotalDailyRevenue,
  PaginatedResponse,
} from "@/types/response";
import { useDateRange } from "@/hooks/use-date-range";
import Spinner from "@/components/client/spinner";
import { useTotalDailyRevenue } from "@/hooks/use-total-daily-revenue";

const transformResponse = (
  data: PaginatedResponse<EmbeddedTotalDailyRevenue>,
): number[] => {
  return data._embedded.tupleBackedMaps.map(
    (totalDailySalesProjection) => totalDailySalesProjection.totalRevenue,
  );
};

const TotalDailyRevenue = (): ReactElement => {
  const { formattedDateRange } = useDateRange();

  const { data } = useTotalDailyRevenue(formattedDateRange, transformResponse);

  if (undefined === data) {
    return <Spinner />;
  }

  return <SparkLineChart data={data} height={100} colors={["green"]} />;
};

export default TotalDailyRevenue;
