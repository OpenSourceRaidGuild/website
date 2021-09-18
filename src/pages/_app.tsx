import "../styles/globals.css";
import type { AppProps } from "next/app";
import TopNav from "../components/topnav";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <TopNav />
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
