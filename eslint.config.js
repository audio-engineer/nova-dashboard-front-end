// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.all,
  ...compat.extends("next/core-web-vitals"),
  ...compat.extends("next/typescript"),
  {
    ignores: ["*.config.*", ".next/"],
  },
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE", "StrictPascalCase"],
        },
      ],
      "@typescript-eslint/prefer-readonly-parameter-types": [
        "error",
        {
          allow: [
            "$",
            {
              from: "package",
              package: "@mui/x-data-grid",
              name: ["GridRenderCellParams"],
            },
            {
              from: "package",
              package: "react",
              name: ["ChangeEvent", "ReactNode"],
            },
            {
              from: "lib",
              name: ["Request", "FileList"],
            },
            {
              from: "package",
              package: "mui/material",
              name: ["SelectChangeEvent"],
            },
            {
              from: "package",
              package: "@nivo/heatmap",
              name: ["TooltipProps", "HeatMapSerie"],
            },
          ],
        },
      ],
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          patterns: ["@mui/*/*/*"],
        },
      ],
    },
  },
  eslintConfigPrettier,
);
