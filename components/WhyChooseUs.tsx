"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export type WhyChooseIconKind = "people" | "target" | "badge" | "handshake";

export interface WhyChoosePillarItem {
  id?: string;
  titleLines?: [string, string] | string[];
  icon: WhyChooseIconKind;
}

export interface WhyChooseUsSectionProps {
  sectionId?: string;
  badge?: string;
  titleLine1?: string;
  titleLine2Prefix?: string;
  titleHighlight?: string;
  subtitle?: string;
  bgImage?: string;
  pillars?: WhyChoosePillarItem[];
}

const headingFont = "'Montserrat', 'Poppins', system-ui, sans-serif";
const bodyFont = "'Poppins', 'Montserrat', system-ui, sans-serif";
const ORANGE = "#FF8A00";

function PeopleIcon({ reduce }: { reduce: boolean | null }) {
  return (
    <svg viewBox="0 0 100 80" className="h-full w-full" aria-hidden>
      <g fill={ORANGE}>
        <motion.g
          animate={reduce ? undefined : { y: [0, -4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="50" cy="16" r="11" fill="#fff" />
          <path d="M30 46c0-11 9-19 20-19s20 8 20 19v4H30z" />
        </motion.g>
        <circle cx="20" cy="28" r="8" fill="#fff" />
        <path d="M2 56c0-10 7-17 17-17 4 0 8 1 11 4-4 4-6 9-6 15H2z" />
        <circle cx="80" cy="28" r="8" fill="#fff" />
        <path d="M98 56c0-10-7-17-17-17-4 0-8 1-11 4 4 4 6 9 6 15h22z" />
        <path d="M18 78c0-12 8-20 20-20h24c12 0 20 8 20 20z" />
      </g>
    </svg>
  );
}

function TargetIcon({ reduce }: { reduce: boolean | null }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" fill="none" aria-hidden>
      <circle cx="46" cy="56" r="34" stroke="#fff" strokeWidth="5" />
      <circle cx="46" cy="56" r="23" stroke={ORANGE} strokeWidth="6" />
      <circle cx="46" cy="56" r="11" stroke="#fff" strokeWidth="5" />
      <circle cx="46" cy="56" r="4" fill={ORANGE} />
      <motion.g
        animate={reduce ? undefined : { x: [0, -4, 0], y: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M48 54L86 16"
          stroke={ORANGE}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path d="M76 8l1 14 14 1-9 9-9-9z" fill={ORANGE} />
      </motion.g>
    </svg>
  );
}

function BadgeIcon({ reduce }: { reduce: boolean | null }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" fill="none" aria-hidden>
      <circle cx="50" cy="38" r="31" stroke="#fff" strokeWidth="5" />
      <circle cx="50" cy="38" r="22" fill={ORANGE} />
      <motion.path
        d="M50 24l4.5 9.5 10.5 1.3-7.7 7.2 2 10.4L50 47l-9.3 5.4 2-10.4-7.7-7.2 10.5-1.3z"
        fill="#fff"
        style={{ transformOrigin: "50px 38px" }}
        animate={reduce ? undefined : { rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <path d="M32 64l-10 24 14-5 6 10 6-22z" fill={ORANGE} />
      <path d="M68 64l10 24-14-5-6 10-6-22z" fill={ORANGE} />
    </svg>
  );
}

function HandshakeIcon({ reduce }: { reduce: boolean | null }) {
  return (
    <svg viewBox="0 0 110 80" className="h-full w-full" aria-hidden>
      <path d="M2 14l20-8 14 28-18 8z" fill="#fff" />
      <path d="M108 14L88 6 74 34l18 8z" fill="#fff" />
      <motion.g
        animate={reduce ? undefined : { y: [0, 3, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M30 16l16-6c4-1 8 0 11 2l8 6c3 2 3 6 0 8l-10 8 18 14c2 2 2 5 0 7-2 2-5 2-7 0l-6 6c-2 2-5 2-7 0l-3 3c-2 2-5 2-7 0l-18-16c-3-3-3-8 0-11z"
          fill={ORANGE}
        />
        <path
          d="M44 28l14 10M36 38l12 10M30 46l10 8"
          stroke="#8A3B00"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.55"
        />
      </motion.g>
    </svg>
  );
}

function renderPillarIcon(kind: WhyChooseIconKind, reduce: boolean | null) {
  switch (kind) {
    case "target":
      return <TargetIcon reduce={reduce} />;
    case "badge":
      return <BadgeIcon reduce={reduce} />;
    case "handshake":
      return <HandshakeIcon reduce={reduce} />;
    case "people":
    default:
      return <PeopleIcon reduce={reduce} />;
  }
}

const particles = [
  { l: 6, t: 70, s: 5, d: 9, o: 0 },
  { l: 14, t: 30, s: 3, d: 11, o: 1 },
  { l: 24, t: 82, s: 4, d: 10, o: 2 },
  { l: 33, t: 18, s: 3, d: 12, o: 0.5 },
  { l: 44, t: 90, s: 5, d: 9.5, o: 3 },
  { l: 55, t: 12, s: 3, d: 13, o: 1.5 },
  { l: 63, t: 78, s: 4, d: 10.5, o: 2.5 },
  { l: 72, t: 26, s: 3, d: 11.5, o: 0.8 },
  { l: 81, t: 86, s: 5, d: 9, o: 3.5 },
  { l: 90, t: 40, s: 4, d: 12.5, o: 1.2 },
  { l: 95, t: 74, s: 3, d: 10, o: 2.2 },
  { l: 2, t: 48, s: 4, d: 11, o: 4 },
];

export default function WhyChooseUs({
  sectionId,
  badge,
  titleLine1,
  titleLine2Prefix,
  titleHighlight,
  subtitle,
  bgImage,
  pillars = [],
}: WhyChooseUsSectionProps) {
  const reduce = useReducedMotion();

  return (
    <section
      id={sectionId}
      className="relative isolate overflow-x-clip text-white"
      style={{ fontFamily: bodyFont }}
    >
      {bgImage && (
        <motion.img
          src={bgImage}
          alt=""
          aria-hidden
          className="absolute inset-0 -z-30 h-full w-full object-cover"
          initial={{ scale: 1.05 }}
          animate={reduce ? undefined : { scale: [1.05, 1.13, 1.05] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <div className="absolute inset-0 -z-20 bg-[#071544]/70" />
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(60% 70% at 50% 42%, rgba(5,16,50,0.65) 0%, rgba(5,16,50,0) 75%)," +
            "linear-gradient(180deg, rgba(7,21,68,0.35) 0%, rgba(7,21,68,0) 40%, rgba(7,21,68,0.25) 100%)," +
            "linear-gradient(90deg, rgba(29,20,120,0.30) 0%, rgba(29,20,120,0) 30%, rgba(10,60,160,0) 70%, rgba(10,60,160,0.30) 100%)",
        }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-1/4 left-0 -z-10 h-[150%] w-1/4 rotate-12 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent blur-xl"
        animate={reduce ? undefined : { x: ["-40%", "420%"] }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 3,
        }}
      />

      {!reduce &&
        particles.map((p, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="pointer-events-none absolute -z-10 rounded-full bg-[#FF8A00]/70"
            style={{
              left: `${p.l}%`,
              top: `${p.t}%`,
              width: p.s,
              height: p.s,
            }}
            animate={{ y: [0, -60, 0], opacity: [0, 0.9, 0] }}
            transition={{
              duration: p.d,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.o,
            }}
          />
        ))}

      <div className="mx-auto w-full max-w-[1900px] px-4 [container-type:inline-size] sm:px-6">
        <div className="flex flex-col items-center py-10 text-center sm:py-14 lg:pb-[7cqw] lg:pt-[4.2cqw]">
          <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-[1.8cqw]">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{ originX: 1 }}
              className="h-[3px] w-8 rounded-full bg-[#FF8A00] sm:w-10 lg:h-[0.2cqw] lg:w-[4.2cqw]"
            />
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-sm font-bold sm:text-lg lg:text-[1.8cqw]"
              style={{ fontFamily: headingFont }}
            >
              {badge}
            </motion.span>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{ originX: 0 }}
              className="h-[3px] w-8 rounded-full bg-[#FF8A00] sm:w-10 lg:h-[0.2cqw] lg:w-[4.2cqw]"
            />
          </div>

          <h2
            className="mt-2.5 text-[28px] font-extrabold leading-[1.15] tracking-tight sm:mt-3 sm:text-5xl lg:mt-[1.2cqw] lg:text-[3.55cqw] lg:leading-[1.1]"
            style={{ fontFamily: headingFont }}
          >
            <motion.span
              className="block"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {titleLine1}
            </motion.span>
            <motion.span
              className="block"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              {titleLine2Prefix}{" "}
              <motion.span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg,#FF7A00 0%,#FFB347 50%,#FF7A00 100%)",
                  backgroundSize: "200% 100%",
                }}
                animate={
                  reduce ? undefined : { backgroundPosition: ["0% 0%", "200% 0%"] }
                }
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                {titleHighlight}
              </motion.span>
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mx-auto mt-3 max-w-xl px-2 text-sm font-medium leading-relaxed text-white/95 sm:mt-4 sm:max-w-2xl sm:px-0 sm:text-base lg:mt-[1.5cqw] lg:max-w-[50cqw] lg:text-[1.5cqw] lg:leading-[1.45]"
          >
            {subtitle}
          </motion.p>

          <div className="mt-8 grid w-full grid-cols-2 gap-x-3 gap-y-6 sm:mt-10 sm:grid-cols-4 sm:gap-y-8 lg:mt-[3.2cqw] lg:w-[49cqw]">
            {pillars.map((p, i) => {
              const lines = p.titleLines ?? [];
              return (
                <motion.div
                  key={p.id ?? i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: "some" }}
                  transition={{
                    duration: 0.55,
                    delay: 0.4 + i * 0.1,
                    ease: "easeOut",
                  }}
                  className="group relative flex flex-col items-center px-2"
                >
                  {i < pillars.length - 1 && (
                    <motion.span
                      aria-hidden
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, amount: "some" }}
                      transition={{
                        duration: 0.6,
                        delay: 0.6 + i * 0.1,
                        ease: "easeOut",
                      }}
                      style={{ originY: 0 }}
                      className="absolute right-0 top-0 hidden h-full w-px bg-white/45 sm:block"
                    />
                  )}

                  <motion.div
                    animate={reduce ? undefined : { y: [0, -4, 0] }}
                    transition={{
                      duration: 3.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.4,
                    }}
                    whileHover={{ scale: 1.18, rotate: -4 }}
                    className="relative h-12 w-12 transition-[filter] duration-300 group-hover:[filter:drop-shadow(0_0_14px_rgba(255,138,0,0.75))] sm:h-14 sm:w-14 lg:h-[4cqw] lg:w-[4.2cqw]"
                  >
                    {renderPillarIcon(p.icon, reduce)}
                  </motion.div>

                  <h3
                    className="mt-2.5 text-sm font-bold leading-snug sm:mt-3 sm:text-base lg:mt-[1.1cqw] lg:text-[1.42cqw] lg:leading-[1.3]"
                    style={{ fontFamily: headingFont }}
                  >
                    {lines.map((line, lineIdx) => (
                      <React.Fragment key={lineIdx}>
                        {lineIdx > 0 && <br />}
                        {line}
                      </React.Fragment>
                    ))}
                  </h3>
                  <span className="mt-1.5 h-[3px] w-0 rounded-full bg-[#FF8A00] transition-all duration-300 group-hover:w-10 sm:mt-2 lg:mt-[0.6cqw]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}