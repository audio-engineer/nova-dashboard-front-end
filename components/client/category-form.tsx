"use client";

import type { ReactElement } from "react";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/axios";
import MutationQueryOnErrorHandler from "@/components/client/mutation-query-on-error-handler";
import type { Category } from "@/types/entity";
import { useNotifications } from "@toolpad/core/useNotifications";

const postCategory = async (name: string): Promise<Category> => {
  const response = await client.post<Category>(
    "/categories",
    { name },
    {
      headers: { "Content-Type": "application/json" },
    },
  );

  return response.data;
};

const CategoryForm = (): ReactElement => {
  const notifications = useNotifications();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");

  const mutation = useMutation(
    {
      mutationFn: postCategory,
      onSuccess: (data) => {
        notifications.show(`Category "${data.name}" created.`, {
          severity: "success",
          autoHideDuration: 3000,
        });
      },
      onError: (error: unknown) => {
        return <MutationQueryOnErrorHandler error={error} />;
      },
      onSettled: async () => {
        await queryClient.invalidateQueries({ queryKey: ["categories"] });
      },
    },
    queryClient,
  );

  return (
    <FormControl
      sx={{
        display: "flex",
        flexDirection: "row",
        marginBottom: "2rem",
        gap: "2rem",
      }}
    >
      <TextField
        label="Name"
        required
        onChange={(event) => {
          setName(event.target.value);
        }}
        value={name}
      />
      <Button
        variant="outlined"
        onClick={() => {
          mutation.mutate(name);

          setName("");
        }}
      >
        Add
      </Button>
    </FormControl>
  );
};

export default CategoryForm;
