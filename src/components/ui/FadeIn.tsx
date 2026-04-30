"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

interface FadeInProps extends Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport"> {
  delay?: number;
  yOffset?: number;
}

export function FadeIn({ delay = 0, yOffset = 24, children, transition, ...rest }: FadeInProps) {
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
