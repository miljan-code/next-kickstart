import { Command } from "commander";
import { z } from "zod";
import { generateStarter } from "./helpers/generate-starter.js";
import { parsePath } from "./helpers/parse-path.js";
import { getUserPkgManager } from "../../utils/get-user-pkg-manager.js";
import { intro, outro } from "@clack/prompts";
import { DEFAULT_APP_NAME } from "../../constants.js";
import { checkPackages, checkInstalls } from "./helpers/prompts.js";
import { installPackages } from "./helpers/install-packages.js";
import { createEnv } from "./helpers/create-env.js";
import { logger } from "../../utils/logger.js";
import { installDeps } from "./helpers/install-deps.js";
import { generateKickstartConfig } from "./helpers/generate-kickstart-config.js";

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

export const init = new Command()
  .name("init")
  .description("initialize new project")
  .argument("[dir]", "directory to init a project", ".")
  .option("-y, --yes", "skip confirmation prompt", false)
  .action(async (dir, opts) => {
    const { yes: fullInstall } = initOptionsSchema.parse(opts);
    const initDir = initDirSchema.parse(dir);

    const pkgManager = getUserPkgManager();
    const projectDir = parsePath(initDir);
    const projectName = initDir === "." ? DEFAULT_APP_NAME : initDir;

    intro("next-kickstart");

    const packages = fullInstall ? ALL_PACKAGES : await checkPackages();
    const installs = await checkInstalls();

    const initGit = fullInstall ? true : installs.git;
    const shouldInstallDeps = fullInstall ? true : installs.deps;

    // Generate starter next app
    await generateStarter({ pkgManager, projectDir, projectName, initGit });

    // Add packages
    installPackages({ projectDir, packages });

    // Create ENV
    createEnv({ projectDir, packages });

    // Generate config JSON file
    generateKickstartConfig({ projectDir, packages });

    // Install deps
    if (shouldInstallDeps) await installDeps(projectDir);

    outro("successfully initialized");
    logger.success("\nHappy hacking!\n");
    process.exit(0);
  });
