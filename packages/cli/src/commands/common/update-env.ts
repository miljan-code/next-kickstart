import path from "node:path";
import fs from "fs-extra";

import { PKG_ROOT } from "@/constants.js";
import { type InstallPackagesOpts } from "../init/helpers/install-packages.js";
import { type AvailablePackage } from "@/commands/add/helpers/check-argument.js";

const envVariables = {
  drizzle: {
    DATABASE_URL: `"postgresql://[username]:[password]@host/postgres"\n`,
  },
  nextauth: {
    NEXTAUTH_URL: `"http://localhost:3000"\n`,
    NEXTAUTH_SECRET: `""\n`,
    GOOGLE_CLIENT_ID: `""\n`,
    GOOGLE_CLIENT_SECRET: `""\n`,
  },
  uploadthing: {
    UPLOADTHING_SECRET: `""\n`,
    UPLOADTHING_APP_ID: `""\n`,
  },
};

export const createEnv = ({ packages, projectDir }: InstallPackagesOpts) => {
  let envContent = "";

  for (const pkg of Object.keys(envVariables)) {
    if (!packages[pkg as keyof typeof packages]) continue;
    for (const [key, value] of Object.entries(
      envVariables[pkg as keyof typeof envVariables],
    )) {
      envContent += `${key}=${value}`;
    }
  }

  const envPath = path.join(projectDir, ".env.example");
  fs.writeFileSync(envPath, envContent);

  // TODO: add UT to t3ENV

  const t3EnvFile =
    packages.drizzle && packages.nextauth
      ? "env-auth-db.mjs"
      : packages.drizzle
      ? "env-db.mjs"
      : packages.nextauth
      ? "env-auth.mjs"
      : "env-base.mjs";
  const t3EnvSrc = path.join(PKG_ROOT, "template/libs/providers", t3EnvFile);
  const t3EnvDest = path.join(projectDir, "env.mjs");

  fs.copySync(t3EnvSrc, t3EnvDest);
};

export const updateEnv = (projectDir: string, pkg: AvailablePackage) => {};
