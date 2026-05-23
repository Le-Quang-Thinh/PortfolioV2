"use client";

import { useEffect, useRef, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { ContactItem } from "@/components/ui/ContactItem";
import { FadeIn } from "@/components/ui/FadeIn";

const PHRASES = ["FOR WATCHING", "FOR YOUR TIME", "FOR SCROLLING", "FOR VISITING"];

const ORANGE = "#D96C3F";
const CREAM = "#F4EBDC";
const BG = "#0D0B09";

// Isolated component so only this node re-renders during typing (every 55–115ms)
function TypingCarousel({ active }: { active: boolean }) {
  const [typedText, setTypedText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!active) return;
    const phrase = PHRASES[phraseIdx];
    let t: ReturnType<typeof setTimeout>;

    if (!isDeleting && typedText === phrase) {
      t = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && typedText === "") {
      t = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIdx((p) => (p + 1) % PHRASES.length);
      }, 380);
    } else {
      t = setTimeout(
        () => setTypedText(isDeleting ? phrase.slice(0, typedText.length - 1) : phrase.slice(0, typedText.length + 1)),
        isDeleting ? 55 : 115
      );
    }
    return () => clearTimeout(t);
  }, [active, typedText, phraseIdx, isDeleting]);

  return (
    <div style={{ height: "clamp(22px,2.2vw,32px)", display: "flex", alignItems: "flex-end" }}>
      <span
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(13px,1.4vw,22px)",
          fontWeight: 700,
          color: ORANGE,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        {typedText}
        {/* CSS animation replaces setInterval+state that re-rendered Contact at 530ms intervals */}
        <span
          style={{
            display: "inline-block",
            width: 2,
            height: "0.8em",
            background: ORANGE,
            marginLeft: 4,
            verticalAlign: "middle",
            animation: "contact-cursor-blink 1.06s step-end infinite",
          }}
        />
      </span>
    </div>
  );
}

