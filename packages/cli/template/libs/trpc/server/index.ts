import { exampleRouter } from "./routers/example";

import { router } from "@/server/trpc";

export const appRouter = router({
  example: exampleRouter,
});

export type AppRouter = typeof appRouter;
