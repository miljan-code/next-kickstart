export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";
export type PackageExec = "npx" | "pnpm dlx" | "yarn" | "bunx";

export const getUserPkgManager: () => PackageManager = () => {
  const userAgent = process.env.npm_config_user_agent;

  if (userAgent) {
    if (userAgent.startsWith("yarn")) {
      return "yarn";
    } else if (userAgent.startsWith("pnpm")) {
      return "pnpm";
    } else if (userAgent.startsWith("bun")) {
      return "bun";
    } else {
      return "npm";
    }
  } else {
    return "npm";
  }
};

export const getUserPkgExec: () => PackageExec = () => {
  const userAgent = process.env.npm_config_user_agent;

  if (userAgent) {
    if (userAgent.startsWith("yarn")) {
      return "yarn";
    } else if (userAgent.startsWith("pnpm")) {
      return "pnpm dlx";
    } else if (userAgent.startsWith("bun")) {
      return "bunx";
    } else {
      return "npx";
    }
  } else {
    return "npx";
  }
};
