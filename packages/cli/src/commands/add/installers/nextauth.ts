import path from "node:path";

import fs from "fs-extra";
import ora from "ora";
import chalk from "chalk";

import { fsNextAuth } from "@/commands/common/fs-helpers.js";
import { depInstaller } from "../helpers/dep-installer.js";
import { updateKickstartConfig } from "@/commands/common/update-kickstart-config.js";
import { overwritePrompt } from "@/commands/common/prompts.js";
import { logger } from "@/utils/logger.js";
import { type InstallPackagesOpts } from "@/commands/init/helpers/install-packages.js";
import { type Dependency } from "@/commands/common/dependencies.js";

export const nextauthInstaller = async ({
  packages,
  projectDir,
}: InstallPackagesOpts) => {
  // Warn about overwrite
  const authLibDest = path.join(projectDir, "lib/auth.ts");
  const authFileExists = fs.pathExistsSync(authLibDest);
  if (authFileExists) {
    await overwritePrompt(
      "This action will overwrite your lib/auth.ts file. Do you want to continue?",
    );
  }
  logger.info("");

  // Install package dependencies
  const deps: Dependency[] = ["next-auth"];
  if (packages.drizzle) deps.push("@auth/drizzle-adapter");

  const loader = ora("Installing package dependencies").start();
  await depInstaller({ projectDir, deps, isDev: false });
  loader.stop();
  logger.success(`Dependencies has been installed successfully.`);

  // Copy configuration files
  fsNextAuth({ projectDir, packages });
  logger.success("Package setup files are successfully scaffolded.");

  // Update next-kickstarter config
  updateKickstartConfig(projectDir, "nextauth");

  // Next steps
  logger.info("\nNext steps:");
  logger.info(`  - Add Next-Auth environment variables to .env file`);
  logger.info(
    `    Find more here: ${chalk.white(
      "https://docs.kickstart.miljan.xyz",
    )} (ctrl+click)`,
  );
};
