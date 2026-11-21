import websiteData from "../data/websiteData.json";
import Navbar, { type NavbarSectionProps } from "../components/Navbar";
import HeroSection, { type HeroSectionProps } from "../components/HeroSection";
import AboutSection, { type AboutSectionProps } from "../components/AboutSection";
import HiringPartners, {
  type HiringPartnersSectionProps,
} from "../components/HiringPartners";
import ServicesSection, {
  type ServicesSectionProps,
} from "../components/ServicesSection";
import WhyChooseUs, {
  type WhyChooseUsSectionProps,
} from "../components/WhyChooseUs";
import JobOpeningsSection, {
  type JobOpeningsSectionProps,
} from "../components/JobOpeningsSection";
import TestimonialsSection, {
  type TestimonialsSectionProps,
} from "../components/TestimonialsSection";
import CallBackSection, {
  type CallBackSectionProps,
} from "../components/CallBackSection";
import Footer, { type FooterSectionProps } from "../components/Footer";

function getVariant(
  variants: Record<string, unknown> | undefined,
  key: string
): Record<string, unknown> {
  const raw = variants?.[key];
  return raw && typeof raw === "object"
    ? (raw as Record<string, unknown>)
    : {};
}

export default function HomePage() {
  const { common, categories } = websiteData;
  const recruitment = categories.RecruitmentHR;
  const template = recruitment.templateComponents["template-1"];
  const sections = recruitment.sections as Record<
    string,
    { variants?: Record<string, unknown> }
  >;

  const headerData = getVariant(
    sections.Header?.variants,
    template.shared.Header
  ) as unknown as NavbarSectionProps;

  const footerData = getVariant(
    sections.Footer?.variants,
    template.shared.Footer
  ) as unknown as FooterSectionProps;

  const renderSection = (key: string, componentName: string) => {
    const rawData = getVariant(sections[key]?.variants, componentName);

    switch (key) {
      case "Banner":
        return (
          <HeroSection
            key={key}
            {...(rawData as unknown as HeroSectionProps)}
          />
        );
      case "About":
        return (
          <AboutSection
            key={key}
            {...(rawData as unknown as AboutSectionProps)}
          />
        );
      case "Partners":
        return (
          <HiringPartners
            key={key}
            {...(rawData as unknown as HiringPartnersSectionProps)}
          />
        );
      case "Services":
        return (
          <ServicesSection
            key={key}
            {...(rawData as unknown as ServicesSectionProps)}
          />
        );
      case "WhyChooseUs":
        return (
          <WhyChooseUs
            key={key}
            {...(rawData as unknown as WhyChooseUsSectionProps)}
          />
        );
      case "Jobs":
        return (
          <JobOpeningsSection
            key={key}
            {...(rawData as unknown as JobOpeningsSectionProps)}
          />
        );
      case "Testimonials":
        return (
          <TestimonialsSection
            key={key}
            {...(rawData as unknown as TestimonialsSectionProps)}
          />
        );
      case "Contact":
        return (
          <CallBackSection
            key={key}
            {...(rawData as unknown as CallBackSectionProps)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#071947]">
      <Navbar
        logo="/logo.png"
        siteNamePrimary={common.siteNamePrimary}
        siteNameAccent={common.siteNameAccent}
        tagline={common.tagline}
        homeHref={headerData.homeHref}
        homeAriaLabel={headerData.homeAriaLabel}
        menuAriaLabel={headerData.menuAriaLabel}
        navLinks={headerData.navLinks}
        ctaButton={headerData.ctaButton}
      />

      <main>
        {template.pages.home.components.map((item) =>
          renderSection(item.key, item.component)
        )}
      </main>

      <Footer
        logo="/logo1.png"
        contactHeading={footerData.contactHeading}
        quickLinksHeading={footerData.quickLinksHeading}
        followUsHeading={footerData.followUsHeading}
        addressLabel={footerData.addressLabel}
        address={common.address}
        emailLabel={footerData.emailLabel}
        email={common.email}
        phoneLabel={footerData.phoneLabel}
        phone={common.phone}
        quickLinks={footerData.quickLinks}
        socialLinks={common.socialLinks as FooterSectionProps["socialLinks"]}
        siteNamePrimary={common.siteNamePrimary}
        siteNameAccent={common.siteNameAccent}
        tagline={common.tagline}
        copyright={footerData.copyright}
      />
    </div>
  );
}
