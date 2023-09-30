import path from "node:path";

import fs from "fs-extra";
import { text } from "@clack/prompts";
import ora from "ora";

import { depInstaller } from "../helpers/dep-installer.js";
import { writeContent } from "../helpers/write-content.js";
import {
  addScriptsToPkgJSON,
  pkgScripts,
} from "@/commands/common/update-json-scripts.js";
import { updateKickstartConfig } from "@/commands/common/update-kickstart-config.js";
import { overwritePrompt } from "@/commands/common/prompts.js";
import { getUserPkgManager } from "@/utils/get-user-pkg-manager.js";
import { logger } from "@/utils/logger.js";
import { PKG_ROOT } from "@/constants.js";
import { type InstallPackagesOpts } from "@/commands/init/helpers/install-packages.js";

export const shadcnInstaller = async ({
  packages,
  projectDir,
}: InstallPackagesOpts) => {
  // Warn about overwriting tailwind config and globals css
  await overwritePrompt(
    "This action will overwrite your tailwind.config.ts and globals.css files. Do you want to continue?",
  );

  const newGlobalsLocation = await text({
    message: "Where is globals.css file located?",
    initialValue: "styles",
  });
  if (typeof newGlobalsLocation === "symbol") process.exit(0);
  logger.info("");

  const globalsFolder = newGlobalsLocation.split(" ").join("-");

  // Install package dependencies
  const loader = ora("Installing package dependencies").start();

  await depInstaller({
    projectDir,
    deps: [
      "class-variance-authority",
      "clsx",
      "lucide-react",
      "tailwind-merge",
      "tailwindcss-animate",
      "@radix-ui/react-slot",
    ],
    isDev: false,
  });

  loader.stop();
  logger.success(`Dependencies has been installed successfully.`);

  // Copy configuration files
  const shadcnDir = path.join(PKG_ROOT, "template/libs/shadcn");

  const configSrc = path.join(shadcnDir, "components.json");
  const configDest = path.join(projectDir, "components.json");

  const stylesSrc = path.join(shadcnDir, "styles/globals.css");
  const stylesDest = path.join(projectDir, globalsFolder, "globals.css");

  const uiSrc = path.join(shadcnDir, "components/ui/button.tsx");
  const uiDest = path.join(projectDir, "components/ui/button.tsx");
  const uiPathExists = fs.pathExistsSync(uiDest);
  if (!uiPathExists) fs.copySync(uiSrc, uiDest);

  const twConfigSrc = path.join(shadcnDir, "tailwind.config.ts");
  const twConfigDest = path.join(projectDir, "tailwind.config.ts");

  const utilsSrc = path.join(shadcnDir, "lib/utils.ts");
  const utilsDest = path.join(projectDir, "lib/utils.ts");
  const utilsExists = fs.pathExistsSync(utilsDest);
  if (utilsExists) {
    writeContent(utilsSrc, utilsDest);
  } else {
    fs.copySync(utilsSrc, utilsDest);
  }

  fs.copySync(configSrc, configDest);
  fs.copySync(stylesSrc, stylesDest, { overwrite: true });
  fs.copySync(twConfigSrc, twConfigDest, { overwrite: true });

  // Add component script
  const pkgJsonPath = path.join(projectDir, "package.json");
  addScriptsToPkgJSON(pkgJsonPath, pkgScripts().shadcn);

  // Update next-kickstarter config
  updateKickstartConfig(projectDir, "shadcn");

  // Next steps
  const pkgManager = getUserPkgManager();
  logger.info("\nNext step:");
  logger.info(`  - ${pkgManager} add:ui <component>`);
};
