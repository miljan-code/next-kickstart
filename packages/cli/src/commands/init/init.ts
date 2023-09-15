import { Command } from 'commander';
import { z } from 'zod';
import { generateStarter } from './utils.js';

const initOptionsSchema = z.object({
  yes: z.boolean(),
});

const initDirSchema = z.string().min(1);

export const init = new Command()
  .name('init')
  .description('initialize new project')
  .argument('[dir]', 'directory to init a project', '.')
  .option('-y, --yes', 'skip confirmation prompt', false)
  .action(async (dir, opts) => {
    const options = initOptionsSchema.parse(opts);
    const initDir = initDirSchema.parse(dir);

    generateStarter(dir);
  });
