// ============================================
// ECOSYSTEM SECTION - UNIFIED DESIGN SYSTEM
// Seamless sections with consistent styling
// ============================================
import SectionHeader from "../../../components/common/SectionHeader";
import EcosystemCard from "./EcosystemCard";
import EcosystemMobileTabs from "./EcosystemMobileTabs";
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
    color: "#4e5055",
    link: "/ecosystem/aqara",
    comparison: {
      price: "Cao",
      target: "Nhà cao cấp, người dùng Apple HomeKit",
      strengths: "Ổn định, hoàn thiện tốt, tự động hóa mạnh",
      ecosystem: "HomeKit, Zigbee, Automation",
    },
  },
  {
    id: "lumi",
    name: "Lumi",
    description: "Giải pháp nhà thông minh toàn diện dành cho gia đình Việt.",
    features: ["Made in Vietnam", "Tiếng Việt", "Dễ sử dụng", "Ổn định"],
    image: lumiImg,
    color: "#24743f",
    link: "/ecosystem/lumi",
    comparison: {
      price: "Trung bình - cao",
      target: "Gia đình Việt, nhà phố, biệt thự",
      strengths: "Tiếng Việt, dễ dùng, hỗ trợ tốt",
      ecosystem: "Công tắc, cảm biến, rèm, chiếu sáng",
    },
  },
  {
    id: "hunonic",
    name: "Hunonic",
    description: "Thiết bị thông minh giá tốt, dễ lắp đặt và điều khiển từ xa.",
    features: ["Giá tốt", "WiFi", "Điều khiển app", "Smart Life"],
    image: hunonicImg,
    color: "#04c53a",
    link: "/ecosystem/hunonic",
    comparison: {
      price: "Tốt",
      target: "Chung cư, nhà phố, người mới bắt đầu",
      strengths: "Dễ lắp, giá hợp lý, điều khiển app",
      ecosystem: "Công tắc, ổ cắm, cảm biến, Smart Life",
    },
  },
];

const EcosystemSection = () => {
  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-4 md:px-6">
        {/* Section Header - Centered */}
        {/* <SectionHeader
          title="Hệ Sinh Thái Smart Home"
          subtitle="Kết nối toàn bộ thiết bị thông minh trong ngôi nhà của bạn"
          // align="center"
          size="md"
        /> */}
                <div className="flex items-center justify-center gap-4 mb-10">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-primary-200" />
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 uppercase tracking-wide text-center whitespace-nowrap">
            Hệ Sinh Thái Smart Home
          </h2>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-primary-200" />
        </div>

        {/* Mobile: Tabs Layout */}
        <div className="md:hidden">
          <EcosystemMobileTabs ecosystems={ecosystems} />
        </div>

        {/* Desktop: Cards Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {ecosystems.map((ecosystem) => (
            <EcosystemCard key={ecosystem.id} ecosystem={ecosystem} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
