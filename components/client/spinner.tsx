"use client";

import CircularProgress from "@mui/material/CircularProgress";
import type { ReactElement } from "react";

const Spinner = ({
  invertedColor,
}: Readonly<{ invertedColor: boolean }>): ReactElement | null => {
  if (invertedColor) {
    return (
      <CircularProgress
        sx={{ alignSelf: "center", margin: "auto", color: "white" }}
      />
    );
  } else {
    return <CircularProgress sx={{ alignSelf: "center", margin: "auto" }} />;
  }
};

export default Spinner;
