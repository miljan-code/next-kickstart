import { confirm, group } from '@clack/prompts';

export async function showPrompts() {
  return await group(
    {
      drizzle: () => {
        return confirm({
          message: 'Would you like to use Drizzle ORM?',
        });
      },
      nextauth: () => {
        return confirm({
          message: 'Would you like to use NextAuth?',
        });
      },
      trpc: () => {
        return confirm({
          message: 'Would you like to use tRPC?',
        });
      },
      shadcn: () => {
        return confirm({
          message: 'Would you like to use ShadCN/ui?',
        });
      },
      ...{
        git: () => {
          return confirm({
            message: 'Should we initialize a Git repository?',
          });
        },
      },
      ...{
        install: () => {
          return confirm({
            message: 'Should we install dependencies for you?',
          });
        },
      },
    },
    {
      onCancel() {
        process.exit(1);
      },
    }
  );
}