export function Contact() {
  const { profile, contactSubtitle } = portfolioData;

  const sectionRef = useRef<HTMLElement>(null);
  const bgGlowRef = useRef<HTMLDivElement>(null);
  const blueprintWrapperRef = useRef<HTMLDivElement>(null);
  const thankYouRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const hasAnimated = useRef(false);

  const [carouselActive, setCarouselActive] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver;
    let glowAnim: { pause: () => void } | null = null;
    let blueprintAnim: { pause: () => void } | null = null;

    const init = async () => {
      const { animate, createTimeline } = await import("animejs");

      if (bgGlowRef.current) {
        glowAnim = animate(bgGlowRef.current, {
          opacity: [0.08, 0.18],
          scale: [0.93, 1.07],
          duration: 9000,
          easing: "easeInOutSine",
          direction: "alternate",
          loop: true,
        });
      }

      // Animate wrapper div, not SVG directly — enables GPU compositing
      if (blueprintWrapperRef.current) {
        blueprintAnim = animate(blueprintWrapperRef.current, {
          rotate: [0, 360],
          duration: 80000,
          easing: "linear",
          loop: true,
        });
      }

      observer = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting || hasAnimated.current) return;
          hasAnimated.current = true;

          const tl = createTimeline();
          if (thankYouRef.current) {
            tl.add(thankYouRef.current, { opacity: [0, 1], translateY: [60, 0], scale: [0.96, 1], duration: 1300, easing: "easeOutExpo" });
          }
          if (descRef.current) {
            tl.add(descRef.current, { opacity: [0, 1], translateY: [24, 0], duration: 900, easing: "easeOutCubic" }, "-=700");
          }
          setTimeout(() => setCarouselActive(true), 1100);
        },
        { threshold: 0.25 }
      );

      if (sectionRef.current) observer.observe(sectionRef.current);
    };

    init();
    return () => {
      observer?.disconnect();
      glowAnim?.pause();
      blueprintAnim?.pause();
    };
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden rounded-b-2xl" style={{ background: BG }}>

      {/* Ambient glow */}
      <div
        ref={bgGlowRef}
        className="pointer-events-none absolute"
        style={{
          right: "5%", top: "50%", transform: "translate(0,-50%)",
          width: 640, height: 640, borderRadius: "50%", opacity: 0.08,
          background: "radial-gradient(circle, rgba(217,108,63,0.11) 0%, transparent 68%)",
        }}
      />

      <div className="relative z-10 grid lg:grid-cols-2 gap-0">

        {/* LEFT — contact info */}
        <div className="px-5 py-12 md:px-14 md:pt-16 md:pb-14 border-r border-white/4">
          <FadeIn>
            <h2
              className="text-cream leading-none mb-2.5"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem,5vw,3.4rem)", letterSpacing: "0.04em" }}
            >
              Let&apos;s<br />
              <span style={{ color: "#C8643A" }}>Connect</span>
            </h2>
            <p className="font-serif italic leading-[1.75] mb-7" style={{ fontSize: "0.95rem", color: "rgba(231,223,201,0.45)" }}>
              {contactSubtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-col gap-3.5">
              <ContactItem icon="mail" label="Email" value={profile.contact.email} href={`mailto:${profile.contact.email}`} />
              <ContactItem icon="phone" label="Phone" value={profile.contact.phone} href={`tel:${profile.contact.phoneHref}`} />
              {profile.socials.map((s) => (
                <ContactItem key={s.platform} icon={s.icon} label={s.platform} value={s.label} href={s.url} external />
              ))}
              <ContactItem icon="location" label="Location" value={profile.contact.location} />
              <ContactItem icon="cv" label="Curriculum Vitae" value="View / Download CV" href={profile.cvUrl} external />
            </div>
          </FadeIn>
        </div>

        {/* RIGHT — cinematic closing panel */}
        <div className="relative flex items-center justify-center px-8 py-16 md:py-20 md:px-14 min-h-120 lg:min-h-0 overflow-hidden">

          {/* Rotating blueprint grid — div wrapper for hardware-accelerated GPU compositing */}
          <div
            ref={blueprintWrapperRef}
            className="pointer-events-none absolute inset-0 w-full h-full"
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 600 600"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              {Array.from({ length: 13 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 50} x2="600" y2={i * 50} stroke={ORANGE} strokeWidth="0.4" opacity="0.05" />
              ))}
              {Array.from({ length: 13 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="600" stroke={ORANGE} strokeWidth="0.4" opacity="0.05" />
              ))}
              {[240, 190, 140, 90, 46].map((r, i) => (
                <circle key={r} cx="300" cy="300" r={r} fill="none" stroke={ORANGE} strokeWidth={i === 0 ? 0.8 : 0.5} opacity={i === 0 ? 0.08 : 0.05} />
              ))}
              {([[300,300],[180,180],[420,420],[180,420],[420,180]] as [number,number][]).map(([cx,cy], i) => (
                <g key={i} opacity="0.06">
                  <line x1={cx-10} y1={cy} x2={cx+10} y2={cy} stroke={ORANGE} strokeWidth="0.6" />
                  <line x1={cx} y1={cy-10} x2={cx} y2={cy+10} stroke={ORANGE} strokeWidth="0.6" />
                </g>
              ))}
            </svg>
          </div>

          {/* Corner brackets */}
          <div className="pointer-events-none absolute inset-5">
            <div className="absolute top-0 left-0 w-7 h-7 border-t border-l" style={{ borderColor: "rgba(217,108,63,0.35)" }} />
            <div className="absolute top-0 right-0 w-7 h-7 border-t border-r" style={{ borderColor: "rgba(217,108,63,0.35)" }} />
            <div className="absolute bottom-0 left-0 w-7 h-7 border-b border-l" style={{ borderColor: "rgba(217,108,63,0.35)" }} />
            <div className="absolute bottom-0 right-0 w-7 h-7 border-b border-r" style={{ borderColor: "rgba(217,108,63,0.35)" }} />
          </div>

          {/* Text stack */}
          <div className="relative z-10 flex flex-col items-center text-center gap-4">

            {/* Arc + heart */}
            <div className="relative" style={{ width: 140, height: 76 }}>
              <svg width="140" height="76" viewBox="0 0 140 76" fill="none" aria-hidden="true">
                <path d="M 8 76 A 62 62 0 0 1 132 76" stroke={ORANGE} strokeWidth="0.8" opacity="0.32" />
                <line x1="70" y1="0" x2="70" y2="30" stroke={ORANGE} strokeWidth="0.6" strokeDasharray="2 3" opacity="0.38" />
              </svg>
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex items-center justify-center rounded-full"
                style={{ width: 44, height: 44, border: "1px solid rgba(217,108,63,0.45)", background: BG }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
            </div>

            {/* THANK YOU */}
            <div ref={thankYouRef} style={{ opacity: 0, marginTop: 20 }}>
              <span
                className="block leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(52px,10vw,120px)",
                  fontWeight: 700,
                  color: CREAM,
                  letterSpacing: "0.02em",
                  lineHeight: 0.9,
                  textTransform: "uppercase",
                }}
              >
                THANK YOU
              </span>
            </div>

            <TypingCarousel active={carouselActive} />

            {/* Diamond divider */}
            <div className="flex items-center gap-3" style={{ width: "min(260px,68%)" }}>
              <div style={{ flex: 1, height: 1, background: "rgba(217,108,63,0.28)" }} />
              <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
                <polygon points="4,0 8,4 4,8 0,4" fill={ORANGE} opacity="0.65" />
              </svg>
              <div style={{ flex: 1, height: 1, background: "rgba(217,108,63,0.28)" }} />
            </div>

            {/* Description */}
            <p
              ref={descRef}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(13px,1.1vw,17px)",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.8,
                maxWidth: 500,
                opacity: 0,
              }}
            >
              I appreciate you taking the time to explore my work.
              <br />
              Let&apos;s build something amazing together.
            </p>

            <div style={{ width: 20, height: 1, background: "rgba(217,108,63,0.3)", marginTop: -6 }} />
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div
        className="relative z-10 mx-5 md:mx-14 mt-0 pt-4.5 pb-10 border-t flex flex-col md:flex-row gap-3 justify-between items-start md:items-center"
        style={{ borderColor: "rgba(138,126,106,0.08)" }}
      >
        <p className="font-serif italic" style={{ fontSize: "0.78rem", color: "rgba(231,223,201,0.2)" }}>
          {profile.footerQuote}
        </p>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", letterSpacing: "0.1em", color: "rgba(200,100,58,0.3)" }}>
          {profile.footerSig}
        </p>
      </div>
    </section>
  );
}
