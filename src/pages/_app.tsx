import "../styles/globals.css";
import type { AppProps } from "next/app";
import TopNav from "../frontend/components/topnav";
import PlausibleProvider from "next-plausible";

import { SessionProvider } from "next-auth/react";

function AppCore({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="osrg.t3.gg" trackOutboundLinks>
      <SessionProvider session={pageProps.session}>
        <TopNav />
        <Component {...pageProps} />
      </SessionProvider>
    </PlausibleProvider>
  );
}

import { withTRPC } from "@trpc/next";
import type { AppRouter } from "@/backend/router";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";

function getBaseUrl() {
  if (typeof window) return ""; // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
  config() {
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url,
        }),
      ],
    };
  },
  ssr: true,
})(AppCore);
