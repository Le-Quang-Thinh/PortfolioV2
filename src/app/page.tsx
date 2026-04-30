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

export default function Home() {
  return (
    <>
      <IntroVideo />
      <Sidebar />
      <MobileTopbar />
      <main className="min-h-screen pt-14 md:pt-4 md:pr-6 md:py-4
                       md:ml-(--sidebar-offset-md)
                       xl:ml-(--sidebar-offset)">
        <div className="paper-lines bg-cream md:rounded-2xl md:max-w-[1140px] mx-auto overflow-hidden shadow-[0_8px_60px_rgba(0,0,0,0.4)] min-h-[calc(100vh-32px)]">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </div>
      </main>
    </>
  );
}
