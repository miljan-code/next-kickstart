import fs from "fs-extra";
import path from "node:path";
import { execa } from "execa";
import { type PackageJson } from "type-fest";

import { logger } from "@/utils/logger.js";
import { DEFAULT_APP_NAME, PKG_ROOT } from "@/constants.js";

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

  fs.copySync(srcDir, projectDir);

  const pkgJsonPath = path.join(projectDir, "package.json");
  if (projectName !== DEFAULT_APP_NAME) {
    const pkgJson = fs.readJSONSync(pkgJsonPath) as PackageJson;
    pkgJson.name = projectName;
    fs.writeJSONSync(pkgJsonPath, pkgJson, { spaces: 2 });
  }

  if (initGit) {
    await execa("git", ["init", "."], { cwd: projectDir });
    logger.info("\nInitialized git repository");
  }
}
