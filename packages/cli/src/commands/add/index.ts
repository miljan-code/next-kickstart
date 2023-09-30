import { Command } from "commander";

import { checkArgument } from "./helpers/check-argument.js";
import { getPackagesList } from "./helpers/get-package-list.js";
import { addPackage } from "./helpers/add-package.js";

export const addAction = async (pkg: string | undefined) => {
  console.log("");

  const pkgName = checkArgument(pkg);
  const packages = getPackagesList(pkgName);

  await addPackage({ packages, pkgName });

  process.exit(0);
};

export const add = new Command()
  .name("add")
  .description("add new package")
  .argument("[pkg]", "package to install inside current project")
  .action(addAction);
