import path from "node:path";
import fs from "fs-extra";

import { InstallPackagesOpts } from "../helpers/install-packages.js";
import { addPackageDeps } from "@/commands/common/add-package-deps.js";
import {
  addScriptsToPkgJSON,
  pkgScripts,
} from "@/commands/common/update-json-scripts.js";
import { PKG_ROOT } from "@/constants.js";
import { type Dependency } from "@/commands/common/dependencies.js";

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
  addScriptsToPkgJSON(pkgJsonPath, pkgScripts.drizzle);

  // 3. get paths of files to copy
  const drizzleDir = path.join(PKG_ROOT, "template/libs/drizzle");

  const configSrc = path.join(drizzleDir, "drizzle.config.ts");
  const configDest = path.join(projectDir, "drizzle.config.ts");

  const clientSrc = path.join(drizzleDir, "db/index.ts");
  const clientDest = path.join(projectDir, "db/index.ts");

  const schemaSrc = path.join(
    drizzleDir,
    "db/schema",
    packages.nextauth ? "index-auth.ts" : "index-base.ts",
  );
  const schemaDest = path.join(projectDir, "db/schema/index.ts");

  // 4. copy files
  fs.copySync(configSrc, configDest);
  fs.copySync(clientSrc, clientDest);
  fs.copySync(schemaSrc, schemaDest);
};
