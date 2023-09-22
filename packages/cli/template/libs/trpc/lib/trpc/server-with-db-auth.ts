import { cookies } from "next/headers";
import { loggerLink } from "@trpc/client";
import { experimental_nextCacheLink as nextCacheLink } from "@trpc/next/app-dir/links/nextCache";
import { experimental_createTRPCNextAppDirServer as createTRPCNextAppDirServer } from "@trpc/next/app-dir/server";
import SuperJSON from "superjson";

import { db } from "@/db";
import { getUserSession } from "@/lib/auth";
import { appRouter } from "@/server";

export const server = createTRPCNextAppDirServer<typeof appRouter>({
  config() {
    return {
      transformer: SuperJSON,
      links: [
        loggerLink({
          enabled: (_op) => false,
        }),
        nextCacheLink({
          revalidate: 1,
          router: appRouter,
          async createContext() {
            const { session } = await getUserSession();
            return {
              session,
              db,
              headers: {
                cookie: cookies().toString(),
                "x-trpc-source": "rsc-invoke",
              },
            };
          },
        }),
      ],
    };
  },
});
