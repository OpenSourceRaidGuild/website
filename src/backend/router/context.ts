import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getSession } from "next-auth/react";
import { inferAsyncReturnType } from "@trpc/server";

export async function createAuthenticatedTrpcContext({
  req,
}: CreateNextContextOptions) {
  const session = await getSession({ req });
  return {
    session,
  };
}

export type AuthenticatedTrpcRouterContextType = inferAsyncReturnType<
  typeof createAuthenticatedTrpcContext
>;
