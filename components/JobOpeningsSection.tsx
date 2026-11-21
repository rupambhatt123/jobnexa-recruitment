"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export interface JobOpeningItem {
  id: string;
  title: string;
  type: string;
  location: string;
  experience: string;
  description: string;
}

export interface JobOpeningsSectionProps {
  sectionId?: string;
  eyebrow?: string;
  headingStart?: string;
  headingHighlight?: string;
  subtitle?: string;
  applyButtonLabel?: string;
  selectedPrefix?: string;
  selectedSuffix?: string;
  viewMoreButton?: {
    label: string;
    href: string;
  };
  items?: JobOpeningItem[];
}

const font = "'Montserrat', 'Poppins', system-ui, sans-serif";

export default function JobOpeningsSection({
  sectionId,
  eyebrow,
  headingStart,
  headingHighlight,
  subtitle,
  applyButtonLabel,
  selectedPrefix,
  selectedSuffix,
  viewMoreButton,
  items = [],
}: JobOpeningsSectionProps) {
  const reduce = useReducedMotion();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    if (!items.length) return;
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (!items.length) return;
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const renderJobCard = (job: JobOpeningItem, i: number) => {
    const selected = selectedRole === job.title;
    return (
      <motion.div
        key={job.id}
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: "some" }}
        transition={{
          duration: 0.6,
          delay: 0.15 + i * 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex"
      >
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={`group relative flex w-full flex-col overflow-hidden rounded-[22px] bg-white px-5 pb-5 pt-5 shadow-[0_14px_36px_rgba(10,21,80,0.08)] ring-1 transition-shadow duration-300 hover:shadow-[0_24px_54px_rgba(255,107,0,0.18)] lg:rounded-[1.6cqw] lg:pb-[1.55cqw] lg:pl-[2cqw] lg:pr-[1.4cqw] lg:pt-[1.6cqw] ${
            selected ? "ring-2 ring-[#FF6B00]" : "ring-white"
          }`}
        >
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#FF6B00] to-[#FFB347] transition-transform duration-500 group-hover:scale-x-100"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-50/70 via-transparent to-indigo-50/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />

          <div className="relative flex justify-end">
            <span className="relative overflow-hidden rounded-full bg-[#FFF0E3] px-3 py-1 text-[11px] font-semibold text-[#FF6B00] lg:px-[1.4cqw] lg:py-[0.45cqw] lg:text-[0.95cqw]">
              {job.type}
              {!reduce && (
                <motion.span
                  aria-hidden
                  className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/70"
                  animate={{ left: ["-60%", "160%"] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    repeatDelay: 3.5 + i * 0.6,
                    ease: "easeInOut",
                  }}
                />
              )}
            </span>
          </div>

          <div className="relative flex items-center lg:min-h-[4.1cqw]">
            <h3 className="text-xl font-extrabold leading-[1.25] text-[#0A1550] lg:text-[1.55cqw]">
              {job.title}
            </h3>
          </div>

          <div className="relative mt-3 flex flex-wrap items-center text-sm font-semibold text-[#0A1550] lg:mt-[0.9cqw] lg:flex-nowrap lg:text-[1.1cqw]">
            <span className="inline-flex items-center gap-2 lg:gap-[0.7cqw]">
              <MapPin className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-[#FF6B00] lg:h-[1.25cqw] lg:w-[1.25cqw]" />
              {job.location}
            </span>
            <span className="mx-3 h-5 w-px bg-slate-200 lg:mx-[1.6cqw] lg:h-[1.5cqw]" />
            <span className="inline-flex items-center gap-2 lg:gap-[0.7cqw]">
              <Briefcase className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-[#FF6B00] lg:h-[1.25cqw] lg:w-[1.25cqw]" />
              {job.experience}
            </span>
          </div>

          <p className="relative mt-4 text-[13px] font-medium leading-relaxed text-[#4A5068] lg:mt-[1.5cqw] lg:min-h-[5.2cqw] lg:text-[1.12cqw] lg:leading-[1.72]">
            {job.description}
          </p>

          <div className="relative mt-auto flex justify-end border-t border-slate-100 pt-4 lg:pt-[1.45cqw]">
            <motion.button
              type="button"
              onClick={() => setSelectedRole(job.title)}
              whileTap={{ scale: 0.95 }}
              className="group/btn relative overflow-hidden rounded-full border-2 border-[#1A1F7A] px-5 py-2 text-sm font-bold text-[#0A1550] transition-colors duration-300 hover:text-white lg:px-[2.4cqw] lg:py-[0.75cqw] lg:text-[1.1cqw]"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 bg-[#1A1F7A] transition-transform duration-300 group-hover/btn:scale-x-100"
              />
              <span className="relative inline-flex items-center gap-2">
                {selected && (
                  <CheckCircle2 className="h-4 w-4 text-[#FF6B00]" />
                )}
                {applyButtonLabel}
              </span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const currentJob = items[activeIndex];

  return (
    <section
      id={sectionId}
      className="relative isolate overflow-x-clip pt-5 pb-8 sm:pt-6 sm:pb-10"
      style={{
        fontFamily: font,
        background:
          "radial-gradient(45% 45% at 50% 0%, rgba(255,107,0,0.06) 0%, rgba(255,107,0,0) 70%)," +
          "radial-gradient(40% 50% at 0% 100%, rgba(67,56,202,0.07) 0%, rgba(67,56,202,0) 70%)," +
          "radial-gradient(40% 50% at 100% 100%, rgba(37,99,235,0.07) 0%, rgba(37,99,235,0) 70%)," +
          "linear-gradient(180deg, #F9FAFF 0%, #F3F6FD 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(rgba(10,21,80,0.10) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse at 50% 45%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 45%, black 20%, transparent 75%)",
        }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[18%] top-0 -z-10 h-64 w-64 rounded-full bg-orange-300/20 blur-3xl"
        animate={reduce ? undefined : { x: [0, 60, 0], y: [0, 25, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-[15%] -z-10 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl"
        animate={reduce ? undefined : { x: [0, -60, 0], y: [0, -25, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {!reduce && (
        <>
          <motion.span
            aria-hidden
            className="pointer-events-none absolute left-[4%] top-[18%] -z-10 hidden h-10 w-10 rounded-full border-2 border-[#FF6B00]/30 lg:block"
            animate={{ y: [0, -18, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            aria-hidden
            className="pointer-events-none absolute right-[5%] top-[30%] -z-10 hidden h-6 w-6 rounded-full border-2 border-indigo-500/30 lg:block"
            animate={{ y: [0, 16, 0], scale: [1, 1.2, 1] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </>
      )}

      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 [container-type:inline-size]">
        <div className="text-center lg:pt-[0.7cqw]">
          <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-[1.9cqw]">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{ originX: 1 }}
              className="h-[3px] w-9 rounded-full bg-[#FF6B00] sm:w-16 lg:h-[0.2cqw] lg:w-[4.8cqw]"
            />
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-sm font-bold text-[#0A1550] sm:text-xl lg:text-[1.6cqw]"
            >
              {eyebrow}
            </motion.span>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{ originX: 0 }}
              className="h-[3px] w-9 rounded-full bg-[#FF6B00] sm:w-16 lg:h-[0.2cqw] lg:w-[4.8cqw]"
            />
          </div>

          <h2 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight text-[#0A1550] sm:text-4xl lg:mt-[0.6cqw] lg:text-[3.2cqw]">
            <motion.span
              className="block"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {headingStart}{" "}
              <span className="relative inline-block">
                <motion.span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg,#FF6B00 0%,#FFA03A 50%,#FF6B00 100%)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={
                    reduce ? undefined : { backgroundPosition: ["0% 0%", "200% 0%"] }
                  }
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  {headingHighlight}
                </motion.span>
              </span>
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mx-auto mt-2.5 max-w-xl px-2 text-sm font-medium text-[#3B4264] sm:mt-3 sm:max-w-2xl sm:px-0 sm:text-base lg:mt-[0.9cqw] lg:max-w-none lg:text-[1.5cqw]"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Phone view: 1 card front mein, baaki arrow se slide */}
        <div className="mt-6 sm:hidden">
          {currentJob && renderJobCard(currentJob, activeIndex)}

          {items.length > 1 && (
            <div className="mt-4 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous job opening"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0A1550] shadow ring-1 ring-slate-200 transition hover:bg-[#FF6B00] hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-xs font-bold text-[#0A1550]">
                {activeIndex + 1} / {items.length}
              </span>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next job opening"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0A1550] shadow ring-1 ring-slate-200 transition hover:bg-[#FF6B00] hover:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Tablet & Desktop view */}
        <div className="mt-8 hidden gap-5 sm:grid sm:grid-cols-2 lg:mt-[3.4cqw] lg:grid-cols-4 lg:gap-[1.1cqw]">
          {items.map((job, i) => renderJobCard(job, i))}
        </div>

        {selectedRole && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-6 max-w-3xl rounded-2xl border border-orange-200 bg-orange-50 px-5 py-3 text-center text-sm font-semibold text-[#0A1550]"
          >
            {selectedPrefix}{" "}
            <span className="text-[#FF6B00]">{selectedRole}</span>{" "}
            {selectedSuffix}
          </motion.div>
        )}

        {viewMoreButton?.label && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-7 flex justify-center sm:mt-8 lg:mt-[3.6cqw]"
          >
            <motion.a
              href={viewMoreButton.href}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#0B1A6B] px-7 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(11,26,107,0.35)] sm:px-8 sm:py-3.5 sm:text-base lg:gap-[1.2cqw] lg:px-[4.4cqw] lg:py-[1.3cqw] lg:text-[1.55cqw]"
            >
              {!reduce && (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-[#FF6B00]/30"
                  animate={{ opacity: [0, 0.6, 0] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/25 opacity-0 blur-sm transition-all duration-700 group-hover:left-[130%] group-hover:opacity-100"
              />
              <span className="relative">{viewMoreButton.label}</span>
              <ArrowRight
                className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5 sm:h-5 sm:w-5 lg:h-[1.7cqw] lg:w-[1.7cqw]"
                strokeWidth={2.5}
              />
            </motion.a>
          </motion.div>
        )}
      </div>
    </section>
  );
}