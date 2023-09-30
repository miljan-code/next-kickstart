import { execa } from "execa";

import { dependencies } from "@/commands/common/dependencies.js";
import { getUserPkgManager } from "@/utils/get-user-pkg-manager.js";
import { type Dependency } from "@/commands/common/dependencies.js";

interface DepInstallerOpts {
  projectDir: string;
  deps: Dependency[];
  isDev: boolean;
}

export const depInstaller = async ({
  projectDir,
  deps,
  isDev,
}: DepInstallerOpts) => {
  const pkgManager = getUserPkgManager();

  for (const dep of deps) {
    const pkg = `${dep}@${dependencies[dep]}`;
    const isDevDep = isDev ? "-D" : "";

    if (pkgManager === "yarn" || pkgManager === "pnpm") {
      await execa(pkgManager, ["add", pkg, isDevDep], { cwd: projectDir });
    } else {
      await execa(pkgManager, ["install", pkg, isDevDep], { cwd: projectDir });
    }
  }
};
