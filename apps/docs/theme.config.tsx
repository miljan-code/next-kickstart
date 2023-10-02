import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>Next Kickstart</span>,
  project: {
    link: "https://github.com/miljan-code/next-kickstart",
  },
  docsRepositoryBase: "https://github.com/miljan-code/next-kickstart",
  footer: {
    text: "Next Kickstart Docs",
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s - Next Kickstart",
    };
  },
};

export default config;
