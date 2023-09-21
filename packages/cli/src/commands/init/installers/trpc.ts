import path from 'node:path';
import fs from 'fs-extra';
import { addPackageDeps } from '../helpers/add-package-deps.js';
import { InstallPackagesOpts } from '../helpers/install-packages.js';
import { type PackageJson } from 'type-fest';
import { PKG_ROOT } from '../../../constants.js';

export interface Dependency {
  name: string;
  version: string;
}

const dependencyList: Dependency[] = [
  {
    name: '@tanstack/react-query',
    version: '^4.33.0',
  },
  {
    name: '@trpc/client',
    version: '^10.38.0',
  },
  {
    name: '@trpc/next',
    version: '^10.38.0',
  },
  {
    name: '@trpc/react-query',
    version: '^10.38.0',
  },
  {
    name: '@trpc/server',
    version: '^10.38.0',
  },
  {
    name: 'superjson',
    version: '^1.13.1',
  },
];

export const trpcInstaller = ({
  projectDir,
  packages,
}: InstallPackagesOpts) => {
  const pkgJsonPath = path.join(projectDir, 'package.json');

  // 1. add deps to package.json
  addPackageDeps({ deps: dependencyList, isDev: false, pkgJsonPath });

  // 2. get paths of files to copy
  const trpcDir = path.join(PKG_ROOT, 'template/libs/trpc');

  // 3. copy files
};
