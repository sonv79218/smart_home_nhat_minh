// ============================================
// WHAT CAN LUMI DO - CAPABILITY SHOWCASE
// ============================================
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const WhatCanLumiDoSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const capabilities = [
    {
      id: "lighting",
      title: "Chiếu sáng thông minh",
      subtitle: "Ánh sáng theo tâm trạng",
      description: "Điều chỉnh độ sáng, màu sắc và nhiệt độ ánh sáng theo từng khoảnh khắc. Từ ánh sáng ấm áp cho bữa tối gia đình đến ánh sáng trắng tập trung cho không gian làm việc.",
      scenario: "Sáng thứ Hai, ánh sáng tự động chuyển sang chế độ ban ngày giúp bạn tỉnh táo và sẵn sàng cho một ngày mới.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      color: "from-amber-500 to-orange-500",
      icon: LightIcon,
      features: ["Điều chỉnh độ sáng", "RGB 16 triệu màu", "Đặt lịch bật/tắt", "Điều khiển theo nhóm"],
    },
    {
      id: "curtains",
      title: "Rèm thông minh",
      subtitle: "Tự động đóng mở theo ý muốn",
      description: "Kiểm soát ánh sáng tự nhiên một cách hoàn hảo. Rèm tự động mở vào buổi sáng để đánh thức bạn bằng ánh nắng nhẹ, đóng lại khi trời nắng gắt để giữ mát nhà.",
      scenario: "7:00 sáng, rèm phòng ngủ từ từ mở ra để ánh nắng ban mai nhẹ nhàng đánh thức bạn thay vì tiếng chuông báo thức.",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
      color: "from-blue-500 to-cyan-500",
      icon: CurtainIcon,
      features: ["Điều khiển từ xa", "Đặt lịch tự động", "Điều khiển bằng giọng nói", "Tích hợp cảm biến sáng"],
    },
    {
      id: "security",
      title: "An ninh thông minh",
      subtitle: "Bảo vệ 24/7",
      description: "Camera, cảm biến chuyển động, khóa cửa thông minh và chuông cửa video hoạt động đồng bộ. Giám sát ngôi nhà từ mọi nơi và nhận thông báo tức thì khi có sự kiện.",
      scenario: "21:00 tối, hệ thống tự động chuyển sang chế độ bảo vệ. Camera ngoài cổng hoạt động, cảm biến cửa sổ được kích hoạt, khóa cửa được đóng.",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80",
      color: "from-red-500 to-rose-500",
      icon: SecurityIcon,
      features: ["Camera HD 24/7", "Nhận diện khuôn mặt", "Báo động thông minh", "Khóa không cần chìa"],
    },
    {
      id: "climate",
      title: "Điều hòa thông minh",
      subtitle: "Tiện nghi & tiết kiệm",
      description: "Điều khiển nhiệt độ từ xa, đặt lịch hoạt động và tích hợp với cảm biến hiện diện. Nhà luôn mát mẻ khi bạn về và tiết kiệm điện khi không có ai.",
      scenario: "17:30, điều hòa tự động bật 10 phút trước khi bạn về đến nhà. Khi bạn bước vào, nhiệt độ đã ở mức lý tưởng 25°C.",
      image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80",
      color: "from-emerald-500 to-teal-500",
      icon: ClimateIcon,
      features: ["Điều khiển từ xa", "Đặt lịch thông minh", "Tiết kiệm điện 40%", "Kết hợp cảm biến"],
    },
    {
      id: "voice",
      title: "Điều khiển giọng nói",
      subtitle: "Mọi thứ chỉ bằng lời nói",
      description: "\"Hey Siri, tắt đèn phòng khách\" hay \"Alexa, mở rèm phòng ngủ\" - chỉ cần một câu nói để điều khiển toàn bộ ngôi nhà mà không cần chạm vào điện thoại.",
      scenario: "Đang nằm xem phim trên sofa, bạn nhận ra chưa tắt đèn bếp. Chỉ cần nói \"Hey Siri, tắt đèn bếp\" - không cần rời ghế.",
      image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&q=80",
      color: "from-purple-500 to-violet-500",
      icon: VoiceIcon,
      features: ["Apple Siri", "Google Assistant", "Amazon Alexa", "Việt ngữ"],
    },
    {
      id: "scenes",
      title: "Kịch bản tự động",
      subtitle: "Một chạm, cả nhà thay đổi",
      description: "Tạo kịch bản cho mọi hoàn cảnh: ra khỏi nhà, về nhà, xem phim, ngủ nghỉ. Một chạm hoặc đặt lịch, ngôi nhà tự động thực hiện hàng loạt thao tác.",
      scenario: "8:00 tối, chế độ \"Xem phim\" được kích hoạt. Đèn giảm còn 20%, rèm đóng, máy chiếu bật, âm thanh vòm kích hoạt - tất cả chỉ trong 3 giây.",
      image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&q=80",
      color: "from-indigo-500 to-blue-500",
      icon: SceneIcon,
      features: ["Tạo kịch bản tùy chỉnh", "Kích hoạt bằng 1 chạm", "Đặt lịch tự động", "Kích hoạt theo vị trí"],
    },
  ];

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />

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
            <span className="text-sm text-blue-400 font-medium">Khả năng vô tận</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Lumi có thể làm gì?
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Khám phá thế giới thông minh
            </span>
          </h2>

          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Từ chiếu sáng đến an ninh, từ giọng nói đến kịch bản tự động - Lumi biến ngôi nhà của bạn thành không gian sống thông minh đích thực.
          </p>
        </motion.div>

        {/* Capability Showcases */}
        <div className="space-y-32">
          {capabilities.map((cap, index) => (
            <motion.div
              key={cap.id}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className={`relative`}
            >
              {/* Background Line */}
              {index > 0 && (
                <div className="absolute -top-24 left-1/2 w-px h-24 bg-gradient-to-b from-transparent via-blue-500/30 to-transparent" />
              )}

              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                {/* Image Side */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  {/* Image Container */}
                  <div className="relative rounded-3xl overflow-hidden">
                    <img
                      src={cap.image}
                      alt={cap.title}
                      className="w-full h-[400px] lg:h-[500px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                    {/* Color Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${cap.color} opacity-15 mix-blend-overlay`} />

                    {/* Icon Badge */}
                    <div className={`absolute top-6 left-6 w-14 h-14 rounded-2xl bg-gradient-to-br ${cap.color} p-0.5`}>
                      <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center">
                        <cap.icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className={`absolute -bottom-6 -${index % 2 === 0 ? "left" : "right"}-6 w-32 h-32 border border-blue-500/20 rounded-3xl`} />

                  {/* Glow */}
                  <div className={`absolute -inset-4 bg-gradient-to-br ${cap.color} opacity-5 blur-3xl rounded-3xl`} />
                </motion.div>

                {/* Content Side */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className={index % 2 === 1 ? "lg:order-1" : ""}
                >
                  {/* Label */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
                    <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${cap.color}`} />
                    <span className="text-xs text-white/60 font-medium uppercase tracking-wider">{cap.subtitle}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">{cap.title}</h3>

                  {/* Description */}
                  <p className="text-lg text-white/70 mb-6 leading-relaxed">{cap.description}</p>

                  {/* Scenario */}
                  <div className={`p-5 rounded-2xl bg-gradient-to-br ${cap.color} opacity-10 border border-white/5 mb-6`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${cap.color} p-0.5 flex-shrink-0`}>
                        <div className="w-full h-full rounded-md bg-slate-950 flex items-center justify-center">
                          <ScenarioIcon className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/80 mb-1">Thực tế như thế nào?</p>
                        <p className="text-sm text-white/60 leading-relaxed">{cap.scenario}</p>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {cap.features.map((feature) => (
                      <span
                        key={feature}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r ${cap.color} bg-clip-text text-transparent border border-current/10`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    to={`/products?brand=lumi&category=${cap.id}`}
                    className={`
                      inline-flex items-center gap-2 font-semibold
                      bg-gradient-to-r ${cap.color} bg-clip-text text-transparent
                      hover:gap-3 transition-all duration-300
                    `}
                  >
                    Xem sản phẩm
                    <ArrowIcon className="w-4 h-4 text-current" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Icons
const LightIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const CurtainIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
  </svg>
);

const SecurityIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const ClimateIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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

const ScenarioIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ArrowIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export default WhatCanLumiDoSection;
