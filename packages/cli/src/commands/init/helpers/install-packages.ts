import { logger } from '../../../utils/logger.js';
import { mapPackages } from '../installers/index.js';
import { type Packages } from './prompts.js';

export interface InstallPackagesOpts {
  packages: Packages;
  projectDir: string;
}

export const installPackages = ({
  packages,
  projectDir,
}: InstallPackagesOpts) => {
  const noPkgInstalls = Object.values(packages).every(i => !i);
  if (noPkgInstalls) return;

  const mappedPackages = mapPackages(packages);

  for (const [pkgName, pkgOpts] of Object.entries(mappedPackages)) {
    if (!pkgOpts.added) return;

    logger.info(`\nAdding ${pkgName} files...`);
    pkgOpts.install({ projectDir, packages });
    logger.success(`\nSuccessfully added ${pkgName}`);
  }
};
