"use client";

import Button from "@mui/material/Button";
import type { ChangeEvent, PropsWithChildren, ReactElement } from "react";
import { useRef, useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSession } from "next-auth/react";
import Spinner from "@/components/client/spinner";

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

interface UploadButtonProps {
  endpointPath: string;
  fileName: string;
}

const CsvUploadButton = ({
  fileName,
  endpointPath,
  children,
}: Readonly<PropsWithChildren<UploadButtonProps>>): ReactElement | null => {
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [isUploadFail, setIsUploadFail] = useState<boolean>(false);
  const [isUploadSuccess, setIsUploadSuccess] = useState<boolean>(false);
  const [isUploadStarted, setIsUploadStarted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const firstElement = 0;
  const session = useSession();
  const token = session.data?.user?.accessToken;

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  const isInputValid = (files: Readonly<FileList> | null): boolean => {
    const lengthEmpty = 0;
    if (!files || lengthEmpty === files.length) {
      setNotificationMessage("No data selected. Please choose a CSV file");
      return false;
    }

    const lengthOfOne = 1;
    if (lengthOfOne < files.length) {
      setNotificationMessage(
        "Too many files selected. Please choose at most one CSV file.",
      );
      return false;
    }

    if (
      "text/csv" !== files[firstElement].type ||
      !files[firstElement].name.endsWith(".csv")
    ) {
      setNotificationMessage(
        "File selected is not a valid CSV file. Please select a valid CSV file.",
      );
      return false;
    }

    return true;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.target;

    if (isInputValid(files) && files) {
      setSelectedFile(files[firstElement]);
    } else {
      setIsUploadFail(true);
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

      setNotificationMessage("File is being processed");
      setIsUploadStarted(true);
      setIsLoading(true);

      const formData = new FormData();
      formData.append(fileName, selectedFile);

      const response = await fetch(endpointPath, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await response.json();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { message } = data;
      setNotificationMessage(message as string);

      if (!response.ok) {
        setIsUploadFail(true);
      } else {
        setIsUploadSuccess(true);
      }
      setIsLoading(false);
      setSelectedFile(null);
    };

    void uploadFiles();
  }, [endpointPath, fileName, selectedFile, token]);

  const handleCloseSnackbar = (): void => {
    setNotificationMessage("");
    setIsUploadSuccess(false);
    setIsUploadFail(false);
    setIsUploadStarted(false);
  };

  return (
    <>
      {!isLoading && (
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          disabled={isLoading}
        >
          {children}
          <VisuallyHiddenInput
            type="file"
            onChange={handleInputChange}
            ref={fileInputRef}
          />
        </Button>
      )}
      {isLoading && <Spinner invertedColor={true} />}
      <Snackbar
        open={isUploadFail || isUploadSuccess || isUploadStarted}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={
            isUploadSuccess ? "success" : isUploadFail ? "error" : "info"
          }
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CsvUploadButton;
