import path from "node:path";

import { fsTRPC } from "@/commands/common/fs-helpers.js";
import { addPackageDeps } from "@/commands/common/add-package-deps.js";
import { type InstallPackagesOpts } from "../helpers/install-packages.js";

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

  // 2. copy files
  fsTRPC({ projectDir, packages });
};
