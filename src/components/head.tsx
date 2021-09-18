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
      <meta property="og:type" content="website" />
      <link rel="icon" href="/logo.svg" />
    </Head>
  );
};
