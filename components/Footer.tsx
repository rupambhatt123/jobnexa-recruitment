"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";

export interface FooterQuickLink {
  label: string;
  href: string;
}

export interface FooterSocialLink {
  id: "facebook" | "instagram" | "linkedin" | "youtube" | "x";
  label: string;
  mark: string;
  href: string;
}

export interface FooterSectionProps {
  logo?: string;
  logoAlt?: string;
  contactHeading?: string;
  quickLinksHeading?: string;
  followUsHeading?: string;
  addressLabel?: string;
  address?: string;
  emailLabel?: string;
  email?: string;
  phoneLabel?: string;
  phone?: string;
  quickLinks?: FooterQuickLink[];
  socialLinks?: FooterSocialLink[];
  siteNamePrimary?: string;
  siteNameAccent?: string;
  tagline?: string;
  copyright?: string;
}

function renderSocialMark(id: FooterSocialLink["id"], mark: string) {
  switch (id) {
    case "instagram":
      return (
        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-[4px] border border-current">
          <span className="h-1.5 w-1.5 rounded-full border border-current" />
        </span>
      );
    case "youtube":
      return (
        <span className="ml-0.5 border-y-[4px] border-l-[7px] border-y-transparent border-l-current" />
      );
    case "linkedin":
      return <span className="text-[11px] font-extrabold">{mark}</span>;
    case "x":
      return <span className="text-xs font-bold uppercase">{mark}</span>;
    default:
      return <span className="text-sm font-bold">{mark}</span>;
  }
}

export default function Footer({
  logo = "",
  logoAlt = "",
  contactHeading = "",
  quickLinksHeading = "",
  followUsHeading = "",
  addressLabel = "",
  address = "",
  emailLabel = "",
  email = "",
  phoneLabel = "",
  phone = "",
  quickLinks = [],
  socialLinks = [],
  siteNamePrimary = "",
  siteNameAccent = "",
  tagline = "",
  copyright = "",
}: FooterSectionProps) {
  const [imgError, setImgError] = useState(false);
  const showLogoImg = Boolean(logo && !imgError);

  return (
    <footer className="relative overflow-x-clip bg-gradient-to-r from-[#041546] via-[#072168] to-[#13177A] pt-10 pb-6 text-white sm:pt-12 sm:pb-7">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#6D1BFF]/35 blur-3xl"
      />

      <span
        aria-hidden
        className="pointer-events-none absolute top-3 left-3 h-6 w-6 border-t-2 border-l-2 border-[#FF6B00] sm:top-4 sm:left-4 sm:h-7 sm:w-7"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.45 }}
            className="md:col-span-5"
          >
            <h3 className="text-xl font-black tracking-tight sm:text-2xl">
              {contactHeading}
            </h3>
            <span className="mt-2 block h-[3.5px] w-11 rounded-full bg-[#FF6B00]" />

            <div className="mt-5 space-y-4 text-sm sm:mt-6 sm:space-y-5">
              <div className="flex items-center gap-3 sm:gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#FF6B00]/70 text-[#FF6B00]">
                  <MapPin className="h-5 w-5" strokeWidth={2} />
                </div>
                <div className="min-w-0 border-l border-white/25 pl-3 sm:pl-3.5">
                  <p className="text-xs font-extrabold tracking-wide text-white uppercase sm:text-[13px]">
                    {addressLabel}
                  </p>
                  <p className="mt-0.5 text-[13px] font-semibold text-slate-100 sm:text-[15px]">
                    {address}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#FF6B00]/70 text-[#FF6B00]">
                  <Mail className="h-5 w-5" strokeWidth={2} />
                </div>
                <div className="min-w-0 border-l border-white/25 pl-3 sm:pl-3.5">
                  <p className="text-xs font-extrabold tracking-wide text-white uppercase sm:text-[13px]">
                    {emailLabel}
                  </p>
                  <p className="mt-0.5 break-all text-[13px] font-semibold text-slate-100 sm:break-normal sm:text-[15px]">
                    {email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#FF6B00]/70 text-[#FF6B00]">
                  <Phone className="h-5 w-5" strokeWidth={2} />
                </div>
                <div className="min-w-0 border-l border-white/25 pl-3 sm:pl-3.5">
                  <p className="text-xs font-extrabold tracking-wide text-white uppercase sm:text-[13px]">
                    {phoneLabel}
                  </p>
                  <p className="mt-0.5 text-[13px] font-semibold text-slate-100 sm:text-[15px]">
                    {phone}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="md:col-span-3"
          >
            <h3 className="text-xl font-black tracking-tight sm:text-2xl">
              {quickLinksHeading}
            </h3>
            <span className="mt-2 block h-[3.5px] w-11 rounded-full bg-[#FF6B00]" />

            <ul className="mt-4 space-y-2.5 text-sm font-semibold text-slate-100 sm:mt-6 sm:space-y-3 sm:text-[15px]">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-[#FF6B00]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="flex flex-col justify-between md:col-span-4"
          >
            <div>
              <h3 className="text-xl font-black tracking-tight sm:text-2xl">
                {followUsHeading}
              </h3>
              <span className="mt-2 block h-[3.5px] w-11 rounded-full bg-[#FF6B00]" />

              <div className="mt-4 flex flex-wrap items-center gap-2.5 sm:mt-5">
                {socialLinks.map((item) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    aria-label={item.label}
                    whileHover={{ y: -2, scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 text-white transition hover:border-[#FF6B00] hover:text-[#FF6B00]"
                  >
                    {renderSocialMark(item.id, item.mark)}
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="mt-7 flex items-center justify-start sm:mt-8 md:justify-end">
              {showLogoImg && (
                <img
                  src={logo}
                  alt={logoAlt || `${siteNamePrimary}${siteNameAccent}`}
                  onError={() => setImgError(true)}
                  className="h-20 w-auto max-w-full shrink-0 object-contain sm:h-24 md:h-28"
                />
              )}
              {!showLogoImg && (
                <div className="leading-none">
                  <p className="text-3xl font-black tracking-tight sm:text-4xl">
                    <span className="text-white">{siteNamePrimary}</span>
                    <span className="text-[#FF6B00]">{siteNameAccent}</span>
                  </p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="h-[1px] flex-1 bg-[#FF6B00]" />
                    <span className="text-[8px] font-bold tracking-wider text-slate-200 uppercase">
                      {tagline}
                    </span>
                    <span className="h-[1px] flex-1 bg-[#FF6B00]" />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <div className="mt-8 border-t border-white/25 pt-4 text-[13px] font-semibold text-slate-100 sm:mt-10 sm:pt-5 sm:text-sm">
          {copyright}
        </div>
      </div>
    </footer>
  );
}