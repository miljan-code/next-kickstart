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
  proseWrap: "always",
};

module.exports = config;
