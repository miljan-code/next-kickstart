import path from "node:path";
import fs from "fs-extra";
import { addPackageDeps } from "../helpers/add-package-deps.js";
import { InstallPackagesOpts } from "../helpers/install-packages.js";
import { PKG_ROOT } from "@/constants.js";
import { type PackageJson } from "type-fest";

export const trpcInstaller = ({
  projectDir,
  packages,
}: InstallPackagesOpts) => {
  const pkgJsonPath = path.join(projectDir, "package.json");

  // 1. add deps to package.json
  addPackageDeps({
    deps: [
      "@tanstack/react-query",
      "@trpc/client",
      "@trpc/next",
      "@trpc/react-query",
      "@trpc/server",
      "superjson",
    ],
    isDev: false,
    pkgJsonPath,
  });

  // 2. get paths of files to copy
  const trpcDir = path.join(PKG_ROOT, "template/libs/trpc");

  // 3. copy files
};
