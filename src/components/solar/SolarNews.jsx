// ============================================
// SOLAR NEWS — 3 bài viết mới nhất
// ============================================

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { solarNews } from "../../data/solarData";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const SolarNews = () => {
  return (
    <section id="news" className="bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:mb-14 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm md:text-sm"
            >
              Tin tức & Kiến thức
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl"
            >
              Cẩm nang <span className="text-emerald-600">điện mặt trời</span>
            </motion.h2>
          </div>

          <motion.button
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            type="button"
            className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-700 shadow-sm transition-all hover:bg-emerald-50"
          >
            Xem tất cả
            <ArrowRight size={16} />
          </motion.button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {solarNews.map((post, i) => (
            <motion.article
              key={post.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
              </div>

              <div className="p-5 md:p-6">
                <div className="mb-3 inline-flex items-center gap-1.5 text-xs text-slate-500">
                  <Calendar size={14} />
                  {post.date}
                </div>

                <h3 className="mb-3 line-clamp-2 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-emerald-700 md:text-xl">
                  {post.title}
                </h3>
                <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-slate-600">
                  {post.excerpt}
                </p>

                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 transition-all group-hover:gap-2.5">
                  Đọc tiếp
                  <ArrowRight size={16} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolarNews;
