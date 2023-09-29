import { Command } from "commander";

import { checkArgument } from "./helpers/check-argument.js";
import { getPackagesList } from "./helpers/get-package-list.js";
import { initPkg } from "./helpers/init-pkg.js";

export const addAction = async (arg: string | undefined) => {
  // 1. check arg and get pkg name
  const pkg = checkArgument(arg);

  // 2. get pkg list
  const packages = getPackagesList(pkg);

  // 3. init pkg
  initPkg(packages, pkg);

  process.exit(0);
};

export const add = new Command()
  .name("add")
  .description("initialize new project")
  .argument("[arg]", "package to install inside current project")
  .action(addAction);
