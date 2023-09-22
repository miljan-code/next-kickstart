import path from "node:path";
import fs from "fs-extra";
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

  const envPath = path.join(projectDir, ".env.example");

  fs.writeFileSync(envPath, envContent);
};
