// ============================================
// FEATURE SECTION - WHY CHOOSE LUMI
// ============================================
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const FeatureSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const features = [
    {
      icon: AutomationIcon,
      title: "Tự động hóa mạnh mẽ",
      description: "Tạo các kịch bản tự động theo thời gian, vị trí hoặc sự kiện. Ngôi nhà tự động làm việc cho bạn.",
      color: "blue",
    },
    {
      icon: EcosystemIcon,
      title: "Hệ sinh thái đồng bộ",
      description: "Tất cả thiết bị kết nối và đồng bộ hoàn hảo với nhau, tạo nên trải nghiệm liền mạch.",
      color: "cyan",
    },
    {
      icon: VoiceIcon,
      title: "Điều khiển bằng giọng nói",
      description: "Sử dụng Siri, Google Assistant hoặc Alexa để điều khiển ngôi nhà chỉ bằng giọng nói.",
      color: "purple",
    },
    {
      icon: SceneIcon,
      title: "Smart Scenes",
      description: "Một chạm kích hoạt nhiều thiết bị cùng lúc: ánh sáng, rèm, điều hòa theo chế độ mong muốn.",
      color: "emerald",
    },
    {
      icon: SecurityIcon,
      title: "An ninh thông minh",
      description: "Camera, cảm biến chuyển động, khóa cửa thông minh - bảo vệ ngôi nhà 24/7 từ mọi nơi.",
      color: "red",
    },
    {
      icon: EnergyIcon,
      title: "Tiết kiệm điện năng",
      description: "Tự động tắt đèn, điều hòa khi không có người. Giảm đến 40% chi phí điện mỗi tháng.",
      color: "amber",
    },
  ];

  const colorMap = {
    blue: {
      bg: "bg-blue-500/10",
      border: "hover:border-blue-500/30",
      icon: "text-blue-400",
      iconBg: "bg-blue-500/20",
      glow: "hover:shadow-blue-500/10",
    },
    cyan: {
      bg: "bg-cyan-500/10",
      border: "hover:border-cyan-500/30",
      icon: "text-cyan-400",
      iconBg: "bg-cyan-500/20",
      glow: "hover:shadow-cyan-500/10",
    },
    purple: {
      bg: "bg-purple-500/10",
      border: "hover:border-purple-500/30",
      icon: "text-purple-400",
      iconBg: "bg-purple-500/20",
      glow: "hover:shadow-purple-500/10",
    },
    emerald: {
      bg: "bg-emerald-500/10",
      border: "hover:border-emerald-500/30",
      icon: "text-emerald-400",
      iconBg: "bg-emerald-500/20",
      glow: "hover:shadow-emerald-500/10",
    },
    red: {
      bg: "bg-red-500/10",
      border: "hover:border-red-500/30",
      icon: "text-red-400",
      iconBg: "bg-red-500/20",
      glow: "hover:shadow-red-500/10",
    },
    amber: {
      bg: "bg-amber-500/10",
      border: "hover:border-amber-500/30",
      icon: "text-amber-400",
      iconBg: "bg-amber-500/20",
      glow: "hover:shadow-amber-500/10",
    },
  };

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-emerald-400 font-medium">Tại sao chọn Lumi</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Giải pháp toàn diện
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              cho ngôi nhà thông minh
            </span>
          </h2>

          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Khám phá những tính năng vượt trội giúp Lumi trở thành lựa chọn hàng đầu của hàng triệu gia đình Việt.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`
                group relative p-6 rounded-2xl bg-white/[0.02] backdrop-blur-sm
                border border-white/5 ${colorMap[feature.color].border}
                ${colorMap[feature.color].glow} hover:bg-white/[0.04]
                transition-all duration-500 hover:-translate-y-1
              `}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl ${colorMap[feature.color].iconBg} flex items-center justify-center mb-5`}>
                <feature.icon className={`w-7 h-7 ${colorMap[feature.color].icon}`} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-white/60 leading-relaxed">{feature.description}</p>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colorMap[feature.color].bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`} />

              {/* Corner Accent */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${colorMap[feature.color].bg} rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Icons
const AutomationIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const EcosystemIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
  </svg>
);

const VoiceIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
);

const SceneIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const SecurityIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const EnergyIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export default FeatureSection;
