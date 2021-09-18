import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "@/backend/router";

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
});
