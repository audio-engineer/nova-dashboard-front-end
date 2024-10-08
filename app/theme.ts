"use client";

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: "class",
  },
});
