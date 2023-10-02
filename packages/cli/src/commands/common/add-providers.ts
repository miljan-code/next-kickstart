import path from "node:path";

import fs from "fs-extra";

import {
  replaceContent,
  writeAfterLastImport,
} from "../add/helpers/content-fs.js";
import { PKG_ROOT } from "@/constants.js";
import { type AvailablePackage } from "../add/helpers/check-argument.js";

interface AddProvidersOpts {
  pkgName: AvailablePackage;
  projectDir: string;
}

export const addProviders = ({ pkgName, projectDir }: AddProvidersOpts) => {
  if (pkgName !== "nextauth" && pkgName !== "trpc") return;

  const providersDir = path.join(PKG_ROOT, "template/libs/providers");
  const providersPath = path.join(projectDir, "components/providers/index.tsx");

  let fileName,
    providerName = "";
  if (pkgName === "nextauth") {
    fileName = "auth-provider";
    providerName = "AuthProvider";
  } else {
    fileName = "trpc-provider";
    providerName = "TrpcProvider";
  }

  const pkgProviderSrc = path.join(
    providersDir,
    `components/providers/${fileName}.tsx`,
  );
  const pkgProviderDest = path.join(
    projectDir,
    `components/providers/${fileName}.tsx`,
  );
  fs.copySync(pkgProviderSrc, pkgProviderDest);

  const findContent = "{children}";
  const contentToReplace = `<${providerName}>{children}</${providerName}>`;
  replaceContent(providersPath, providersPath, findContent, contentToReplace);

  const importContent = `import { ${providerName} } from "./${fileName}";`;
  writeAfterLastImport(providersPath, importContent);
};
