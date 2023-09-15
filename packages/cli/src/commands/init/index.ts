import { Command } from 'commander';
import { z } from 'zod';
import { generateStarter } from './generate-starter.js';
import { parsePath } from './parse-path.js';
import { getUserPkgManager } from '../../utils/get-user-pkg-manager.js';
import { intro } from '@clack/prompts';
import { DEFAULT_APP_NAME } from '../../constants.js';
import { showPrompts } from './show-prompts.js';

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

    const pkgManager = getUserPkgManager();
    const projectDir = parsePath(initDir);
    const projectName = dir === '.' ? DEFAULT_APP_NAME : dir;

    intro('next-kickstart');

    const packages = await showPrompts();

    await generateStarter({ pkgManager, projectDir, projectName });
  });
