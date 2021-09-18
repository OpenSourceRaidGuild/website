import { CustomSiteHead } from "../components/head";

const AboutPage = () => {
  return (
    <div
      id="about"
      className="flex flex-col items-center min-h-screen justify-center cursor-default relative"
    >
      <div className="max-w-md md:max-w-2xl text-lg p-4">
        <img src="/logo.svg" alt="logo" className="animate-fade-in-down" />
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div>
      <CustomSiteHead />
      <AboutPage />
    </div>
  );
}
