import Link from "next/link";
import { useRouter } from "next/router";

export default function TopNav() {
  const router = useRouter();
  return (
    <nav className="absolute top w-full flex h-24 px-6 uppercase font-bold text-gray-700 z-10 items-center justify-between">
      <div className="flex">
        <Link href="/about">
          <a className="link-light">About Us</a>
        </Link>
        <div className="pr-4" />
        <Link href="/raids">
          <a className="link-light">Our Raids</a>
        </Link>
        <div className="pr-4" />
        <Link href="/stats">
          <a className="link-light">Our Stats</a>
        </Link>
        <div className="pr-4" />
        <Link href="/contact">
          <a className="link-light">Contact Us</a>
        </Link>
        <div className="pr-4" />
      </div>
      {router.pathname !== "/" && (
        <Link href="/">
          <a>
            <img src="/logo.svg" alt="logo" className="h-16 animate-fade-in" />
          </a>
        </Link>
      )}
    </nav>
  );
}
