"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  Star,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export interface TestimonialsSectionProps {
  sectionId?: string;
  badge?: string;
  titleLine1?: string;
  countValue?: number;
  countSuffix?: string;
  titleLine2End?: string;
  titleLine3?: string;
  portraitImage?: string;
  portraitAlt?: string;
  imageFallbackPrefix?: string;
  starCount?: number;
  prevAriaLabel?: string;
  nextAriaLabel?: string;
  items?: TestimonialItem[];
}

const font = "'Montserrat', 'Poppins', system-ui, sans-serif";
const AUTOPLAY_MS = 5000;

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
  const inView = useInView(ref, { once: true, amount: "some" });
  const [n, setN] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) {
      setN(to);
      return;
    }
    const c = animate(0, to, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => c.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

function Line({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.span
      className="block whitespace-nowrap"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  );
}

export default function TestimonialsSection({
  sectionId,
  badge,
  titleLine1,
  countValue,
  countSuffix,
  titleLine2End,
  titleLine3,
  portraitImage,
  portraitAlt,
  imageFallbackPrefix,
  starCount = 5,
  prevAriaLabel,
  nextAriaLabel,
  items = [],
}: TestimonialsSectionProps) {
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [leadImgError, setLeadImgError] = useState(false);
  const [avatarErrors, setAvatarErrors] = useState<Record<string, boolean>>({});

  const handlePrev = () => {
    if (items.length === 0) return;
    setActiveIndex((p) => (p === 0 ? items.length - 1 : p - 1));
  };

  const handleNext = () => {
    if (items.length === 0) return;
    setActiveIndex((p) => (p >= items.length - 1 ? 0 : p + 1));
  };

  useEffect(() => {
    if (paused || reduce || items.length === 0) return;
    const t = setTimeout(handleNext, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [activeIndex, paused, reduce, items.length]);

  const arrowBtn =
    "relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#4A2FCB] bg-white text-[#4A2FCB] shadow-[0_8px_20px_rgba(74,47,203,0.15)] transition-colors duration-300 hover:bg-[#4A2FCB] hover:text-white lg:h-[3.2cqw] lg:w-[3.2cqw]";

  const renderTestimonialCard = (
    item: TestimonialItem,
    idx: number,
    isMobileSingle = false
  ) => {
    const active = isMobileSingle ? true : idx === activeIndex;
    const hasAvatarError = !!avatarErrors[item.id];

    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: "some" }}
        transition={{
          duration: 0.45,
          delay: isMobileSingle ? 0 : 0.12 + idx * 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.div
          onClick={() => setActiveIndex(idx)}
          whileHover={isMobileSingle ? undefined : { x: -4 }}
          animate={{ scale: active && !isMobileSingle ? 1.01 : 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 22,
          }}
          className={`group relative cursor-pointer overflow-hidden rounded-[22px] bg-white px-5 py-4 transition-shadow duration-300 lg:rounded-[1.8cqw] lg:pb-[0.9cqw] lg:pl-[4.6cqw] lg:pr-[1.4cqw] lg:pt-[1.1cqw] ${
            active
              ? "shadow-[0_20px_46px_rgba(255,107,0,0.18)] ring-1 ring-orange-200"
              : "shadow-[0_14px_34px_rgba(10,21,80,0.08)] ring-1 ring-white hover:shadow-[0_18px_40px_rgba(10,21,80,0.14)]"
          }`}
        >
          <motion.span
            aria-hidden
            className="hidden select-none text-[56px] font-black leading-none text-[#FF6B00] lg:absolute lg:left-[1.3cqw] lg:top-[0.3cqw] lg:block lg:text-[3.8cqw]"
            style={{ fontFamily: "Georgia, serif" }}
            animate={
              active && !reduce
                ? { y: [0, -3, 0], rotate: [0, -4, 0] }
                : { y: 0, rotate: 0 }
            }
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            &ldquo;
          </motion.span>

          <p className="text-[13px] font-medium leading-relaxed text-[#10163A] sm:text-sm lg:text-[1.08cqw] lg:leading-[1.42]">
            &ldquo;{item.quote}&rdquo;
          </p>

          <div className="mt-1.5 flex gap-0.5 lg:mt-[0.35cqw] lg:gap-[0.15cqw]">
            {Array.from({ length: starCount }).map((_, s) => (
              <Star
                key={s}
                className="h-4 w-4 fill-[#FF6B00] text-[#FF6B00] lg:h-[1.1cqw] lg:w-[1.1cqw]"
              />
            ))}
          </div>

          <div className="mt-2 flex items-center gap-3 lg:mt-[0.55cqw] lg:gap-[1.1cqw]">
            {item.avatar && !hasAvatarError ? (
              <img
                src={item.avatar}
                alt={item.name}
                onError={() =>
                  setAvatarErrors((prev) => ({
                    ...prev,
                    [item.id]: true,
                  }))
                }
                className="h-11 w-11 rounded-full bg-slate-100 object-cover ring-2 ring-white shadow-md transition-transform duration-300 group-hover:scale-110 lg:h-[3.4cqw] lg:w-[3.4cqw]"
              />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0A1A6B] text-xs font-extrabold text-white ring-2 ring-white shadow-md lg:h-[3.4cqw] lg:w-[3.4cqw]">
                {item.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </div>
            )}
            <span className="h-9 w-px bg-slate-300 lg:h-[2.8cqw]" />
            <div>
              <p className="text-sm font-extrabold text-[#0A1A6B] lg:text-[1.15cqw]">
                {item.name}
              </p>
              <p className="text-xs font-medium text-[#2B3252] lg:text-[0.98cqw]">
                {item.role}
              </p>
            </div>
          </div>

          {active && !paused && !reduce && (
            <motion.span
              key={`p-${activeIndex}`}
              aria-hidden
              className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#FF6B00] to-[#FFB347]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: AUTOPLAY_MS / 1000,
                ease: "linear",
              }}
            />
          )}
        </motion.div>
      </motion.div>
    );
  };

  const currentItem = items[activeIndex];

  return (
    <section
      id={sectionId}
      className="relative isolate overflow-x-clip py-6 sm:py-8 lg:py-[2.2cqw]"
      style={{
        fontFamily: font,
        background:
          "radial-gradient(45% 50% at 0% 0%, rgba(255,107,0,0.07) 0%, rgba(255,107,0,0) 70%)," +
          "radial-gradient(45% 55% at 100% 100%, rgba(74,47,203,0.08) 0%, rgba(74,47,203,0) 70%)," +
          "linear-gradient(180deg, #FAFBFF 0%, #F3F6FD 100%)",
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
            "radial-gradient(ellipse at 50% 50%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 50%, black 20%, transparent 75%)",
        }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 -z-10 h-80 w-80 rounded-full bg-orange-300/20 blur-3xl"
        animate={reduce ? undefined : { x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-indigo-300/25 blur-3xl"
        animate={reduce ? undefined : { x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.span
        aria-hidden
        className="pointer-events-none absolute bottom-[-6%] left-[3%] -z-10 hidden select-none text-[22rem] font-black leading-none text-[#FF6B00]/[0.06] lg:block"
        style={{ fontFamily: "Georgia, serif" }}
        animate={reduce ? undefined : { y: [0, -14, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        &ldquo;
      </motion.span>

      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 [container-type:inline-size]">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[31fr_32fr_34fr] lg:gap-x-[1.5cqw] lg:gap-y-0">
          <div className="lg:self-start lg:pt-[1.8cqw]">
            <div className="flex items-center gap-3 lg:gap-[1.4cqw]">
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: "some" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ originX: 0 }}
                className="h-[3px] w-9 rounded-full bg-[#FF6B00] sm:w-10 lg:h-[0.2cqw] lg:w-[3.4cqw]"
              />
              <motion.span
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: "some" }}
                transition={{ duration: 0.45, delay: 0.15 }}
                className="text-sm font-semibold text-[#0A1550] sm:text-base lg:text-[1.2cqw]"
              >
                {badge}
              </motion.span>
            </div>

            <h2 className="mt-2.5 text-[26px] font-extrabold leading-[1.15] tracking-tight text-[#0A1550] sm:mt-3 sm:text-4xl lg:mt-[1.4cqw] lg:text-[2.95cqw] lg:leading-[1.14]">
              <Line delay={0.1}>{titleLine1}</Line>
              <Line delay={0.22}>
                <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] bg-clip-text text-transparent">
                  <CountUp
                    to={countValue ?? 0}
                    suffix={countSuffix ?? ""}
                    reduce={reduce}
                  />
                </span>{" "}
                {titleLine2End}
              </Line>
              <Line delay={0.34}>{titleLine3}</Line>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <motion.span
              aria-hidden
              className="pointer-events-none absolute -bottom-3 -right-3 hidden h-full w-full rounded-[2.1cqw] border-2 border-[#FF6B00]/30 lg:block"
              animate={reduce ? undefined : { x: [0, 5, 0], y: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="group relative aspect-[1.05] min-h-[260px] overflow-hidden rounded-[24px] bg-gradient-to-br from-slate-200 to-indigo-100 shadow-[0_26px_60px_rgba(10,21,80,0.22)] sm:aspect-[0.95] sm:min-h-[320px] sm:rounded-[28px] lg:aspect-[0.92] lg:rounded-[2cqw]">
              {portraitImage && !leadImgError ? (
                <motion.img
                  src={portraitImage}
                  alt={portraitAlt}
                  onError={() => setLeadImgError(true)}
                  className="h-full w-full object-cover object-top"
                  initial={{ scale: 1.04 }}
                  animate={
                    reduce ? undefined : { scale: [1.04, 1.09, 1.04] }
                  }
                  transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center text-[#0A1550]">
                  <p className="text-sm font-bold">
                    {imageFallbackPrefix}{" "}
                    <code className="rounded bg-white/80 px-2 py-0.5">
                      {portraitImage}
                    </code>
                  </p>
                </div>
              )}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/25 opacity-0 blur-md transition-all duration-1000 group-hover:left-[140%] group-hover:opacity-100"
              />
            </div>
          </motion.div>

          <div
            className="flex flex-col lg:flex-row lg:items-center lg:gap-[1.5cqw]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="lg:hidden">
              {currentItem &&
                renderTestimonialCard(currentItem, activeIndex, true)}

              {items.length > 1 && (
                <div className="mt-4 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label={prevAriaLabel}
                    className={arrowBtn}
                  >
                    <ChevronLeft className="h-5 w-5" strokeWidth={3} />
                  </button>
                  <span className="text-xs font-bold text-[#0A1550]">
                    {activeIndex + 1} / {items.length}
                  </span>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label={nextAriaLabel}
                    className={arrowBtn}
                  >
                    <ChevronRight className="h-5 w-5" strokeWidth={3} />
                  </button>
                </div>
              )}
            </div>

            <div className="hidden flex-1 flex-col lg:flex lg:gap-[0.75cqw]">
              {items.map((item, idx) => renderTestimonialCard(item, idx, false))}
            </div>

            <div className="hidden flex-col gap-3 lg:flex lg:gap-[0.9cqw]">
              <motion.button
                type="button"
                onClick={handlePrev}
                aria-label={prevAriaLabel}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                className={arrowBtn}
              >
                <ChevronUp
                  className="h-5 w-5 lg:h-[1.5cqw] lg:w-[1.5cqw]"
                  strokeWidth={3}
                />
              </motion.button>
              <motion.button
                type="button"
                onClick={handleNext}
                aria-label={nextAriaLabel}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                className={arrowBtn}
              >
                <ChevronDown
                  className="h-5 w-5 lg:h-[1.5cqw] lg:w-[1.5cqw]"
                  strokeWidth={3}
                />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}