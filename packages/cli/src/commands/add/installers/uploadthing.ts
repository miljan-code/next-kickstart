import ora from "ora";
import chalk from "chalk";

import { InstallPackagesOpts } from "@/commands/init/helpers/install-packages.js";
import { depInstaller } from "../helpers/dep-installer.js";
import { logger } from "@/utils/logger.js";
import { fsUploadthing } from "@/commands/common/fs-helpers.js";
import { updateKickstartConfig } from "@/commands/common/update-kickstart-config.js";
import { DOCS_URL } from "@/constants.js";

export const uploadthingInstaller = async ({
  packages,
  projectDir,
}: InstallPackagesOpts) => {
  const loader = ora("Installing package dependencies").start();
  await depInstaller({
    projectDir,
    deps: ["uploadthing", "@uploadthing/react"],
    isDev: false,
  });
  loader.stop();
  logger.success(`Dependencies has been installed successfully.`);

  // Copy configuration files
  fsUploadthing({ projectDir });
  logger.success("Package setup files are successfully scaffolded.\n");

  // Update next-kickstarter config
  updateKickstartConfig(projectDir, "uploadthing");

  // Next steps
  logger.info("Find out more about Uploadthing:");
  logger.info(`  ${chalk.white(DOCS_URL)}`);
};
