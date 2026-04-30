"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

  const handleEnd = () => setVisible(false);
  const handleSkip = () => setVisible(false);
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
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          <video
            ref={videoRef}
            src="/media/intro.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleEnd}
            className="w-full h-full object-cover"
          />

          <button
            type="button"
            onClick={handleSkip}
            className="absolute top-6 right-6 px-4 py-2 text-sm font-[family-name:var(--font-oswald)] tracking-wider text-cream/90 bg-black/40 backdrop-blur-sm border border-cream/30 rounded-full hover:bg-black/60 transition"
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
