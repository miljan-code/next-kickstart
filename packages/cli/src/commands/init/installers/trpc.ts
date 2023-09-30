import path from "node:path";
import fs from "fs-extra";

import { addPackageDeps } from "@/commands/common/add-package-deps.js";
import { type InstallPackagesOpts } from "../helpers/install-packages.js";
import { PKG_ROOT } from "@/constants.js";

export const trpcInstaller = ({
  projectDir,
  packages,
}: InstallPackagesOpts) => {
  const pkgJsonPath = path.join(projectDir, "package.json");

  // 1. add deps to package.json
  addPackageDeps({
    deps: [
      "@tanstack/react-query",
      "@trpc/client",
      "@trpc/next",
      "@trpc/react-query",
      "@trpc/server",
      "superjson",
    ],
    isDev: false,
    pkgJsonPath,
  });

  // 2. get paths of files to copy
  const trpcDir = path.join(PKG_ROOT, "template/libs/trpc");

  const apiHandlerSrc = path.join(trpcDir, "app/api/trpc/[trpc]/route.ts");
  const apiHandlerDest = path.join(projectDir, "app/api/trpc/[trpc]/route.ts");

  const libUtilsSrc = path.join(
    trpcDir,
    packages.shadcn ? "lib/utils-with-cn.ts" : "lib/utils-base.ts",
  );
  const libUtilsDest = path.join(projectDir, "lib/utils.ts");

  const trpcClientSrc = path.join(trpcDir, "lib/trpc/client.ts");
  const trpcClientDest = path.join(projectDir, "lib/trpc/client.ts");

  const trpcServerFile =
    packages.drizzle && packages.nextauth
      ? "server-with-db-auth.ts"
      : packages.drizzle
      ? "server-with-db.ts"
      : packages.nextauth
      ? "server-with-auth.ts"
      : "server-base.ts";
  const trpcServerSrc = path.join(trpcDir, "lib/trpc/", trpcServerFile);
  const trpcServerDest = path.join(projectDir, "lib/trpc/server.ts");

  const trpcInitFile =
    packages.drizzle && packages.nextauth
      ? "trpc-with-db-auth.ts"
      : packages.drizzle
      ? "trpc-with-db.ts"
      : packages.nextauth
      ? "trpc-with-auth.ts"
      : "trpc-base.ts";
  const trpcInitSrc = path.join(trpcDir, "server/", trpcInitFile);
  const trpcInitDest = path.join(projectDir, "server/trpc.ts");

  const trpcAppRouterSrc = path.join(trpcDir, "server/index.ts");
  const trpcAppRouterDest = path.join(projectDir, "server/index.ts");

  const trpcRoutersSrc = path.join(trpcDir, "server/routers/example.ts");
  const trpcRoutersDest = path.join(projectDir, "server/routers/example.ts");

  const trpcApiSrc = path.join(trpcDir, "server/api/examples/queries.ts");
  const trpcApiDest = path.join(projectDir, "server/api/examples/queries.ts");

  // 3. copy files
  fs.copySync(apiHandlerSrc, apiHandlerDest);
  fs.copySync(libUtilsSrc, libUtilsDest);
  fs.copySync(trpcClientSrc, trpcClientDest);
  fs.copySync(trpcServerSrc, trpcServerDest);
  fs.copySync(trpcInitSrc, trpcInitDest);
  fs.copySync(trpcAppRouterSrc, trpcAppRouterDest);
  fs.copySync(trpcRoutersSrc, trpcRoutersDest);
  fs.copySync(trpcApiSrc, trpcApiDest);
};
