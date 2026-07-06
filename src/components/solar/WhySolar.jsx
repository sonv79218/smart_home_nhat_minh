// ============================================
// WHY SOLAR SECTION
// 4 cards: tiết kiệm / hoàn vốn / bảo hành / đội ngũ
// ============================================

import { motion } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  ShieldCheck,
  Users,
} from "lucide-react";
import { whySolarFeatures } from "../../data/solarData";

const ICONS = {
  Wallet,
  TrendingUp,
  ShieldCheck,
  Users,
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const WhySolar = () => {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700 md:text-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Vì sao chọn chúng tôi
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl lg:text-5xl"
          >
            Tại sao chọn{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">
              Nhật Minh Solar
            </span>
            ?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base text-slate-600 md:text-lg"
          >
            Hơn 8 năm kinh nghiệm thi công điện mặt trời với hơn 500 công
            trình lớn nhỏ trên toàn quốc.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {whySolarFeatures.map((feature, i) => {
            const Icon = ICONS[feature.icon] || ShieldCheck;
            return (
              <motion.div
                key={feature.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 transition-shadow duration-300 hover:shadow-xl hover:shadow-emerald-500/10 md:p-7"
              >
                {/* Decorative gradient */}
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-100 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Icon */}
                <div className="relative mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30">
                  <Icon size={26} strokeWidth={2.2} />
                </div>

                <h3 className="mb-2 text-lg font-bold text-slate-900 md:text-xl">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 md:text-[15px]">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhySolar;
