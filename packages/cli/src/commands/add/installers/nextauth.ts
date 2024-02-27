import path from "node:path";

import fs from "fs-extra";
import ora from "ora";
import chalk from "chalk";
import { text } from "@clack/prompts";

import { fsNextAuth } from "@/commands/common/fs-helpers.js";
import { depInstaller } from "../helpers/dep-installer.js";
import { updateKickstartConfig } from "@/commands/common/update-kickstart-config.js";
import { confirmPrompt, overwritePrompt } from "@/commands/common/prompts.js";
import { logger } from "@/utils/logger.js";
import { DOCS_URL } from "@/constants.js";
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
  let withDrizzle = false;
  if (packages.drizzle) {
    withDrizzle = await confirmPrompt({
      message: `Do you want to use Drizzle with NextAuth?`,
    });
  }
  let drizzleFolderName = "db";
  if (withDrizzle) {
    const prompt = await text({
      message: "Where is located Drizzle schema folder?",
      initialValue: "db",
    });
    if (typeof prompt === "symbol") process.exit(0);
    drizzleFolderName = prompt;
  }
  logger.info("");

  // Install package dependencies
  const deps: Dependency[] = ["next-auth"];
  if (withDrizzle) deps.push("@auth/drizzle-adapter", "@auth/core");

  const loader = ora("Installing package dependencies").start();
  await depInstaller({ projectDir, deps, isDev: false });
  loader.stop();
  logger.success(`Dependencies has been installed successfully.`);

  // Copy configuration files
  fsNextAuth({ projectDir, withDrizzle, cmd: "add" });
  logger.success("Package setup files are successfully scaffolded.");

  // Update next-kickstarter config
  updateKickstartConfig(projectDir, "nextauth");

  // Next steps
  logger.info("\nNext steps:");
  logger.info(`  - Add Next-Auth environment variables to .env file`);
  logger.info(`    Find more here: ${chalk.white(DOCS_URL)}`);
};
