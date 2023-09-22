import path from "node:path";
import fs from "fs-extra";
import { addPackageDeps } from "../helpers/add-package-deps.js";
import { InstallPackagesOpts } from "../helpers/install-packages.js";
import { PKG_ROOT } from "@/constants.js";
import { type PackageJson } from "type-fest";
import { type Dependency } from "./dependencies.js";

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
    deps: ["drizzle-kit", "pg", "dotenv", "@types/pg"],
    isDev: true,
    pkgJsonPath,
  });

  // 2. add generate script to package.json
  const pkgJson = fs.readJSONSync(pkgJsonPath) as PackageJson;
  pkgJson.scripts = {
    ...pkgJson.scripts,
    "db:generate": "drizzle-kit generate:pg --config=drizzle.config.ts",
  };
  fs.writeJSONSync(pkgJsonPath, pkgJson, { spaces: 2 });

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
  fs.mkdirSync(path.join(projectDir, "db/schema"), { recursive: true });
  fs.copySync(clientSrc, clientDest);
  fs.copySync(schemaSrc, schemaDest);
};
