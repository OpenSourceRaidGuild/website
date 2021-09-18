import Head from "next/head";

const DEFAULT_DESCRIPTION =
  "We're the big team your open source project doesn't have";
const DEFAULT_TITLE = "OSRG - Open Source Raid Guild";

export const CustomSiteHead: React.FC<{
  title?: string;
  description?: string;
}> = (props) => {
  return (
    <Head>
      <title>{props.title ?? DEFAULT_TITLE}</title>
      <meta property="og:title" content={props.title ?? DEFAULT_TITLE} />
      <meta
        name="description"
        content={props.description ?? DEFAULT_DESCRIPTION}
      />
      <meta
        property="og:description"
        content={props.description ?? DEFAULT_DESCRIPTION}
      />
      <meta property="og:url" content="https://osrg.t3.gg/" />
      <meta property="og:type" content="website" />

      <meta property="og:image" content={"https://osrg.t3.gg/twitter.png"} />
      <meta name="twitter:image" content={"https://osrg.t3.gg/twitter.png"} />
      <meta name="twitter:card" content="summary_large_image" />

      {/** Favicon junk */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="icon" href="/favicon.svg" />
    </Head>
  );
};
