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
    name: 'drizzle-orm',
    version: '^0.28.5',
  },
];
const devDependencyList: Dependency[] = [
  {
    name: 'drizzle-kit',
    version: '^0.19.13',
  },
  {
    name: 'pg',
    version: '^8.11.3',
  },
  {
    name: 'dotenv',
    version: '^16.3.1',
  },
  {
    name: '@types/pg',
    version: '^8.10.2',
  },
];

export const drizzleInstaller = ({
  projectDir,
  packages,
}: InstallPackagesOpts) => {
  const pkgJsonPath = path.join(projectDir, 'package.json');

  // 1. add deps to package.json
  addPackageDeps({ deps: dependencyList, isDev: false, pkgJsonPath });
  addPackageDeps({ deps: devDependencyList, isDev: true, pkgJsonPath });

  // 2. add generate script to package.json
  const pkgJson = fs.readJSONSync(pkgJsonPath) as PackageJson;
  pkgJson.scripts = {
    ...pkgJson.scripts,
    'db:generate': 'drizzle-kit generate:pg --config=drizzle.config.ts',
  };
  fs.writeJSONSync(pkgJsonPath, pkgJson, { spaces: 2 });

  // 4. get paths of files to copy
  const drizzleDir = path.join(PKG_ROOT, 'template/libs/drizzle');

  const configSrc = path.join(drizzleDir, 'drizzle.config.ts');
  const configDest = path.join(projectDir, 'drizzle.config.ts');

  const clientSrc = path.join(drizzleDir, 'db/index.ts');
  const clientDest = path.join(projectDir, 'db/index.ts');

  const schemaSrc = path.join(
    drizzleDir,
    'db/schema',
    packages.nextauth ? 'index-auth.ts' : 'index-base.ts'
  );
  const schemaDest = path.join(projectDir, 'db/schema/index.ts');

  // 5. copy files
  fs.copySync(configSrc, configDest);
  fs.mkdirSync(path.join(projectDir, 'db/schema'), { recursive: true });
  fs.copySync(clientSrc, clientDest);
  fs.copySync(schemaSrc, schemaDest);
};
