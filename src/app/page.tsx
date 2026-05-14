import { Sidebar } from "@/components/layout/Sidebar";
import { MobileTopbar } from "@/components/layout/MobileTopbar";
import { IntroVideo } from "@/components/ui/IntroVideo";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { LayoutShell } from "@/components/layout/LayoutShell";

export default function Home() {
  return (
    <>
      <IntroVideo />
      <MobileTopbar />
      <LayoutShell>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </LayoutShell>
    </>
  );
}
