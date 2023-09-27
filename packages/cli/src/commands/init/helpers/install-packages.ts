import ora from "ora";
import chalk from "chalk";

import { mapPackages } from "../installers/index.js";
import { providersInstaller } from "../installers/providers.js";
import { type Packages } from "./prompts.js";

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
    if (!pkgOpts.added) return;
    pkgOpts.install({ projectDir, packages });
    const loader = ora(`Boilerplating ${pkgName}`).start();
    loader.succeed(
      chalk.green(`Successfully added ${chalk.green.bold(pkgName)}`),
    );
  }
  console.log("");

  providersInstaller({ projectDir, packages });
};
