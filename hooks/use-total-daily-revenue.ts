import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { FormattedDateRange } from "@/contexts/date-range";
import type {
  EmbeddedTotalDailyRevenue,
  PaginatedResponse,
} from "@/types/response";
import { client } from "@/axios";

const getTotalDailyRevenue = async (
  formattedDateRange: FormattedDateRange,
): Promise<PaginatedResponse<EmbeddedTotalDailyRevenue>> => {
  const { from, to } = formattedDateRange;

  const response = await client.get<
    PaginatedResponse<EmbeddedTotalDailyRevenue>
  >(`/api/total-daily-revenue?startDate=${from}&endDate=${to}&size=300`);

  return response.data;
};

export const useTotalDailyRevenue = <T>(
  formattedDateRange: FormattedDateRange,
  select?: (data: PaginatedResponse<EmbeddedTotalDailyRevenue>) => T,
): UseQueryResult<T> =>
  useQuery({
    queryKey: ["totalDailyRevenue", formattedDateRange],
    queryFn: async () => getTotalDailyRevenue(formattedDateRange),
    enabled: null !== formattedDateRange.from || null !== formattedDateRange.to,
    select,
  });
