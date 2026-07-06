// ============================================
// SOLAR HERO SECTION
// Fullscreen background, overlay tối, 2 CTA
// ============================================

import { motion } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Sun,
  Zap,
  Leaf,
} from "lucide-react";
import { heroData } from "../../data/solarData";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const SolarHero = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[90vh] items-center overflow-hidden bg-slate-900 pt-12 lg:min-h-screen lg:pt-0"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroData.backgroundImage}
          alt="Nhà lắp pin mặt trời"
          className="h-full w-full object-cover"
          loading="eager"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-slate-900/75 to-emerald-900/70" />
        {/* Subtle decorative gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(22,163,74,0.18),transparent_55%)]" />
      </div>

      {/* Decorative sun beams */}
      <div className="pointer-events-none absolute -right-24 top-12 -z-10 h-96 w-96 opacity-30">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/40 via-amber-300/20 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-[1280px] px-4 py-20 md:px-6 lg:px-8 lg:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-300 backdrop-blur md:text-sm"
          >
            <Sparkles size={14} className="text-amber-300" />
            {heroData.badge}
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            <span className="block">{heroData.titleLine1}</span>
            <span className="mt-2 block bg-gradient-to-r from-amber-300 via-amber-200 to-emerald-300 bg-clip-text text-transparent">
              {heroData.titleLine2}
            </span>
          </motion.h1>

          {/* Subtitle checklist */}
          <motion.ul
            variants={itemVariants}
            className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {heroData.subtitle.map((line) => (
              <li
                key={line}
                className="flex items-center gap-2 text-base text-white/90 md:text-lg"
              >
                <CheckCircle2
                  size={20}
                  className="shrink-0 text-emerald-400"
                  strokeWidth={2.4}
                />
                <span>{line}</span>
              </li>
            ))}
          </motion.ul>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <button
              type="button"
              onClick={() => scrollTo("quote")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-7 py-4 text-base font-semibold text-white shadow-lg shadow-amber-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-500/40"
            >
              {heroData.primaryCta.label}
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              onClick={() => scrollTo("projects")}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20"
            >
              {heroData.secondaryCta.label}
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="mt-14 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/10 pt-8"
          >
            <Stat icon={Sun} value="500+" label="Công trình" />
            <Stat icon={Zap} value="8 MWp" label="Tổng công suất" />
            <Stat icon={Leaf} value="90%" label="Tiết kiệm điện" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Stat = ({ icon: Icon, value, label }) => (
  <div className="flex items-center gap-3">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-300 backdrop-blur">
      <Icon size={20} />
    </div>
    <div>
      <div className="text-lg font-bold text-white md:text-xl">{value}</div>
      <div className="text-xs text-white/70 md:text-sm">{label}</div>
    </div>
  </div>
);

export default SolarHero;
