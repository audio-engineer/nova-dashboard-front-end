"use client";

import type { ReactElement } from "react";
import { useDateRange } from "@/hooks/use-date-range";
import { useTotalDailySales } from "@/hooks/use-total-daily-sales";
import Spinner from "@/components/client/spinner";
import type {
  EmbeddedTotalDailySales,
  PaginatedResponse,
} from "@/types/response";

const initialValue = 0;

const transformResponse = (
  data: PaginatedResponse<EmbeddedTotalDailySales>,
): number => {
  const totalDailySales = data._embedded.tupleBackedMaps.map(
    (totalDailySalesProjection) => totalDailySalesProjection.totalSales,
  );

  return totalDailySales.reduce((sum, current) => sum + current, initialValue);
};

const TotalSalesNumber = (): ReactElement => {
  const { formattedDateRange } = useDateRange();

  const { data } = useTotalDailySales(formattedDateRange, transformResponse);

  if (undefined === data) {
    return <Spinner />;
  }

  return <>{data}</>;
};

export default TotalSalesNumber;
