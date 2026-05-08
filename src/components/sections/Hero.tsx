import { portfolioData } from "@/data/portfolio";
import { CTAButton } from "@/components/ui/CTAButton";
import { FadeIn } from "@/components/ui/FadeIn";
import { FeaturedProjectsCarousel } from "@/components/ui/FeaturedProjectsCarousel";
// import { StickyNote } from "@/components/ui/StickyNote";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const { profile, kpis } = portfolioData;
  const [first, middle, last] = profile.name.split(" ");

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-cream px-5 py-10 md:px-14 md:pt-13 md:pb-9"
    >
      <span
        className="pointer-events-none absolute -bottom-[60px] -right-[60px] w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,rgba(58,47,37,0.1),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="grid lg:grid-cols-[1fr_460px] gap-8 lg:gap-12 items-center mb-9">
        <FadeIn waitForIntro>
          <div className="inline-flex items-center gap-2 border border-khaki rounded-sm px-3 py-1 font-mono text-[0.7rem] tracking-[0.12em] uppercase text-khaki mb-[14px] before:content-['//'] before:text-rust before:mr-[2px]">
            {profile.role}
          </div>

          <h1 className="font-heading text-[4rem] md:text-[5rem] xl:text-[5.6rem] leading-[0.95] tracking-[0.02em] text-ink mb-[16px]">
            {first}
            <br />
            {middle}
            <br />
            <span className="text-rust">{last}</span>
          </h1>

          <div className="font-heading text-[1rem] tracking-[0.14em] uppercase text-ink-soft border-l-4 border-rust pl-3 mb-[18px] leading-[1.6]">
            {profile.titleLines.map((l, i) => (
              <span key={l} className="block">
                {l}
                {i < profile.titleLines.length - 1 ? null : null}
              </span>
            ))}
          </div>

          <p className="font-serif text-[1rem] leading-[1.85] text-ink-soft max-w-[420px] mb-[26px]">
            {profile.summary}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
            <CTAButton href="#projects" variant="primary" icon={<ArrowRight size={15} strokeWidth={1.75} aria-hidden />}>
              View My Work
            </CTAButton>
            <CTAButton href="#contact" variant="secondary">
              Get In Touch
            </CTAButton>
          </div>
        </FadeIn>

        <FadeIn waitForIntro delay={0.15} className="hidden lg:block relative">
          {/* <StickyNote>{stickyNote}</StickyNote> */}
          <FeaturedProjectsCarousel />
        </FadeIn>
      </div>

      <FadeIn waitForIntro delay={0.25}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-2 border-ink rounded-lg overflow-hidden">
          {kpis.map((k, i) => (
            <div
              key={k.label}
              className={`relative text-center px-[14px] py-[18px] border-r border-ink/12 last:border-r-0 ${
                i % 2 === 0 ? "bg-cream" : "bg-cream-dark"
              } ${i === 4 ? "col-span-2 md:col-span-1" : ""} ${i >= 3 ? "border-t border-ink/12 lg:border-t-0" : ""}`}
            >
              <span className="block font-display text-[2.4rem] text-rust leading-none">
                {k.value}
              </span>
              <span className="block font-heading text-[0.7rem] tracking-[0.1em] uppercase text-khaki mt-[3px]">
                {k.label}
              </span>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
