import { execa } from "execa";
import ora from "ora";

import { getUserPkgManager } from "@/utils/get-user-pkg-manager.js";
import { logger } from "@/utils/logger.js";

export const installDeps = async (projectDir: string) => {
  const pkgManager = getUserPkgManager();

  const loader = ora(`Installing dependencies using ${pkgManager}`).start();
  await execa(`${pkgManager}`, ["install"], { cwd: projectDir });
  loader.stop();
  logger.info(`Dependencies has been installed successfully`);
};
