import * as trpc from "@trpc/server";
import { contactFormRouter } from "./contact";
import { AuthenticatedTrpcRouterContextType } from "./context";

// Primary api for interacting with "server side"
// Read more: https://trpc.io
export const appRouter = trpc
  .router<AuthenticatedTrpcRouterContextType>()
  .merge("contact.", contactFormRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
