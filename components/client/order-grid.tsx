"use client";

import type { ReactElement } from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/axios";
import type { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import type { EmbeddedOrders, PaginatedResponse } from "@/types/response";
import type { Order } from "@/types/entity";
import { getIdFromHref } from "@/utils/url";
import { useDateRange } from "@/hooks/use-date-range";
import type { FormattedDateRange } from "@/contexts/date-range";

type OrderRow = Order & {
  readonly id: string;
};

const pageSizeTen = 10;
const pageSizeTwentyFive = 25;

const transformApiResponse = (
  response: PaginatedResponse<EmbeddedOrders> | undefined,
): { rows: OrderRow[] | undefined; rowCount: number } => {
  if (undefined === response) {
    return { rows: undefined, rowCount: 0 };
  }

  return {
    rows: response._embedded.orders.map((order) => ({
      id: getIdFromHref(order._links.self.href),
      ...order,
    })),
    rowCount: response.page.totalElements,
  };
};

const getOrders = async (
  formattedDateRange: FormattedDateRange,
  paginationModel: Readonly<GridPaginationModel>,
): Promise<PaginatedResponse<EmbeddedOrders>> => {
  const { from, to } = formattedDateRange;
  const { pageSize, page } = paginationModel;

  const response = await client.get<PaginatedResponse<EmbeddedOrders>>(
    `/orders/search/findByBusinessDateBetween?startDate=${from}&endDate=${to}&size=${pageSize}&page=${page}`,
  );

  return response.data;
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID" },
  { field: "created", headerName: "Created" },
  { field: "orderNumber", headerName: "Order Number" },
  { field: "orderVatNumber", headerName: "Order VAT Number" },
  { field: "businessDate", headerName: "Business Date" },
  { field: "price", headerName: "Price" },
  { field: "priceExclVat", headerName: "Price Excl. VAT" },
  { field: "vat", headerName: "VAT" },
  { field: "tips", headerName: "Tips" },
  { field: "paymentStatus", headerName: "Payment Status" },
  { field: "orderStatus", headerName: "Order Status" },
  { field: "isRevenue", headerName: "Is Revenus" },
  { field: "orderReference", headerName: "Order Reference" },
  { field: "isDemo", headerName: "Is Demo" },
];

const OrderGrid = (): ReactElement => {
  const { formattedDateRange } = useDateRange();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: pageSizeTwentyFive,
  });

  const { isLoading, data } = useQuery({
    queryKey: ["orders", formattedDateRange, paginationModel],
    queryFn: async () => getOrders(formattedDateRange, paginationModel),
    enabled: null !== formattedDateRange.from || null !== formattedDateRange.to,
  });

  const { rows, rowCount } = transformApiResponse(data);

  console.log(rows);
  console.log(rowCount);

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
          sortModel: [{ field: "id", sort: "asc" }],
        },
      }}
      disableRowSelectionOnClick
    />
  );
};

export default OrderGrid;
