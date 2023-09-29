import { getUserPkgExec } from "@/utils/get-user-pkg-manager.js";
import { logger } from "@/utils/logger.js";

const availablePackages = ["drizzle", "nextauth", "trpc", "shadcn"] as const;

export type AvailablePackage = (typeof availablePackages)[number];

export const checkArgument = (arg: string | undefined) => {
  if (!arg || !availablePackages.includes(arg as AvailablePackage)) {
    printArgError();
    process.exit(0);
  }

  return arg as AvailablePackage;
};

const printArgError = () => {
  const pkgExec = getUserPkgExec();

  logger.warn("Please, select one of the available packages:");
  logger.warn(">  nextauth, drizzle, trpc, shadcn");
  logger.info(`\n${pkgExec} next-kickstart add <package>`);
};
