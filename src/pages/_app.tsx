import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { trackEvent } from "@/utils/tracking";

export type NextPageWithDisableLayout = NextPage & {
  disableLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithDisableLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const prevPath = useRef<string>("");

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const cleanUrl = url.split("?")[0];
      const cleanPrev = prevPath.current.split("?")[0];

      if (cleanUrl !== cleanPrev) {
        // Track page transition
        trackEvent("page_transition", {
          from_page: cleanPrev || "/",
          to_page: cleanUrl,
        });
        prevPath.current = cleanUrl;
      }
    };
    
    prevPath.current = router.pathname;
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router]);

  return <Component {...pageProps} />;
}
