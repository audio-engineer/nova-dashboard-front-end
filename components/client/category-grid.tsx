"use client";

import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import type { ReactElement } from "react";
import { useState } from "react";
import type { EmbeddedCategories, PaginatedResponse } from "@/types/response";
import { getIdFromHref } from "@/utils/url";
import { useCategories } from "@/hooks/use-categories";

const pageSizeTen = 10;
const pageSizeTwentyFive = 25;

interface CategoryRow {
  readonly id: string;
  readonly name: string;
}

const transformApiResponse = (
  response: PaginatedResponse<EmbeddedCategories> | undefined,
): { rows: CategoryRow[] | undefined; rowCount: number } => {
  if (undefined === response?._embedded) {
    return { rows: undefined, rowCount: 0 };
  }

  return {
    rows: response._embedded.categories.map((category) => ({
      id: getIdFromHref(category._links.self.href),
      name: category.name,
    })),
    rowCount: response.page.totalElements,
  };
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Name", flex: 1, editable: true },
];

const CategoryGrid = (): ReactElement => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: pageSizeTwentyFive,
  });

  const { isLoading, data } = useCategories(paginationModel);

  const { rows, rowCount } = transformApiResponse(data);

  return (
    <DataGrid
      sx={{
        display: "grid",
        gridTemplateRows: "auto 1f auto",
      }}
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

export default CategoryGrid;
