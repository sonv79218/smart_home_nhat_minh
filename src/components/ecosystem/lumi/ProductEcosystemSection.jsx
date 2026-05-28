// ============================================
// PRODUCT ECOSYSTEM SECTION
// ============================================
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const ProductEcosystemSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const categories = [
    {
      title: "Công tắc thông minh",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      description: "Điều khiển ánh sáng bằng app, giọng nói hoặc auto",
      count: "12+ sản phẩm",
      link: "/products?brand=lumi&category=switches",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Cảm biến",
      image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
      description: "Phát hiện chuyển động, nhiệt độ, độ ẩm, ánh sáng",
      count: "8+ sản phẩm",
      link: "/products?brand=lumi&category=sensors",
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Camera",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80",
      description: "Giám sát 24/7 với hình ảnh HD và night vision",
      count: "5+ sản phẩm",
      link: "/products?brand=lumi&category=cameras",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Rèm thông minh",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80",
      description: "Tự động đóng mở theo thời gian hoặc ánh sáng",
      count: "4+ sản phẩm",
      link: "/products?brand=lumi&category=curtains",
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Điều khiển trung tâm",
      image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600&q=80",
      description: "Hub kết nối và điều phối mọi thiết bị trong nhà",
      count: "3+ sản phẩm",
      link: "/products?brand=lumi&category=hubs",
      color: "from-red-500 to-rose-500",
    },
    {
      title: "Khóa cửa thông minh",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80",
      description: "Mở khóa bằng vân tay, mật mã, NFC hoặc app",
      count: "4+ sản phẩm",
      link: "/products?brand=lumi&category=locks",
      color: "from-indigo-500 to-blue-500",
    },
    {
      title: "Đèn thông minh",
      image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&q=80",
      description: "LED RGB điều chỉnh màu sắc, độ sáng theo ý muốn",
      count: "6+ sản phẩm",
      link: "/products?brand=lumi&category=lights",
      color: "from-yellow-500 to-amber-500",
    },
  ];

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-sm text-cyan-400 font-medium">Hệ sinh thái sản phẩm</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Giải pháp toàn diện
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              cho mọi nhu cầu
            </span>
          </h2>

          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Khám phá hệ sinh thái sản phẩm đa dạng, được thiết kế để tích hợp hoàn hảo với nhau.
          </p>
        </motion.div>

        {/* Category Cards - Horizontal Scroll on Mobile */}
        <div className="relative">
          {/* Gradient Overlays for Horizontal Scroll */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none" />

          {/* Scroll Container */}
          <div className="overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
            <div className="flex gap-6" style={{ minWidth: "max-content" }}>
              {categories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, x: 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex-shrink-0 w-[320px]"
                >
                  <Link
                    to={category.link}
                    className="block relative h-full rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

                      {/* Color Tint */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 mix-blend-overlay`} />

                      {/* Count Badge */}
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                        <span className="text-xs text-white/80">{category.count}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-sm text-white/60 leading-relaxed">
                        {category.description}
                      </p>

                      {/* Arrow */}
                      <div className="mt-4 flex items-center gap-2 text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                        Xem sản phẩm
                        <ArrowRightIcon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Hover Glow */}
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                    {/* Icon */}
                    <div className={`absolute bottom-20 right-5 w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} opacity-20 flex items-center justify-center`}>
                      <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${category.color}`} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            to="/products?brand=lumi"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            Xem tất cả sản phẩm Lumi
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const ArrowRightIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export default ProductEcosystemSection;
