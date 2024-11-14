import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { FormattedDateRange } from "@/contexts/date-range";
import type {
  EmbeddedTotalDailySales,
  PaginatedResponse,
} from "@/types/response";
import { client } from "@/axios";

const getTotalDailySales = async (
  formattedDateRange: FormattedDateRange,
): Promise<PaginatedResponse<EmbeddedTotalDailySales>> => {
  const { from, to } = formattedDateRange;

  const response = await client.get<PaginatedResponse<EmbeddedTotalDailySales>>(
    `/api/total-daily-sales?startDate=${from}&endDate=${to}&size=300`,
  );

  return response.data;
};

export const useTotalDailySales = <T>(
  formattedDateRange: FormattedDateRange,
  select?: (data: PaginatedResponse<EmbeddedTotalDailySales>) => T,
): UseQueryResult<T> =>
  useQuery({
    queryKey: ["totalDailySales", formattedDateRange],
    queryFn: async () => getTotalDailySales(formattedDateRange),
    enabled: null !== formattedDateRange.from || null !== formattedDateRange.to,
    select,
  });
