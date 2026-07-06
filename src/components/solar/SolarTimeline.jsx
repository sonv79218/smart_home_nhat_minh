// ============================================
// SOLAR TIMELINE — Quy trình thi công 6 bước
// Mobile: vertical, Desktop: horizontal timeline
// ============================================

import { motion } from "framer-motion";
import {
  ClipboardList,
  PenTool,
  FileText,
  HardHat,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { constructionSteps } from "../../data/solarData";

const STEP_ICONS = [
  ClipboardList,
  PenTool,
  FileText,
  HardHat,
  CheckCircle2,
  ShieldCheck,
];

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const SolarTimeline = () => {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
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
            Quy trình chuyên nghiệp
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl lg:text-5xl"
          >
            Quy trình <span className="text-emerald-600">thi công</span> 6
            bước
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base text-slate-600 md:text-lg"
          >
            Quy trình chuẩn hóa từ khảo sát đến bảo hành — đảm bảo chất
            lượng và tiến độ cho mọi công trình.
          </motion.p>
        </div>

        {/* Desktop timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Horizontal line */}
            <div className="absolute left-0 right-0 top-9 h-0.5 bg-gradient-to-r from-emerald-200 via-emerald-400 to-amber-300" />

            <div className="grid grid-cols-6 gap-3">
              {constructionSteps.map((step, i) => {
                const Icon = STEP_ICONS[i] || ClipboardList;
                return (
                  <motion.div
                    key={step.id}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="relative flex flex-col items-center text-center"
                  >
                    {/* Circle node */}
                    <div className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30">
                      <Icon size={28} strokeWidth={2.2} />
                      <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-slate-900 shadow">
                        {step.id}
                      </span>
                    </div>

                    <h3 className="mt-5 text-base font-bold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile timeline */}
        <div className="relative lg:hidden">
          {/* vertical line */}
          <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gradient-to-b from-emerald-300 to-amber-300" />

          <div className="space-y-6">
            {constructionSteps.map((step, i) => {
              const Icon = STEP_ICONS[i] || ClipboardList;
              return (
                <motion.div
                  key={step.id}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-50px" }}
                  className="relative flex gap-4 pl-2"
                >
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30">
                    <Icon size={20} strokeWidth={2.4} />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-slate-900 shadow">
                      {step.id}
                    </span>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                    <h3 className="mb-1 text-base font-bold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolarTimeline;
