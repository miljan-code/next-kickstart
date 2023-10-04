import { checkPackages, type Packages } from "@/commands/common/prompts.js";
import { type Options } from "../index.js";

const ALL_PACKAGES = {
  drizzle: true,
  nextauth: true,
  trpc: true,
  shadcn: true,
};

export const mapPackageList = async (opts: Options): Promise<Packages> => {
  if (opts.yes) return ALL_PACKAGES;

  if (Object.values(opts).every((val) => !val)) {
    return await checkPackages();
  }

  const flaggedPkgs = {} as Packages;
  const availablePackages = Object.keys(ALL_PACKAGES);
  availablePackages.forEach((pkg) => {
    flaggedPkgs[pkg as keyof typeof flaggedPkgs] =
      opts[pkg as keyof typeof opts];
  });
  return flaggedPkgs;
};
