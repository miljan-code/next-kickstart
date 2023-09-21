import { drizzleInstaller } from './drizzle.js';
import { nextAuthInstaller } from './next-auth.js';
import { type Packages } from '../helpers/prompts.js';

export const mapPackages = (packages: Packages) => ({
  drizzle: {
    added: packages.drizzle,
    install: drizzleInstaller,
  },
  nextAuth: {
    added: packages.nextauth,
    install: nextAuthInstaller,
  },
});

export type MappedPackages = ReturnType<typeof mapPackages>;
