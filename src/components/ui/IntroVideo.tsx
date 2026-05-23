"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { markIntroDone } from "@/lib/introSignal";

export function IntroVideo() {
  const [visible, setVisible] = useState(true);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [visible]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const isMobileOrTablet = window.matchMedia("(max-width: 1024px)").matches;
    v.src = isMobileOrTablet ? "/media/introMobile.mp4" : "/media/intro.mp4";
    v.load();
    v.play().catch(() => {});
  }, []);

  const dismiss = () => {
    markIntroDone();
    setVisible(false);
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed inset-0 z-9999 bg-black flex items-center justify-center"
        >
          <video
            ref={videoRef}
            muted
            playsInline
            onEnded={dismiss}
            className="w-full h-full object-contain"
          />

          <button
            type="button"
            onClick={dismiss}
            className="absolute top-6 right-6 px-4 py-2 text-sm font-(family-name:--font-oswald) tracking-wider text-cream/90 bg-black/40 backdrop-blur-sm border border-cream/30 rounded-full hover:bg-black/60 transition"
          >
            SKIP INTRO →
          </button>

          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="absolute bottom-6 right-6 w-10 h-10 flex items-center justify-center text-cream/90 bg-black/40 backdrop-blur-sm border border-cream/30 rounded-full hover:bg-black/60 transition"
          >
            {muted ? "🔇" : "🔊"}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
