#!/usr/bin/env node

import { Command } from "commander";
import { getPackageInfo } from "./utils/get-package-info.js";
import { init, initAction } from "./commands/init/index.js";
import { add } from "./commands/add/index.js";

function main() {
  const packageInfo = getPackageInfo();

  const program = new Command()
    .name("next-kickstart")
    .description("create next app with drizzle, trpc, nextauth and tailwind")
    .version(
      packageInfo.version || "0.1.0",
      "-v, --version",
      "display the version number",
    )
    .argument("[dir]", "directory to init a project")
    .option("-y, --yes", "skip confirmation prompt", false)
    .action(initAction);

  program.addCommand(init);
  program.addCommand(add);

  program.parse();
}

main();
