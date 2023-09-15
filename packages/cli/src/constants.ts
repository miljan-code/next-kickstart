import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
export const PKG_ROOT = path.join(path.dirname(__filename), '../');
export const DEFAULT_APP_NAME = 'next-kickstart';
