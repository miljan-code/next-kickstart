import { drizzleInstaller } from './drizzle.js';
import { type Packages } from '../helpers/prompts.js';

export const mapPackages = (packages: Packages) => ({
  drizzle: {
    added: packages.drizzle,
    install: drizzleInstaller,
  },
});

export type MappedPackages = ReturnType<typeof mapPackages>;
