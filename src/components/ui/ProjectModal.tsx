"use client";

import { useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { Project, ClassificationLevel } from "@/data/portfolio";
import { Icon, type IconName } from "@/components/ui/Icon";
import { BlueprintSchematic } from "@/components/ui/BlueprintSchematic";

const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const thumbGradient: Record<Project["thumbType"], string> = {
  tv: "bg-[linear-gradient(135deg,#1a2a4a_0%,#0d1830_100%)]",
  web: "bg-[linear-gradient(135deg,#0d3a2a_0%,#062018_100%)]",
  cms: "bg-[linear-gradient(135deg,#3a1a0d_0%,#201008_100%)]",
  cast: "bg-[linear-gradient(135deg,#0d1a3a_0%,#060d28_100%)]",
};

const classificationConfig: Record<
  ClassificationLevel,
  { label: string; color: string; border: string }
> = {
  SECRET: {
    label: "SECRET",
    color: "text-rust",
    border: "border-rust",
  },
  CONFIDENTIAL: {
    label: "CONFIDENTIAL",
    color: "text-rust",
    border: "border-rust",
  },
  INTERNAL: {
    label: "INTERNAL",
    color: "text-navy",
    border: "border-navy",
  },
  PUBLIC: {
    label: "PUBLIC",
    color: "text-khaki",
    border: "border-khaki",
  },
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  // ✅ FIX #1 [Dep arrays]: stable ref so handleKeyDown never changes even when
  // parent passes an inline arrow (e.g. () => setSelected(null)) each render
  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onCloseRef.current();
  }, []);

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, handleKeyDown]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[9998] bg-ink/75 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal content */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-subtitle"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", damping: 28, stiffness: 320, mass: 0.85, opacity: { duration: 0.2, ease: "easeOut" } }}
            className="fixed inset-0 z-[9998] flex items-center justify-center p-4 md:p-6 pointer-events-none"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="relative w-full max-w-[1040px] max-h-[92vh] overflow-y-auto bg-cream rounded-xl shadow-[0_24px_80px_rgba(0,0,0,0.5)] pointer-events-auto before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[4px] before:bg-rust before:rounded-t-xl before:z-10"
            >

              {/* ── HEADER ── */}
              <motion.div variants={sectionVariants} className={`relative h-[180px] flex flex-col justify-end overflow-hidden ${thumbGradient[project.thumbType]}`}>
                {/* Blueprint schematic behind header */}
                <div className="absolute inset-0 opacity-[0.08]">
                  <BlueprintSchematic thumbType={project.thumbType} className="w-full h-full" />
                </div>

                {/* Classification stamp */}
                {project.classification && (() => {
                  const cfg = classificationConfig[project.classification];
                  return (
                    <span
                      className={`absolute top-4 left-5 border-2 rounded-sm px-[10px] py-[3px] font-display text-[0.75rem] tracking-[0.18em] uppercase opacity-75 -rotate-1 ${cfg.color} ${cfg.border}`}
                    >
                      {cfg.label}
                    </span>
                  );
                })()}

                {/* Close button */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close project details"
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 hover:text-white transition-colors duration-150"
                  autoFocus
                >
                  <X size={16} strokeWidth={2} />
                </button>

                {/* Header content */}
                <div className="relative z-10 px-6 pb-5">
                  <h2
                    id="modal-title"
                    className="font-display text-[2rem] md:text-[2.6rem] tracking-[0.05em] text-white leading-none mb-1"
                  >
                    {project.title.toUpperCase()}
                  </h2>
                  <p
                    id="modal-subtitle"
                    className="font-heading text-[0.78rem] tracking-[0.12em] text-white/60 uppercase mb-3"
                  >
                    {project.subtitle}
                  </p>
                  {/* Platform badges */}
                  <div className="flex flex-wrap gap-[6px]">
                    {project.platforms.map((p) => (
                      <span
                        key={p}
                        className="font-mono text-[0.6rem] px-[7px] py-[2px] rounded-[3px] bg-white/10 border border-white/25 text-white/75 tracking-wider"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* ── METADATA STRIP ── */}
              <motion.div variants={sectionVariants} className="flex flex-wrap items-center gap-3 px-6 py-3 bg-cream-dark border-b border-ink-soft/10">
                {project.role && (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[0.58rem] tracking-[0.1em] text-khaki uppercase">Role</span>
                    <span className="font-mono text-[0.68rem] text-ink-soft bg-ink-soft/[0.06] border border-ink-soft/15 px-[8px] py-[2px] rounded-sm">
                      {project.role}
                    </span>
                  </div>
                )}
                {project.duration && (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[0.58rem] tracking-[0.1em] text-khaki uppercase">Duration</span>
                    <span className="font-mono text-[0.68rem] text-ink  text-cream px-[8px] py-[2px] rounded-sm">
                      {project.duration}
                    </span>
                  </div>
                )}
              </motion.div>

              {/* ── BODY ── */}
              <motion.div variants={sectionVariants} className="relative px-6 py-7">
                {/* Blueprint schematic background */}
                <div className="absolute inset-0 opacity-[0.055] pointer-events-none overflow-hidden rounded-b-xl">
                  <BlueprintSchematic thumbType={project.thumbType} className="w-full h-full" />
                </div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

                  {/* ── RESPONSIBILITIES ── */}
                  {project.responsibilities && project.responsibilities.length > 0 && (
                    <div className="lg:col-span-7">
                      <p className="font-mono text-[0.6rem] tracking-[0.2em] text-rust uppercase mb-1">01</p>
                      <h3 className="font-heading text-[0.9rem] tracking-[0.1em] text-ink uppercase font-semibold mb-1">
                        Responsibilities
                      </h3>
                      <div className="w-6 h-[2px] bg-rust mb-4" />
                      <ul className="flex flex-col gap-[10px]">
                        {project.responsibilities.map((item) => (
                          <li
                            key={item}
                            className="text-[0.86rem] text-ink-soft leading-[1.65] pl-[18px] relative before:content-['▸'] before:absolute before:left-0 before:top-0 before:text-rust before:text-[0.7rem] before:leading-[1.8]"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* ── TECH STACK ── */}
                  <div className={project.responsibilities && project.responsibilities.length > 0 ? "lg:col-span-5" : "lg:col-span-12"}>
                    <p className="font-mono text-[0.6rem] tracking-[0.2em] text-navy uppercase mb-1">Stack</p>
                    <h3 className="font-heading text-[0.9rem] tracking-[0.1em] text-ink uppercase font-semibold mb-1">
                      Technologies
                    </h3>
                    <div className="w-6 h-[2px] bg-navy mb-4" />
                    <div className="flex flex-wrap gap-[7px]">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[0.7rem] px-[10px] py-[5px] rounded-sm border border-ink-soft/20 text-ink-soft bg-cream-dark hover:border-navy/40 hover:text-navy transition-colors duration-150"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Description block */}
                    <div className="mt-5 bg-cream-dark border border-ink-soft/10 rounded-sm px-4 py-[14px]">
                      <p className="font-serif text-[0.86rem] text-ink-soft leading-[1.7] italic">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ── BUSINESS IMPACT ── */}
                <div className="relative z-10 mt-8 pt-8 border-t border-ink-soft/10">
                  <p className="font-mono text-[0.6rem] tracking-[0.2em] text-rust uppercase mb-1">02</p>
                  <h3 className="font-heading text-[0.9rem] tracking-[0.1em] text-ink uppercase font-semibold mb-1">
                    Business Impact
                  </h3>
                  <div className="w-6 h-[2px] bg-rust mb-5" />

                  {/* Metrics grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-5">
                    {project.metrics.map((m) => (
                      <div
                        key={m.text}
                        className="bg-cream-dark border border-rust/15 rounded-sm px-4 py-[14px] flex flex-col items-start gap-2"
                      >
                        <span className="text-rust opacity-80">
                          <Icon name={m.icon as IconName} size={16} strokeWidth={1.5} />
                        </span>
                        <span className="font-mono text-[0.72rem] text-ink-soft leading-[1.4]">{m.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Outcomes bullets */}
                  {project.outcomes && project.outcomes.length > 0 && (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-[8px]">
                      {project.outcomes.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-[0.84rem] text-ink-soft leading-[1.6]"
                        >
                          <span className="mt-[4px] w-[5px] h-[5px] rounded-full bg-navy flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>

              {/* ── FOOTER ── */}
              <motion.div variants={sectionVariants} className="flex flex-wrap items-center justify-center gap-3 px-6 py-4 bg-cream-dark border-t border-ink-soft/10 rounded-b-xl">
                {["Production Grade Quality", "Architecture Approved", "Delivered at Scale"].map((label) => (
                  <span
                    key={label}
                    className="font-mono text-[0.58rem] tracking-[0.15em] uppercase text-khaki border border-khaki/30 px-[10px] py-[4px] rounded-sm bg-ink-soft/[0.03]"
                  >
                    {label}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
