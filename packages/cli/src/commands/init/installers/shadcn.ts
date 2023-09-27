import path from "node:path";
import fs from "fs-extra";

import { addPackageDeps } from "../helpers/add-package-deps.js";
import { InstallPackagesOpts } from "../helpers/install-packages.js";
import { PKG_ROOT } from "@/constants.js";

export const shadcnInstaller = ({
  projectDir,
  packages,
}: InstallPackagesOpts) => {
  const pkgJsonPath = path.join(projectDir, "package.json");

  // 1. add deps to package.json
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

  // 2. get paths of files to copy
  const shadcnDir = path.join(PKG_ROOT, "template/libs/shadcn");

  const configSrc = path.join(shadcnDir, "components.json");
  const configDest = path.join(projectDir, "components.json");

  const stylesSrc = path.join(shadcnDir, "styles/globals.css");
  const stylesDest = path.join(projectDir, "styles/globals.css");

  const uiSrc = path.join(shadcnDir, "components/ui/button.tsx");
  const uiDest = path.join(projectDir, "components/ui/button.tsx");

  const twConfigSrc = path.join(shadcnDir, "tailwind.config.ts");
  const twConfigDest = path.join(projectDir, "tailwind.config.ts");

  if (!packages.trpc) {
    const utilsSrc = path.join(shadcnDir, "lib/utils.ts");
    const utilsDest = path.join(shadcnDir, "lib/utils.ts");
    fs.copySync(utilsSrc, utilsDest);
  }

  // 3. copy files
  fs.copySync(configSrc, configDest);
  fs.copySync(stylesSrc, stylesDest, { overwrite: true });
  fs.copySync(uiSrc, uiDest);
  fs.copySync(twConfigSrc, twConfigDest, { overwrite: true });
};
