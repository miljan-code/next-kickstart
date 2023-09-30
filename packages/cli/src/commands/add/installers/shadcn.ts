import path from "node:path";

import ora from "ora";
import { text } from "@clack/prompts";

import { depInstaller } from "../helpers/dep-installer.js";
import { fsShadcn } from "@/commands/common/fs-helpers.js";
import {
  addScriptsToPkgJSON,
  pkgScripts,
} from "@/commands/common/update-json-scripts.js";
import { updateKickstartConfig } from "@/commands/common/update-kickstart-config.js";
import { overwritePrompt } from "@/commands/common/prompts.js";
import { getUserPkgManager } from "@/utils/get-user-pkg-manager.js";
import { logger } from "@/utils/logger.js";
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
  fsShadcn({ projectDir, globalsFolder, cmd: "add" });
  logger.success("Package setup files are successfully scaffolded.");

  // Add component script
  const pkgJsonPath = path.join(projectDir, "package.json");
  addScriptsToPkgJSON(pkgJsonPath, pkgScripts().shadcn);

  // Update next-kickstarter config
  updateKickstartConfig(projectDir, "shadcn");

  // Next steps
  const pkgManager = getUserPkgManager();
  logger.info("\nNext step:");
  logger.info(`  - ${pkgManager} run add:ui <component>`);
};
