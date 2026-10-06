import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = { title: "About me" };

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-1 flex-col bg-pink">
      <header className="px-8 pt-6">
        <SiteNav />
      </header>
      <section className="max-w-[710px] px-8 py-24 md:pl-[108px]">
        <h1 className="text-[40px] leading-[1.2] tracking-[0.02em]">About me</h1>
        <p className="font-script mt-2 text-[28px] leading-[1.2]">coming soon!</p>
      </section>
    </main>
  );
}
