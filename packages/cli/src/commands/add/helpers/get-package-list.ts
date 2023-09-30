import path from "node:path";

import fs from "fs-extra";
import chalk from "chalk";

import { logger } from "@/utils/logger.js";
import { getUserPkgExec } from "@/utils/get-user-pkg-manager.js";
import { type AvailablePackage } from "./check-argument.js";
import { type Packages } from "@/commands/common/prompts.js";

export const getPackagesList = (pkg: AvailablePackage) => {
  const pkgExec = getUserPkgExec();

  const configSrc = path.join(process.cwd(), "next-kickstart.json");
  let packages: Packages;
  try {
    packages = fs.readJSONSync(configSrc) as Packages;
  } catch (e) {
    logger.error(`Couldn't find next-kickstart.json file.`);
    logger.error("Make sure your app is bootstrapped with next-kickstart CLI.");
    logger.info(`\nUse command to kickstart new app`);
    logger.info(`  ${pkgExec} next-kickstart <folder>`);
    process.exit(0);
  }

  if (packages[pkg]) {
    logger.warn(
      `Your current project already has ${chalk.green.bold(
        pkg,
      )} package installed.`,
    );
    process.exit(0);
  }

  return packages;
};
