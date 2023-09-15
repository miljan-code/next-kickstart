#!/usr/bin/env node

import { Command } from 'commander';
import { getPackageInfo } from './utils/get-package-info.js';
import { init } from './commands/init/init.js';

function main() {
  const packageInfo = getPackageInfo();

  const program = new Command()
    .name('kickstart-next')
    .description('create next app with drizzle, trpc, nextauth and tailwind')
    .version(
      packageInfo.version || '0.1.0',
      '-v, --version',
      'display the version number'
    );

  program.addCommand(init);

  program.parse();
}

main();
