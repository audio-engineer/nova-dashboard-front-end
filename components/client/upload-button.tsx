"use client";

import Button from "@mui/material/Button";
import type { ReactElement } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

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
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload Orders
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => {
          console.log(event.target.files);
        }}
        multiple
      />
    </Button>
  );
};

export default UploadButton;
