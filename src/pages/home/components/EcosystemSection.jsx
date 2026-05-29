// ============================================
// ECOSYSTEM SECTION - TAILWIND
// OPTIMIZED: Mobile Tabs + Desktop Cards
// ============================================
import { useState } from "react";
import EcosystemCard from "./EcosystemCard";
import EcosystemMobileTabs from "./EcosystemMobileTabs";
import EcosystemComparisonTable from "./EcosystemComparisonTable";
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
    link: "/products?brand=aqara",
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
    link: "/products?brand=lumi",
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
    link: "/products?brand=hunonic",
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
    <section className="py-10 md:py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-300/30 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/50 rounded-full mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-600">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span className="text-sm font-semibold text-primary-600">Công nghệ tiên tiến</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-secondary tracking-tight mb-3">
            Hệ Sinh Thái Smart Home
          </h2>
          <p className="text-slate-500 text-sm md:text-base lg:text-xl max-w-xl mx-auto">
            Kết nối toàn bộ thiết bị thông minh trong ngôi nhà của bạn
          </p>
        </div>

        {/* Mobile: Tabs Layout */}
        <div className="md:hidden">
          <EcosystemMobileTabs ecosystems={ecosystems} />
        </div>

        {/* Desktop: Cards Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-14">
          {ecosystems.map((ecosystem) => (
            <EcosystemCard key={ecosystem.id} ecosystem={ecosystem} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default EcosystemSection;
