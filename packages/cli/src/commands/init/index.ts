import { Command } from "commander";
import { z } from "zod";

import { generateStarter } from "./helpers/generate-starter.js";
import { parsePath } from "./helpers/parse-path.js";
import {
  checkPackages,
  checkInstalls,
  getProjectName,
} from "./helpers/prompts.js";
import { installPackages } from "./helpers/install-packages.js";
import { createEnv } from "./helpers/create-env.js";
import { installDeps } from "./helpers/install-deps.js";
import { generateKickstartConfig } from "./helpers/generate-kickstart-config.js";
import { logger } from "@/utils/logger.js";
import { renderTitle } from "@/utils/render-title.js";
import { printNextSteps } from "./helpers/print-next-steps.js";

const ALL_PACKAGES = {
  drizzle: true,
  nextauth: true,
  trpc: true,
  shadcn: true,
};

const initOptionsSchema = z.object({
  yes: z.boolean(),
});

const initDirSchema = z.string().min(1);

export const initAction = async (dir: string | undefined, opts: string) => {
  renderTitle();

  const { projectName, dirName } = await getProjectName(dir);
  const { yes: fullInstall } = initOptionsSchema.parse(opts);
  const initDir = initDirSchema.parse(dirName);
  const projectDir = parsePath(initDir);

  const packages = fullInstall ? ALL_PACKAGES : await checkPackages();
  const installs = await checkInstalls();

  const initGit = installs.git;
  const shouldInstallDeps = installs.deps;

  // Generate starter next app
  await generateStarter({ projectDir, projectName, initGit });

  // Add packages
  installPackages({ projectDir, packages });

  // Create ENV files
  createEnv({ projectDir, packages });

  // Generate config JSON file
  generateKickstartConfig({ projectDir, packages });

  // Install deps
  if (shouldInstallDeps) await installDeps(projectDir);

  logger.info("Project has been successfully initialized");
  printNextSteps({ packages, projectName, shouldInstallDeps });
  logger.success("\nHappy hacking!\n");
  process.exit(0);
};

export const init = new Command()
  .name("init")
  .description("initialize new project")
  .argument("[dir]", "directory to init a project")
  .option("-y, --yes", "skip confirmation prompt", false)
  .action(initAction);
