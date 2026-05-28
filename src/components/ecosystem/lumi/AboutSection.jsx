// ============================================
// ABOUT SECTION - LUMI ECOSYSTEM
// ============================================
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const stats = [
    { value: "10+", label: "Năm kinh nghiệm", color: "from-blue-500 to-cyan-500" },
    { value: "30+", label: "Quốc gia xuất khẩu", color: "from-emerald-500 to-teal-500" },
    { value: "50K+", label: "Công trình lắp đặt", color: "from-purple-500 to-pink-500" },
    { value: "50+", label: "Chứng nhận quốc tế", color: "from-orange-500 to-red-500" },
  ];

  const highlights = [
    {
      icon: RocketIcon,
      title: "Khởi nguồn từ Robocon",
      description: "Được sáng lập bởi 3 thành viên đội Robocon HUST - những kỹ sư hàng đầu về tự động hóa.",
    },
    {
      icon: VietnamIcon,
      title: "Sản xuất tại Việt Nam",
      description: "100% sản phẩm được nghiên cứu, phát triển và sản xuất tại Việt Nam với chất lượng quốc tế.",
    },
    {
      icon: GlobeIcon,
      title: "Hệ sinh thái toàn cầu",
      description: "Tích hợp hoàn hảo với Apple HomeKit, Google Home và Amazon Alexa.",
    },
    {
      icon: AwardIcon,
      title: "Thương hiệu hàng đầu",
      description: "Top 1 thương hiệu nhà thông minh Việt Nam với hàng nghìn dự án thành công.",
    },
  ];

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                alt="Lumi Smart Home Technology"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 shadow-2xl shadow-blue-500/20"
            >
              <p className="text-4xl font-bold text-white">2012</p>
              <p className="text-white/80 text-sm">Năm thành lập</p>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border border-blue-500/30 rounded-2xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 border border-cyan-500/20 rounded-full" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Section Label */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-sm text-blue-400 font-medium">Về Lumi</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Tiên phong công nghệ
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                nhà thông minh Việt
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              Lumi Smart Home được thành lập bởi 3 cựu thành viên đội Robocon của Trường Đại học Bách khoa Hà Nội - những người có niềm đam mê với tự động hóa và công nghệ. Từ năm 2012, Lumi đã không ngừng phát triển và trở thành thương hiệu nhà thông minh hàng đầu Việt Nam.
            </p>

            {/* Highlight Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="group p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-white/60">{item.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                  <p className="text-sm text-white/60 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Icons
const RocketIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const VietnamIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
  </svg>
);

const GlobeIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AwardIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

export default AboutSection;
