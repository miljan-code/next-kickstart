/** @typedef  {import("prettier").Config} PrettierConfig */

// @ts-expect-error SortImportsConfig missing
/** @type { PrettierConfig | SortImportsConfig } */
const config = {
  arrowParens: "always",
  printWidth: 80,
  singleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrderTypeScriptVersion: "5.0.0",
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/(.*)$",
  ],
  proseWrap: "always",
};

module.exports = config;
