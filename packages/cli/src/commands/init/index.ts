import { Command } from "commander";
import { z } from "zod";
import { generateStarter } from "./helpers/generate-starter.js";
import { parsePath } from "./helpers/parse-path.js";
import { getUserPkgManager } from "../../utils/get-user-pkg-manager.js";
import { intro } from "@clack/prompts";
import { DEFAULT_APP_NAME } from "../../constants.js";
import { checkPackages, checkInstalls } from "./helpers/prompts.js";
import { installPackages } from "./helpers/install-packages.js";

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
    const options = initOptionsSchema.parse(opts);
    const initDir = initDirSchema.parse(dir);

    const pkgManager = getUserPkgManager();
    const projectDir = parsePath(initDir);
    const projectName = initDir === "." ? DEFAULT_APP_NAME : initDir;

    intro("next-kickstart");

    const packages = await checkPackages();
    const installs = await checkInstalls();

    const initGit = installs.git;
    const installDeps = installs.deps;

    // Generate starter next app
    await generateStarter({ pkgManager, projectDir, projectName, initGit });

    // Add packages
    installPackages({ projectDir, packages });

    // Create ENV

    // Copy providers && edit layout

    // Install deps

    process.exit(0);
  });
