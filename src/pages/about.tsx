import { CustomSiteHead } from "../components/head";
import TopNav from "../components/topnav";

export default function AboutPage() {
  return (
    <div>
      <CustomSiteHead />
      <TopNav />
      <div
        id="about"
        className="flex flex-col items-center min-h-screen justify-center cursor-default relative"
      >
        <div className="max-w-md md:max-w-2xl text-lg p-4">
          <h1 className="animate-fade-in-down text-4xl font-bold">
            Coming Soon
          </h1>
        </div>
      </div>
    </div>
  );
}
