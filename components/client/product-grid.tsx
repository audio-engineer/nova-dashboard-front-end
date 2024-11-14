"use client";

import type {
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import type { ReactElement } from "react";
import { useState } from "react";
import SelectCell from "@/components/client/select-cell";
import { client } from "@/axios";
import type {
  EmbeddedProductsWithCategory,
  PaginatedResponse,
} from "@/types/response";

const pageSizeTen = 10;
const pageSizeTwentyFive = 25;

export interface ProductRow {
  readonly id: string;
  readonly name: string;
  readonly category: string;
}

const transformApiResponse = (
  response: PaginatedResponse<EmbeddedProductsWithCategory> | undefined,
): { rows: ProductRow[] | undefined; rowCount: number } => {
  if (undefined === response?._embedded) {
    return { rows: undefined, rowCount: 0 };
  }

  return {
    rows: response._embedded.products.map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category?.id ?? "0",
    })),
    rowCount: response.page.totalElements,
  };
};

const getProducts = async (
  paginationModel: Readonly<GridPaginationModel>,
): Promise<PaginatedResponse<EmbeddedProductsWithCategory>> => {
  const { page, pageSize } = paginationModel;

  const response = await client.get<
    PaginatedResponse<EmbeddedProductsWithCategory>
  >(`/products?projection=withCategory&size=${pageSize}&page=${page}`);

  return response.data;
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Name", flex: 1 },
  {
    field: "category",
    headerName: "Category",
    flex: 1,
    renderCell: (params: GridRenderCellParams<ProductRow>) => (
      <SelectCell params={params} />
    ),
  },
];

const ProductGrid = (): ReactElement => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: pageSizeTwentyFive,
  });

  const { isLoading, data } = useQuery({
    queryKey: ["products", paginationModel],
    queryFn: async () => getProducts(paginationModel),
  });

  const { rows, rowCount } = transformApiResponse(data);

  return (
    <DataGrid
      rows={rows ?? []}
      rowCount={rowCount}
      columns={columns}
      loading={isLoading}
      paginationMode="server"
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      pageSizeOptions={[pageSizeTen, pageSizeTwentyFive]}
      slots={{
        toolbar: GridToolbar,
      }}
      slotProps={{
        loadingOverlay: {
          variant: "skeleton",
          noRowsVariant: "skeleton",
        },
      }}
      initialState={{
        sorting: {
          sortModel: [{ field: "name", sort: "asc" }],
        },
      }}
      disableRowSelectionOnClick
    />
  );
};

export default ProductGrid;
