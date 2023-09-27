import { getUserPkgManager } from "@/utils/get-user-pkg-manager.js";
import { logger } from "@/utils/logger.js";
import { type Packages } from "./prompts.js";

interface PrintNextStepsOpts {
  packages: Packages;
  projectName: string;
  shouldInstallDeps: boolean;
}

export const printNextSteps = ({
  packages,
  projectName,
  shouldInstallDeps,
}: PrintNextStepsOpts) => {
  const pkgManager = getUserPkgManager();

  logger.info("\nNext steps:");
  projectName !== "." && logger.info(`  cd ${projectName}`);
  if (!shouldInstallDeps) logger.info(`  ${pkgManager} install`);
  if (packages.drizzle) logger.info(`  ${pkgManager} run db:generate`);
  logger.info(`  ${pkgManager} run dev`);
};
