"use client";

import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import type { SelectChangeEvent } from "@mui/material/Select";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import type { GridRenderCellParams } from "@mui/x-data-grid";
import type { ProductRow } from "@/components/client/product-grid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import MutationQueryOnErrorHandler from "@/components/client/mutation-query-on-error-handler";
import { client } from "@/axios";
import { getIdFromHref } from "@/utils/url";
import type { EmbeddedCategories, PaginatedResponse } from "@/types/response";
import FormControl from "@mui/material/FormControl";
import { useCategories } from "@/hooks/use-categories";
import { useNotifications } from "@toolpad/core/useNotifications";

interface SelectCellProps {
  readonly params: GridRenderCellParams<ProductRow>;
}

const putProduct = async ({
  productId,
  categoryId,
}: {
  readonly productId: string;
  readonly categoryId: string;
}): Promise<null> => {
  const response = await client.put<null>(
    `/products/${productId}/category`,
    `/categories/${categoryId}`,
    {
      headers: { "Content-Type": "text/uri-list" },
    },
  );

  return response.data;
};

const SelectCell = ({ params }: SelectCellProps): ReactElement => {
  const [value, setValue] = useState("0");

  const notifications = useNotifications();
  const queryClient = useQueryClient();
  const { data: fetchedCategories } = useCategories({ pageSize: 100, page: 0 });

  const cachedCategories = queryClient.getQueryData<
    PaginatedResponse<EmbeddedCategories>
  >(["categories"]);

  const categories =
    cachedCategories?._embedded.categories ??
    fetchedCategories?._embedded.categories ??
    [];

  const { row } = params;

  const mutation = useMutation({
    mutationFn: putProduct,
    onSuccess: () => {
      notifications.show(`Product "${row.name}" updated.`, {
        severity: "success",
        autoHideDuration: 3000,
      });
    },
    onError: (error: unknown) => {
      return <MutationQueryOnErrorHandler error={error} />;
    },
    // onSettled: async () => {
    //   await queryClient.invalidateQueries({ queryKey: ["categories"] });
    // },
  });

  useEffect(() => {
    setValue(row.category);
  }, [row.category]);

  const handleSelectChange = (event: SelectChangeEvent): void => {
    const { value: categoryId } = event.target;

    mutation.mutate({
      productId: row.id,
      categoryId,
    });

    setValue(categoryId);
  };

  return (
    <FormControl size="small">
      <Select
        style={{ marginLeft: 16 }}
        value={value}
        onChange={handleSelectChange}
      >
        <MenuItem value={"0"}>Unassigned</MenuItem>
        {categories.map((category) => {
          const categoryId = getIdFromHref(category._links.self.href);

          return (
            <MenuItem key={categoryId} value={categoryId}>
              {category.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SelectCell;
