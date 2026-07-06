// ============================================
// SOLAR SOLUTIONS SECTION
// Grid lớn: 5 giải pháp điện mặt trời
// ============================================

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { solarSolutions } from "../../data/solarData";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

const SolarSolutions = () => {
  const scrollToQuote = () => {
    const el = document.getElementById("quote");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="solutions" className="bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm md:text-sm"
          >
            Các giải pháp
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl lg:text-5xl"
          >
            Giải pháp điện mặt trời{" "}
            <span className="text-emerald-600">toàn diện</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base text-slate-600 md:text-lg"
          >
            Tư vấn giải pháp phù hợp cho mọi nhu cầu — từ hộ gia đình đến
            nhà máy công nghiệp quy mô lớn.
          </motion.p>
        </div>

        {/* Featured: 1 large + 4 small */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {/* Featured first card */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-800 p-6 text-white shadow-xl md:col-span-2 md:p-8 lg:col-span-2 lg:row-span-1 lg:p-10"
          >
            <div className="absolute inset-0 opacity-20">
              <img
                src={solarSolutions[0].image}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/95 via-emerald-700/85 to-emerald-600/40" />

            <div className="relative grid h-full grid-cols-1 items-center gap-6 lg:grid-cols-2">
              <div>
                <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-semibold text-amber-200">
                  Phổ biến nhất
                </span>
                <h3 className="mb-3 text-2xl font-bold md:text-3xl">
                  {solarSolutions[0].title}
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-emerald-50 md:text-base">
                  {solarSolutions[0].description}
                </p>
                <ul className="mb-6 space-y-2">
                  {solarSolutions[0].benefits.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-2 text-sm text-emerald-50 md:text-[15px]"
                    >
                      <CheckCircle2 size={16} className="text-amber-300" />
                      {b}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={scrollToQuote}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-emerald-700 transition-all hover:-translate-y-0.5 hover:shadow-xl md:text-base"
                >
                  Tư vấn miễn phí
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="hidden lg:block">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                  <img
                    src={solarSolutions[0].image}
                    alt={solarSolutions[0].title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Remaining 4 solutions */}
          {solarSolutions.slice(1).map((sol, i) => (
            <motion.div
              key={sol.id}
              custom={i + 1}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-emerald-500/10"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={sol.image}
                  alt={sol.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-transparent to-transparent" />
              </div>

              <div className="p-5 md:p-6">
                <h3 className="mb-2 text-lg font-bold text-slate-900 md:text-xl">
                  {sol.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-slate-600">
                  {sol.description}
                </p>
                <ul className="mb-5 space-y-1.5">
                  {sol.benefits.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-2 text-sm text-slate-700"
                    >
                      <CheckCircle2
                        size={14}
                        className="shrink-0 text-emerald-500"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={scrollToQuote}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 transition-all hover:gap-2.5"
                >
                  Tư vấn chi tiết
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolarSolutions;
