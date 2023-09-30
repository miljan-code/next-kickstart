import path from "node:path";

import fs from "fs-extra";
import { confirm, text } from "@clack/prompts";
import chalk from "chalk";
import ora from "ora";

import { depInstaller } from "../helpers/dep-installer.js";
import {
  addScriptsToPkgJSON,
  pkgScripts,
} from "@/commands/common/update-json-scripts.js";
import { updateKickstartConfig } from "@/commands/common/update-kickstart-config.js";
import { updateEnv } from "@/commands/common/update-env.js";
import { logger } from "@/utils/logger.js";
import { PKG_ROOT } from "@/constants.js";
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
    const shouldContinue = await confirm({
      message: chalk.red.bold(
        `Drizzle's "db" folder already exist. Are you sure you want to overwrite existing files?`,
      ),
      initialValue: false,
    });

    if (shouldContinue) return;

    const newFolderName = await text({
      message: "Enter a folder name where you want to add drizzle files",
    });

    if (typeof newFolderName === "symbol") process.exit(0);
    drizzleFolderName = newFolderName.split(" ").join("-");
  }

  // Install package dependencies
  const loader = ora("Installing package dependencies").start();
  const deps: Dependency[] = ["drizzle-orm", "postgres"];
  const devDeps: Dependency[] = ["drizzle-kit", "dotenv"];
  if (packages.nextauth) deps.push("@auth/core");

  await depInstaller({ projectDir, deps, isDev: false });
  await depInstaller({ projectDir, deps: devDeps, isDev: true });

  loader.stop();
  logger.info(`Dependencies has been installed successfully\n`);

  // Copy configuration files
  const drizzleDir = path.join(PKG_ROOT, "template/libs/drizzle");

  const configSrc = path.join(drizzleDir, "drizzle.config.ts");
  const configDest = path.join(projectDir, "drizzle.config.ts");

  const clientSrc = path.join(drizzleDir, "db/index.ts");
  const clientDest = path.join(projectDir, drizzleFolderName, "index.ts");

  const schemaSrc = path.join(
    drizzleDir,
    "db/schema",
    packages.nextauth ? "index-auth.ts" : "index-base.ts",
  );
  const schemaDest = path.join(
    projectDir,
    drizzleFolderName,
    "schema/index.ts",
  );

  fs.copySync(configSrc, configDest);
  fs.copySync(clientSrc, clientDest);
  fs.copySync(schemaSrc, schemaDest);

  logger.info("Package configuration is successfully scaffolded.");

  // Add migration generation script
  const pkgJsonPath = path.join(projectDir, "package.json");
  addScriptsToPkgJSON(pkgJsonPath, pkgScripts.drizzle);

  // Update next-kickstarter config
  updateKickstartConfig(projectDir, "drizzle");

  // Add to ENV ? NOTE:
  updateEnv(projectDir, "drizzle");
};
