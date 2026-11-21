"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

export interface AboutStatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface AboutSectionProps {
  sectionId: string;
  topWord?: string;
  accentWord?: string;
  summary: string;
  teamImage: string;
  teamImageAlt: string;
  officeImage: string;
  officeImageAlt: string;
  missionTitle: string;
  missionText: string;
  stats?: AboutStatItem[];
}

const headingFont = "'Montserrat', 'Poppins', system-ui, sans-serif";
const bodyFont = "'Poppins', 'Montserrat', system-ui, sans-serif";

function CountUp({
  to,
  suffix,
  reduce,
}: {
  to: number;
  suffix: string;
  reduce: boolean | null;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

function RisingWord({
  word = "",
  className,
  letterClasses,
  delay = 0,
}: {
  word?: string;
  className?: string;
  letterClasses?: string[];
  delay?: number;
}) {
  const group: Variants = {
    hidden: {},
    show: { transition: { delayChildren: delay, staggerChildren: 0.08 } },
  };
  const letter: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.span
      variants={group}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={`flex ${className ?? ""}`}
      aria-label={word}
    >
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          variants={letter}
          className={`inline-block px-[0.02em] ${letterClasses?.[i] ?? ""}`}
        >
          {ch}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function AboutSection({
  sectionId,
  topWord = "",
  accentWord = "",
  summary,
  teamImage,
  teamImageAlt,
  officeImage,
  officeImageAlt,
  missionTitle,
  missionText,
  stats = [],
}: AboutSectionProps) {
  const reduce = useReducedMotion();

  return (
    <section
      id={sectionId}
      className="relative isolate overflow-x-clip py-7 sm:py-9"
      style={{
        fontFamily: bodyFont,
        background: "#FFFFFF",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 [container-type:inline-size]">
        <div className="grid grid-cols-1 items-start gap-6 sm:gap-7 lg:grid-cols-[20fr_51fr_27.5fr] lg:gap-x-[2cqw] lg:gap-y-0">
          <div className="relative z-10">
            <h2
              className="text-[48px] font-black leading-[1.03] tracking-tight sm:text-[84px] lg:text-[9.8cqw] lg:leading-[1.04]"
              style={{ fontFamily: headingFont }}
            >
              <RisingWord word={topWord} className="text-[#0A1550]" />
              <RisingWord
                word={accentWord}
                delay={0.35}
                letterClasses={[
                  "bg-gradient-to-r from-[#FF6B00] to-[#FF7A00] bg-clip-text text-transparent",
                  "bg-gradient-to-r from-[#FF7A00] to-[#FFA81F] bg-clip-text text-transparent",
                ]}
              />
            </h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
              style={{ originX: 0 }}
              className="mb-3 mt-4 h-[6px] w-[56px] rounded-full bg-[#4A1FC8] sm:mb-3.5 sm:mt-5 sm:h-[7px] sm:w-[64px] lg:mb-[1.8cqw] lg:mt-[2cqw] lg:h-[0.45cqw] lg:w-[6cqw]"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="max-w-full text-[14px] font-medium leading-[1.5] text-[#0A1550] sm:max-w-[300px] sm:text-[15px] lg:max-w-none lg:text-[1.18cqw]"
            >
              {summary}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="lg:mt-[4.2cqw]"
          >
            <div className="group relative aspect-[1.42] overflow-hidden rounded-[24px] sm:aspect-[1.46] sm:rounded-[30px] lg:rounded-[3.2cqw]">
              <img
                src={teamImage}
                alt={teamImageAlt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 bg-white/25 blur-md"
                initial={{ x: "-100%" }}
                whileInView={{ x: "600%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 1, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="lg:mt-[6.2cqw]"
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="group aspect-[2.05] overflow-hidden rounded-[22px] sm:aspect-[2.15] sm:rounded-[26px] lg:rounded-[2.6cqw]"
            >
              <img
                src={officeImage}
                alt={officeImageAlt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>

            <h3
              className="mt-4 whitespace-nowrap text-[26px] font-extrabold leading-none text-[#0A1550] sm:mt-4 sm:text-[32px] lg:mt-[1.6cqw] lg:text-[2.85cqw]"
              style={{ fontFamily: headingFont }}
            >
              {missionTitle}
            </h3>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
              style={{ originX: 0 }}
              className="my-2.5 h-[5px] w-16 rounded-full bg-[#FF6B00] sm:my-2.5 sm:h-[6px] sm:w-20 lg:my-[1cqw] lg:h-[0.4cqw] lg:w-[4.5cqw]"
            />
            <p className="text-[14px] font-medium leading-[1.48] text-[#0A1550] sm:text-[15px] lg:text-[1.16cqw]">
              {missionText}
            </p>
          </motion.div>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-4 sm:mt-8 sm:gap-y-6 md:grid-cols-4 lg:mt-[3.2cqw]">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className="flex items-center justify-start gap-2.5 px-1 sm:justify-center sm:gap-4 sm:px-2 md:border-r md:border-slate-200 md:last:border-r-0 lg:gap-[1.6cqw]"
            >
              <span
                className="text-[32px] font-bold leading-none text-[#FF6B00] sm:text-[42px] lg:text-[4.6cqw]"
                style={{ fontFamily: headingFont }}
              >
                <CountUp to={s.value} suffix={s.suffix} reduce={reduce} />
              </span>
              <span
                className="max-w-[95px] text-[13px] font-bold leading-snug text-[#0A1550] sm:max-w-[110px] sm:text-[14px] lg:max-w-[8.5cqw] lg:text-[1.22cqw]"
                style={{ fontFamily: headingFont }}
              >
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
