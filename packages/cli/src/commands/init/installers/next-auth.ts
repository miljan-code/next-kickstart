import path from "node:path";

import { fsNextAuth } from "@/commands/common/fs-helpers.js";
import { addPackageDeps } from "@/commands/common/add-package-deps.js";
import { type InstallPackagesOpts } from "../helpers/install-packages.js";
import { type Dependency } from "@/commands/common/dependencies.js";

export const nextAuthInstaller = ({
  projectDir,
  packages,
}: InstallPackagesOpts) => {
  const pkgJsonPath = path.join(projectDir, "package.json");

  // 1. add deps to package.json
  const deps: Dependency[] = ["next-auth"];
  if (packages.drizzle) deps.push("@auth/drizzle-adapter");
  addPackageDeps({ deps, isDev: false, pkgJsonPath });

  // 2. get paths of files to copy
  fsNextAuth({ projectDir, packages });
};
