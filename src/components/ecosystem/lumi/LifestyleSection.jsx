// ============================================
// LIFESTYLE SECTION - WHO IS IT FOR
// ============================================
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const LifestyleSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const lifestyles = [
    {
      title: "Chung cư hiện đại",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      description: "Tối ưu không gian sống với giải pháp thông minh cho căn hộ nhỏ gọn nhưng đầy đủ tiện nghi.",
      devices: ["Công tắc thông minh", "Đèn LED RGB", "Cảm biến hiện diện", "Khóa cửa thông minh"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Nhà phố",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      description: "Kết nối mọi tầng, mọi phòng trong ngôi nhà với hệ thống đồng bộ và dễ mở rộng.",
      devices: ["Camera an ninh", "Chuông cửa video", "Cảm biến cửa sổ", "Điều khiển cổng"],
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Biệt thự cao cấp",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      description: "Trải nghiệm sống sang trọng với hệ thống tự động hóa toàn diện cho không gian rộng lớn.",
      devices: ["Rèm thông minh", "Điều hòa trung tâm", "Hệ thống âm thanh", "Chiếu sáng cảnh quan"],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Văn phòng & Showroom",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      description: "Nâng cao hiệu suất làm việc và tiết kiệm năng lượng với giải pháp thông minh cho doanh nghiệp.",
      devices: ["Điều khiển theo lịch", "Cảm biến ánh sáng", "HVAC thông minh", "Hệ thống báo động"],
      color: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-sm text-purple-400 font-medium">Phù hợp với bạn</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Dành cho mọi không gian
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              mọi lối sống
            </span>
          </h2>

          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Dù bạn sống trong căn hộ nhỏ hay biệt thự rộng lớn, Lumi đều có giải pháp phù hợp.
          </p>
        </motion.div>

        {/* Lifestyle Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {lifestyles.map((lifestyle, index) => (
            <motion.div
              key={lifestyle.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="relative h-full rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={lifestyle.image}
                    alt={lifestyle.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

                  {/* Color Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${lifestyle.color} opacity-20 mix-blend-overlay`} />

                  {/* Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">{lifestyle.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-white/70 mb-5 leading-relaxed">{lifestyle.description}</p>

                  {/* Device Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {lifestyle.devices.map((device) => (
                      <span
                        key={device}
                        className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-white/70"
                      >
                        {device}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    to={`/products?brand=lumi`}
                    className={`
                      inline-flex items-center gap-2 text-sm font-semibold
                      bg-gradient-to-r ${lifestyle.color} bg-clip-text text-transparent
                      hover:gap-3 transition-all duration-300
                    `}
                  >
                    Khám phá giải pháp
                    <ArrowRightIcon className="w-4 h-4 text-current" />
                  </Link>
                </div>

                {/* Hover Glow */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${lifestyle.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ArrowRightIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export default LifestyleSection;
