"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export type PartnerLogoKind =
  | "amazon"
  | "microsoft"
  | "google"
  | "deloitte"
  | "infosys"
  | "tcs"
  | "accenture"
  | "hcltech";

export interface HiringPartnerItem {
  name: string;
  kind: PartnerLogoKind;
  text: string;
  reg?: string;
  accentText?: string;
}

export interface HiringPartnersSectionProps {
  sectionId: string;
  eyebrow: string;
  headingStart: string;
  headingHighlight: string;
  subtitle: string;
  items?: HiringPartnerItem[];
}

const headingFont = "'Montserrat', 'Poppins', system-ui, sans-serif";
const bodyFont = "'Poppins', 'Montserrat', system-ui, sans-serif";

const Reg = ({ mark, className = "" }: { mark?: string; className?: string }) =>
  mark ? (
    <sup className={`ml-0.5 align-super text-[0.38em] font-normal ${className}`}>
      {mark}
    </sup>
  ) : null;

function renderPartnerLogo(item: HiringPartnerItem) {
  switch (item.kind) {
    case "amazon":
      return (
        <div className="flex flex-col items-center leading-none">
          <span
            className="text-[clamp(22px,2.3vw,34px)] font-bold lowercase tracking-tight text-[#111]"
            style={{ fontFamily: headingFont }}
          >
            {item.text}
          </span>
          <svg
            viewBox="0 0 80 14"
            className="-mt-1 w-[62%]"
            fill="none"
            aria-hidden
          >
            <path
              d="M6 4C26 12 52 12 72 3"
              stroke="#FF9900"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M66 1.5L74 2.5L70 9"
              stroke="#FF9900"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      );

    case "microsoft":
      return (
        <div className="flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            className="h-[clamp(20px,2vw,30px)] w-[clamp(20px,2vw,30px)]"
            aria-hidden
          >
            <rect x="1" y="1" width="10.5" height="10.5" fill="#F25022" />
            <rect x="12.5" y="1" width="10.5" height="10.5" fill="#7FBA00" />
            <rect x="1" y="12.5" width="10.5" height="10.5" fill="#00A4EF" />
            <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFB900" />
          </svg>
          <span
            className="text-[clamp(15px,1.55vw,23px)] font-medium text-[#5E5E5E]"
            style={{ fontFamily: bodyFont }}
          >
            {item.text}
          </span>
        </div>
      );

    case "google": {
      const colors = [
        "text-[#4285F4]",
        "text-[#EA4335]",
        "text-[#FBBC05]",
        "text-[#4285F4]",
        "text-[#34A853]",
        "text-[#EA4335]",
      ];
      return (
        <span
          className="text-[clamp(26px,2.9vw,42px)] font-medium tracking-tight"
          style={{ fontFamily: "'Product Sans','Poppins',sans-serif" }}
        >
          {item.text.split("").map((ch, idx) => (
            <span key={idx} className={colors[idx % colors.length]}>
              {ch}
            </span>
          ))}
        </span>
      );
    }

    case "deloitte":
      return (
        <span
          className="text-[clamp(20px,2.1vw,31px)] font-extrabold tracking-tight text-[#0A0A0A]"
          style={{ fontFamily: headingFont }}
        >
          {item.text}
          {item.accentText && (
            <span className="text-[#86BC25]">{item.accentText}</span>
          )}
        </span>
      );

    case "infosys":
      return (
        <span
          className="text-[clamp(24px,2.7vw,40px)] font-light tracking-tight text-[#007CC3]"
          style={{ fontFamily: headingFont }}
        >
          {item.text}
          <Reg mark={item.reg} />
        </span>
      );

    case "tcs":
      return (
        <span
          className="bg-gradient-to-r from-[#E6007E] via-[#C2185B] to-[#FF7A00] bg-clip-text text-[clamp(32px,3.6vw,54px)] font-bold lowercase leading-none tracking-tighter text-transparent"
          style={{ fontFamily: headingFont }}
        >
          {item.text}
        </span>
      );

    case "accenture":
      return (
        <div className="relative flex flex-col items-center">
          <svg
            viewBox="0 0 20 12"
            className="absolute -top-[0.9em] right-[22%] w-[0.75em] text-[clamp(14px,1.4vw,20px)]"
            fill="none"
            aria-hidden
          >
            <path
              d="M2 1.5L16 6L2 10.5"
              stroke="#A100FF"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className="text-[clamp(17px,1.9vw,28px)] font-extrabold lowercase tracking-tight text-[#0A0A0A]"
            style={{ fontFamily: headingFont }}
          >
            {item.text}
            <Reg mark={item.reg} />
          </span>
        </div>
      );

    case "hcltech":
    default:
      return (
        <span
          className="text-[clamp(18px,2vw,29px)] font-extrabold tracking-tight text-[#1F4FD8]"
          style={{ fontFamily: headingFont }}
        >
          {item.text}
          <Reg mark={item.reg} />
        </span>
      );
  }
}

