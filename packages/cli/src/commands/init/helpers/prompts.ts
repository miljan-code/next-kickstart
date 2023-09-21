import { confirm, group } from "@clack/prompts";

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

export type Packages = Awaited<ReturnType<typeof checkPackages>>;
