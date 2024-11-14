import type { EmbeddedCategories, PaginatedResponse } from "@/types/response";
import { client } from "@/axios";
import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { GridPaginationModel } from "@mui/x-data-grid";

const getCategories = async (
  paginationModel: Readonly<GridPaginationModel>,
): Promise<PaginatedResponse<EmbeddedCategories>> => {
  const { pageSize, page } = paginationModel;

  const response = await client.get<PaginatedResponse<EmbeddedCategories>>(
    `/categories?size=${pageSize}&page=${page}`,
  );

  return response.data;
};

export const useCategories = (
  paginationModel: Readonly<GridPaginationModel>,
): UseQueryResult<PaginatedResponse<EmbeddedCategories>> =>
  useQuery({
    queryKey: ["categories", paginationModel],
    queryFn: async () => getCategories(paginationModel),
  });
