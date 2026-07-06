// ============================================
// SOLAR PRODUCT CATEGORIES
// KHÔNG bán hàng — chỉ giới thiệu 4 danh mục thiết bị
// ============================================

import { motion } from "framer-motion";
import { ArrowRight, Cpu, Battery, Sun, Wrench } from "lucide-react";
import { productCategories } from "../../data/solarData";

const ICONS = {
  inverter: Cpu,
  battery: Battery,
  panel: Sun,
  accessory: Wrench,
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" },
  }),
};

const SolarProductCategories = () => {
  const scrollToQuote = () => {
    const el = document.getElementById("quote");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="products" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-semibold text-slate-700 md:text-sm"
          >
            Thiết bị chính hãng
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl lg:text-5xl"
          >
            Danh mục <span className="text-emerald-600">thiết bị</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base text-slate-600 md:text-lg"
          >
            Chúng tôi tư vấn và cung cấp thiết bị chính hãng từ các thương
            hiệu hàng đầu thế giới — phù hợp với nhu cầu và ngân sách của
            bạn.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {productCategories.map((cat, i) => {
            const Icon = ICONS[cat.id] || Sun;
            return (
              <motion.div
                key={cat.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-emerald-500/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-transparent to-transparent" />

                  <div className="absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-emerald-600 shadow-md backdrop-blur">
                    <Icon size={22} strokeWidth={2.2} />
                  </div>
                </div>

                <div className="p-5 md:p-6">
                  <h3 className="mb-2 text-lg font-bold text-slate-900 md:text-xl">
                    {cat.title}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-slate-600">
                    {cat.description}
                  </p>
                  <button
                    type="button"
                    onClick={scrollToQuote}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 transition-all hover:gap-2.5"
                  >
                    Xem chi tiết
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SolarProductCategories;
