import fs from "fs-extra";
import { type PackageJson } from "type-fest";

export const pkgScripts = {
  drizzle: {
    "db:generate": "drizzle-kit generate:pg --config=drizzle.config.ts",
  },
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
