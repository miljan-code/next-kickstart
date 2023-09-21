import fs from "fs-extra";
import sortPackageJson from "sort-package-json";
import { type PackageJson } from "type-fest";
import { type Dependency } from "../installers/drizzle.js";

interface AddPackageDepsOpts {
  deps: Dependency[];
  isDev: boolean;
  pkgJsonPath: string;
}

export const addPackageDeps = ({
  deps,
  isDev,
  pkgJsonPath,
}: AddPackageDepsOpts) => {
  const pkgJson = fs.readJSONSync(pkgJsonPath) as PackageJson;

  deps.forEach((pkg) => {
    if (isDev && pkgJson.devDependencies) {
      pkgJson.devDependencies[pkg.name] = pkg.version;
    } else if (pkgJson.dependencies) {
      pkgJson.dependencies[pkg.name] = pkg.version;
    }
  });
  const sortedPkgJson = sortPackageJson(pkgJson);

  fs.writeJSONSync(pkgJsonPath, sortedPkgJson, { spaces: 2 });
};
