import { drizzleInstaller } from "./drizzle.js";
import { nextauthInstaller } from "./nextauth.js";
import { shadcnInstaller } from "./shadcn.js";
import { trpcInstaller } from "./trpc.js";

export const mapPackages = () => ({
  drizzle: drizzleInstaller,
  nextauth: nextauthInstaller,
  trpc: trpcInstaller,
  shadcn: shadcnInstaller,
});

export type MappedPackages = ReturnType<typeof mapPackages>;
