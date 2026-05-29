// ============================================
// ECOSYSTEM SECTION - TAILWIND
// ============================================
import EcosystemCard from "./EcosystemCard";
import hunonicImg from "../../../assets/brand/hunonic.png";
import lumiImg from "../../../assets/brand/lumi.png";
import aqaraImg from "../../../assets/brand/aqara.png";

const ecosystems = [
  {
    id: "aqara",
    name: "Aqara",
    description: "Hệ sinh thái smart home cao cấp hỗ trợ Apple HomeKit và Zigbee.",
    features: ["HomeKit", "Automation", "Zigbee", "AI Smart"],
    image: aqaraImg,
    // logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Aqara_logo.svg/200px-Aqara_logo.svg.png",
    color: "#4e5055",
    link: "/products?brand=aqara",
  },
  {
    id: "lumi",
    name: "Lumi",
    description: "Giải pháp nhà thông minh toàn diện dành cho gia đình Việt.",
    features: ["Made in Vietnam", "Tiếng Việt", "Dễ sử dụng", "Ổn định"],
    image: lumiImg,
    // logo: "https://lumi.vn/favicon.ico",
    color: "#24743f",
    link: "/products?brand=lumi",
  },
  {
    id: "hunonic",
    name: "Hunonic",
    description: "Thiết bị thông minh giá tốt, dễ lắp đặt và điều khiển từ xa.",
    features: ["Giá tốt", "WiFi", "Điều khiển app", "Smart Life"],
    image: hunonicImg,
    // logo: "https://hunonic.com/favicon.ico",
    color: "#04c53a",
    link: "/products?brand=hunonic",
  },
];

const EcosystemSection = () => {
  return (
    <section className="py-10 md:py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-300/30 to-transparent" />
      
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/50 rounded-full mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-600">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span className="text-sm font-semibold text-primary-600">Công nghệ tiên tiến</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary tracking-tight mb-3">
            Hệ Sinh Thái Smart Home
          </h2>
          <p className="text-slate-500 text-base md:text-lg lg:text-xl max-w-xl mx-auto">
            Kết nối toàn bộ thiết bị thông minh trong ngôi nhà của bạn
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-14">
          {ecosystems.map((ecosystem) => (
            <EcosystemCard key={ecosystem.id} ecosystem={ecosystem} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default EcosystemSection;
