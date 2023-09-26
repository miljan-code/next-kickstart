import path from "node:path";
import fs from "fs-extra";
import type { PackageJson } from "type-fest";

import { PKG_ROOT } from "../constants.js";

export function getPackageInfo() {
  const packageJsonPath = path.join(PKG_ROOT, "package.json");

  return fs.readJSONSync(packageJsonPath) as PackageJson;
}
