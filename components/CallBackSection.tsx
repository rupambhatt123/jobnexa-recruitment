"use client";

import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Tag,
  MessageSquare,
  Send,
  Headphones,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export interface ContactDetailItem {
  icon: "send" | "headset";
  label: string;
  value: string;
  href: string;
}

export interface InterestOptionItem {
  value: string;
  label: string;
}

export interface CallBackSectionProps {
  sectionId?: string;
  badge?: string;
  titleLine1?: string;
  titleLine2?: string;
  bannerImage?: string;
  bannerImageAlt?: string;
  imageFallbackText?: string;
  bullets?: string[];
  helperText?: string;
  details?: ContactDetailItem[];
  form?: {
    title?: string;
    fields?: {
      name?: string;
      email?: string;
      phone?: string;
      interestDefault?: string;
      message?: string;
    };
    interests?: InterestOptionItem[];
    submitLabel?: string;
    sendingLabel?: string;
    successMessage?: string;
  };
}

const font = "'Montserrat', 'Poppins', system-ui, sans-serif";

const continents = [
  "M55 42 L110 28 L165 38 L188 72 L170 102 L150 128 L128 142 L108 120 L84 100 L58 78 Z",
  "M192 16 L236 14 L230 46 L204 50 Z",
  "M148 152 L186 150 L204 186 L188 238 L166 262 L154 222 L138 182 Z",
  "M276 52 L330 40 L348 70 L322 92 L290 86 Z",
  "M282 102 L342 100 L362 142 L346 192 L322 222 L302 192 L286 142 Z",
  "M342 40 L452 28 L544 50 L564 92 L522 122 L482 152 L440 142 L402 122 L362 100 Z",
  "M470 192 L540 186 L552 226 L500 238 Z",
];

const cities = [
  { x: 430, y: 108 },
  { x: 110, y: 78 },
  { x: 298, y: 58 },
  { x: 504, y: 212 },
  { x: 170, y: 192 },
];

