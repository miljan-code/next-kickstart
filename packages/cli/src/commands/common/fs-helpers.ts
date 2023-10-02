import path from "node:path";

import fs from "fs-extra";

import {
  copyContent,
  replaceContent,
  writeAtTheTopOfFile,
} from "../add/helpers/content-fs.js";
import { PKG_ROOT } from "@/constants.js";
import { type Packages } from "./prompts.js";

type CMD = "add" | "init";

interface FsDrizzleOpts {
  projectDir: string;
  drizzleFolderName?: string;
  withAuth: boolean;
  cmd?: CMD;
}

const drizzleDir = path.join(PKG_ROOT, "template/libs/drizzle");
const nextAuthDir = path.join(PKG_ROOT, "template/libs/next-auth");

export const fsDrizzle = ({
  projectDir,
  drizzleFolderName = "db",
  withAuth,
  cmd = "init",
}: FsDrizzleOpts) => {
  const configSrc = path.join(drizzleDir, "drizzle.config.ts");
  const configDest = path.join(projectDir, "drizzle.config.ts");
  if (drizzleFolderName !== "db") {
    // Update drizzle.config.ts if folderName !== 'db'
    replaceContent(configSrc, configDest, "db/", `${drizzleFolderName}/`);
  } else {
    fs.copySync(configSrc, configDest);
  }

  const clientSrc = path.join(drizzleDir, "db/index.ts");
  const clientDest = path.join(projectDir, drizzleFolderName, "index.ts");

  const schemaSrc = path.join(
    drizzleDir,
    "db/schema",
    withAuth ? "auth.ts" : "example.ts",
  );
  const schemaDest = path.join(
    projectDir,
    drizzleFolderName,
    "schema",
    withAuth ? "auth.ts" : "example.ts",
  );

  const schemaIndexSrc = path.join(
    drizzleDir,
    "db/schema",
    withAuth ? "index-auth.ts" : "index-example.ts",
  );
  const schemaIndexDest = path.join(
    projectDir,
    drizzleFolderName,
    "schema/index.ts",
  );

  fs.copySync(schemaIndexSrc, schemaIndexDest);
  fs.copySync(clientSrc, clientDest);
  fs.copySync(schemaSrc, schemaDest);

  if (withAuth && cmd === "add") {
    const authLibSrc = path.join(nextAuthDir, "lib/auth-drizzle.ts");
    const authLibDest = path.join(projectDir, "lib/auth.ts");
    if (drizzleFolderName !== "db") {
      replaceContent(authLibSrc, authLibDest, "/db", `/${drizzleFolderName}`);
    } else {
      fs.copySync(authLibSrc, authLibDest);
    }
  }
};

interface FsNextAuthOpts {
  projectDir: string;
  withDrizzle: boolean;
  cmd?: CMD;
  drizzleFolderName?: string;
}

export const fsNextAuth = ({
  projectDir,
  withDrizzle,
  cmd = "init",
  drizzleFolderName = "db",
}: FsNextAuthOpts) => {
  const authTypesSrc = path.join(nextAuthDir, "types/next-auth.d.ts");
  const authTypesDest = path.join(projectDir, "types/next-auth.d.ts");

  const authLibSrc = path.join(
    nextAuthDir,
    withDrizzle ? "lib/auth-drizzle.ts" : "lib/auth-base.ts",
  );
  const authLibDest = path.join(projectDir, "lib/auth.ts");

  const apiHandlerSrc = path.join(
    nextAuthDir,
    "app/api/auth/[...nextauth]/route.ts",
  );
  const apiHandlerDest = path.join(
    projectDir,
    "app/api/auth/[...nextauth]/route.ts",
  );

  fs.copySync(authTypesSrc, authTypesDest);
  fs.copySync(authLibSrc, authLibDest);
  fs.copySync(apiHandlerSrc, apiHandlerDest);

  if (withDrizzle && cmd === "add") {
    const schemaSrc = path.join(drizzleDir, "db/schema", "auth.ts");
    const schemaDest = path.join(
      projectDir,
      drizzleFolderName,
      "schema/auth.ts",
    );
    fs.copySync(schemaSrc, schemaDest);
    const schemaIndexDest = path.join(
      projectDir,
      drizzleFolderName,
      "schema/index.ts",
    );
    const indexContent = `export * from "./auth";`;
    writeAtTheTopOfFile(schemaIndexDest, indexContent);
  }
};

interface FsShadcnOpts {
  projectDir: string;
  packages?: Packages;
  globalsFolder?: string;
  cmd?: CMD;
}

export const fsShadcn = ({
  projectDir,
  packages,
  globalsFolder = "styles",
  cmd = "init",
}: FsShadcnOpts) => {
  const shadcnDir = path.join(PKG_ROOT, "template/libs/shadcn");

  const configSrc = path.join(shadcnDir, "components.json");
  const configDest = path.join(projectDir, "components.json");

  const stylesSrc = path.join(shadcnDir, "styles/globals.css");
  const stylesDest = path.join(projectDir, globalsFolder, "globals.css");

  const uiSrc = path.join(shadcnDir, "components/ui/button.tsx");
  const uiDest = path.join(projectDir, "components/ui/button.tsx");
  const uiPathExists = fs.pathExistsSync(uiDest);
  if (!uiPathExists) fs.copySync(uiSrc, uiDest);

  const twConfigSrc = path.join(shadcnDir, "tailwind.config.ts");
  const twConfigDest = path.join(projectDir, "tailwind.config.ts");

  const utilsSrc = path.join(shadcnDir, "lib/utils.ts");
  const utilsDest = path.join(projectDir, "lib/utils.ts");

  if (cmd === "add") {
    const utilsExists = fs.pathExistsSync(utilsDest);
    if (utilsExists) copyContent(utilsSrc, utilsDest);
    else fs.copySync(utilsSrc, utilsDest);
  }
  if (cmd === "init" && !packages?.trpc) {
    fs.copySync(utilsSrc, utilsDest);
  }

  fs.copySync(configSrc, configDest);
  fs.copySync(stylesSrc, stylesDest);
  fs.copySync(twConfigSrc, twConfigDest);
};

interface FsTRPCOpts {
  projectDir: string;
  packages: Packages;
}

export const fsTRPC = ({ projectDir, packages }: FsTRPCOpts) => {
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

  fs.copySync(apiHandlerSrc, apiHandlerDest);
  fs.copySync(libUtilsSrc, libUtilsDest);
  fs.copySync(trpcClientSrc, trpcClientDest);
  fs.copySync(trpcServerSrc, trpcServerDest);
  fs.copySync(trpcInitSrc, trpcInitDest);
  fs.copySync(trpcAppRouterSrc, trpcAppRouterDest);
  fs.copySync(trpcRoutersSrc, trpcRoutersDest);
  fs.copySync(trpcApiSrc, trpcApiDest);
};
