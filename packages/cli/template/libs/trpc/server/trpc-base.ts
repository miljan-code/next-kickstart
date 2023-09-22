import {
  initTRPC,
  TRPCError,
  type DataTransformerOptions,
  type inferAsyncReturnType,
} from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import superjson from "superjson";

export const createContext = async (opts?: FetchCreateContextFnOptions) => {
  return {
    headers: opts && Object.fromEntries(opts.req.headers),
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC
  .context<Context>()
  .create({ transformer: superjson as DataTransformerOptions });

export const router = t.router;
export const publicProcedure = t.procedure;
