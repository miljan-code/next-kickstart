import fs from "fs-extra";
import path from "node:path";
import { type PackageManager } from "../../../utils/get-user-pkg-manager.js";
import { PKG_ROOT } from "../../../constants.js";
import { logger } from "../../../utils/logger.js";
import ora from "ora";
import { execa } from "execa";

interface GenerateStarterOptions {
  projectDir: string;
  projectName: string;
  pkgManager: PackageManager;
  initGit: boolean;
}

export async function generateStarter({
  pkgManager,
  projectDir,
  projectName,
  initGit,
}: GenerateStarterOptions) {
  const srcDir = path.join(PKG_ROOT, "template/base");

  logger.info(`\nUsing: ${pkgManager}\n`);

  const loader = ora(`\nInitializing project in: ${projectDir}...`).start();

  fs.copySync(srcDir, projectDir);

  logger.info("\nInitializing git repository...");

  if (initGit) {
    await execa("git", ["init", "."], { cwd: projectDir });
  }

  loader.succeed();
  logger.success(`\n${projectName} initialized successfuly`);
}
