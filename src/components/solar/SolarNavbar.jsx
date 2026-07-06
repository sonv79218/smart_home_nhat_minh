// ============================================
// SOLAR NAVBAR — Header riêng cho Nhật Minh Solar
// Branding: xanh lá + vàng (sạch, premium)
// ============================================

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, Sun } from "lucide-react";
import { solarNavLinks, solarContactInfo } from "../../data/solarData";

const SolarNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleNavClick = (e, href) => {
    if (!href?.startsWith("#")) return;
    e.preventDefault();
    setIsMobileOpen(false);
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleCtaClick = (e) => {
    handleNavClick(e, "#quote");
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-[1000] transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md shadow-slate-200/60"
            : "bg-white"
        }`}
      >
        <nav className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-4 px-4 md:px-6 lg:px-8">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex shrink-0 items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25">
              <Sun size={22} strokeWidth={2.2} />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[15px] font-extrabold tracking-tight text-slate-900 md:text-[17px]">
                NHAT MINH <span className="text-emerald-600">SOLAR</span>
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
                Điện mặt trời Bắc Ninh
              </span>
            </div>
          </a>

          {/* Desktop menu */}
          <ul className="hidden items-center gap-1 lg:flex">
            {solarNavLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="relative inline-flex items-center px-4 py-2 text-[15px] font-medium text-slate-700 transition-colors duration-200 hover:text-emerald-600"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right CTA */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${solarContactInfo.hotline.replace(/\./g, "")}`}
              className="hidden items-center gap-2 text-sm font-semibold text-slate-700 transition-colors hover:text-emerald-600 lg:flex"
            >
              <Phone size={16} />
              {solarContactInfo.hotline}
            </a>

            <button
              type="button"
              onClick={handleCtaClick}
              className="hidden items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-500/40 lg:inline-flex"
            >
              Nhận báo giá
            </button>

            <button
              type="button"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-800 lg:hidden"
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] z-[999] bg-white shadow-xl lg:hidden"
          >
            <div className="mx-auto max-w-[1280px] px-4 py-4">
              <ul className="space-y-1">
                {solarNavLinks.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="block rounded-xl px-4 py-3 text-[15px] font-medium text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                <a
                  href={`tel:${solarContactInfo.hotline.replace(/\./g, "")}`}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-emerald-50"
                >
                  <Phone size={16} className="text-emerald-600" />
                  Hotline: {solarContactInfo.hotline}
                </a>

                <button
                  type="button"
                  onClick={(e) => handleCtaClick(e)}
                  className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/30"
                >
                  Nhận báo giá miễn phí
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* spacer to offset fixed header on solar pages */}
      <div className="h-[72px]" />
    </>
  );
};

export default SolarNavbar;
