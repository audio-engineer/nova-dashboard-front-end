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
              package: "next",
              name: ["NextRequest"],
            },
            {
              from: "package",
              package: "react",
              name: ["ChangeEvent", "MouseEvent", "ReactNode"],
            },
            {
              from: "lib",
              name: ["Request"],
            },
            {
              from: "package",
              package: "next-auth",
              name: ["NextAuthRequest"],
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
      "@typescript-eslint/no-magic-numbers": [
        "error",
        {
          ignoreEnums: true,
        },
      ],
    },
  },
  eslintConfigPrettier,
);
