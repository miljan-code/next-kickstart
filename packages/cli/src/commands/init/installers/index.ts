import { drizzleInstaller } from "./drizzle.js";
import { nextAuthInstaller } from "./next-auth.js";
import { trpcInstaller } from "./trpc.js";
import { shadcnInstaller } from "./shadcn.js";
import { type Packages } from "@/commands/common/prompts.js";
import { uploadthingInstaller } from "./uploadthing.js";

export const mapPackages = (packages: Packages) => ({
  drizzle: {
    added: packages.drizzle,
    install: drizzleInstaller,
  },
  nextauth: {
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
  uploadthing: {
    added: packages.uploadthing,
    install: uploadthingInstaller,
  },
});

export type MappedPackages = ReturnType<typeof mapPackages>;
