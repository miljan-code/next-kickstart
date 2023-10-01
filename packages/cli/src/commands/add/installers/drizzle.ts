import path from "node:path";

import fs from "fs-extra";
import { confirm, text } from "@clack/prompts";
import chalk from "chalk";
import ora from "ora";

import { depInstaller } from "../helpers/dep-installer.js";
import { fsDrizzle } from "@/commands/common/fs-helpers.js";
import {
  addScriptsToPkgJSON,
  pkgScripts,
} from "@/commands/common/update-json-scripts.js";
import { updateKickstartConfig } from "@/commands/common/update-kickstart-config.js";
import { logger } from "@/utils/logger.js";
import { type InstallPackagesOpts } from "@/commands/init/helpers/install-packages.js";
import { type Dependency } from "@/commands/common/dependencies.js";

export const drizzleInstaller = async ({
  packages,
  projectDir,
}: InstallPackagesOpts) => {
  // Check if "db" folder already exist
  let drizzleFolderName = "db";
  const drizzleDest = path.join(projectDir, drizzleFolderName);
  const pathExist = fs.pathExistsSync(drizzleDest);
  if (pathExist) {
    const shouldOverwrite = await confirm({
      message: chalk.red.bold(
        `Drizzle's "db" folder already exist. Are you sure you want to overwrite existing files?`,
      ),
      initialValue: false,
    });

    if (!shouldOverwrite) {
      const newFolderName = await text({
        message: "Enter a folder name where you want to add drizzle files",
      });

      if (typeof newFolderName === "symbol") process.exit(0);
      drizzleFolderName = newFolderName.split(" ").join("-");
    }
  }
  let withAuth = false;
  if (packages.nextauth) {
    const prompt = await confirm({
      message: `Do you want to use NextAuth with Drizzle?\n${chalk.yellow(
        `     This action will overwrite your current NextAuth configuration`,
      )}`,
    });
    if (typeof prompt === "symbol") process.exit(0);
    withAuth = prompt;
  }
  logger.info("");

  // Install package dependencies
  const loader = ora("Installing package dependencies").start();
  const deps: Dependency[] = ["drizzle-orm", "postgres"];
  const devDeps: Dependency[] = ["drizzle-kit", "dotenv"];
  if (withAuth) deps.push("@auth/core", "@auth/drizzle-adapter");

  await depInstaller({ projectDir, deps, isDev: false });
  await depInstaller({ projectDir, deps: devDeps, isDev: true });

  loader.stop();
  logger.success(`Dependencies has been installed successfully.`);

  // Copy configuration files
  fsDrizzle({ projectDir, drizzleFolderName, withAuth });
  logger.success("Package setup files are successfully scaffolded.");

  // Add migration generation script
  const pkgJsonPath = path.join(projectDir, "package.json");
  addScriptsToPkgJSON(pkgJsonPath, pkgScripts().drizzle);

  // Update next-kickstarter config
  updateKickstartConfig(projectDir, "drizzle");

  // Next steps
  logger.info("\nNext steps:");
  logger.info("  1. Add supabase connection URL to .env");
  logger.info("  2. Pass that env variable to env.mjs");
};
