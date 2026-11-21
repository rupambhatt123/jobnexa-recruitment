"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

export interface NavbarLinkItem {
  id: string;
  label: string;
  href: string;
}

export interface NavbarSectionProps {
  logo?: string;
  logoAlt?: string;
  siteNamePrimary?: string;
  siteNameAccent?: string;
  tagline?: string;
  homeHref?: string;
  homeAriaLabel?: string;
  menuAriaLabel?: string;
  navLinks?: NavbarLinkItem[];
  ctaButton?: {
    label: string;
    href: string;
  };
}

export default function Navbar({
  logo = "/images/logo.png",
  logoAlt = "JobNexa Logo",
  siteNamePrimary = "Job",
  siteNameAccent = "Nexa",
  tagline = "HR Recruitment & Talent Solutions",
  homeHref = "#home",
  homeAriaLabel = "JobNexa home",
  menuAriaLabel = "Toggle Menu",
  navLinks = [],
  ctaButton = { label: "Contact Us", href: "#callback" },
}: NavbarSectionProps) {
  const [activeHref, setActiveHref] = useState(navLinks[0]?.href ?? homeHref);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const showLogo = Boolean(logo && !imgError);

  const handleSmoothNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    closeMobile = false
  ) => {
    setActiveHref(href);
    if (closeMobile) {
      setMobileOpen(false);
    }

    if (href.startsWith("#")) {
      const targetId = href.slice(1);
      const el = document.getElementById(targetId);
      if (el) {
        e.preventDefault();
        const headerOffset = 96;
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = Math.max(0, elementPosition - headerOffset);

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    const allTargets = [
      ...navLinks,
      ...(ctaButton?.href ? [{ id: "cta", label: ctaButton.label, href: ctaButton.href }] : []),
    ].filter((item) => item.href.startsWith("#"));

    if (!allTargets.length) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80;

      if (nearBottom && ctaButton?.href?.startsWith("#")) {
        setActiveHref(ctaButton.href);
        return;
      }

      let currentActive = allTargets[0]?.href ?? homeHref;

      for (const item of allTargets) {
        const targetId = item.href.slice(1);
        const el = document.getElementById(targetId);
        if (el && el.offsetTop <= scrollPosition) {
          currentActive = item.href;
        }
      }

      setActiveHref(currentActive);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks, ctaButton, homeHref]);

  const isCtaActive = activeHref === ctaButton.href;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed top-3 left-0 right-0 z-50 px-3 sm:top-4 sm:px-4"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full bg-white px-4 py-2.5 shadow-xl shadow-slate-950/15 sm:px-6 sm:py-3">
        <a
          href={homeHref}
          aria-label={homeAriaLabel}
          onClick={(e) => handleSmoothNav(e, homeHref)}
          className="flex shrink-0 items-center gap-2.5 leading-none"
        >
          {showLogo ? (
            <img
              src={logo}
              alt={logoAlt || `${siteNamePrimary}${siteNameAccent}`}
              onError={() => setImgError(true)}
              className="h-11 w-auto object-contain sm:h-12 md:h-14"
            />
          ) : (
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black tracking-tight text-[#071947] sm:text-2xl">
                {siteNamePrimary}
                <span className="text-[#FF6B00]">{siteNameAccent}</span>
              </span>
              {tagline && (
                <span className="mt-0.5 text-[10px] font-bold tracking-wider text-slate-600 uppercase">
                  {tagline}
                </span>
              )}
            </div>
          )}
        </a>

        <nav className="hidden items-center justify-center gap-5 md:flex lg:gap-7">
          {navLinks.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleSmoothNav(e, item.href)}
                className={`relative py-1 text-[15px] font-extrabold whitespace-nowrap transition-colors lg:text-[16px] ${
                  isActive
                    ? "text-[#FF6B00]"
                    : "text-[#071947] hover:text-[#FF6B00]"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="navIndicator"
                    className="mt-0.5 block h-1 w-full rounded-full bg-[#FF6B00]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="hidden shrink-0 md:block">
          <a
            href={ctaButton.href}
            onClick={(e) => handleSmoothNav(e, ctaButton.href)}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-extrabold whitespace-nowrap transition-all lg:px-6 lg:text-[16px] ${
              isCtaActive
                ? "scale-[1.03] bg-[#071947] text-white ring-4 ring-[#FF6B00]/35"
                : "bg-[#FF6B00] text-white hover:bg-[#e55f00]"
            }`}
          >
            <span>{ctaButton.label}</span>
            <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.75} />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={menuAriaLabel}
          className="rounded-full p-2 text-[#071947] hover:bg-slate-100 md:hidden"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="mx-auto mt-2 max-w-6xl rounded-3xl bg-white p-4 shadow-xl sm:p-5 md:hidden">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((item) => {
              const isActive = activeHref === item.href;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleSmoothNav(e, item.href, true)}
                  className={`rounded-xl px-3.5 py-2.5 text-base font-extrabold transition-colors ${
                    isActive
                      ? "bg-orange-50 text-[#FF6B00]"
                      : "text-[#071947] hover:bg-slate-50 hover:text-[#FF6B00]"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href={ctaButton.href}
              onClick={(e) => handleSmoothNav(e, ctaButton.href, true)}
              className={`mt-2 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-base font-extrabold text-white transition-all ${
                isCtaActive
                  ? "bg-[#071947] ring-4 ring-[#FF6B00]/35"
                  : "bg-[#FF6B00]"
              }`}
            >
              <span>{ctaButton.label}</span>
              <ArrowRight className="h-4 w-4" strokeWidth={2.75} />
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
}