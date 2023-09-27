import path from "node:path";
import fs from "fs-extra";

import { addPackageDeps } from "../helpers/add-package-deps.js";
import { InstallPackagesOpts } from "../helpers/install-packages.js";
import { PKG_ROOT } from "@/constants.js";
import { type Dependency } from "./dependencies.js";

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
  const nextAuthDir = path.join(PKG_ROOT, "template/libs/next-auth");

  const authTypesSrc = path.join(nextAuthDir, "types/next-auth.d.ts");
  const authTypesDest = path.join(projectDir, "types/next-auth.d.ts");

  const authLibSrc = path.join(
    nextAuthDir,
    packages.drizzle ? "lib/auth-drizzle.ts" : "lib/auth-base.ts",
  );
  const authLibDest = path.join(projectDir, "lib/auth.ts");

  const apiHandlerSrc = path.join(
    nextAuthDir,
    "app/api/auth/[...nextauth]/route.ts",
  );
  const apiHandlerDest = path.join(
    projectDir,
    "app/api/auth/[...nextauth]/route.ts",
  );

  // 3. copy files
  fs.copySync(authTypesSrc, authTypesDest);
  fs.copySync(authLibSrc, authLibDest);
  fs.copySync(apiHandlerSrc, apiHandlerDest);
};
