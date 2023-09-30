import { drizzleInstaller } from "./drizzle.js";
import { shadcnInstaller } from "./shadcn.js";

export const mapPackages = () => ({
  drizzle: drizzleInstaller,
  nextauth: () => {},
  trpc: () => {},
  shadcn: shadcnInstaller,
});

export type MappedPackages = ReturnType<typeof mapPackages>;
