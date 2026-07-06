// ============================================
// NHAT MINH SOLAR — Main page
// Tổng hợp tất cả các section
// Đơn vị tư vấn, thiết kế và thi công điện mặt trời
// ============================================

import { useEffect } from "react";

import SolarNavbar from "../components/solar/SolarNavbar";
import SolarFooter from "../components/solar/SolarFooter";

import SolarHero from "../components/solar/SolarHero";
import WhySolar from "../components/solar/WhySolar";
import SolarCustomers from "../components/solar/SolarCustomers";
import SolarCalculator from "../components/solar/SolarCalculator";
import SolarSolutions from "../components/solar/SolarSolutions";
import SolarProductCategories from "../components/solar/SolarProductCategories";
import SolarBrands from "../components/solar/SolarBrands";
import SolarProjects from "../components/solar/SolarProjects";
import SolarTimeline from "../components/solar/SolarTimeline";
import SolarTestimonials from "../components/solar/SolarTestimonials";
import SolarNews from "../components/solar/SolarNews";
import SolarQuoteForm from "../components/solar/SolarQuoteForm";

// SEO meta configuration (lightweight, no extra dependency)
const SEO_META = [
  {
    name: "description",
    content:
      "Đơn vị tư vấn, thiết kế và thi công điện năng lượng mặt trời cho hộ gia đình và doanh nghiệp tại Bắc Ninh.",
  },
  {
    name: "keywords",
    content:
      "điện mặt trời, năng lượng mặt trời, solar, Bắc Ninh, Nhật Minh Solar, pin mặt trời, inverter, điện năng lượng mặt trời",
  },
  { property: "og:title", content: "Nhật Minh Solar | Điện mặt trời Bắc Ninh" },
  {
    property: "og:description",
    content:
      "Đơn vị tư vấn, thiết kế và thi công điện năng lượng mặt trời cho hộ gia đình và doanh nghiệp tại Bắc Ninh.",
  },
  { property: "og:type", content: "website" },
];

const setMeta = (selector, attr, value) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(selector.startsWith("meta") ? "meta" : "title");
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

const SolarPage = () => {
  useEffect(() => {
    // Ensure scroll to top when entering page
    window.scrollTo({ top: 0, behavior: "auto" });

    // Page title
    const prevTitle = document.title;
    document.title = "Điện năng lượng mặt trời Bắc Ninh | Nhật Minh Solar";

    // Inject / update meta tags
    const prevValues = [];
    SEO_META.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      const attr = name ? "name" : "property";
      const existing = document.head.querySelector(selector);
      prevValues.push({ selector, attr, existing, prevValue: existing?.getAttribute("content") });
      setMeta(selector, attr, content);
    });

    // Cleanup: restore previous values on unmount
    return () => {
      document.title = prevTitle;
      prevValues.forEach(({ selector, existing, prevValue }) => {
        if (existing) {
          existing.setAttribute("content", prevValue || "");
        } else {
          const orphan = document.head.querySelector(selector);
          if (orphan) orphan.remove();
        }
      });
    };
  }, []);

  return (
    <>
      <SolarNavbar />

      <main className="bg-white">
        <SolarHero />
        <WhySolar />
        <SolarCustomers />
        <SolarCalculator />
        <SolarSolutions />
        <SolarProductCategories />
        <SolarBrands />
        <SolarProjects />
        <SolarTimeline />
        <SolarTestimonials />
        <SolarNews />
        <SolarQuoteForm />
      </main>

      <SolarFooter />
    </>
  );
};

export default SolarPage;