import fs from "node:fs";
import path from "node:path";

export function parsePath(dir: string) {
  const projectPath = path.join(process.cwd(), dir);

  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath, { recursive: true });
  }

  return projectPath;
}
