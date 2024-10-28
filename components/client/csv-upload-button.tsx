"use client";

import Button from "@mui/material/Button";
import type { ChangeEvent, PropsWithChildren, ReactElement } from "react";
import { useRef, useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import Spinner from "@/components/client/spinner";
import { useNotification } from "@/components/client/notification-context";

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

interface ErrorResponse {
  message?: string;
}

interface UploadButtonProps {
  endpointPath: string;
  fileName: string;
}

const CsvUploadButton = ({
  fileName,
  endpointPath,
  children,
}: Readonly<PropsWithChildren<UploadButtonProps>>): ReactElement | null => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const firstElement = 0;
  const session = useSession();
  const token = session.data?.user?.accessToken;
  const { addNotification } = useNotification();

  const initialInputValidation = (
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    userInput: Readonly<FileList | null>,
  ): string => {
    const lengthEmpty = 0;
    if (!userInput || lengthEmpty === userInput.length) {
      return "No data selected. Please choose a CSV file.";
    }

    const lengthOfOne = 1;
    if (lengthOfOne < userInput.length) {
      return "Too many files selected. Please choose at most one CSV file.";
    }

    if (
      "text/csv" !== userInput[firstElement].type ||
      !userInput[firstElement].name.endsWith(".csv")
    ) {
      return "File selected is not a valid CSV file. Please select a valid CSV file.";
    }

    return "";
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.target;
    const errorMessage = initialInputValidation(files);

    if ("" === errorMessage && files) {
      setSelectedFile(files[firstElement]);
    } else {
      addNotification(errorMessage, "error");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    const uploadFiles = async (): Promise<void> => {
      if (!selectedFile) {
        return;
      }

      const formData = new FormData();
      formData.append(fileName, selectedFile);

      addNotification("File is being processed", "info");
      setIsLoading(true);

      try {
        const response = await fetch(endpointPath, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          const errorResponse = (await response.json()) as ErrorResponse;
          const notificationMessage =
            errorResponse.message ?? "An error occurred";
          addNotification(notificationMessage, "error");
        } else {
          const notificationMessage = await response.text();
          addNotification(notificationMessage, "success");
        }
      } catch (error) {
        if (error instanceof TypeError) {
          addNotification(
            "Failed to connect to the backend. Please make sure the backend is running.",
            "error",
          );
        } else {
          addNotification(
            "An unexpected error occurred during upload.",
            "error",
          );
        }
      } finally {
        setIsLoading(false);
        setSelectedFile(null);
      }
    };

    void uploadFiles();
  }, [addNotification, endpointPath, fileName, selectedFile, token]);

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={isLoading ? <Spinner /> : <CloudUploadIcon />}
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
