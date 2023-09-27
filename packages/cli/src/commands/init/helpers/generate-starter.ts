import fs from "fs-extra";
import path from "node:path";
import { execa } from "execa";

import { logger } from "@/utils/logger.js";
import { PKG_ROOT } from "@/constants.js";

interface GenerateStarterOptions {
  projectDir: string;
  initGit: boolean;
}

export async function generateStarter({
  projectDir,
  initGit,
}: GenerateStarterOptions) {
  const srcDir = path.join(PKG_ROOT, "template/base");

  fs.copySync(srcDir, projectDir);

  if (initGit) {
    await execa("git", ["init", "."], { cwd: projectDir });
    logger.info("\nInitialized git repository");
  }
}
