import fs from "fs-extra";
import sortPackageJson from "sort-package-json";
import { dependencies, type Dependency } from "../installers/dependencies.js";
import { type PackageJson } from "type-fest";

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

  deps.forEach((pkgName) => {
    const pkgVersion = dependencies[pkgName];

    if (isDev && pkgJson.devDependencies) {
      pkgJson.devDependencies[pkgName] = pkgVersion;
    } else if (pkgJson.dependencies) {
      pkgJson.dependencies[pkgName] = pkgVersion;
    }
  });
  const sortedPkgJson = sortPackageJson(pkgJson);

  fs.writeJSONSync(pkgJsonPath, sortedPkgJson, { spaces: 2 });
};
