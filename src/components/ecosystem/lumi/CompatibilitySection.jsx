// ============================================
// COMPATIBILITY SECTION
// ============================================
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const CompatibilitySection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const integrations = [
    {
      name: "Apple HomeKit",
      logo: AppleLogo,
      color: "from-gray-600 to-gray-900",
      bgColor: "bg-gray-900/50",
      borderColor: "border-gray-700/50",
      features: ["Siri Voice Control", "Home App Integration", "Automation"],
    },
    {
      name: "Google Home",
      logo: GoogleLogo,
      color: "from-blue-500 to-blue-700",
      bgColor: "bg-blue-900/50",
      borderColor: "border-blue-700/50",
      features: ["Google Assistant", "Google Home App", "Routines"],
    },
    {
      name: "Amazon Alexa",
      logo: AlexaLogo,
      color: "from-cyan-500 to-cyan-700",
      bgColor: "bg-cyan-900/50",
      borderColor: "border-cyan-700/50",
      features: ["Alexa Voice", "Echo Devices", "Skills"],
    },
  ];

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-white/50 animate-pulse" />
            <span className="text-sm text-white/70 font-medium">Tích hợp</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Tương thích với các hệ sinh thái
            <br />
            <span className="bg-gradient-to-r from-white/80 to-white/40 bg-clip-text text-transparent">
              hàng đầu thế giới
            </span>
          </h2>

          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Kết nối Lumi với hệ sinh thái bạn đã tin tưởng. Điều khiển mọi thứ từ một ứng dụng duy nhất.
          </p>
        </motion.div>

        {/* Integration Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`
                group relative p-8 rounded-3xl
                ${integration.bgColor}
                border ${integration.borderColor}
                backdrop-blur-sm
                hover:scale-[1.02] hover:border-white/20
                transition-all duration-500
              `}
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${integration.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

              {/* Logo */}
              <div className="relative mb-8">
                <div className={`w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br ${integration.color} p-0.5`}>
                  <div className={`w-full h-full rounded-xl ${integration.bgColor} flex items-center justify-center`}>
                    <integration.logo className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>

              {/* Name */}
              <h3 className="text-2xl font-bold text-white text-center mb-4">
                {integration.name}
              </h3>

              {/* Features */}
              <div className="space-y-2">
                {integration.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center justify-center gap-2 text-sm text-white/60"
                  >
                    <CheckIcon className="w-4 h-4 text-emerald-400" />
                    {feature}
                  </div>
                ))}
              </div>

              {/* Floating Icons */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                className={`absolute top-4 right-4 w-10 h-10 rounded-xl bg-gradient-to-br ${integration.color} opacity-20 blur-sm`}
              />
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
                className={`absolute bottom-4 left-4 w-8 h-8 rounded-lg bg-gradient-to-br ${integration.color} opacity-15 blur-sm`}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-white/40 text-sm">
            Tất cả thiết bị Lumi đều tương thích ngược và có thể hoạt động độc lập hoặc kết hợp với các hệ sinh thái trên.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// SVG Logos
const AppleLogo = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
  </svg>
);

const GoogleLogo = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const AlexaLogo = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default CompatibilitySection;
