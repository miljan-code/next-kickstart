import fs from "fs-extra";
import { type PackageJson } from "type-fest";

import { getUserPkgExec } from "@/utils/get-user-pkg-manager.js";

export const pkgScripts = () => {
  const pkgExec = getUserPkgExec();

  return {
    drizzle: {
      "db:generate": "drizzle-kit generate:pg --config=drizzle.config.ts",
    },
    shadcn: {
      "add:ui": `${pkgExec} shadcn-ui@latest add`,
    },
  };
};

export const addScriptsToPkgJSON = (
  path: string,
  scripts: { [key: string]: string },
) => {
  const pkgJson = fs.readJSONSync(path) as PackageJson;
  pkgJson.scripts = {
    ...pkgJson.scripts,
    ...scripts,
  };
  fs.writeJSONSync(path, pkgJson, { spaces: 2 });
};
