import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "@/backend/router";
import { createAuthenticatedTrpcContext } from "@/backend/router/context";

// Primary api for interacting with "server side"
// Read more: https://trpc.io
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createAuthenticatedTrpcContext,
});
