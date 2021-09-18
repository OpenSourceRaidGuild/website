import { CustomSiteHead } from "@/frontend/components/head";
import { trpc } from "@/frontend/utils/trpc";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen justify-center cursor-default relative">
      <CustomSiteHead />
      <div className="max-w-md md:max-w-2xl text-lg p-4">
        <img src="/logo.svg" alt="logo" className="animate-fade-in-down" />
      </div>
    </div>
  );
}
