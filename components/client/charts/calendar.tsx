"use client";

import type { CalendarTooltipProps } from "@nivo/calendar";
import { ResponsiveCalendar } from "@nivo/calendar";
import type { ReactElement } from "react";
import { useTotalDailySales } from "@/hooks/use-total-daily-sales";
import Spinner from "@/components/client/spinner";
import dayjs from "dayjs";
import type {
  EmbeddedTotalDailySales,
  PaginatedResponse,
} from "@/types/response";

interface DataEntry {
  value: number;
  day: string;
}

const transformResponse = (
  data: PaginatedResponse<EmbeddedTotalDailySales>,
): DataEntry[] => {
  return data._embedded.tupleBackedMaps.map((totalDailySalesProjection) => ({
    day: totalDailySalesProjection.date,
    value: totalDailySalesProjection.totalSales,
  }));
};

const Calendar = (): ReactElement => {
  const { data } = useTotalDailySales(
    {
      from: dayjs().startOf("year").format("YYYY-MM-DD"),
      to: dayjs().format("YYYY-MM-DD"),
    },
    transformResponse,
  );

  if (undefined === data) {
    return <Spinner />;
  }

  return (
    <ResponsiveCalendar
      data={data}
      from="2024-01-07"
      to="2024-07-12"
      emptyColor="#FFFFFF"
      colors={[
        "#C3DBEE",
        "#6FAFD6",
        "#3D8CC3",
        "#145FA6",
        "#094589",
        "#08306C",
      ]}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      yearSpacing={40}
      monthSpacing={0}
      daySpacing={3}
      monthBorderWidth={0}
      dayBorderWidth={0}
      legends={[
        {
          anchor: "bottom-right",
          direction: "row",
          translateY: 36,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: "right-to-left",
        },
      ]}
      tooltip={({ value, day }: Readonly<CalendarTooltipProps>) => {
        return (
          <div
            style={{
              background: "white",
              padding: "9px 12px",
              border: "1px solid #ccc",
            }}
          >
            <div>
              {value} sale(s) on {day}
            </div>
          </div>
        );
      }}
    />
  );
};

export default Calendar;
