import { CustomSiteHead } from "@/frontend/components/head";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen justify-center cursor-default relative">
      <CustomSiteHead />
      <div className="max-w-md md:max-w-2xl text-lg p-4">
        <img
          src="/assets/logo-full.svg"
          alt="logo"
          className="animate-fade-in-down"
        />
      </div>
      <div className="mx-8 md:mx-4">
        <h1 className="text-4xl animate-fade-in-down max-w-lg md:max-w-xl text-center text-gray-700">
          {"Open Source Raid Guild"}
        </h1>
        <div className="pt-4" />
        <h3 className="text-2xl animate-fade-in-down max-w-lg md:max-w-xl text-center font-light text-gray-700">
          {"When battling code starts to feel like a raid boss, "}
          <span className="font-semibold">{"we're here to help"}</span>
        </h3>
      </div>
      <div className="absolute bottom-0 w-full text-center font-light">
        {"Quickly hacked together by "}
        <a
          href="https://t3.gg/me"
          className="link-light text-gray-900 font-normal underline hover:text-blue-800"
        >
          Theo
        </a>
      </div>
    </div>
  );
}

export const getStaticProps = () => {
  return { props: {} };
};
