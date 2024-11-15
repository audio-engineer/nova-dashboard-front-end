"use client";

import type { HeatMapDatum, HeatMapSerie, TooltipProps } from "@nivo/heatmap";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import type { ReactElement } from "react";
import { client } from "@/axios";
import type {
  EmbeddedDailyHourlySales,
  PaginatedResponse,
} from "@/types/response";
import type { FormattedDateRange } from "@/contexts/date-range";
import { useDateRange } from "@/hooks/use-date-range";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/client/spinner";
import { getLocalizedDate, getLocalizedTime } from "@/utils/date-time";
import dayjs from "dayjs";

const getDailyHourlySales = async (
  formattedDateRange: FormattedDateRange,
): Promise<PaginatedResponse<EmbeddedDailyHourlySales>> => {
  const { from, to } = formattedDateRange;

  const response = await client.get<
    PaginatedResponse<EmbeddedDailyHourlySales>
  >(`/api/daily-hourly-sales?startDate=${from}&endDate=${to}`);

  return response.data;
};

const transformToHeatmapData = (
  response: PaginatedResponse<EmbeddedDailyHourlySales>,
): HeatMapSerie<HeatMapDatum, object>[] => {
  const array = response._embedded.dailyHourlySalesDtoes.map((day) => {
    const data = day.hourlySales.map((hourly) => ({
      x: getLocalizedTime(hourly.hour),
      y: hourly.totalSales,
    }));

    data.sort(
      (
        firstElement: Readonly<HeatMapDatum>,
        secondElement: Readonly<HeatMapDatum>,
      ) => {
        return (
          dayjs(firstElement.x, "HH:mm").unix() -
          dayjs(secondElement.x, "HH:mm").unix()
        );
      },
    );

    return {
      id: getLocalizedDate(day.date),
      data,
    };
  });

  array.sort(
    (
      firstElement: HeatMapSerie<HeatMapDatum, object>,
      secondElement: HeatMapSerie<HeatMapDatum, object>,
    ) => {
      return (
        dayjs(firstElement.id, "DD.MM.YYYY").unix() -
        dayjs(secondElement.id, "DD.MM.YYYY").unix()
      );
    },
  );

  return array;
};

const DailyHourlySales = (): ReactElement => {
  const { formattedDateRange } = useDateRange();

  const { data } = useQuery({
    queryKey: ["dailyHourlySales", formattedDateRange],
    queryFn: async () => getDailyHourlySales(formattedDateRange),
    enabled: null !== formattedDateRange.from || null !== formattedDateRange.to,
    select: transformToHeatmapData,
  });

  if (undefined === data) {
    return <Spinner />;
  }

  return (
    <ResponsiveHeatMap
      data={data}
      margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
      forceSquare={false}
      xInnerPadding={0.05}
      yInnerPadding={0.05}
      borderRadius={6}
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
      }}
      colors={{
        type: "sequential",
        scheme: "blues",
      }}
      emptyColor="#555555"
      inactiveOpacity={1}
      legends={[
        {
          anchor: "bottom",
          translateX: 0,
          translateY: 30,
          length: 400,
          thickness: 8,
          direction: "row",
          tickPosition: "after",
          tickSize: 5,
          tickSpacing: 4,
          tickOverlap: false,
          titleAlign: "start",
          titleOffset: 4,
        },
      ]}
      tooltip={({ cell }: TooltipProps<HeatMapDatum>) => {
        return (
          <div
            style={{
              background: "white",
              padding: "9px 12px",
              border: "1px solid #ccc",
            }}
          >
            <div>
              {cell.formattedValue} sale(s) on {cell.serieId}s at {cell.data.x}
            </div>
          </div>
        );
      }}
    />
  );
};

export default DailyHourlySales;
