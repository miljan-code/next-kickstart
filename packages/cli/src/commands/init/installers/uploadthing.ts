import path from "node:path";

import { fsUploadthing } from "@/commands/common/fs-helpers.js";
import { addPackageDeps } from "@/commands/common/add-package-deps.js";
import { type Dependency } from "@/commands/common/dependencies.js";
import { type InstallPackagesOpts } from "../helpers/install-packages.js";

export const uploadthingInstaller = ({
  projectDir,
  packages,
}: InstallPackagesOpts) => {
  const pkgJsonPath = path.join(projectDir, "package.json");
  const deps: Dependency[] = ["uploadthing", "@uploadthing/react"];
  addPackageDeps({ deps, isDev: false, pkgJsonPath });
  fsUploadthing({ projectDir });
};
