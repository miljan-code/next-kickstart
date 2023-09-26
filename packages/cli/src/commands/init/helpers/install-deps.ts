import { execa } from "execa";

import { getUserPkgManager } from "../../../utils/get-user-pkg-manager.js";
import { logger } from "../../../utils/logger.js";

export const installDeps = async (projectDir: string) => {
  const pkgManager = getUserPkgManager();

  logger.info(`\nInstalling dependencies using ${pkgManager}`);
  await execa(`${pkgManager}`, ["install"], { cwd: projectDir });
  logger.success(`Dependencies has been installed successfully`);
};
