import type { ServerRuntime } from "next";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "@/server";
import { createContext } from "@/server/trpc";

export const runtime: ServerRuntime = "edge";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext,
  });

export { handler as GET, handler as POST };
