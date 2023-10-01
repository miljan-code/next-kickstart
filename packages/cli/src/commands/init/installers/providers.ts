import path from "node:path";
import fs from "fs-extra";

import { InstallPackagesOpts } from "../helpers/install-packages.js";
import { PKG_ROOT } from "@/constants.js";

export const providersInstaller = ({
  projectDir,
  packages,
}: InstallPackagesOpts) => {
  const providersDir = path.join(PKG_ROOT, "template/libs/providers");

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

  const providersDest = path.join(projectDir, "components/providers/index.tsx");
  if (packages.nextauth && packages.trpc) {
    const providersSrc = path.join(
      providersDir,
      "components/providers/index-auth-trpc.tsx",
    );
    fs.copySync(providersSrc, providersDest);
  } else if (packages.nextauth) {
    const providersSrc = path.join(
      providersDir,
      "components/providers/index-auth.tsx",
    );
    fs.copySync(providersSrc, providersDest);
  } else if (packages.trpc) {
    const providersSrc = path.join(
      providersDir,
      "components/providers/index-trpc.tsx",
    );
    fs.copySync(providersSrc, providersDest);
  } else return;
};
