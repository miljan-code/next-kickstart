import { drizzleInstaller } from "./drizzle.js";
import { type Packages } from "@/commands/common/prompts.js";

export const mapPackages = (packages: Packages) => ({
  drizzle: drizzleInstaller,
  nextauth: () => {},
  trpc: () => {},
  shadcn: () => {},
});

export type MappedPackages = ReturnType<typeof mapPackages>;
