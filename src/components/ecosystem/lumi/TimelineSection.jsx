// ============================================
// TIMELINE SECTION
// ============================================
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const TimelineSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const milestones = [
    {
      year: "2012",
      title: "Thành lập công ty",
      description: "3 cựu thành viên đội Robocon HUST sáng lập Lumi với khát vọng mang công nghệ tự động hóa đến mọi gia đình Việt.",
      icon: RocketIcon,
    },
    {
      year: "2014",
      title: "Ra mắt Lumi Smart Home",
      description: "Sản phẩm đầu tiên được đưa ra thị trường, đánh dấu bước tiến quan trọng trong ngành nhà thông minh Việt Nam.",
      icon: HomeIcon,
    },
    {
      year: "2015",
      title: "Mở rộng hệ sinh thái",
      description: "Tích hợp thêm nhiều thiết bị: cảm biến, camera, khóa cửa. Hệ sinh thái Lumi ngày càng hoàn thiện.",
      icon: EcosystemIcon,
    },
    {
      year: "2016",
      title: "Chứng nhận UL quốc tế",
      description: "Đạt chứng nhận an toàn UL của Mỹ, mở đường cho xuất khẩu quốc tế.",
      icon: CertificateIcon,
    },
    {
      year: "2018",
      title: "Hợp tác Apple HomeKit",
      description: "Trở thành đối tác chính thức của Apple HomeKit, khẳng định vị thế công nghệ hàng đầu.",
      icon: AppleIcon,
    },
    {
      year: "2020",
      title: "Xuất khẩu 30+ quốc gia",
      description: "Sản phẩm Lumi có mặt tại hơn 30 quốc gia trên thế giới, từ châu Á đến châu Âu và châu Mỹ.",
      icon: GlobeIcon,
    },
    {
      year: "2024",
      title: "AI & Machine Learning",
      description: "Tích hợp trí tuệ nhân tạo vào hệ thống, học hỏi thói quen người dùng để tự động tối ưu trải nghiệm.",
      icon: AIAIcon,
    },
  ];

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-sm text-blue-400 font-medium">Hành trình phát triển</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Hơn một thập kỷ
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              đổi mới không ngừng
            </span>
          </h2>

          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Từ ý tưởng của những kỹ sư trẻ đến thương hiệu nhà thông minh hàng đầu Việt Nam.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-cyan-500 to-blue-500 transform -translate-x-1/2">
            {/* Glowing effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500 via-cyan-500 to-blue-500 blur-sm opacity-50" />
          </div>

          {/* Timeline Items */}
          <div className="space-y-12 lg:space-y-16">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Content Side */}
                <div className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                  <div className={`
                    p-6 rounded-2xl bg-white/[0.02] border border-white/5
                    backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-300
                    ${index % 2 === 0 ? "ml-auto" : ""}
                  `}
                  style={{ maxWidth: "400px" }}
                  >
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-semibold text-white mt-2 mb-3">{milestone.title}</h3>
                    <p className="text-white/60 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>

                {/* Center Node */}
                <div className="w-2/12 flex justify-center relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.15 }}
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-0.5 shadow-lg shadow-blue-500/30"
                  >
                    <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                      <milestone.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                  </motion.div>
                </div>

                {/* Empty Side */}
                <div className="w-5/12" />
              </motion.div>
            ))}
          </div>

          {/* Bottom Node */}
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.3 + milestones.length * 0.15 }}
            className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2"
          >
            <div className="w-6 h-6 rounded-full bg-blue-500 animate-pulse" />
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

const HomeIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const EcosystemIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
  </svg>
);

const CertificateIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const AppleIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const GlobeIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AIAIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export default TimelineSection;
