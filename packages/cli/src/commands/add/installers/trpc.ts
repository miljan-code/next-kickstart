import ora from "ora";
import chalk from "chalk";

import { fsTRPC } from "@/commands/common/fs-helpers.js";
import { depInstaller } from "../helpers/dep-installer.js";
import { updateKickstartConfig } from "@/commands/common/update-kickstart-config.js";
import { logger } from "@/utils/logger.js";
import { type InstallPackagesOpts } from "@/commands/init/helpers/install-packages.js";

export const trpcInstaller = async ({
  packages,
  projectDir,
}: InstallPackagesOpts) => {
  // Install package dependencies
  const loader = ora("Installing package dependencies").start();
  await depInstaller({
    projectDir,
    deps: [
      "@tanstack/react-query",
      "@trpc/client",
      "@trpc/next",
      "@trpc/react-query",
      "@trpc/server",
      "superjson",
    ],
    isDev: false,
  });
  loader.stop();
  logger.success(`Dependencies has been installed successfully.`);

  // Copy configuration files
  fsTRPC({ projectDir, packages });
  logger.success("Package setup files are successfully scaffolded.");

  // Update next-kickstarter config
  updateKickstartConfig(projectDir, "trpc");

  // Next steps
  logger.info("Find out more about tRPC:");
  logger.info(`  ${chalk.white("https://docs.kickstart.miljan.xyz")}`);
};