function WorldMap({ reduce }: { reduce: boolean | null }) {
  return (
    <svg viewBox="0 0 600 290" className="h-full w-full" fill="none" aria-hidden>
      <defs>
        <pattern
          id="mapDots"
          width="6.5"
          height="6.5"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="3.2" cy="3.2" r="1.7" fill="#C4CDE3" />
        </pattern>
      </defs>
      {continents.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="url(#mapDots)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.9, delay: 0.2 + i * 0.1 }}
        />
      ))}

      {cities.slice(1).map((c, i) => {
        const h = cities[0];
        const mx = (h.x + c.x) / 2;
        const my = Math.min(h.y, c.y) - 45;
        return (
          <motion.path
            key={i}
            d={`M${h.x} ${h.y} Q${mx} ${my} ${c.x} ${c.y}`}
            stroke="#FF6B00"
            strokeWidth="1.4"
            strokeDasharray="3 4"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              reduce
                ? { pathLength: 1, opacity: 0.5 }
                : { pathLength: [0, 1, 1], opacity: [0, 0.7, 0] }
            }
            transition={{
              duration: 4.5,
              repeat: Infinity,
              delay: 1 + i * 0.9,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {cities.map((c, i) => (
        <g key={i}>
          <circle cx={c.x} cy={c.y} r="3.2" fill="#FF6B00" />
          {!reduce && (
            <motion.circle
              cx={c.x}
              cy={c.y}
              r="3.2"
              stroke="#FF6B00"
              strokeWidth="1.5"
              fill="none"
              animate={{ r: [3, 14], opacity: [0.7, 0] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeOut",
              }}
            />
          )}
        </g>
      ))}
    </svg>
  );
}

const fieldBase =
  "group relative flex items-center gap-2.5 rounded-[14px] border-2 border-[#D9DFEE] bg-white px-3.5 py-2.5 text-sm shadow-[0_2px_0_rgba(10,21,80,0.02)] transition-all duration-300 focus-within:border-[#FF6B00] focus-within:shadow-[0_0_0_4px_rgba(255,107,0,0.12)] hover:border-[#B9C3DE] lg:gap-[1.4cqw] lg:rounded-[1.2cqw] lg:px-[1.5cqw] lg:py-0 lg:text-[1.05cqw]";

const iconCls =
  "h-4 w-4 shrink-0 text-[#0A1550] transition-colors duration-300 group-focus-within:text-[#FF6B00] sm:h-5 sm:w-5 lg:h-[1.5cqw] lg:w-[1.5cqw]";

function TextField({
  icon: Icon,
  label = "",
  required,
  type = "text",
  name,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label?: string;
  required?: boolean;
  type?: string;
  name: string;
}) {
  return (
    <label className={`${fieldBase} lg:h-[3.3cqw]`}>
      <Icon className={iconCls} />
      <div className="relative flex-1">
        <input
          name={name}
          type={type}
          required={required}
          placeholder=" "
          className="peer w-full bg-transparent text-[#0A1550] outline-none"
        />
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center whitespace-nowrap text-[#555C75] transition-opacity duration-200 peer-[:not(:placeholder-shown)]:opacity-0">
          {label}
          {required && <span className="ml-0.5 text-[#FF6B00]">*</span>}
        </span>
      </div>
    </label>
  );
}

export default function CallBackSection({
  sectionId = "callback",
  badge = "",
  titleLine1 = "",
  titleLine2 = "",
  bannerImage = "",
  bannerImageAlt = "",
  imageFallbackText = "",
  bullets = [],
  helperText = "",
  details = [],
  form = {},
}: CallBackSectionProps) {
  const reduce = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [interest, setInterest] = useState("");
  const [imgError, setImgError] = useState(false);

  const fields = form.fields ?? {};
  const interests = form.interests ?? [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      formRef.current?.reset();
      setInterest("");
    }, 900);
  };

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: "some" as const },
    transition: { duration: 0.45, delay },
  });

  const getDetailIcon = (icon: ContactDetailItem["icon"]) => {
    return icon === "headset" ? Headphones : Send;
  };

  return (
    <section
      id={sectionId}
      className="relative isolate overflow-x-clip py-7 sm:py-9 lg:py-0"
      style={{
        fontFamily: font,
        background:
          "radial-gradient(45% 45% at 0% 0%, rgba(255,107,0,0.07) 0%, rgba(255,107,0,0) 70%)," +
          "radial-gradient(45% 50% at 100% 100%, rgba(74,47,203,0.08) 0%, rgba(74,47,203,0) 70%)," +
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

      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:pb-[2.6cqw] lg:pt-[2cqw] [container-type:inline-size]">
        <div className="flex flex-col gap-3 sm:gap-4 lg:mb-[1.8cqw] lg:flex-row lg:items-start lg:gap-[3cqw]">
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="inline-flex h-9 w-fit items-center justify-center rounded-full border border-[#FF6B00] bg-white px-4 text-[11px] font-extrabold tracking-wider text-[#FF6B00] uppercase shadow-sm sm:h-10 sm:px-5 sm:text-xs lg:mt-[1.4cqw] lg:h-[2.9cqw] lg:px-[1.8cqw] lg:text-[0.95cqw]"
          >
            {badge}
          </motion.span>

          <div>
            <h2 className="text-[30px] font-extrabold leading-[1.08] tracking-tight text-[#071947] sm:text-5xl lg:text-[4.15cqw] lg:leading-[1.05]">
              <span className="block">{titleLine1}</span>
              <span className="block text-[#FF6B00]">{titleLine2}</span>
            </h2>
            <span className="mt-2 block h-1 w-16 rounded-full bg-[#FF6B00] sm:mt-2.5 sm:w-20 lg:mt-[0.8cqw] lg:h-[0.32cqw] lg:w-[7cqw]" />
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-6 sm:mt-6 lg:relative lg:mt-0 lg:block lg:h-[58cqw]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:absolute lg:left-0 lg:top-0 lg:w-[59cqw]"
          >
            <div className="group relative aspect-[1.68] overflow-hidden rounded-[22px] bg-slate-200 shadow-[0_24px_56px_rgba(10,21,80,0.16)] sm:aspect-[1.72] sm:rounded-[26px] lg:rounded-[1.8cqw]">
              {bannerImage && !imgError ? (
                <motion.img
                  src={bannerImage}
                  alt={bannerImageAlt}
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.04 }}
                  animate={
                    reduce ? undefined : { scale: [1.04, 1.09, 1.04] }
                  }
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center p-6 text-center text-sm font-bold text-[#071947]">
                  {imageFallbackText}
                </div>
              )}
            </div>
          </motion.div>

          <div className="relative lg:absolute lg:left-[62.5cqw] lg:top-0 lg:w-[37cqw]">
            <span
              aria-hidden
              className="absolute left-0 top-1 h-[calc(100%-8px)] w-[3px] rounded-full bg-[#FF6B00] lg:w-[0.22cqw]"
            />
            <ul className="space-y-1.5 pl-3.5 text-sm font-semibold leading-snug text-[#071947] sm:space-y-2 sm:pl-4 lg:space-y-[0.35cqw] lg:pl-[1.6cqw] lg:text-[1.25cqw] lg:leading-[1.5]">
              {bullets.map((b, i) => (
                <motion.li
                  key={b ?? i}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: "some" }}
                  transition={{ duration: 0.45, delay: 0.15 + i * 0.1 }}
                >
                  {b}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="pointer-events-none hidden lg:absolute lg:left-[68cqw] lg:top-[8.2cqw] lg:block lg:h-[16cqw] lg:w-[32cqw]">
            <WorldMap reduce={reduce} />
          </div>

          <div className="space-y-4 sm:space-y-5 lg:absolute lg:left-0 lg:top-[35.5cqw] lg:w-[35cqw] lg:space-y-[1.4cqw]">
            <motion.p
              {...rise(0.2)}
              className="max-w-md text-sm font-medium leading-relaxed text-[#4A5068] lg:text-[1.15cqw] lg:leading-[1.6]"
            >
              {helperText}
            </motion.p>

            <div className="space-y-3 sm:space-y-4 lg:space-y-[1.2cqw]">
              {details.map((c, i) => {
                const DetailIcon = getDetailIcon(c.icon);
                return (
                  <motion.a
                    key={c.label ?? i}
                    href={c.href}
                    {...rise(0.3 + i * 0.1)}
                    className="group flex items-center gap-3.5 sm:gap-4 lg:gap-[1.3cqw]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAEEFB] text-[#0A1550] shadow-sm transition-colors duration-300 group-hover:bg-[#0A1550] group-hover:text-white sm:h-12 sm:w-12 lg:h-[3.8cqw] lg:w-[3.8cqw] lg:rounded-[1cqw]">
                      <DetailIcon
                        className="h-5 w-5 lg:h-[1.7cqw] lg:w-[1.7cqw]"
                        strokeWidth={1.8}
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-medium text-[#4A5068] lg:text-[1.05cqw]">
                        {c.label}
                      </span>
                      <span className="block break-all text-sm font-extrabold text-[#071947] transition-colors duration-300 group-hover:text-[#FF6B00] sm:break-normal sm:text-base lg:text-[1.45cqw]">
                        {c.value}
                      </span>
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="z-10 lg:absolute lg:left-[37.5cqw] lg:top-[18cqw] lg:w-[49.5cqw]"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-[22px] bg-white px-4 pb-5 pt-5 shadow-[0_28px_70px_rgba(10,21,80,0.15)] sm:rounded-[28px] sm:px-5 sm:pb-6 sm:pt-6 lg:rounded-[2cqw] lg:pb-[2cqw] lg:pl-[3.2cqw] lg:pr-[2.2cqw] lg:pt-[2cqw]"
            >
              <h3 className="text-xl font-extrabold tracking-tight text-[#071947] sm:text-2xl lg:text-[2.3cqw] lg:leading-tight">
                {form.title ?? ""}
              </h3>
              <span className="mt-2 block h-1 w-12 rounded-full bg-[#FF6B00] sm:w-14 lg:mt-[0.8cqw] lg:h-[0.3cqw] lg:w-[5.2cqw]" />

              <div className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3 lg:mt-[1.8cqw] lg:space-y-[0.85cqw]">
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:gap-[0.9cqw]">
                  <TextField
                    icon={User}
                    label={fields.name}
                    required
                    name="name"
                  />
                  <TextField
                    icon={Mail}
                    label={fields.email}
                    required
                    type="email"
                    name="email"
                  />
                </div>

                <TextField
                  icon={Phone}
                  label={fields.phone}
                  required
                  type="tel"
                  name="phone"
                />

                <label className={`${fieldBase} lg:h-[3.3cqw]`}>
                  <Tag className={iconCls} />
                  <select
                    name="interest"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className={`w-full cursor-pointer appearance-none bg-transparent outline-none ${
                      interest ? "text-[#0A1550]" : "text-[#555C75]"
                    }`}
                  >
                    <option value="" disabled>
                      {fields.interestDefault ?? ""}
                    </option>
                    {interests.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none h-4 w-4 shrink-0 text-[#0A1550] transition-transform duration-300 group-focus-within:rotate-180 group-focus-within:text-[#FF6B00] sm:h-5 sm:w-5 lg:h-[1.5cqw] lg:w-[1.5cqw]"
                    strokeWidth={2.5}
                  />
                </label>

                <label
                  className={`${fieldBase} items-start py-3 lg:h-[7.2cqw] lg:items-start lg:pt-[1cqw]`}
                >
                  <MessageSquare className={`${iconCls} mt-0.5`} />
                  <div className="relative h-full flex-1">
                    <textarea
                      name="message"
                      rows={3}
                      placeholder=" "
                      className="peer h-full w-full resize-none bg-transparent text-[#0A1550] outline-none"
                    />
                    <span className="pointer-events-none absolute left-0 top-0 whitespace-nowrap text-[#555C75] transition-opacity duration-200 peer-[:not(:placeholder-shown)]:opacity-0">
                      {fields.message ?? ""}
                    </span>
                  </div>
                </label>

                <div className="pt-1 lg:pt-[0.4cqw]">
                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(60,30,170,0.3)] disabled:opacity-80 sm:w-auto sm:justify-start sm:gap-3 sm:px-7 lg:h-[3.8cqw] lg:gap-[1.2cqw] lg:px-[2.4cqw] lg:py-0 lg:text-[1.35cqw]"
                    style={{
                      backgroundImage:
                        "linear-gradient(100deg,#0A256E 0%,#2A28B0 50%,#4B1494 100%)",
                    }}
                  >
                    <span>
                      {status === "sending"
                        ? form.sendingLabel ?? ""
                        : form.submitLabel ?? ""}
                    </span>
                    {status === "sending" ? (
                      <motion.span
                        className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    ) : (
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 lg:h-[1.5cqw] lg:w-[1.5cqw]"
                        strokeWidth={2.5}
                      />
                    )}
                  </motion.button>
                </div>

                {status === "sent" && form.successMessage && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    {form.successMessage}
                  </motion.p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}