import ora from "ora";
import chalk from "chalk";

import { mapPackages } from "../installers/index.js";
import { addProviders } from "@/commands/add/helpers/add-providers.js";
import { type Packages } from "@/commands/common/prompts.js";
import { type AvailablePackage } from "@/commands/add/helpers/check-argument.js";

export interface InstallPackagesOpts {
  packages: Packages;
  projectDir: string;
}

export const installPackages = ({
  packages,
  projectDir,
}: InstallPackagesOpts) => {
  const noPkgInstalls = Object.values(packages).every((i) => !i);
  if (noPkgInstalls) return;

  const mappedPackages = mapPackages(packages);

  console.log("");
  for (const [pkgName, pkgOpts] of Object.entries(mappedPackages)) {
    if (!pkgOpts.added) continue;
    pkgOpts.install({ projectDir, packages });
    addProviders({ pkgName: pkgName as AvailablePackage, projectDir });
    const loader = ora(`Boilerplating ${pkgName}`).start();
    loader.succeed(
      chalk.green(`Successfully added ${chalk.green.bold(pkgName)}`),
    );
  }
  console.log("");
};
