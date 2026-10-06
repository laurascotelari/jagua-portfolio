import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-1 flex-col overflow-hidden bg-pink">
      <header className="px-8 pt-6">
        <SiteNav />
      </header>
      <div className="grid flex-1 grid-cols-1 md:grid-cols-[5fr_7fr]">
        <div className="flex items-center px-8 py-16 md:pb-[20vh] md:pl-[108px]">
          <h1 className="text-[clamp(56px,6.7vw,96px)] leading-none tracking-[0.02em]">
            <Link href="/">Jagua jpg</Link>
          </h1>
        </div>
        <div className="relative flex items-end justify-center md:justify-end md:pr-[clamp(32px,11vw,160px)]">
          {/* Swap for the real desk drawing (navy ink, transparent background). */}
          <Image
            src="/illustrations/desk.svg"
            alt="Line drawing of an artist's desk under a wall covered in framed pictures"
            width={680}
            height={1000}
            priority
            className="h-auto w-full max-w-[680px] translate-y-[8%]"
          />
        </div>
      </div>
    </main>
  );
}
