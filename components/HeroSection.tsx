"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface HeroRoleItem {
  id: string;
  label: string;
  image: string;
  avatarBg: string;
  badgeBg: string;
  pos: string;
  float: number;
  delay: number;
  from: "left" | "right";
}

export interface HeroBurstItem {
  id: string;
  color: string;
  className: string;
  rotate?: number;
}

export interface HeroSectionProps {
  sectionId: string;
  headlineLine1: string;
  headlineHighlight: string;
  headlineEnd: string;
  subheadline: string;
  roles: HeroRoleItem[];
  bursts?: HeroBurstItem[];
}

function Avatar({
  role,
  reduce,
}: {
  role: HeroRoleItem;
  reduce: boolean | null;
}) {
  const startX = role.from === "left" ? -40 : 40;
  return (
    <motion.div
      initial={{ opacity: 0, x: startX, scale: 0.85 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.75, delay: role.delay, ease: "easeOut" }}
      className={`flex justify-center lg:absolute ${role.pos}`}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, role.float, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: role.delay,
        }}
        whileHover={{ scale: 1.06 }}
        className="relative flex flex-col items-center"
      >
        <div
          className="h-28 w-28 overflow-hidden rounded-full border-[5px] border-white shadow-[0_18px_40px_rgba(0,0,0,0.35)] sm:h-36 sm:w-36 sm:border-[6px] lg:h-[170px] lg:w-[170px]"
          style={{ backgroundColor: role.avatarBg }}
        >
          <img
            src={role.image}
            alt={role.label}
            className="h-full w-full object-cover object-top"
          />
        </div>
        <span
          style={{ backgroundColor: role.badgeBg }}
          className="-mt-4 rounded-full px-4 py-1 text-xs font-bold text-[#0B1A55] shadow-lg sm:-mt-5 sm:px-5 sm:py-1.5 sm:text-sm"
        >
          {role.label}
        </span>
      </motion.div>
    </motion.div>
  );
}

