import Link from "next/link";
import { useRouter } from "next/router";

export default function TopNav() {
  const router = useRouter();
  return (
    <nav className="absolute top w-full flex h-24 px-6 uppercase font-bold text-gray-700 z-10 items-center justify-between">
      <div className="flex">
        <a
          href="https://discord.gg/m5U24z92Va"
          target="_blank"
          rel="noreferrer"
          className="link-light"
        >
          Discord
        </a>

        <div className="pr-4" />

        <a
          href="https://github.com/OpenSourceRaidGuild"
          target="_blank"
          rel="noreferrer"
          className="link-light"
        >
          Github
        </a>

        <div className="pr-4" />

        <Link href="/contact">
          <a className="link-light">Contact Us</a>
        </Link>
      </div>
      {router.pathname !== "/" && (
        <Link href="/">
          <a>
            <img
              src="/assets/logo-minimal.svg"
              alt="logo"
              className="h-16 animate-fade-in"
            />
          </a>
        </Link>
      )}
    </nav>
  );
}
