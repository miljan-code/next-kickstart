import fs from "fs-extra";

export const copyContent = (srcPath: string, destPath: string) => {
  const srcFileContent = fs.readFileSync(srcPath, "utf-8");
  const content = srcFileContent.slice(0, srcFileContent.length - 1);

  writeAfterLastImport(destPath, content);
};

export const writeAfterLastImport = (path: string, content: string) => {
  const contentPath = fs.readFileSync(path, "utf-8");
  const loc = contentPath.split("\n");
  const importEndIndex = loc.findIndex((line) => !line.startsWith("import"));
  loc.splice(importEndIndex, 0, content);
  const updatedContent = loc.join("\n");
  fs.writeFileSync(path, updatedContent, "utf-8");
};

export const writeAtTheTopOfFile = (path: string, content: string) => {
  const contentPath = fs.readFileSync(path, "utf-8");
  const loc = contentPath.split("\n");
  loc.splice(0, 0, content);
  const updatedContent = loc.join("\n");
  fs.writeFileSync(path, updatedContent, "utf-8");
};

export const replaceContent = (
  srcPath: string,
  destPath: string,
  findThis: string,
  replaceWith: string,
) => {
  const configContent = fs.readFileSync(srcPath, "utf-8");
  const updatedContent = configContent.replaceAll(findThis, replaceWith);
  fs.writeFileSync(destPath, updatedContent, "utf-8");
};
