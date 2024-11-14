"use client";

import type { ReactElement } from "react";
import type { BarDatum, BarTooltipProps } from "@nivo/bar";
import { ResponsiveBar } from "@nivo/bar";
import { useQuery } from "@tanstack/react-query";
import type {
  EmbeddedCategories,
  EmbeddedDailyCategorySales,
  PaginatedResponse,
} from "@/types/response";
import { client } from "@/axios";
import Spinner from "@/components/client/spinner";
import { useDateRange } from "@/hooks/use-date-range";
import type { FormattedDateRange } from "@/contexts/date-range";
import { useCategories } from "@/hooks/use-categories";
import { getLocalizedDate } from "@/utils/date-time";

const getDailyCategorySales = async (
  formattedDateRange: FormattedDateRange,
): Promise<PaginatedResponse<EmbeddedDailyCategorySales>> => {
  const { from, to } = formattedDateRange;

  const response = await client.get<
    PaginatedResponse<EmbeddedDailyCategorySales>
  >(`/api/daily-category-sales?startDate=${from}&endDate=${to}`);

  return response.data;
};

const transformApiResponse = (
  response: PaginatedResponse<EmbeddedDailyCategorySales> | undefined,
): BarDatum[] | undefined => {
  if (undefined === response?._embedded) {
    return undefined;
  }

  return response._embedded.dailyCategorySalesDtoes.map((dailySales) => {
    const barDatum: BarDatum = { day: getLocalizedDate(dailySales.date) };

    dailySales.categorySales.forEach((category) => {
      barDatum[category.name] = category.totalSales;
    });

    return barDatum;
  });
};

const transformCategories = (
  response: PaginatedResponse<EmbeddedCategories> | undefined,
): string[] | undefined => {
  if (undefined === response?._embedded) {
    return undefined;
  }

  return response._embedded.categories.map((category) => category.name);
};

const DailyCategorySalesChart = (): ReactElement => {
  const { formattedDateRange } = useDateRange();

  const { isLoading, data } = useQuery({
    queryKey: ["dailyCategorySales", formattedDateRange],
    queryFn: async () => getDailyCategorySales(formattedDateRange),
    enabled: null !== formattedDateRange.from || null !== formattedDateRange.to,
  });

  const { isLoading: categoryIsLoading, data: categoryData } = useCategories({
    pageSize: 100,
    page: 0,
  });

  if (null === formattedDateRange.from || null === formattedDateRange.to) {
    return <div>Select a date range</div>;
  }

  if (undefined === data?._embedded) {
    return <div>Map some categories</div>;
  }

  if (isLoading || categoryIsLoading) {
    return <Spinner />;
  }

  return (
    <ResponsiveBar
      data={transformApiResponse(data) ?? []}
      enableTotals={false}
      layout="horizontal"
      keys={transformCategories(categoryData) ?? []}
      indexBy="day"
      margin={{ top: 60, right: 90, bottom: 90, left: 90 }}
      padding={0.3}
      innerPadding={2}
      borderRadius={6}
      enableGridX={true}
      enableGridY={false}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      tooltip={({
        value,
        id,
        indexValue,
      }: Readonly<BarTooltipProps<Readonly<BarDatum>>>) => {
        return (
          <div
            style={{
              background: "white",
              padding: "9px 12px",
              border: "1px solid #ccc",
            }}
          >
            <div>
              {value} {id} sold on {indexValue}
            </div>
          </div>
        );
      }}
      colors={{ scheme: "pastel1" }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 70,
          itemsSpacing: 50,
          itemWidth: 50,
          itemHeight: 20,
          itemDirection: "left-to-right",
          symbolSize: 20,
        },
      ]}
    />
  );
};

export default DailyCategorySalesChart;
