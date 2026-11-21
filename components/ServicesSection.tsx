"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export type ServiceIconKind = "resource" | "recruitment" | "leadership";

export interface ServiceCardItem {
  slug: string;
  titleLines?: [string, string] | string[];
  icon: ServiceIconKind;
  image: string;
  href: string;
}

export interface ServicesSectionProps {
  sectionId?: string;
  badge?: string;
  titleLine1?: string;
  titleLine2Prefix?: string;
  titleHighlight?: string;
  description?: string;
  ariaLabelSuffix?: string;
  cards?: ServiceCardItem[];
}

const headingFont = "'Montserrat', 'Poppins', system-ui, sans-serif";
const bodyFont = "'Poppins', 'Montserrat', system-ui, sans-serif";

const NAVY = "#0A1A4F";
const ORANGE = "#FF6B00";

function ResourceIcon({ reduce }: { reduce: boolean | null }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" fill="none" aria-hidden>
      <path
        d="M22 18h40a4 4 0 014 4v52a8 8 0 01-8 8H30a8 8 0 01-8-8V18z"
        stroke={NAVY}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <g stroke={NAVY} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M30 32h10m-3-3l3 3-3 3" />
        <path d="M30 44h10m-3-3l3 3-3 3" />
        <path d="M30 56h10m-3-3l3 3-3 3" />
      </g>
      <g fill={NAVY}>
        {[
          { x: 48, y: 58, h: 12 },
          { x: 55, y: 50, h: 20 },
          { x: 62, y: 42, h: 28 },
        ].map((b, i) => (
          <motion.rect
            key={i}
            x={b.x}
            width="5"
            rx="1"
            initial={{ height: 0, y: 70 }}
            whileInView={{ height: b.h, y: b.y }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.8 + i * 0.12 }}
          />
        ))}
      </g>
      <motion.g
        animate={reduce ? undefined : { y: [0, -3, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="70" cy="22" r="11" fill={ORANGE} />
        <text
          x="70"
          y="27.5"
          textAnchor="middle"
          fontSize="15"
          fontWeight="800"
          fill="#fff"
          fontFamily="Montserrat, sans-serif"
        >
          $
        </text>
      </motion.g>
    </svg>
  );
}

function RecruitIcon({ reduce }: { reduce: boolean | null }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" fill="none" aria-hidden>
      <g fill={NAVY}>
        <circle cx="50" cy="26" r="9" />
        <path d="M34 50c0-9 7-15 16-15s16 6 16 15v2H34v-2z" />
        <circle cx="24" cy="38" r="7" />
        <path d="M10 58c0-8 6-13 14-13 3 0 6 1 8 3-3 3-5 7-5 12H10z" />
        <circle cx="76" cy="38" r="7" />
        <path d="M90 58c0-8-6-13-14-13-3 0-6 1-8 3 3 3 5 7 5 12h17z" />
      </g>
      <motion.g
        animate={reduce ? undefined : { x: [0, 5, 0, -4, 0], y: [0, -3, 0, 3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle
          cx="46"
          cy="64"
          r="16"
          fill="#fff"
          stroke={ORANGE}
          strokeWidth="5"
        />
        <circle cx="46" cy="60" r="4.5" fill={ORANGE} />
        <path
          d="M37 73c1-5 5-7.5 9-7.5s8 2.5 9 7.5"
          fill={ORANGE}
        />
        <path
          d="M58 76l15 15"
          stroke={ORANGE}
          strokeWidth="6"
          strokeLinecap="round"
        />
      </motion.g>
    </svg>
  );
}

function LeadershipIcon(_: { reduce: boolean | null }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" fill="none" aria-hidden>
      <rect
        x="44"
        y="14"
        width="46"
        height="34"
        rx="2"
        stroke={NAVY}
        strokeWidth="3.5"
      />
      <path
        d="M58 48l-5 14M76 48l5 14"
        stroke={NAVY}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <g fill={ORANGE}>
        {[
          { x: 52, y: 34, h: 8 },
          { x: 62, y: 28, h: 14 },
          { x: 72, y: 22, h: 20 },
        ].map((b, i) => (
          <motion.rect
            key={i}
            x={b.x}
            width="6"
            rx="1"
            initial={{ height: 0, y: 42 }}
            whileInView={{ height: b.h, y: b.y }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.8 + i * 0.12 }}
          />
        ))}
      </g>
      <g fill={NAVY}>
        <circle cx="16" cy="28" r="6" />
        <path d="M10 40h12l3 14 8-9 3 3-11 13v18h-5V62h-3v18h-5V54z" />
        <path d="M28 44l14-10 2 3-14 10z" />
        <circle cx="24" cy="86" r="5" />
        <circle cx="50" cy="86" r="5" />
        <circle cx="76" cy="86" r="5" />
        <path d="M16 98c0-6 3-9 8-9s8 3 8 9zM42 98c0-6 3-9 8-9s8 3 8 9zM68 98c0-6 3-9 8-9s8 3 8 9z" />
      </g>
    </svg>
  );
}

function renderServiceIcon(kind: ServiceIconKind, reduce: boolean | null) {
  switch (kind) {
    case "recruitment":
      return <RecruitIcon reduce={reduce} />;
    case "leadership":
      return <LeadershipIcon reduce={reduce} />;
    case "resource":
    default:
      return <ResourceIcon reduce={reduce} />;
  }
}

const notchMask =
  "radial-gradient(ellipse 28% 36% at 100% 100%, transparent 0, transparent 98.5%, #000 100%)";

export default function ServicesSection({
  sectionId,
  badge,
  titleLine1,
  titleLine2Prefix,
  titleHighlight,
  description,
  ariaLabelSuffix,
  cards = [],
}: ServicesSectionProps) {
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    if (!cards.length) return;
    setActiveIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (!cards.length) return;
    setActiveIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  const renderCard = (s: ServiceCardItem, i: number) => {
    const lines = s.titleLines ?? [];
    const fullTitle = lines.join(" ");
    return (
      <motion.article
        key={s.slug ?? i}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.8,
          delay: 0.2 + i * 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.div
          whileHover={{ y: -10 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="group relative rounded-[32px] bg-white p-4 shadow-[0_20px_50px_rgba(10,26,79,0.09)] transition-shadow duration-300 hover:shadow-[0_30px_70px_rgba(255,107,0,0.18)] lg:rounded-[2.6cqw] lg:p-[1.05cqw] lg:pb-[1.6cqw] lg:pt-[2.05cqw]"
        >
          <div className="flex items-start justify-between gap-4 px-1 lg:pl-[2.05cqw] lg:pr-[1.05cqw]">
            <div>
              <h3
                className="text-[22px] font-extrabold leading-[1.18] text-[#0A1550] lg:text-[2.3cqw]"
                style={{ fontFamily: headingFont }}
              >
                {lines.map((line, lineIdx) => (
                  <React.Fragment key={lineIdx}>
                    {lineIdx > 0 && <br />}
                    {line}
                  </React.Fragment>
                ))}
              </h3>
              <span className="mt-3 block h-[5px] w-[56px] origin-left rounded-full bg-[#FF6B00] transition-all duration-500 group-hover:w-[110px] lg:mt-[1.2cqw] lg:h-[0.38cqw] lg:w-[6cqw] lg:group-hover:w-[9cqw]" />
            </div>

            <motion.div
              animate={reduce ? undefined : { y: [0, -5, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
              className="flex h-[72px] w-[78px] shrink-0 items-center justify-center rounded-[22px] bg-[#EDF2FB] p-3 shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 lg:h-[7.8cqw] lg:w-[8.4cqw] lg:rounded-[1.9cqw] lg:p-[1.1cqw]"
            >
              {renderServiceIcon(s.icon, reduce)}
            </motion.div>
          </div>

          <div className="relative mt-4 aspect-[1.63] lg:mt-[3.3cqw]">
            <div
              className="absolute inset-0 overflow-hidden rounded-[22px] lg:rounded-[2.2cqw]"
              style={{
                WebkitMaskImage: notchMask,
                maskImage: notchMask,
              }}
            >
              <img
                src={s.image}
                alt={fullTitle}
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/40 opacity-0 blur-md transition-all duration-1000 group-hover:left-[140%] group-hover:opacity-100"
              />
            </div>

            <a
              href={s.href}
              aria-label={`${fullTitle} ${ariaLabelSuffix ?? ""}`.trim()}
              className="absolute bottom-[1.5%] right-[1.5%] flex aspect-square w-[11.5%] min-w-[44px] items-center justify-center rounded-full bg-[#FF6B00] text-white shadow-[0_8px_20px_rgba(255,107,0,0.45)] transition-transform duration-300 hover:scale-110"
            >
              {!reduce && (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-[#FF6B00]"
                  animate={{ scale: [1, 1.6], opacity: [0.45, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: i * 0.3,
                  }}
                />
              )}
              <ArrowRight
                className="relative h-[46%] w-[46%] transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={3}
              />
            </a>
          </div>
        </motion.div>
      </motion.article>
    );
  };

  const currentCard = cards[activeIndex];

  return (
    <section
      id={sectionId}
      className="relative isolate overflow-hidden py-6 sm:py-8"
      style={{
        fontFamily: bodyFont,
        background:
          "radial-gradient(45% 40% at 0% 0%, rgba(67,56,202,0.07) 0%, rgba(67,56,202,0) 70%)," +
          "radial-gradient(45% 45% at 100% 100%, rgba(255,107,0,0.08) 0%, rgba(255,107,0,0) 70%)," +
          "linear-gradient(180deg, #F8FAFF 0%, #F3F6FD 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,26,79,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(10,26,79,0.035) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at 50% 40%, black 25%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 40%, black 25%, transparent 75%)",
        }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-20 -z-10 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl"
        animate={reduce ? undefined : { x: [0, 40, 0], y: [0, 25, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-10 -z-10 h-72 w-72 rounded-full bg-orange-300/25 blur-3xl"
        animate={reduce ? undefined : { x: [0, -40, 0], y: [0, -25, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 [container-type:inline-size]">
        <div className="flex flex-col gap-5 md:flex-row md:items-center lg:gap-0 lg:px-[3.5cqw]">
          <div className="lg:w-[45.8%]">
            <div className="flex items-center gap-3">
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ originX: 0 }}
                className="h-[4px] w-9 rounded-full bg-[#FF6B00] lg:w-[3.7cqw]"
              />
              <motion.span
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base font-bold text-[#0A1550] lg:text-[1.35cqw]"
                style={{ fontFamily: headingFont }}
              >
                {badge}
              </motion.span>
            </div>

            <h2
              className="mt-1 text-[34px] font-extrabold leading-[1.04] tracking-tight text-[#0A1550] sm:text-5xl lg:text-[4.3cqw] lg:leading-[1.02]"
              style={{ fontFamily: headingFont }}
            >
              <motion.span
                className="block"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: "some" }}
                transition={{ duration: 0.55, delay: 0.1 }}
              >
                {titleLine1}
              </motion.span>
              <motion.span
                className="block"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: "some" }}
                transition={{ duration: 0.55, delay: 0.2 }}
              >
                {titleLine2Prefix}{" "}
                <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] bg-clip-text text-transparent">
                  {titleHighlight}
                </span>
              </motion.span>
            </h2>
          </div>

          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            style={{ originY: 0 }}
            className="hidden h-[7.6cqw] w-px bg-slate-300 md:block lg:mr-[4.4cqw]"
          />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-2xl text-base font-medium leading-relaxed text-[#1B2447] md:pl-8 lg:flex-1 lg:pl-0 lg:text-[1.4cqw] lg:leading-[1.5]"
          >
            {description}
          </motion.p>
        </div>

        <div className="mt-5 md:hidden">
          {currentCard && renderCard(currentCard, activeIndex)}

          {cards.length > 1 && (
            <div className="mt-4 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous service"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0A1550] shadow ring-1 ring-slate-200 transition hover:bg-[#FF6B00] hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-xs font-bold text-[#0A1550]">
                {activeIndex + 1} / {cards.length}
              </span>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next service"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0A1550] shadow ring-1 ring-slate-200 transition hover:bg-[#FF6B00] hover:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        <div className="mt-5 hidden gap-5 md:grid md:grid-cols-3 lg:mt-[2cqw] lg:gap-[1.35cqw]">
          {cards.map((s, i) => renderCard(s, i))}
        </div>
      </div>
    </section>
  );
}