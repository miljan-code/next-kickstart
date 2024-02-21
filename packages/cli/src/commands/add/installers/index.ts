import { drizzleInstaller } from "./drizzle.js";
import { nextauthInstaller } from "./nextauth.js";
import { shadcnInstaller } from "./shadcn.js";
import { trpcInstaller } from "./trpc.js";
import { uploadthingInstaller } from "./uploadthing.js";

export const mapPackages = () => ({
  drizzle: drizzleInstaller,
  nextauth: nextauthInstaller,
  trpc: trpcInstaller,
  shadcn: shadcnInstaller,
  uploadthing: uploadthingInstaller,
});

export type MappedPackages = ReturnType<typeof mapPackages>;
