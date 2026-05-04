"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useIntroDone } from "@/hooks/useIntroDone";

interface FadeInProps extends Omit<HTMLMotionProps<"div">, "initial" | "animate" | "whileInView" | "viewport"> {
  delay?: number;
  yOffset?: number;
  /** When true, animate in once the intro video ends instead of on scroll-into-view. */
  waitForIntro?: boolean;
}

export function FadeIn({
  delay = 0,
  yOffset = 24,
  waitForIntro = false,
  children,
  transition,
  ...rest
}: FadeInProps) {
  const introDone = useIntroDone();

  if (waitForIntro) {
    return (
      <motion.div
        initial={{ opacity: 0, y: yOffset }}
        animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
        transition={{ duration: 0.55, ease: "easeOut", delay, ...transition }}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay, ...transition }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
