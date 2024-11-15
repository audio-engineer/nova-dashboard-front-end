"use client";

import type { ReactElement } from "react";
import { useDateRange } from "@/hooks/use-date-range";
import Spinner from "@/components/client/spinner";
import type {
  EmbeddedTotalDailyRevenue,
  PaginatedResponse,
} from "@/types/response";
import { useTotalDailyRevenue } from "@/hooks/use-total-daily-revenue";
import { numericFormatter } from "react-number-format";

const initialValue = 0;

const transformResponse = (
  data: PaginatedResponse<EmbeddedTotalDailyRevenue>,
): number => {
  const totalDailySales = data._embedded.tupleBackedMaps.map(
    (totalDailySalesProjection) => totalDailySalesProjection.totalRevenue,
  );

  return totalDailySales.reduce((sum, current) => sum + current, initialValue);
};

const TotalRevenueNumber = (): ReactElement => {
  const { formattedDateRange } = useDateRange();

  const { data } = useTotalDailyRevenue(formattedDateRange, transformResponse);

  if (undefined === data) {
    return <Spinner />;
  }

  return (
    <>
      {numericFormatter(data.toString(), {
        prefix: "DKK ",
        thousandSeparator: ".",
        decimalSeparator: ",",
        fixedDecimalScale: true,
        decimalScale: 2,
      })}
    </>
  );
};

export default TotalRevenueNumber;
