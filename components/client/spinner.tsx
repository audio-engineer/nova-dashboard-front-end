"use client";

import CircularProgress from "@mui/material/CircularProgress";
import type { ReactElement } from "react";

const Spinner = (): ReactElement | null => {
  return (
    <CircularProgress
      sx={{ alignSelf: "center", margin: "auto", color: "inherit" }}
      size={20}
    />
  );
};

export default Spinner;
