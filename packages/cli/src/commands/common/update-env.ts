import path from "node:path";
import fs from "fs-extra";

import { PKG_ROOT } from "@/constants.js";
import { type InstallPackagesOpts } from "../init/helpers/install-packages.js";
import { type AvailablePackage } from "@/commands/add/helpers/check-argument.js";
import { type Packages } from "./prompts.js";

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

  for (const pkg of getKeys(envVariables)) {
    if (!packages[pkg]) continue;
    for (const [key, value] of Object.entries(envVariables[pkg])) {
      envContent += `${key}=${value}`;
    }
  }

  const envPath = path.join(projectDir, ".env.example");
  const t3EnvSrc = path.join(PKG_ROOT, "template/libs/providers/env.mjs");
  const t3EnvDest = path.join(projectDir, "env.mjs");

  fs.writeFileSync(envPath, envContent);
  fs.copySync(t3EnvSrc, t3EnvDest);
  removeUselessVars(t3EnvDest, packages);
};

export const updateEnv = (projectDir: string, pkg: AvailablePackage) => {};

function removeUselessVars(filePath: string, packages: Packages) {
  let content = fs.readFileSync(filePath, "utf-8");

  for (const pkg of getKeys(envVariables)) {
    if (packages[pkg]) continue;
    for (const envVar of getKeys(envVariables[pkg])) {
      content = content
        .split("\n")
        .filter((line) => !line.includes(envVar))
        .join("\n");
    }
  }

  fs.writeFileSync(filePath, content, "utf-8");
}

function getKeys<T extends {}>(obj: T) {
  return Object.keys(obj) as Array<keyof T>;
}
