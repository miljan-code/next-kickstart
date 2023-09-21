import { getExample } from "@/server/api/examples/queries";
import { publicProcedure, router } from "@/server/trpc";

export const exampleRouter = router({
  getExample: publicProcedure.query(() => {
    return getExample();
  }),
});
