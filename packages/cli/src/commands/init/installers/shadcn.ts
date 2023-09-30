import path from "node:path";

import { fsShadcn } from "@/commands/common/fs-helpers.js";
import { addPackageDeps } from "@/commands/common/add-package-deps.js";
import { type InstallPackagesOpts } from "../helpers/install-packages.js";

export const shadcnInstaller = ({
  projectDir,
  packages,
}: InstallPackagesOpts) => {
  const pkgJsonPath = path.join(projectDir, "package.json");

  addPackageDeps({
    deps: [
      "class-variance-authority",
      "clsx",
      "lucide-react",
      "tailwind-merge",
      "tailwindcss-animate",
      "@radix-ui/react-slot",
    ],
    isDev: false,
    pkgJsonPath,
  });

  fsShadcn({ projectDir, packages });
};