export default function HiringPartners({
  sectionId,
  eyebrow,
  headingStart,
  headingHighlight,
  subtitle,
  items = [],
}: HiringPartnersSectionProps) {
  const reduce = useReducedMotion();

  return (
    <section
      id={sectionId}
      className="relative isolate overflow-hidden py-14 sm:py-16"
      style={{
        fontFamily: bodyFont,
        background:
          "radial-gradient(50% 60% at 50% 0%, rgba(255,107,0,0.07) 0%, rgba(255,107,0,0) 70%)," +
          "radial-gradient(40% 60% at 0% 100%, rgba(67,56,202,0.07) 0%, rgba(67,56,202,0) 70%)," +
          "radial-gradient(40% 60% at 100% 100%, rgba(37,99,235,0.07) 0%, rgba(37,99,235,0) 70%)," +
          "linear-gradient(180deg, #FAFBFF 0%, #F3F6FD 100%)",
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-0 -z-10 h-64 w-64 rounded-full bg-orange-300/20 blur-3xl"
        animate={reduce ? undefined : { x: [0, 60, 0], y: [0, 20, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-1/4 -z-10 h-64 w-64 rounded-full bg-indigo-300/20 blur-3xl"
        animate={reduce ? undefined : { x: [0, -60, 0], y: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto max-w-[1500px] px-4 text-center sm:px-6">
        <div className="flex items-center justify-center gap-4">
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ originX: 1 }}
            className="h-[3px] w-10 rounded-full bg-[#FF6B00] sm:w-20"
          />
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-lg font-bold text-[#0A1550] sm:text-2xl"
            style={{ fontFamily: headingFont }}
          >
            {eyebrow}
          </motion.span>
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ originX: 0 }}
            className="h-[3px] w-10 rounded-full bg-[#FF6B00] sm:w-20"
          />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-[#0A1550] sm:text-5xl lg:text-[56px]"
          style={{ fontFamily: headingFont }}
        >
          {headingStart}{" "}
          <span className="relative inline-block bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] bg-clip-text text-transparent">
            {headingHighlight}
            <motion.span
              aria-hidden
              className="absolute inset-x-0 -bottom-1 h-[5px] origin-left rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FFB020]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
            />
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-4 max-w-4xl text-base font-medium text-[#2B3252] sm:text-lg lg:text-xl"
        >
          {subtitle}
        </motion.p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:mt-12 lg:grid-cols-8 lg:gap-3">
          {items.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: 0.5 + i * 0.08,
                ease: "easeOut",
              }}
            >
              <motion.div
                animate={reduce ? undefined : { y: [0, i % 2 ? 5 : -5, 0] }}
                transition={{
                  duration: 4 + (i % 3) * 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
                whileHover={{ y: -8, scale: 1.06, rotate: i % 2 ? 1.2 : -1.2 }}
                className="group relative flex aspect-[1.6] items-center justify-center overflow-hidden rounded-[26px] bg-white px-2 shadow-[0_14px_34px_rgba(10,21,80,0.08)] ring-1 ring-white transition-shadow duration-300 hover:shadow-[0_22px_48px_rgba(255,107,0,0.22)]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-50 via-transparent to-indigo-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/70 opacity-0 blur-sm transition-all duration-700 group-hover:left-[130%] group-hover:opacity-100"
                />
                <span className="relative">{renderPartnerLogo(p)}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}