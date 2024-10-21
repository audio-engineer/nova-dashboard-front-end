"use client";

import Button from "@mui/material/Button";
import type { ChangeEvent, ReactElement } from "react";
import { useRef, useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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

const UploadButton = (): ReactElement | null => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isUploadFail, setIsUploadFail] = useState<boolean>(false);
  const [isUploadSuccess, setIsUploadSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const emptyLength = 0;

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  const isInputValid = (files: Readonly<FileList> | null): boolean => {
    if (!files) {
      setErrorMessage("No data selected.");
      return false;
    }

    if (emptyLength === files.length) {
      setErrorMessage(
        "No files selected. Please choose at least one CSV file.",
      );
      return false;
    }

    const validFiles = Array.from(files).filter(
      (file: Readonly<File>) =>
        "text/csv" === file.type || file.name.endsWith(".csv"),
    );

    if (emptyLength === validFiles.length) {
      setErrorMessage("Please select at least one valid CSV file.");
      return false;
    }

    if (validFiles.length !== files.length) {
      setErrorMessage("Some files were not valid CSV files.");
      return false;
    }
    return true;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.target;

    if (isInputValid(files)) {
      setSelectedFiles(files);
    } else {
      setIsUploadFail(true);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    const uploadFiles = async (): Promise<void> => {
      if (!selectedFiles) {
        return;
      }

      setIsLoading(true);

      try {
        // Todo: Add a real token in the api call.
        const token = "";
        const formData = new FormData();
        Array.from(selectedFiles).forEach((file: Readonly<File>) => {
          formData.append("csv-file", file);
        });

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_HOST}/csv-upload`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          },
        );

        if (!response.ok) {
          setErrorMessage(
            `File upload failed on the server. Status code: ${response.status}.`,
          );
          setIsUploadFail(true);
        } else {
          setIsUploadSuccess(true);
        }
      } catch {
        setErrorMessage("Failed to connect to the server.");
        setIsUploadFail(true);
      } finally {
        setIsLoading(false);
        setSelectedFiles(null);
      }
    };

    void uploadFiles();
  }, [selectedFiles]);

  const handleCloseSnackbar = (): void => {
    setErrorMessage("");
    setIsUploadSuccess(false);
    setIsUploadFail(false);
  };

  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        disabled={isLoading}
      >
        Upload Orders
        <VisuallyHiddenInput
          type="file"
          onChange={handleInputChange}
          multiple
          ref={fileInputRef}
        />
      </Button>
      <Snackbar
        open={isUploadFail}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={isUploadSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Files uploaded successfully.
        </Alert>
      </Snackbar>
    </>
  );
};

export default UploadButton;
