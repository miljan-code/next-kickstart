import path from "node:path";

import { fsDrizzle } from "@/commands/common/fs-helpers.js";
import { addPackageDeps } from "@/commands/common/add-package-deps.js";
import {
  addScriptsToPkgJSON,
  pkgScripts,
} from "@/commands/common/update-json-scripts.js";
import { type Dependency } from "@/commands/common/dependencies.js";
import { type InstallPackagesOpts } from "../helpers/install-packages.js";

export const drizzleInstaller = ({
  projectDir,
  packages,
}: InstallPackagesOpts) => {
  const pkgJsonPath = path.join(projectDir, "package.json");

  // 1. add deps to package.json
  const deps: Dependency[] = ["drizzle-orm", "postgres"];
  if (packages.nextauth) deps.push("@auth/core");

  addPackageDeps({ deps, isDev: false, pkgJsonPath });
  addPackageDeps({
    deps: ["drizzle-kit", "dotenv"],
    isDev: true,
    pkgJsonPath,
  });

  // 2. add generate script to package.json
  addScriptsToPkgJSON(pkgJsonPath, pkgScripts().drizzle);

  // 3. copy files
  fsDrizzle({ projectDir, withAuth: packages.nextauth });
};
