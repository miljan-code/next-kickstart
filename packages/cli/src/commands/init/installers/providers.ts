import path from "node:path";
import fs from "fs-extra";

import { InstallPackagesOpts } from "../helpers/install-packages.js";
import { PKG_ROOT } from "@/constants.js";

export const providersInstaller = ({
  projectDir,
  packages,
}: InstallPackagesOpts) => {
  const providersDir = path.join(PKG_ROOT, "template/libs/providers");

  const layoutFile =
    packages.trpc && packages.nextauth
      ? "layout-with-trpc-auth.tsx"
      : packages.trpc
      ? "layout-with-trpc.tsx"
      : packages.nextauth
      ? "layout-with-auth.tsx"
      : "layout-base.tsx";
  const layoutSrc = path.join(providersDir, "app/", layoutFile);
  const layoutDest = path.join(projectDir, "app/layout.tsx");

  if (packages.nextauth) {
    const authProviderSrc = path.join(
      providersDir,
      "components/providers/auth-provider.tsx",
    );
    const authProviderDest = path.join(
      projectDir,
      "components/providers/auth-provider.tsx",
    );
    fs.copySync(authProviderSrc, authProviderDest);
  }
  if (packages.trpc) {
    const trpcProviderSrc = path.join(
      providersDir,
      "components/providers/trpc-provider.tsx",
    );
    const trpcProviderDest = path.join(
      projectDir,
      "components/providers/trpc-provider.tsx",
    );
    fs.copySync(trpcProviderSrc, trpcProviderDest);
  }

  fs.copySync(layoutSrc, layoutDest);
};
