import fs from "fs-extra";

export const writeContent = (srcPath: string, destPath: string) => {
  const srcFileContent = fs.readFileSync(srcPath, "utf-8");
  const content = srcFileContent.slice(0, srcFileContent.length - 1);

  const destFileContent = fs.readFileSync(destPath, "utf-8");
  const loc = destFileContent.split("\n");

  const importEndIndex = loc.findIndex((line) => !line.startsWith("import"));
  loc.splice(importEndIndex, 0, content);
  const updatedContent = loc.join("\n");

  fs.writeFileSync(destPath, updatedContent, "utf-8");
};
