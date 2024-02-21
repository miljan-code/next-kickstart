import path from "node:path";

import { confirm, group, text } from "@clack/prompts";
import chalk from "chalk";

export async function checkPackages() {
  return await group(
    {
      drizzle: () => {
        return confirm({
          message: "Would you like to use Drizzle ORM?",
        });
      },
      nextauth: () => {
        return confirm({
          message: "Would you like to use NextAuth?",
        });
      },
      trpc: () => {
        return confirm({
          message: "Would you like to use tRPC?",
        });
      },
      shadcn: () => {
        return confirm({
          message: "Would you like to use ShadCN/ui?",
        });
      },
      uploadthing: () => {
        return confirm({
          message: "Would you like to use Uploadthing?",
        });
      },
    },
    {
      onCancel() {
        process.exit(1);
      },
    },
  );
}

export async function checkInstalls() {
  return await group(
    {
      git: () => {
        return confirm({
          message: "Should we initialize a Git repository?",
        });
      },
      deps: () => {
        return confirm({
          message: "Should we install dependencies for you?",
        });
      },
    },
    {
      onCancel() {
        process.exit(1);
      },
    },
  );
}

export const overwritePrompt = async (msg: string) => {
  const shouldOverwrite = await confirm({
    message: chalk.yellow.bold(msg),
  });
  if (!shouldOverwrite || typeof shouldOverwrite === "symbol") process.exit(0);
};

export const confirmPrompt = async ({ message }: { message: string }) => {
  const prompt = await confirm({ message });
  if (typeof prompt === "symbol") process.exit(0);
  return prompt;
};

const getProjectNamePrompt = async () => {
  const prompt = await text({
    message: "What will your project be called?",
    placeholder: "next-kickstart",
    validate(value) {
      if (!value.length) return "Project name is required!";
    },
  });

  const projectName = typeof prompt === "symbol" ? process.exit(1) : prompt;

  return projectName.split(" ").join("-");
};

export async function getProjectName(dir: string | undefined) {
  let projectName = "";
  let dirName = "";

  if (!dir) {
    projectName = await getProjectNamePrompt();
    dirName = projectName;
  } else if (dir === ".") {
    projectName = path.basename(process.cwd());
    dirName = ".";
  } else {
    projectName = dir;
    dirName = dir;
  }

  return { projectName, dirName };
}

export type Packages = Awaited<ReturnType<typeof checkPackages>>;
