import gradient from "gradient-string";

import { TITLE_TEXT } from "@/constants.js";

const theme = {
  blue: "#add7ff",
  cyan: "#89ddff",
};

export const renderTitle = () => {
  const titleGradient = gradient(Object.values(theme));

  console.log(titleGradient.multiline(TITLE_TEXT));
};
