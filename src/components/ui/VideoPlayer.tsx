"use client";

import { useRef, useEffect, type VideoHTMLAttributes } from "react";

interface VideoPlayerProps extends Omit<VideoHTMLAttributes<HTMLVideoElement>, "loop" | "onEnded"> {
  loop?: boolean;
  onEnded?: () => void;
}

export function VideoPlayer({ loop = false, onEnded, className, ...props }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      if (loop) {
        video.currentTime = 0;
        video.play();
      }
      onEnded?.();
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [loop, onEnded]);

  return (
    <video
      ref={videoRef}
      className={className}
      {...props}
    />
  );
}
