import fs from 'node:fs';
import path from 'node:path';
import { getUserPkgManager } from '../../utils/get-user-pkg-manager.js';

export async function generateStarter(dir: string) {
  const projectPath = path.join(process.cwd(), dir);

  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath, { recursive: true });
  }

  const pkgManager = getUserPkgManager();

  console.log(pkgManager);

  process.exit(0);
}
