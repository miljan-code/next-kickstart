import path from "node:path";
import fs from "fs-extra";
import { InstallPackagesOpts } from "./install-packages.js";
import { PKG_ROOT } from "../../../constants.js";

export const generateKickstartConfig = ({
  packages,
  projectDir,
}: InstallPackagesOpts) => {
  const configJsonSrc = path.join(
    PKG_ROOT,
    "template/libs/next-kickstart.json",
  );
  const configJsonDest = path.join(projectDir, "next-kickstart.json");

  const configJson = fs.readJSONSync(configJsonSrc) as typeof packages;
  for (const [key, value] of Object.entries(packages)) {
    configJson[key as keyof typeof configJson] = value;
  }
  fs.writeJSONSync(configJsonDest, configJson, { spaces: 2 });
};