function Burst({
  color,
  className,
  rotate = 0,
}: {
  color: string;
  className: string;
  rotate?: number;
}) {
  return (
    <motion.svg
      viewBox="0 0 60 60"
      className={`pointer-events-none absolute hidden h-14 w-14 lg:block ${className}`}
      style={{ rotate }}
      animate={{ opacity: [0.35, 1, 0.35], scale: [0.9, 1.1, 0.9] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      <g stroke={color} strokeWidth="6" strokeLinecap="round">
        <line x1="8" y1="30" x2="26" y2="30" />
        <line x1="14" y1="12" x2="28" y2="22" />
        <line x1="14" y1="48" x2="28" y2="38" />
      </g>
    </motion.svg>
  );
}

export default function HeroSection({
  sectionId,
  headlineLine1,
  headlineHighlight,
  headlineEnd,
  subheadline,
  roles = [],
  bursts = [],
}: HeroSectionProps) {
  const reduce = useReducedMotion();

  const dotted = {
    stroke: "url(#fadeStroke)",
    strokeWidth: 2.6,
    strokeDasharray: "2.5 7.5",
    strokeLinecap: "round" as const,
    fill: "none",
  };

  return (
    <section
      id={sectionId}
      className="relative isolate overflow-x-clip pb-12 pt-24 text-white sm:pb-14 sm:pt-32 lg:pb-10 lg:pt-36"
      style={{
        fontFamily: "'Poppins', 'Inter', system-ui, sans-serif",
        background:
          "radial-gradient(60% 55% at 0% 45%, rgba(109,40,217,0.75) 0%, rgba(109,40,217,0) 70%)," +
          "radial-gradient(55% 60% at 100% 55%, rgba(37,99,235,0.65) 0%, rgba(37,99,235,0) 70%)," +
          "linear-gradient(135deg, #1B0F78 0%, #0B1A7A 45%, #0A2A8F 100%)",
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 -z-10 h-96 w-96 rounded-full bg-purple-600/30 blur-3xl"
        animate={reduce ? undefined : { x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/2 -z-10 h-96 w-96 rounded-full bg-blue-500/30 blur-3xl"
        animate={reduce ? undefined : { x: [0, -40, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative flex flex-col lg:block lg:h-[600px]">
          <svg
            viewBox="0 0 1000 600"
            preserveAspectRatio="xMidYMid meet"
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            aria-hidden
          >
            <defs>
              <linearGradient id="fadeStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0.25" />
              </linearGradient>
            </defs>

            {[false, true].map((mirror) => (
              <g
                key={String(mirror)}
                transform={mirror ? "translate(1000,0) scale(-1,1)" : undefined}
              >
                <motion.path
                  d="M 265 120 C 340 85 420 85 470 125"
                  {...dotted}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.6, delay: 0.7 }}
                />
                <motion.path
                  d="M 160 255 C 90 320 100 400 175 450"
                  {...dotted}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.6, delay: 0.9 }}
                />
                <motion.path
                  d="M 305 520 C 380 555 460 540 520 505"
                  {...dotted}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.6, delay: 1.1 }}
                />
              </g>
            ))}
          </svg>

          {bursts.map((b) => (
            <Burst
              key={b.id}
              color={b.color}
              className={b.className}
              rotate={b.rotate}
            />
          ))}

          <div className="pointer-events-none absolute left-1/2 top-[6%] hidden h-24 w-56 -translate-x-[40%] lg:block">
            <svg
              viewBox="0 0 220 100"
              className="h-full w-full"
              fill="none"
              aria-hidden
            >
              <motion.path
                d="M10 78 C 20 55, 5 40, 25 42 C 45 45, 40 70, 28 62 C 20 55, 55 30, 85 40 C 110 48, 118 25, 150 22"
                stroke="#FFB020"
                strokeWidth="3"
                strokeDasharray="2.5 7"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, delay: 0.6, ease: "easeInOut" }}
              />
            </svg>
            <motion.svg
              viewBox="0 0 80 60"
              className="absolute -right-2 -top-3 h-14 w-20"
              initial={{ opacity: 0, x: -80, y: 40, rotate: -25 }}
              animate={
                reduce
                  ? { opacity: 1, x: 0, y: 0, rotate: 0 }
                  : {
                      opacity: 1,
                      x: [0, 4, 0],
                      y: [0, -6, 0],
                      rotate: [0, 3, 0],
                    }
              }
              transition={{
                opacity: { duration: 0.6, delay: 1.2 },
                default: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                },
              }}
              aria-hidden
            >
              <path d="M2 30 L78 4 L52 56 L38 36 Z" fill="#FFC21A" />
              <path d="M38 36 L78 4 L46 42 Z" fill="#FF8A00" />
              <path d="M38 36 L44 54 L52 56 Z" fill="#F59E0B" />
            </motion.svg>
          </div>

          <div className="relative z-10 order-1 mx-auto flex max-w-2xl flex-col items-center text-center lg:absolute lg:inset-x-0 lg:top-[22%] lg:mx-auto lg:max-w-[560px]">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl font-extrabold leading-[1.08] tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)] sm:text-6xl sm:leading-[1.05] lg:text-[76px]"
            >
              <span className="block">{headlineLine1}</span>
              <span className="relative mt-1 block">
                <span className="relative inline-block text-[#FF7A00]">
                  {headlineHighlight}
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-orange-500/20 blur-2xl"
                    animate={
                      reduce ? undefined : { opacity: [0.4, 0.9, 0.4] }
                    }
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <svg
                    viewBox="0 0 260 28"
                    fill="none"
                    className="absolute -bottom-2 left-[-4%] w-[108%] sm:-bottom-2.5 lg:-bottom-3"
                    aria-hidden
                  >
                    <motion.path
                      d="M6 18 C 70 6, 170 5, 254 13"
                      stroke="#FF7A00"
                      strokeWidth="6.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 0.9,
                        delay: 0.9,
                        ease: "easeOut",
                      }}
                    />
                    <motion.path
                      d="M36 22 C 100 13, 170 12, 224 18"
                      stroke="#FF7A00"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 0.7,
                        delay: 1.3,
                        ease: "easeOut",
                      }}
                    />
                  </svg>
                </span>{" "}
                {headlineEnd}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-7 max-w-md text-sm font-medium leading-relaxed text-white/95 sm:mt-9 sm:max-w-lg sm:text-lg lg:mt-9 lg:text-[19px]"
            >
              {subheadline}
            </motion.p>
          </div>

          <div className="order-2 mt-8 grid grid-cols-2 gap-x-4 gap-y-7 sm:mt-10 sm:grid-cols-4 sm:gap-y-10 lg:mt-0 lg:block">
            {roles.map((r) => (
              <Avatar key={r.id} role={r} reduce={reduce} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}