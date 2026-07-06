// ============================================
// SOLAR PROJECTS — Dự án tiêu biểu
// Card lớn có ảnh, tên, địa điểm, công suất
// ============================================

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Zap } from "lucide-react";
import { solarProjects } from "../../data/solarData";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const SolarProjects = () => {
  return (
    <section id="projects" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-semibold text-amber-700 md:text-sm"
          >
            Dự án tiêu biểu
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl lg:text-5xl"
          >
            Công trình{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">
              đã thực hiện
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base text-slate-600 md:text-lg"
          >
            Hơn 500 công trình lắp đặt trên toàn quốc — chúng tôi tự hào
            mang đến giải pháp điện mặt trời chất lượng cho mọi khách hàng.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {solarProjects.map((project, i) => (
            <motion.div
              key={project.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-emerald-500/10"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/30 to-transparent" />

                {/* Capacity badge */}
                <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg md:text-sm">
                  <Zap size={14} />
                  {project.capacity}
                </div>

                {/* Title overlay */}
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <h3 className="text-lg font-bold text-white md:text-xl">
                    {project.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-white/85 md:text-sm">
                    <MapPin size={14} />
                    {project.location}
                  </div>
                </div>
              </div>

              <div className="p-5 md:p-6">
                <p className="mb-5 text-sm leading-relaxed text-slate-600">
                  {project.description}
                </p>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 transition-all hover:gap-2.5"
                >
                  Xem chi tiết
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

export default SolarProjects;
