import fs from "fs-extra";
import path from "node:path";
import { execa } from "execa";
import ora from "ora";

import { logger } from "../../../utils/logger.js";
import { PKG_ROOT } from "../../../constants.js";

interface GenerateStarterOptions {
  projectDir: string;
  projectName: string;
  initGit: boolean;
}

export async function generateStarter({
  projectDir,
  projectName,
  initGit,
}: GenerateStarterOptions) {
  const srcDir = path.join(PKG_ROOT, "template/base");

  const loader = ora(`\nInitializing project in: ${projectDir}...`).start();

  fs.copySync(srcDir, projectDir);

  if (initGit) {
    logger.info("\nInitializing git repository...");
    await execa("git", ["init", "."], { cwd: projectDir });
  }

  loader.succeed();
  logger.success(`\n${projectName} initialized successfuly`);
}
