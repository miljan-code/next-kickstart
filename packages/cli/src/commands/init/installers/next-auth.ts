import path from 'node:path';
import fs from 'fs-extra';
import { addPackageDeps } from '../helpers/add-package-deps.js';
import { InstallPackagesOpts } from '../helpers/install-packages.js';
import { PKG_ROOT } from '../../../constants.js';

export interface Dependency {
  name: string;
  version: string;
}

const dependencyList: Dependency[] = [
  {
    name: '@auth/core',
    version: '^0.12.0',
  },
  {
    name: '@auth/drizzle-adapter',
    version: '^0.3.2',
  },
  {
    name: 'next-auth',
    version: '^4.23.1',
  },
];

export const nextAuthInstaller = ({
  projectDir,
  packages,
}: InstallPackagesOpts) => {
  const pkgJsonPath = path.join(projectDir, 'package.json');

  // 1. add deps to package.json
  addPackageDeps({ deps: dependencyList, isDev: false, pkgJsonPath });

  // 2. get paths of files to copy
  const nextAuthDir = path.join(PKG_ROOT, 'template/libs/next-auth');

  const authTypesSrc = path.join(nextAuthDir, 'types/next-auth.d.ts');
  const authTypesDest = path.join(projectDir, 'types/next-auth.d.ts');

  const authLibSrc = path.join(nextAuthDir, 'lib/auth.ts');
  const authLibDest = path.join(projectDir, 'lib/auth.ts');

  const apiHandlerSrc = path.join(
    nextAuthDir,
    'app/api/auth/[...nextauth]/route.ts'
  );
  const apiHandlerDest = path.join(
    projectDir,
    'app/api/auth/[...nextauth]/route.ts'
  );

  // 3. copy files
  fs.copyFileSync(authTypesSrc, authTypesDest);
  fs.mkdirSync(path.dirname(authLibDest), { recursive: true });
  fs.copyFileSync(authLibSrc, authLibDest);
  fs.mkdirSync(path.dirname(apiHandlerDest), { recursive: true });
  fs.copyFileSync(apiHandlerSrc, apiHandlerDest);
};
