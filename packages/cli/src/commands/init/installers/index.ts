import { drizzleInstaller } from "./drizzle.js";
import { nextAuthInstaller } from "./next-auth.js";
import { trpcInstaller } from "./trpc.js";
import { shadcnInstaller } from "./shadcn.js";
import { type Packages } from "@/commands/common/prompts.js";

export const mapPackages = (packages: Packages) => ({
  drizzle: {
    added: packages.drizzle,
    install: drizzleInstaller,
  },
  nextAuth: {
    added: packages.nextauth,
    install: nextAuthInstaller,
  },
  trpc: {
    added: packages.trpc,
    install: trpcInstaller,
  },
  shadcn: {
    added: packages.shadcn,
    install: shadcnInstaller,
  },
});

export type MappedPackages = ReturnType<typeof mapPackages>;
