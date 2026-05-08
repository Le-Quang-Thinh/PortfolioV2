import type { Metadata } from "next";
import { MemoryArchive } from "@/components/sections/MemoryArchive";

export const metadata: Metadata = {
  title: "Memory Archive — Into the Memory Program",
  description:
    "A futuristic anime-game showcase carousel. Drag through recovered memory chapters in a neon, holographic interface.",
};

export default function MemoryArchivePage() {
  return (
    <div className="fixed inset-0 isolate z-50 overflow-hidden bg-[radial-gradient(ellipse_at_50%_30%,#2a3a8a_0%,#16225e_35%,#0a1030_65%,#04060f_100%)]">
      <MemoryArchive />
    </div>
  );
}
