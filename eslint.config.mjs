import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import onlyWarn from "eslint-plugin-only-warn";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";

/**
 * @type {import("eslint").Linter.Config}
 * */

const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: { prettier: prettierPlugin },
  },
  {
    plugins: {
      onlyWarn,
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
  {
    ignores: [
      "dist/**",
      "build/**",
      "node_modules",
      "dist",
      "build",
      "public",
      "**/*.test.ts",
    ],
  },
];

export default config;
