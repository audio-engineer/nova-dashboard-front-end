"use client";

import Button from "@mui/material/Button";
import type { ChangeEvent, PropsWithChildren, ReactElement } from "react";
import { useRef, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Spinner from "@/components/client/spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/axios";
import MutationQueryOnErrorHandler from "@/components/client/mutation-query-on-error-handler";
import { useNotifications } from "@toolpad/core/useNotifications";

type AllowedFileNamePrefix = "orders" | "orderlines";

const firstFileIndex = 0;
const emptyFileListLength = 0;
const allowedNumberOfFiles = 1;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface CsvUploadButtonProps {
  readonly endpointPath: string;
  readonly allowedFileNamePrefix: AllowedFileNamePrefix;
}

interface SuccessResponse {
  readonly message: string;
}

const postFile = async ({
  endpointPath,
  allowedFileNamePrefix,
  file,
}: {
  readonly endpointPath: string;
  readonly allowedFileNamePrefix: AllowedFileNamePrefix;
  readonly file: Readonly<File>;
}): Promise<SuccessResponse> => {
  const formData = new FormData();

  formData.append(allowedFileNamePrefix, file);

  const response = await client.post<SuccessResponse>(endpointPath, formData);

  return response.data;
};

const validateFile = (
  fileNamePrefix: AllowedFileNamePrefix,
  files: FileList | null,
): void => {
  if (!files || emptyFileListLength === files.length) {
    throw new Error("No file selected. Select a CSV file.");
  }

  if (allowedNumberOfFiles < files.length) {
    throw new Error(
      "Too many files selected. Please choose at most one CSV file.",
    );
  }

  // We need to use index access to avoid TypeScript error TS2802
  // eslint-disable-next-line @typescript-eslint/prefer-destructuring
  const file = files[firstFileIndex];

  if (!file.name.startsWith(fileNamePrefix)) {
    throw new Error(
      `Wrong file selected. Filename should start with "${fileNamePrefix}".`,
    );
  }

  if ("text/csv" !== file.type || !file.name.endsWith(".csv")) {
    throw new Error(
      "The file selected is not a valid CSV file. Select a valid CSV file.",
    );
  }
};

const StartIcon = (isLoading: boolean): ReactElement => {
  if (isLoading) {
    return <Spinner />;
  }

  return <CloudUploadIcon />;
};

const CsvUploadButton = ({
  allowedFileNamePrefix,
  endpointPath,
  children,
}: Readonly<PropsWithChildren<CsvUploadButtonProps>>): ReactElement => {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const mutation = useMutation({
    mutationFn: postFile,
    onMutate: () => {
      setIsLoading(true);

      notifications.show("The file is being processed", {
        severity: "info",
        autoHideDuration: 3000,
      });
    },
    onSuccess: (data) => {
      notifications.show(data.message, {
        severity: "success",
        autoHideDuration: 3000,
      });
    },
    onError: (error: unknown) => {
      return (
        <MutationQueryOnErrorHandler
          error={error}
          setIsLoading={setIsLoading}
        />
      );
    },
    onSettled: async () => {
      setIsLoading(false);

      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target;

    try {
      validateFile(allowedFileNamePrefix, files);
    } catch (error) {
      if (error instanceof Error) {
        notifications.show(error.message, {
          severity: "error",
          autoHideDuration: 3000,
        });

        return;
      }
    }

    if (!files) {
      return;
    }

    mutation.mutate({
      endpointPath,
      allowedFileNamePrefix,
      file: files[firstFileIndex],
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Button
      component="label"
      role={undefined}
      tabIndex={-1}
      startIcon={StartIcon(isLoading)}
      disabled={isLoading}
    >
      {children}
      <VisuallyHiddenInput
        type="file"
        onChange={handleInputChange}
        ref={fileInputRef}
      />
    </Button>
  );
};

export default CsvUploadButton;
