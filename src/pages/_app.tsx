import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";

export type NextPageWithDisableLayout = NextPage & {
  disableLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithDisableLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  return <Component {...pageProps} />;
}
