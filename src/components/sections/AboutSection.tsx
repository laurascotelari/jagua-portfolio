export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="min-h-[calc(100svh-var(--header-h))] bg-pink"
    >
      <div className="max-w-[710px] px-8 py-24 md:pl-[108px]">
        <h2 id="about-title" className="text-[40px] leading-[1.2] tracking-[0.02em]">About me</h2>
        <p className="font-script mt-2 text-[28px] leading-[1.2]">coming soon!</p>
      </div>
    </section>
  );
}
