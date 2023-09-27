import path from "node:path";
import fs from "fs-extra";

import { PKG_ROOT } from "@/constants.js";
import { type InstallPackagesOpts } from "./install-packages.js";

export const createEnv = ({ packages, projectDir }: InstallPackagesOpts) => {
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
  };

  let envContent = "";

  if (packages.drizzle) {
    for (const [key, value] of Object.entries(envVariables.drizzle)) {
      envContent += `${key}=${value}`;
    }
  }

  if (packages.nextauth) {
    for (const [key, value] of Object.entries(envVariables.nextauth)) {
      envContent += `${key}=${value}`;
    }
  }

  if (packages.drizzle || packages.nextauth) {
    const envPath = path.join(projectDir, ".env.example");
    fs.writeFileSync(envPath, envContent);
  }

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
