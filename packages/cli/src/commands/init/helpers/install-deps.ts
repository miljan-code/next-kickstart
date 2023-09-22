import { getUserPkgManager } from "../../../utils/get-user-pkg-manager.js";
import { logger } from "../../../utils/logger.js";
import { execa } from "execa";

export const installDeps = async (projectDir: string) => {
  const pkgManager = getUserPkgManager();

  logger.info(`Installing dependencies using ${pkgManager}`);

  await execa(`${pkgManager}`, ["install"], { cwd: projectDir });

  logger.success(`Dependencies has been installed successfully`);
};
