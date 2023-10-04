import { Command } from "commander";
import { z } from "zod";

import {
  checkPackages,
  checkInstalls,
  getProjectName,
} from "../common/prompts.js";
import { generateKickstartConfig } from "../common/update-kickstart-config.js";
import { generateStarter } from "./helpers/generate-starter.js";
import { parsePath } from "./helpers/parse-path.js";
import { installPackages } from "./helpers/install-packages.js";
import { createEnv } from "../common/update-env.js";
import { installDeps } from "./helpers/install-deps.js";
import { logger } from "@/utils/logger.js";
import { renderTitle } from "@/utils/render-title.js";
import { getUserPkgManager } from "@/utils/get-user-pkg-manager.js";
import { mapPackageList } from "./helpers/map-package-list.js";

const initOptionsSchema = z.object({
  yes: z.boolean(),
  drizzle: z.boolean(),
  nextauth: z.boolean(),
  trpc: z.boolean(),
  shadcn: z.boolean(),
});

export type Options = z.infer<typeof initOptionsSchema>;

const initDirSchema = z.string().min(1);

export const initAction = async (dir: string | undefined, opts: Options) => {
  renderTitle();

  const { projectName, dirName } = await getProjectName(dir);
  initOptionsSchema.parse(opts);
  const initDir = initDirSchema.parse(dirName);
  const projectDir = parsePath(initDir);

  const packages = await mapPackageList(opts);
  const installs = await checkInstalls();

  const initGit = installs.git;
  const shouldInstallDeps = installs.deps;

  await generateStarter({ projectDir, projectName, initGit });
  installPackages({ projectDir, packages });
  createEnv({ projectDir, packages });
  generateKickstartConfig({ projectDir, packages });
  if (shouldInstallDeps) await installDeps(projectDir);

  const pkgManager = getUserPkgManager();
  logger.info("Project has been successfully initialized");
  logger.info("\nNext steps:");
  dirName !== "." && logger.info(`  cd ${projectName}`);
  if (!shouldInstallDeps) logger.info(`  ${pkgManager} install`);
  if (packages.drizzle) logger.info(`  ${pkgManager} run db:generate`);
  logger.info(`  ${pkgManager} run dev`);
  logger.success("\nHappy hacking!\n");
  process.exit(0);
};

export const init = new Command()
  .name("init")
  .description("initialize new project")
  .argument("[dir]", "directory to init a project")
  .option("-y, --yes", "skip confirmation prompt", false)
  .option("--drizzle", "install with drizzle", false)
  .option("--shadcn", "install with shadcn", false)
  .option("--trpc", "install with trpc", false)
  .option("--nextauth", "install with nextauth", false)
  .action(initAction);
