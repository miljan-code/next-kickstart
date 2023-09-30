import path from "node:path";
import fs from "fs-extra";

import { PKG_ROOT } from "@/constants.js";
import { type InstallPackagesOpts } from "@/commands/init/helpers/install-packages.js";
import { type AvailablePackage } from "../add/helpers/check-argument.js";
import { type Packages } from "./prompts.js";

export const generateKickstartConfig = ({
  packages,
  projectDir,
}: InstallPackagesOpts) => {
  const configJsonSrc = path.join(
    PKG_ROOT,
    "template/libs/next-kickstart.json",
  );
  const configJsonDest = path.join(projectDir, "next-kickstart.json");

  const configJson = fs.readJSONSync(configJsonSrc) as Packages;
  for (const [key, value] of Object.entries(packages)) {
    configJson[key as keyof typeof configJson] = value;
  }
  fs.writeJSONSync(configJsonDest, configJson, { spaces: 2 });
};

export const updateKickstartConfig = (
  projectDir: string,
  pkg: AvailablePackage,
) => {
  const configJsonPath = path.join(projectDir, "next-kickstart.json");

  const configJson = fs.readJSONSync(configJsonPath) as Packages;
  configJson[pkg] = true;
  fs.writeJSONSync(configJsonPath, configJson, { spaces: 2 });
};
