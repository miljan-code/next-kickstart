import { mapPackages } from "../installers/index.js";
import { type Packages } from "@/commands/common/prompts.js";
import { type AvailablePackage } from "./check-argument.js";

interface AddPackageOpts {
  packages: Packages;
  pkgName: AvailablePackage;
}

export const addPackage = async ({ packages, pkgName }: AddPackageOpts) => {
  const mappedPkgs = mapPackages();
  const projectDir = process.cwd();

  await mappedPkgs[pkgName]({ packages, projectDir });
};
