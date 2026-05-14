"use client";

import { portfolioData } from "@/data/portfolio";
import { FadeIn } from "@/components/ui/FadeIn";
import { ContactItem } from "@/components/ui/ContactItem";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { ContactForm } from "../ui/ContactForm";

export function Contact() {
  const { profile, contactSubtitle } = portfolioData;

  return (
    <section
      id="contact"
      className="bg-ink rounded-b-2xl px-5 py-12 md:px-14 md:pt-14 md:pb-15"
    >
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <FadeIn>
          <h2 className="font-display text-[2.6rem] md:text-[3.4rem] tracking-[0.04em] text-cream leading-none mb-[10px]">
            Let&apos;s
            <br />
            <span className="text-rust">Connect</span>
          </h2>
          <p className="font-serif italic text-[0.95rem] text-cream/45 leading-[1.75] mb-6">
            {contactSubtitle}
          </p>

          <div className="flex flex-col gap-2 mb-5">
            <ContactItem
              icon="mail"
              label="Email"
              value={profile.contact.email}
              href={`mailto:${profile.contact.email}`}
            />
            <ContactItem
              icon="phone"
              label="Phone"
              value={profile.contact.phone}
              href={`tel:${profile.contact.phoneHref}`}
            />
            {profile.socials.map((s) => (
              <ContactItem
                key={s.platform}
                icon={s.icon}
                label={s.platform}
                value={s.label}
                href={s.url}
                external
              />
            ))}
            <ContactItem
              icon="location"
              label="Location"
              value={profile.contact.location}
            />
            <ContactItem
              icon="cv"
              label="Curriculum Vitae"
              value="View / Download CV"
              href={profile.cvUrl}
              external
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <ContactForm />
          {/* <VideoPlayer src="/media/introMobile.mp4" loop playsInline muted autoPlay /> */}
        </FadeIn>
      </div>

      <div className="mt-9 pt-[18px] border-t border-khaki/8 flex flex-col md:flex-row gap-3 justify-between items-start md:items-center">
        <p className="font-serif italic text-[0.78rem] text-cream/20">
          {profile.footerQuote}
        </p>
        <p className="font-display text-[0.95rem] tracking-[0.1em] text-rust/30">
          {profile.footerSig}
        </p>
      </div>
    </section>
  );
}
