import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  DoorOpen,
  Sofa,
  ChefHat,
  Bed,
  Bath,
  LayoutGrid,
  ArrowRight,
  Lightbulb,
  Zap,
  Smartphone,
  CheckCircle2,
  Building2,
  Store,
  Coffee,
  Car,
  TreePine,
  Fence,
  Monitor,
  Users,
  Archive,
  Palette,
  MonitorSmartphone,
  Footprints,
  Droplets,
  Sun,
  Camera,
  Lock,
  Plug,
  Wind,
  Eye,
  Bell,
  ShieldAlert,
  Waves,
  TreesIcon as TreeIcon,
  LampDesk,
  Speaker,
  Timer,
  AlertTriangle,
  Fingerprint,
  Signal,
  Thermometer,
  Compass,
  Radio,
} from "lucide-react";

// ============================================
// ROOM VISUALIZATION DATA
// Mỗi khu vực có sơ đồ, vị trí thiết bị, marker
// ============================================
const ROOM_DIAGRAMS = {
  // === NHÀ Ở ===
  "cong-san-truoc": {
    name: "Cổng / Sân trước",
    diagram: "gate",
    devices: [
      { id: "cam1", name: "Camera AI", position: { x: 20, y: 30 }, icon: Camera, color: "red" },
      { id: "bell1", name: "Chuông cửa", position: { x: 50, y: 50 }, icon: Bell, color: "blue" },
      { id: "lock1", name: "Khóa tự động", position: { x: 75, y: 40 }, icon: Lock, color: "green" },
      { id: "pir1", name: "Cảm biến chuyển động", position: { x: 50, y: 80 }, icon: Eye, color: "amber" },
    ],
    suggestedProducts: [
      { name: "Camera G3 4K AI", brand: "Aqara", price: "2.990.000đ" },
      { name: "Chuông video G4", brand: "Aqara", price: "1.890.000đ" },
      { name: "Khóa N100", brand: "Aqara", price: "4.990.000đ" },
    ],
  },
  "phong-khach": {
    name: "Phòng khách",
    diagram: "living",
    devices: [
      { id: "sw1", name: "Công tắc", position: { x: 10, y: 50 }, icon: Plug, color: "blue" },
      { id: "light1", name: "Đèn thông minh", position: { x: 30, y: 20 }, icon: Lightbulb, color: "amber" },
      { id: "blinds1", name: "Rèm thông minh", position: { x: 50, y: 10 }, icon: LayoutGrid, color: "violet" },
      { id: "pir2", name: "Cảm biến hiện diện", position: { x: 70, y: 60 }, icon: Eye, color: "green" },
      { id: "ac1", name: "Điều hòa", position: { x: 85, y: 25 }, icon: Wind, color: "cyan" },
    ],
    suggestedProducts: [
      { name: "Công tắc H1M", brand: "Aqara", price: "690.000đ" },
      { name: "Đèn T1M", brand: "Aqara", price: "890.000đ" },
      { name: "MTR-H1", brand: "Aqara", price: "1.290.000đ" },
    ],
  },
  "bep": {
    name: "Bếp",
    diagram: "kitchen",
    devices: [
      { id: "smoke1", name: "Cảm biến khói", position: { x: 20, y: 15 }, icon: AlertTriangle, color: "red" },
      { id: "gas1", name: "Cảm biến gas", position: { x: 40, y: 15 }, icon: AlertTriangle, color: "orange" },
      { id: "plug1", name: "Ổ cắm thông minh", position: { x: 60, y: 60 }, icon: Plug, color: "blue" },
      { id: "cam2", name: "Camera", position: { x: 80, y: 30 }, icon: Camera, color: "red" },
      { id: "pir3", name: "Cảm biến", position: { x: 30, y: 70 }, icon: Eye, color: "green" },
    ],
    suggestedProducts: [
      { name: "Cảm biến khói T1", brand: "Aqara", price: "590.000đ" },
      { name: "Cảm biến gas", brand: "Aqara", price: "890.000đ" },
      { name: "Camera G3", brand: "Aqara", price: "1.490.000đ" },
    ],
  },
  "phong-ngu": {
    name: "Phòng ngủ",
    diagram: "bedroom",
    devices: [
      { id: "sw2", name: "Công tắc", position: { x: 10, y: 50 }, icon: Plug, color: "blue" },
      { id: "light2", name: "Đèn ngủ", position: { x: 35, y: 20 }, icon: Lightbulb, color: "amber" },
      { id: "blinds2", name: "Rèm", position: { x: 55, y: 10 }, icon: LayoutGrid, color: "violet" },
      { id: "ac2", name: "Điều hòa", position: { x: 80, y: 25 }, icon: Thermometer, color: "cyan" },
      { id: "pir4", name: "Cảm biến hiện diện", position: { x: 65, y: 70 }, icon: Eye, color: "green" },
    ],
    suggestedProducts: [
      { name: "Công tắc H1M", brand: "Aqara", price: "690.000đ" },
      { name: "Đèn T1M", brand: "Aqara", price: "890.000đ" },
      { name: "Điều khiển RC2", brand: "Aqara", price: "490.000đ" },
    ],
  },
  "nha-ve-sinh": {
    name: "Nhà vệ sinh",
    diagram: "bathroom",
    devices: [
      { id: "pir5", name: "Cảm biến hiện diện", position: { x: 25, y: 25 }, icon: Eye, color: "green" },
      { id: "water1", name: "Cảm biến rò rỉ", position: { x: 50, y: 75 }, icon: Droplets, color: "blue" },
      { id: "fan1", name: "Quạt thông gió", position: { x: 75, y: 20 }, icon: Wind, color: "cyan" },
      { id: "plug2", name: "Ổ cắm IP66", position: { x: 50, y: 45 }, icon: Plug, color: "blue" },
    ],
    suggestedProducts: [
      { name: "Cảm biến hiện diện FP2", brand: "Aqara", price: "890.000đ" },
      { name: "Cảm biến rò rỉ", brand: "Aqara", price: "390.000đ" },
      { name: "Quạt thông minh", brand: "Hunonic", price: "650.000đ" },
    ],
  },
  "ban-cong-san-thuong": {
    name: "Ban công / Sân thượng",
    diagram: "balcony",
    devices: [
      { id: "water2", name: "Tưới tự động", position: { x: 20, y: 60 }, icon: Waves, color: "blue" },
      { id: "cam3", name: "Camera ngoài trời", position: { x: 50, y: 20 }, icon: Camera, color: "red" },
      { id: "light3", name: "Đèn sân", position: { x: 75, y: 50 }, icon: Lightbulb, color: "amber" },
      { id: "pir6", name: "Cảm biến ánh sáng", position: { x: 35, y: 80 }, icon: Sun, color: "yellow" },
    ],
    suggestedProducts: [
      { name: "Camera G3 HomeKit", brand: "Aqara", price: "1.990.000đ" },
      { name: "Đèn LED RGB", brand: "Hunonic", price: "450.000đ" },
      { name: "Van tưới thông minh", brand: "Hunonic", price: "1.200.000đ" },
    ],
  },

  // === BIỆT THỰ ===
  "cong": {
    name: "Cổng chính",
    diagram: "gate",
    devices: [
      { id: "cam4", name: "Camera AI", position: { x: 15, y: 30 }, icon: Camera, color: "red" },
      { id: "face1", name: "Nhận diện khuôn mặt", position: { x: 35, y: 30 }, icon: Eye, color: "red" },
      { id: "bell2", name: "Chuông video", position: { x: 55, y: 50 }, icon: Bell, color: "blue" },
      { id: "lock2", name: "Khóa cổng", position: { x: 75, y: 50 }, icon: Lock, color: "green" },
      { id: "pir7", name: "Cảm biến", position: { x: 50, y: 80 }, icon: Eye, color: "amber" },
    ],
    suggestedProducts: [
      { name: "Camera G3 4K AI", brand: "Aqara", price: "2.990.000đ" },
      { name: "Chuông Video Doorbell", brand: "Aqara", price: "2.490.000đ" },
      { name: "Khóa thông minh U200", brand: "Aqara", price: "6.990.000đ" },
    ],
  },
  "san-vuon": {
    name: "Sân vườn",
    diagram: "garden",
    devices: [
      { id: "water3", name: "Tưới tự động", position: { x: 20, y: 50 }, icon: Waves, color: "blue" },
      { id: "light4", name: "Đèn sân vườn", position: { x: 45, y: 25 }, icon: Lightbulb, color: "amber" },
      { id: "cam5", name: "Camera ngoài trời", position: { x: 70, y: 30 }, icon: Camera, color: "red" },
      { id: "soil1", name: "Cảm biến độ ẩm đất", position: { x: 35, y: 75 }, icon: Droplets, color: "green" },
    ],
    suggestedProducts: [
      { name: "Hệ thống tưới thông minh", brand: "Hunonic", price: "3.500.000đ" },
      { name: "Camera G3 IP67", brand: "Aqara", price: "2.490.000đ" },
      { name: "Đèn ngoài trời RGB", brand: "Hunonic", price: "890.000đ" },
    ],
  },
  "gara": {
    name: "Gara ô tô",
    diagram: "garage",
    devices: [
      { id: "cam6", name: "Camera giám sát", position: { x: 20, y: 25 }, icon: Camera, color: "red" },
      { id: "pir8", name: "Cảm biến chuyển động", position: { x: 45, y: 25 }, icon: Eye, color: "amber" },
      { id: "light5", name: "Đèn tự động", position: { x: 70, y: 25 }, icon: Lightbulb, color: "amber" },
      { id: "door1", name: "Cửa garage", position: { x: 50, y: 70 }, icon: DoorOpen, color: "slate" },
    ],
    suggestedProducts: [
      { name: "Camera G3 4K", brand: "Aqara", price: "2.990.000đ" },
      { name: "Cảm biến P1", brand: "Aqara", price: "490.000đ" },
      { name: "Bộ điều khiển cửa", brand: "Hunonic", price: "2.100.000đ" },
    ],
  },
  "phong-ngu-chinh": {
    name: "Phòng ngủ chính",
    diagram: "bedroom",
    devices: [
      { id: "sw3", name: "Công tắc cảm ứng", position: { x: 10, y: 50 }, icon: Plug, color: "blue" },
      { id: "light6", name: "Đèn ngủ dim", position: { x: 30, y: 20 }, icon: Lightbulb, color: "amber" },
      { id: "blinds3", name: "Rèm tự động", position: { x: 50, y: 10 }, icon: LayoutGrid, color: "violet" },
      { id: "ac3", name: "Điều hòa thông minh", position: { x: 80, y: 25 }, icon: Thermometer, color: "cyan" },
      { id: "speaker1", name: "Loa thông minh", position: { x: 65, y: 70 }, icon: Speaker, color: "indigo" },
    ],
    suggestedProducts: [
      { name: "Công tắc H1 Pro", brand: "Aqara", price: "890.000đ" },
      { name: "Đèn LED T1M", brand: "Aqara", price: "990.000đ" },
      { name: "Điều khiển S1 Plus", brand: "Aqara", price: "1.690.000đ" },
    ],
  },
  "san-thuong": {
    name: "Sân thượng",
    diagram: "rooftop",
    devices: [
      { id: "cam7", name: "Camera 360", position: { x: 25, y: 25 }, icon: Camera, color: "red" },
      { id: "light7", name: "Đèn thông minh", position: { x: 50, y: 20 }, icon: Lightbulb, color: "amber" },
      { id: "rain1", name: "Cảm biến mưa", position: { x: 75, y: 30 }, icon: AlertTriangle, color: "blue" },
      { id: "water4", name: "Tưới tự động", position: { x: 35, y: 65 }, icon: Waves, color: "green" },
      { id: "pir9", name: "Cảm biến chuyển động", position: { x: 65, y: 65 }, icon: Eye, color: "amber" },
    ],
    suggestedProducts: [
      { name: "Camera G3 360", brand: "Aqara", price: "2.990.000đ" },
      { name: "Cảm biến thời tiết", brand: "Aqara", price: "790.000đ" },
      { name: "Van tưới thông minh", brand: "Hunonic", price: "1.200.000đ" },
    ],
  },

  // === CĂN HỘ ===
  "cua-chinh": {
    name: "Cửa chính",
    diagram: "door",
    devices: [
      { id: "lock3", name: "Khóa vân tay", position: { x: 50, y: 50 }, icon: Fingerprint, color: "green" },
      { id: "sensor1", name: "Cảm biến cửa", position: { x: 30, y: 30 }, icon: Eye, color: "blue" },
      { id: "cam8", name: "Camera trong nhà", position: { x: 70, y: 30 }, icon: Camera, color: "red" },
      { id: "bell3", name: "Chuông cửa", position: { x: 50, y: 80 }, icon: Bell, color: "blue" },
    ],
    suggestedProducts: [
      { name: "Khóa N100", brand: "Aqara", price: "4.990.000đ" },
      { name: "Cảm biến cửa P2", brand: "Aqara", price: "390.000đ" },
      { name: "Camera G3", brand: "Aqara", price: "1.490.000đ" },
    ],
  },

  // Default for other areas
  default: {
    name: "Khu vực",
    diagram: "default",
    devices: [
      { id: "dev1", name: "Thiết bị 1", position: { x: 30, y: 40 }, icon: Plug, color: "blue" },
      { id: "dev2", name: "Thiết bị 2", position: { x: 60, y: 40 }, icon: Lightbulb, color: "amber" },
    ],
    suggestedProducts: [],
  },
};

// Device color mapping
const DEVICE_COLORS = {
  red: { bg: "bg-red-100", border: "border-red-300", icon: "text-red-600", dot: "bg-red-500" },
  blue: { bg: "bg-blue-100", border: "border-blue-300", icon: "text-blue-600", dot: "bg-blue-500" },
  green: { bg: "bg-green-100", border: "border-green-300", icon: "text-green-600", dot: "bg-green-500" },
  amber: { bg: "bg-amber-100", border: "border-amber-300", icon: "text-amber-600", dot: "bg-amber-500" },
  violet: { bg: "bg-violet-100", border: "border-violet-300", icon: "text-violet-600", dot: "bg-violet-500" },
  cyan: { bg: "bg-cyan-100", border: "border-cyan-300", icon: "text-cyan-600", dot: "bg-cyan-500" },
  indigo: { bg: "bg-indigo-100", border: "border-indigo-300", icon: "text-indigo-600", dot: "bg-indigo-500" },
  slate: { bg: "bg-slate-100", border: "border-slate-300", icon: "text-slate-600", dot: "bg-slate-500" },
};

// ============================================
// ROOM DIAGRAM SVG COMPONENT
// Sơ đồ minh họa khu vực với markers thiết bị
// ============================================
const RoomDiagram = ({ areaId, devices, isAnimating }) => {
  const diagramData = ROOM_DIAGRAMS[areaId] || ROOM_DIAGRAMS.default;

  return (
    <div className={`
      relative w-full aspect-[4/3] rounded-2xl overflow-hidden
      bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200
      transition-all duration-300
      ${isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"}
    `}>
      {/* Room Background SVG */}
      <svg
        viewBox="0 0 200 150"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Room outline */}
        <rect x="10" y="10" width="180" height="130" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
        
        {/* Floor pattern */}
        <pattern id="floor" patternUnits="userSpaceOnUse" width="20" height="20">
          <rect width="20" height="20" fill="#f8fafc" />
          <rect width="1" height="1" x="0" y="0" fill="#f1f5f9" />
        </pattern>
        <rect x="10" y="10" width="180" height="130" rx="8" fill="url(#floor)" />
        
        {/* Room-specific decorations */}
        {diagramData.diagram === "gate" && (
          <>
            <rect x="70" y="50" width="60" height="50" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
            <line x1="100" y1="50" x2="100" y2="100" stroke="#cbd5e1" strokeWidth="1" />
            <circle cx="120" cy="75" r="3" fill="#94a3b8" />
          </>
        )}
        {diagramData.diagram === "living" && (
          <>
            <rect x="60" y="80" width="80" height="35" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
            <rect x="80" y="85" width="40" height="15" rx="2" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
            <rect x="30" y="50" width="25" height="40" rx="2" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
            <rect x="145" y="50" width="25" height="40" rx="2" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
          </>
        )}
        {diagramData.diagram === "bedroom" && (
          <>
            <rect x="50" y="60" width="100" height="50" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
            <rect x="70" y="70" width="60" height="30" rx="2" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
            <rect x="30" y="30" width="40" height="25" rx="2" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
          </>
        )}
        {diagramData.diagram === "kitchen" && (
          <>
            <rect x="40" y="60" width="120" height="50" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
            <rect x="50" y="70" width="40" height="30" rx="2" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
            <rect x="110" y="70" width="40" height="30" rx="2" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
            <circle cx="70" cy="55" r="10" fill="none" stroke="#fca5a5" strokeWidth="1.5" strokeDasharray="2,2" />
          </>
        )}
        {diagramData.diagram === "bathroom" && (
          <>
            <rect x="60" y="50" width="80" height="60" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
            <ellipse cx="100" cy="90" rx="20" ry="12" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
            <rect x="125" y="60" width="15" height="25" rx="2" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
          </>
        )}
        {diagramData.diagram === "balcony" && (
          <>
            <rect x="10" y="10" width="180" height="130" rx="8" fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4,4" />
            <circle cx="100" cy="75" r="30" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" />
            <path d="M100 60 L100 90 M85 75 L100 60 L115 75" fill="none" stroke="#86efac" strokeWidth="2" />
          </>
        )}
        {diagramData.diagram === "garage" && (
          <>
            <rect x="30" y="40" width="140" height="80" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
            <rect x="50" y="60" width="50" height="40" rx="2" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
            <path d="M50 60 L80 90 M100 60 L100 90" fill="none" stroke="#cbd5e1" strokeWidth="1" />
          </>
        )}
        {diagramData.diagram === "garden" && (
          <>
            <circle cx="60" cy="90" r="20" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" />
            <circle cx="60" cy="90" r="8" fill="#86efac" />
            <circle cx="140" cy="80" r="25" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" />
            <circle cx="140" cy="80" r="10" fill="#86efac" />
            <path d="M30 130 Q60 100 90 130 Q120 100 170 130" fill="none" stroke="#86efac" strokeWidth="1" />
          </>
        )}
        {diagramData.diagram === "rooftop" && (
          <>
            <rect x="10" y="10" width="180" height="130" rx="8" fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4,4" />
            <rect x="60" y="60" width="80" height="50" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
            <path d="M50 50 L100 30 L150 50" fill="none" stroke="#e2e8f0" strokeWidth="2" />
          </>
        )}
        {diagramData.diagram === "door" && (
          <>
            <rect x="50" y="20" width="100" height="110" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
            <rect x="60" y="30" width="80" height="90" rx="2" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
            <circle cx="130" cy="75" r="5" fill="#94a3b8" />
            <rect x="95" y="60" width="10" height="30" rx="2" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
          </>
        )}
        {diagramData.diagram === "default" && (
          <>
            <rect x="40" y="40" width="120" height="70" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
          </>
        )}
      </svg>

      {/* Device Markers */}
      {diagramData.devices.map((device, idx) => {
        const colors = DEVICE_COLORS[device.color] || DEVICE_COLORS.blue;
        const Icon = device.icon;
        return (
          <div
            key={device.id}
            className={`
              absolute flex flex-col items-center
              transform -translate-x-1/2 -translate-y-1/2
              transition-all duration-300
              ${isAnimating ? "opacity-0 scale-50" : "opacity-100 scale-100"}
            `}
            style={{
              left: `${device.position.x}%`,
              top: `${device.position.y}%`,
              transitionDelay: `${idx * 50}ms`,
            }}
          >
            {/* Marker dot with pulse effect */}
            <div className="relative">
              <div className={`absolute inset-0 w-8 h-8 ${colors.bg} rounded-full animate-ping opacity-50`} />
              <div className={`relative w-8 h-8 ${colors.bg} border-2 ${colors.border} rounded-full flex items-center justify-center shadow-sm`}>
                <Icon size={14} className={colors.icon} />
              </div>
            </div>
            {/* Label */}
            <div className={`
              mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold whitespace-nowrap
              ${colors.bg} ${colors.icon}
              shadow-sm
            `}>
              {device.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ============================================
// DEVICE CARD COMPONENT
// Card hiển thị thiết bị đề xuất
// ============================================
const DeviceCard = ({ name, brand, price }) => (
  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary-200 hover:bg-primary-50/30 transition-all duration-200 cursor-pointer group">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
        <Plug size={14} className="text-primary-600" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-800 group-hover:text-primary-700">{name}</p>
        <p className="text-[10px] text-slate-400">{brand}</p>
      </div>
    </div>
    <span className="text-xs font-bold text-primary-600">{price}</span>
  </div>
);

// ============================================
// DATA THEO TỪNG LOẠI CÔNG TRÌNH
// ============================================
const FLOOR_PLAN_DATA = {
  "nha-o": {
    title: "Khám phá ngôi nhà của bạn cần lắp gì",
    subtitle: "Chọn từng khu vực trong sơ đồ để xem thiết bị smart home phù hợp cho ngôi nhà của bạn.",
    areas: [
      {
        id: "cong-san-truoc",
        label: "Cổng / Sân trước",
        icon: DoorOpen,
        color: "sky",
        problems: [
          "Không biết ai đến khi vắng nhà",
          "Ra vào phải tìm chìa khóa",
          "Không theo dõi được xe và đồ vật ngoài sân",
        ],
        devices: [
          "Camera AI nhận diện khuôn mặt",
          "Chuông cửa video thông minh",
          "Khóa cửa tự động",
          "Cảm biến chuyển động",
        ],
        benefits: [
          "Biết chính xác ai đến nhà dù ở xa",
          "Mở cửa bằng mã PIN hoặc vân tay",
          "Phát hiện người lạ xung quanh nhà",
        ],
      },
      {
        id: "phong-khach",
        label: "Phòng khách",
        icon: Sofa,
        color: "emerald",
        problems: [
          "Đèn bật tắt rải rác nhiều công tắc",
          "Điều hòa bật quên tắt khi ra ngoài",
        ],
        devices: [
          "Công tắc thông minh wifi",
          "Điều khiển điều hòa học thói quen",
          "Rèm tự động theo giờ",
          "Cảm biến hiện diện",
        ],
        benefits: [
          "Một chạm hoặc giọng nói bật cả kịch bản",
          "Điều hòa tự tắt khi không có người",
          "Tạo không gian sống hiện đại, đẳng cấp",
        ],
      },
      {
        id: "bep",
        label: "Bếp",
        icon: ChefHat,
        color: "amber",
        problems: [
          "Bếp gas/điện cần theo dõi an toàn",
          "Quên tắt thiết bị điện sau khi nấu",
          "Hôi khói khi nấu mà không phát hiện kịp",
        ],
        devices: [
          "Cảm biến khói, gas",
          "Ổ cắm thông minh tự ngắt",
          "Quạt hút tự động theo mức độ khói",
          "Camera giám sát bếp",
        ],
        benefits: [
          "Cảnh báo ngay khi phát hiện khói hoặc gas",
          "Tự động ngắt điện các thiết bị nguy hiểm",
          "Yên tâm hơn khi nấu nướng",
        ],
      },
      {
        id: "phong-ngu",
        label: "Phòng ngủ",
        icon: Bed,
        color: "indigo",
        problems: [
          "Đèn và điều hòa phải tắt thủ công trước khi ngủ",
          "Rèm cần kéo tay mỗi sáng",
          "Thức dậy vẫn thấy nóng hoặc lạnh",
        ],
        devices: [
          "Công tắc thông minh",
          "Điều khiển điều hòa theo giấc ngủ",
          "Rèm tự động đóng mở theo ánh sáng",
          "Cảm biến ánh sáng tự động dim đèn ngủ",
        ],
        benefits: [
          'Kịch bản "Đi ngủ" — tắt hết đèn, điều hòa về nhiệt độ lý tưởng',
          "Rèm tự mở đón ánh sáng tự nhiên mỗi sáng",
          "Ngủ ngon hơn, tiết kiệm điện hơn",
        ],
      },
      {
        id: "nha-ve-sinh",
        label: "Nhà vệ sinh",
        icon: Bath,
        color: "cyan",
        problems: [
          "Đèn nhà vệ sinh thường bật quên tắt",
          "Không theo dõi rò rỉ nước kịp thời",
          "Quạt thông gió chạy liên tục dù không cần",
        ],
        devices: [
          "Cảm biến hiện diện tự bật đèn",
          "Cảm biến rò rỉ nước",
          "Quạt thông gió thông minh tự tắt",
          "Ổ cắm chống nước IP66",
        ],
        benefits: [
          "Đèn tự bật khi vào, tự tắt khi ra",
          "Phát hiện rò rỉ nước sớm, tránh hư hỏng",
          "Tiết kiệm điện tối đa cho gia đình",
        ],
      },
      {
        id: "ban-cong-san-thuong",
        label: "Ban công / Sân thượng",
        icon: LayoutGrid,
        color: "violet",
        problems: [
          "Tưới cây thủ công mất thời gian",
          "Không giám sát được khu vực ngoài trời",
          "Đèn ngoài trời phải ra tắt bật thủ công",
        ],
        devices: [
          "Hệ thống tưới tự động",
          "Camera ngoài trời chống nước IP67",
          "Cảm biến ánh sáng tự bật đèn",
          "Ổ cắm ngoài trời chống nước",
        ],
        benefits: [
          "Tưới cây đúng giờ, đúng lượng",
          "Giám sát khu vực ngoài trời 24/7",
          "Đèn tự bật khi trời tối, tự tắt khi trời sáng",
        ],
      },
    ],
  },

  "biet-thu": {
    title: "Biệt thự thông minh - Giải pháp toàn diện",
    subtitle: "Khám phá các khu vực trong biệt thự để tìm thiết bị smart home phù hợp.",
    areas: [
      {
        id: "cong",
        label: "Cổng chính",
        icon: Fence,
        color: "sky",
        problems: [
          "Không biết khách đến khi đang ở trong nhà",
          "Mở cửa cổng thủ công bất tiện",
          "Không theo dõi xe ra vào",
        ],
        devices: [
          "Camera AI nhận diện khuôn mặt",
          "Chuông cửa video thông minh",
          "Khóa cổng tự động",
          "Báo động khi phát hiện chuyển động",
        ],
        benefits: [
          "Xem và trả lời khách từ xa qua điện thoại",
          "Mở cổng tự động khi về đến nhà",
          "Ghi lại toàn bộ xe ra vào",
        ],
      },
      {
        id: "san-vuon",
        label: "Sân vườn",
        icon: TreePine,
        color: "emerald",
        problems: [
          "Tưới cây thủ công mất thời gian mỗi ngày",
          "Đèn sân vườn bật tắt thủ công",
          "Không giám sát được khu vực ngoài trời",
        ],
        devices: [
          "Hệ thống tưới cây tự động",
          "Đèn sân vườn thông minh",
          "Camera ngoài trời IP67",
          "Cảm biến độ ẩm đất",
        ],
        benefits: [
          "Tưới cây tự động theo lịch hoặc độ ẩm",
          "Đèn tự bật khi trời tối",
          "Theo dõi sân vườn 24/7 từ xa",
        ],
      },
      {
        id: "phong-khach",
        label: "Phòng khách",
        icon: Sofa,
        color: "amber",
        problems: [
          "Nhiều công tắc, điều khiển rải rác",
          "Rèm cửa kéo tay nhiều lần mỗi ngày",
          "Điều hòa bật quên tắt",
        ],
        devices: [
          "Ngữ cảnh tiếp khách — một chạm",
          "Rèm tự động theo giờ",
          "Điều khiển điều hòa học thói quen",
          "Công tắc thông minh wifi",
        ],
        benefits: [
          "Tạo không gian tiếp khách sang trọng",
          "Rèm tự động điều chỉnh ánh sáng",
          "Tiết kiệm điện đến 40%",
        ],
      },
      {
        id: "gara",
        label: "Gara ô tô",
        icon: Car,
        color: "slate",
        problems: [
          "Bật tắt đèn thủ công khi ra vào",
          "Không biết xe có an toàn khi đi vắng",
          "Quên đóng cửa garage",
        ],
        devices: [
          "Camera AI giám sát xe",
          "Cảm biến chuyển động tự bật đèn",
          "Cửa garage tự động",
          "Cảm biến cửa báo động",
        ],
        benefits: [
          "Đèn tự bật khi xe vào, tự tắt khi ra",
          "Theo dõi xe 24/7 qua điện thoại",
          "Cửa tự động đóng khi quên",
        ],
      },
      {
        id: "phong-ngu-chinh",
        label: "Phòng ngủ chính",
        icon: Bed,
        color: "indigo",
        problems: [
          "Nhiều công tắc quanh giường",
          "Điều hòa chạy cả đêm gây lãng phí",
          "Rèm cần kéo tay mỗi sáng",
        ],
        devices: [
          "Công tắc cảm ứng quanh giường",
          "Điều khiển điều hòa theo giấc ngủ",
          "Rèm tự động đóng mở",
          "Đèn ngủ dim thông minh",
        ],
        benefits: [
          "Một chạm là tắt hết đèn — ngủ ngay",
          "Điều hòa tự điều chỉnh theo nhiệt độ phòng",
          "Ngủ sâu hơn, tiết kiệm điện hơn",
        ],
      },
      {
        id: "san-thuong",
        label: "Sân thượng",
        icon: Sun,
        color: "violet",
        problems: [
          "Đèn sân thượng bật tắt thủ công",
          "Không giám sát được khu vực cao",
          "Tưới cây trên sân thượng khó khăn",
        ],
        devices: [
          "Đèn sân thượng thông minh",
          "Camera ngoài trời 360 độ",
          "Hệ thống tưới tự động",
          "Ổ cắm chống nước IP67",
        ],
        benefits: [
          "Điều khiển đèn từ xa hoặc theo lịch",
          "Giám sát toàn cảnh từ trên cao",
          "Tưới cây đúng giờ, đúng lượng",
        ],
      },
    ],
  },

  "chung-cu": {
    title: "Căn hộ thông minh - Tiện nghi hiện đại",
    subtitle: "Chọn từng khu vực trong căn hộ để xem thiết bị phù hợp.",
    areas: [
      {
        id: "cua-chinh",
        label: "Cửa chính",
        icon: DoorOpen,
        color: "sky",
        problems: [
          "Lo lắng khi đi vắng",
          "Phải mang nhiều chìa khóa",
          "Không biết có người đến khi không có nhà",
        ],
        devices: [
          "Khóa thông minh — mở bằng vân tay, mã PIN",
          "Cảm biến cửa mở/bật",
          "Camera trong nhà quan sát cửa",
          "Chuông cửa video",
        ],
        benefits: [
          "Một vân tay mở tất cả cửa",
          "Biết ngay khi có người mở cửa",
          "Xem lại lịch sử ra vào",
        ],
      },
      {
        id: "phong-khach",
        label: "Phòng khách",
        icon: Sofa,
        color: "emerald",
        problems: [
          "Nhiều thiết bị cần điều khiển riêng",
          "Điều hòa bật quên tắt",
          "Đèn bật tắt nhiều nơi",
        ],
        devices: [
          "Công tắc thông minh — điều khiển từ xa",
          "Điều khiển điều hòa qua app",
          "Rèm tự động theo giờ",
          "Cảm biến hiện diện",
        ],
        benefits: [
          "Một app điều khiển toàn bộ phòng khách",
          "Điều hòa tự tắt khi ra ngoài",
          "Tiết kiệm điện đến 30%",
        ],
      },
      {
        id: "phong-ngu",
        label: "Phòng ngủ",
        icon: Bed,
        color: "indigo",
        problems: [
          "Đèn ngủ bật tắt thủ công",
          "Rèm kéo tay mỗi sáng",
          "Điều hòa lạnh quá hoặc nóng khi ngủ",
        ],
        devices: [
          "Đèn thông minh điều chỉnh độ sáng",
          "Rèm tự động đóng mở theo giờ",
          "Điều khiển điều hòa theo giấc ngủ",
          "Công tắc cảm ứng gần giường",
        ],
        benefits: [
          "Kịch bản 'Đi ngủ' — tắt hết đèn ngay",
          "Rèm tự mở đón ánh sáng tự nhiên",
          "Ngủ ngon hơn với nhiệt độ lý tưởng",
        ],
      },
      {
        id: "ban-cong",
        label: "Ban công",
        icon: LayoutGrid,
        color: "cyan",
        problems: [
          "Đèn ban công bật tắt thủ công",
          "Lo lắng khi đi vắng",
          "Thiết bị điện ngoài trời dễ hỏng",
        ],
        devices: [
          "Cảm biến cửa ban công",
          "Camera nhỏ gọn",
          "Đèn ban công thông minh",
          "Ổ cắm chống nước IP44",
        ],
        benefits: [
          "Biết ngay khi cửa ban công mở",
          "Giám sát từ xa qua điện thoại",
          "Đèn tự bật khi trời tối",
        ],
      },
      {
        id: "bep",
        label: "Bếp",
        icon: ChefHat,
        color: "amber",
        problems: [
          "Sợ quên tắt bếp khi ra ngoài",
          "Quạt hút bếp chạy không cần thiết",
          "Không theo dõi được tình trạng bếp",
        ],
        devices: [
          "Cảm biến khói, gas thông minh",
          "Ổ cắm thông minh tự ngắt",
          "Quạt hút tự động theo độ ẩm",
          "Camera giám sát bếp",
        ],
        benefits: [
          "Cảnh báo ngay khi phát hiện gas/khói",
          "Tự động ngắt điện các thiết bị nguy hiểm",
          "Yên tâm khi nấu nướng",
        ],
      },
      {
        id: "nha-ve-sinh",
        label: "Nhà vệ sinh",
        icon: Bath,
        color: "violet",
        problems: [
          "Đèn bật quên tắt",
          "Quạt thông gió chạy liên tục",
          "Lo lắng về rò rỉ nước",
        ],
        devices: [
          "Cảm biến hiện diện tự bật đèn",
          "Quạt thông gió thông minh tự tắt",
          "Cảm biến rò rỉ nước",
          "Ổ cắm chống nước IP66",
        ],
        benefits: [
          "Đèn tự bật khi vào, tự tắt khi ra",
          "Tiết kiệm điện quạt thông gió",
          "Cảnh báo sớm khi có rò rỉ nước",
        ],
      },
    ],
  },

  "van-phong": {
    title: "Văn phòng thông minh - Năng suất cao hơn",
    subtitle: "Tối ưu không gian làm việc với các giải pháp smart office.",
    areas: [
      {
        id: "le-tan",
        label: "Lễ tân",
        icon: Users,
        color: "sky",
        problems: [
          "Không biết khách đến khi vắng bàn",
          "Khóa cửa phải dùng chìa",
          "Không giám sát được khu vực tiếp tân",
        ],
        devices: [
          "Camera AI nhận diện khách",
          "Khóa cửa tự động — mở bằng thẻ",
          "Chuông cửa video thông minh",
          "Màn hình hiển thị lịch họp",
        ],
        benefits: [
          "Biết khách đến từ xa",
          "Mở cửa tự động cho khách",
          "Quản lý ra vào chuyên nghiệp",
        ],
      },
      {
        id: "phong-hop",
        label: "Phòng họp",
        icon: Monitor,
        color: "emerald",
        problems: [
          "Đèn và máy chiếu bật tắt thủ công",
          "Điều hòa bật cả ngày không cần thiết",
          "Quên tắt thiết bị khi họp xong",
        ],
        devices: [
          "Kịch bản 'Bắt đầu họp' — đèn + máy chiếu",
          "Điều khiển điều hòa theo lịch",
          "Công tắc thông minh hẹn giờ tắt",
          "Cảm biến hiện diện",
        ],
        benefits: [
          "Một chạm bắt đầu phòng họp",
          "Tiết kiệm điện đến 40%",
          "Không còn quên tắt thiết bị",
        ],
      },
      {
        id: "khu-lam-viec",
        label: "Khu làm việc chung",
        icon: Building2,
        color: "amber",
        problems: [
          "Đèn bật cả khu vực dù chỉ vài người",
          "Điều hòa lạnh không đều",
          "Không biết bao nhiêu người trong không gian",
        ],
        devices: [
          "Đèn thông minh theo khu vực",
          "Cảm biến hiện diện — đèn tự bật",
          "Điều khiển điều hòa theo zone",
          "Cảm biến nhiệt độ, độ ẩm",
        ],
        benefits: [
          "Đèn chỉ bật khu vực có người",
          "Tiết kiệm điện đến 50%",
          "Môi trường làm việc thoải mái",
        ],
      },
      {
        id: "kho-luu-tru",
        label: "Kho / Lưu trữ",
        icon: Archive,
        color: "slate",
        problems: [
          "Không biết ai vào kho",
          "Đèn kho bật liên tục",
          "Lo lắng về an ninh kho",
        ],
        devices: [
          "Cảm biến cửa mở/bật",
          "Camera AI giám sát",
          "Đèn tự bật khi có chuyển động",
          "Khóa thông minh cho kho",
        ],
        benefits: [
          "Biết ai vào kho và khi nào",
          "Đèn chỉ bật khi cần",
          "An ninh kho được đảm bảo",
        ],
      },
      {
        id: "san-vuong",
        label: "Sảnh / Hành lang",
        icon: Footprints,
        color: "cyan",
        problems: [
          "Đèn sảnh bật 24/7",
          "Không giám sát được khu vực công cộng",
          "Tốn điện chiếu sáng",
        ],
        devices: [
          "Cảm biến hiện diện tự bật đèn",
          "Đèn LED tiết kiệm điều khiển theo zone",
          "Camera AI quan sát",
          "Hẹn giờ tắt đèn đêm",
        ],
        benefits: [
          "Đèn tự tắt khi không có người",
          "Tiết kiệm điện chiếu sáng 60%",
          "An ninh tốt hơn",
        ],
      },
      {
        id: "phong-giam-doc",
        label: "Phòng giám đốc",
        icon: MonitorSmartphone,
        color: "indigo",
        problems: [
          "Cần không gian riêng tư, yên tĩnh",
          "Nhiều thiết bị cần điều khiển",
          "Lo lắng khi đi vắng",
        ],
        devices: [
          "Kịch bản 'Làm việc' — đèn + rèm + điều hòa",
          "Khóa thông minh bảo mật cao",
          "Camera AI nhận diện",
          "Điều khiển từ xa qua app",
        ],
        benefits: [
          "Không gian làm việc hoàn hảo",
          "Bảo mật cao, kiểm soát ra vào",
          "Điều khiển mọi thứ từ điện thoại",
        ],
      },
    ],
  },

  "showroom": {
    title: "Showroom thông minh - Trải nghiệm hoàn hảo",
    subtitle: "Tạo không gian trưng bày ấn tượng với smart showroom.",
    areas: [
      {
        id: "khu-trung-bay",
        label: "Khu trưng bày",
        icon: Palette,
        color: "emerald",
        problems: [
          "Đèn chiếu sáng không linh hoạt",
          "Không tạo được không khí showroom cao cấp",
          "Tốn điện chiếu sáng cả ngày",
        ],
        devices: [
          "Đèn spotlight thông minh",
          "Kịch bản ngữ cảnh — đón khách, trưng bày, đóng cửa",
          "Điều khiển ánh sáng theo zone",
          "Cảm biến ánh sáng tự điều chỉnh",
        ],
        benefits: [
          "Tạo không gian ấn tượng, chuyên nghiệp",
          "Tiết kiệm điện đến 50%",
          "Dễ dàng thay đổi bối cảnh trưng bày",
        ],
      },
      {
        id: "quan-ly-tu-van",
        label: "Quầy tư vấn",
        icon: MonitorSmartphone,
        color: "sky",
        problems: [
          "Không giám sát được khu vực quầy",
          "Nhiều thiết bị cần điều khiển",
          "Khách chờ lâu không biết",
        ],
        devices: [
          "Camera AI giám sát",
          "Màn hình điều khiển trung tâm",
          "Loa thông báo thông minh",
          "Bảng led thông tin",
        ],
        benefits: [
          "Quản lý showroom từ một màn hình",
          "Thông báo khách đến tự động",
          "Nâng cao trải nghiệm khách hàng",
        ],
      },
      {
        id: "cua-ra-vao",
        label: "Cửa ra vào",
        icon: DoorOpen,
        color: "amber",
        problems: [
          "Không biết khách ra vào lúc nào",
          "Bảo mật kém giờ cao điểm",
          "Khó kiểm soát lượng khách",
        ],
        devices: [
          "Camera AI đếm lượt khách",
          "Cảm biến cửa tự động",
          "Chuông cửa thông minh",
          "Khóa tự động giờ đóng cửa",
        ],
        benefits: [
          "Biết lượng khách ra vào",
          "Cửa tự mở khi khách đến",
          "An ninh đảm bảo 24/7",
        ],
      },
      {
        id: "kho-hang",
        label: "Kho hàng",
        icon: Archive,
        color: "slate",
        problems: [
          "Không biết ai vào kho",
          "Đèn kho bật liên tục",
          "Lo lắng về hàng hóa",
        ],
        devices: [
          "Camera AI giám sát",
          "Cảm biến chuyển động báo động",
          "Đèn tự bật khi có người",
          "Khóa thông minh kiểm soát ra vào",
        ],
        benefits: [
          "An ninh kho được đảm bảo",
          "Tiết kiệm điện chiếu sáng",
          "Theo dõi nhân viên kho",
        ],
      },
      {
        id: "phong-kinh-doanh",
        label: "Phòng kinh doanh",
        icon: Users,
        color: "indigo",
        problems: [
          "Đèn và điều hòa bật cả ngày",
          "Nhiều thiết bị cần điều khiển",
          "Không tạo được không khí chuyên nghiệp",
        ],
        devices: [
          "Kịch bản 'Làm việc', 'Họp', 'Nghỉ'",
          "Công tắc thông minh điều khiển theo zone",
          "Điều khiển điều hòa qua app",
          "Đèn thông minh điều chỉnh độ sáng",
        ],
        benefits: [
          "Một chạm chuyển không gian làm việc",
          "Tiết kiệm điện đến 40%",
          "Nâng cao hiệu suất làm việc",
        ],
      },
      {
        id: "san-vuong",
        label: "Khuôn viên / Sân vườn",
        icon: TreePine,
        color: "violet",
        problems: [
          "Đèn ngoài trời bật tắt thủ công",
          "Tưới cây thủ công tốn thời gian",
          "Không giám sát được khu vực ngoài trời",
        ],
        devices: [
          "Đèn sân vườn thông minh",
          "Hệ thống tưới tự động",
          "Camera ngoài trời IP67",
          "Cảm biến ánh sáng tự bật đèn",
        ],
        benefits: [
          "Đèn tự bật khi trời tối",
          "Tưới cây đúng giờ, đúng lượng",
          "Giám sát khuôn viên 24/7",
        ],
      },
    ],
  },

  "shop": {
    title: "Shop thông minh - Quản lý dễ dàng",
    subtitle: "Tối ưu quản lý cửa hàng với giải pháp smart retail.",
    areas: [
      {
        id: "cua-hang",
        label: "Cửa hàng",
        icon: Store,
        color: "emerald",
        problems: [
          "Đèn bật tắt thủ công nhiều lần",
          "Không giám sát được khi đóng cửa",
          "Tốn điện chiếu sáng cả ngày",
        ],
        devices: [
          "Camera AI giám sát 24/7",
          "Cảm biến cửa báo động",
          "Đèn thông minh điều khiển theo zone",
          "Hẹn giờ bật tắt đèn",
        ],
        benefits: [
          "Giám sát từ xa qua điện thoại",
          "Biết ngay khi có đột nhập",
          "Tiết kiệm điện đến 50%",
        ],
      },
      {
        id: "quan-thu-ngan",
        label: "Quầy thu ngân",
        icon: MonitorSmartphone,
        color: "sky",
        problems: [
          "Không giám sát được quầy thu ngân",
          "Lo lắng về an ninh tiền bạc",
          "Nhiều thiết bị cần điều khiển",
        ],
        devices: [
          "Camera AI giám sát quầy",
          "Báo động khi có sự cố",
          "Ổ cắm thông minh cho máy POS",
          "Màn hình điều khiển trung tâm",
        ],
        benefits: [
          "An ninh quầy thu ngân được đảm bảo",
          "Theo dõi giao dịch qua camera",
          "Quản lý dễ dàng từ một màn hình",
        ],
      },
      {
        id: "kho-hang",
        label: "Kho hàng",
        icon: Archive,
        color: "amber",
        problems: [
          "Không biết ai vào kho",
          "Đèn kho bật liên tục",
          "Lo lắng về hàng hóa trong kho",
        ],
        devices: [
          "Camera AI giám sát",
          "Cảm biến cửa báo động",
          "Đèn tự bật khi có người",
          "Khóa thông minh kiểm soát",
        ],
        benefits: [
          "Biết ai vào kho, khi nào",
          "Tiết kiệm điện chiếu sáng",
          "Hàng hóa được bảo vệ",
        ],
      },
      {
        id: "bang-hieu",
        label: "Bảng hiệu / Biển quảng cáo",
        icon: Lightbulb,
        color: "violet",
        problems: [
          "Bật tắt bảng hiệu thủ công",
          "Quên tắt bảng hiệu đêm khuya",
          "Tốn điện không cần thiết",
        ],
        devices: [
          "Ổ cắm thông minh hẹn giờ",
          "Điều khiển bật/tắt từ xa",
          "Hẹn giờ tự động theo giờ mở cửa",
          "Theo dõi tình trạng hoạt động",
        ],
        benefits: [
          "Bật tắt đúng giờ tự động",
          "Tiết kiệm điện đến 60%",
          "Quản lý từ xa qua app",
        ],
      },
      {
        id: "phong-nghi",
        label: "Phòng nghỉ / Khu vực nhân viên",
        icon: Bed,
        color: "indigo",
        problems: [
          "Đèn và điều hòa bật không cần thiết",
          "Không có không gian nghỉ ngơi thoải mái",
          "Tốn điện giờ nghỉ",
        ],
        devices: [
          "Công tắc thông minh hẹn giờ",
          "Cảm biến hiện diện",
          "Điều khiển điều hòa theo giờ",
          "Đèn tự tắt khi không có người",
        ],
        benefits: [
          "Tiết kiệm điện giờ nghỉ",
          "Nhân viên thoải mái hơn",
          "Không còn quên tắt thiết bị",
        ],
      },
      {
        id: "san-ngoai-troi",
        label: "Khu vực ngoài trời",
        icon: Sun,
        color: "cyan",
        problems: [
          "Đèn ngoài trời bật cả ngày",
          "Không giám sát được khu vực ngoài",
          "Tốn điện chiếu sáng",
        ],
        devices: [
          "Đèn ngoài trời thông minh",
          "Camera ngoài trời IP67",
          "Cảm biến ánh sáng tự bật đèn",
          "Hẹn giờ tắt đèn ban ngày",
        ],
        benefits: [
          "Đèn tự bật khi trời tối",
          "Giám sát khu vực ngoài trời",
          "Tiết kiệm điện đến 70%",
        ],
      },
    ],
  },

  "homestay": {
    title: "Homestay thông minh - Đón khách chuyên nghiệp",
    subtitle: "Quản lý homestay dễ dàng với smart homestay.",
    areas: [
      {
        id: "cua-phong",
        label: "Cửa phòng",
        icon: DoorOpen,
        color: "sky",
        problems: [
          "Phải giao chìa khóa trực tiếp",
          "Không biết khách đến lúc nào",
          "Lo lắng về an ninh phòng",
        ],
        devices: [
          "Khóa mật khẩu — tạo mã cho từng khách",
          "Camera AI giám sát hành lang",
          "Chuông cửa thông minh",
          "Mã PIN tự hết hạn sau check-out",
        ],
        benefits: [
          "Khách tự nhận phòng không cần gặp",
          "Mã PIN an toàn, không cần chìa khóa",
          "Theo dõi ra vào từng phòng",
        ],
      },
      {
        id: "phong-ngu",
        label: "Phòng ngủ",
        icon: Bed,
        color: "emerald",
        problems: [
          "Điều hòa bật cả ngày dù khách đi vắng",
          "Đèn bật tắt thủ công nhiều lần",
          "Khách quên tắt thiết bị khi đi",
        ],
        devices: [
          "Điều khiển điều hòa từ xa qua app",
          "Công tắc thông minh — điều khiển từ xa",
          "Rèm tự động đóng mở",
          "Kịch bản 'Khách đi vắng' — tắt hết",
        ],
        benefits: [
          "Tiết kiệm điện đến 50%",
          "Khách hài lòng với tiện nghi",
          "Tắt thiết bị từ xa khi khách đi",
        ],
      },
      {
        id: "hanh-lang",
        label: "Hành lang",
        icon: Footprints,
        color: "amber",
        problems: [
          "Đèn hành lang bật 24/7",
          "Không giám sát được khu vực chung",
          "Tốn điện chiếu sáng",
        ],
        devices: [
          "Camera AI giám sát",
          "Cảm biến hiện diện tự bật đèn",
          "Đèn LED tiết kiệm theo zone",
          "Hẹn giờ tắt đèn đêm",
        ],
        benefits: [
          "Đèn tự tắt khi không có người",
          "Giám sát hành lang 24/7",
          "Tiết kiệm điện đến 60%",
        ],
      },
      {
        id: "le-tan",
        label: "Khu vực lễ tân",
        icon: MonitorSmartphone,
        color: "indigo",
        problems: [
          "Không biết khách đến khi vắng",
          "Nhiều công việc quản lý riêng",
          "Khó kiểm soát ra vào",
        ],
        devices: [
          "Camera AI nhận diện khách",
          "Màn hình quản lý homestay",
          "Chuông cửa thông minh",
          "Khóa thông minh cho từng phòng",
        ],
        benefits: [
          "Quản lý toàn bộ homestay từ một màn hình",
          "Biết khách đến từ xa",
          "Tạo mã PIN cho khách dễ dàng",
        ],
      },
      {
        id: "san-vuong",
        label: "Khu vực sinh hoạt chung",
        icon: Sofa,
        color: "violet",
        problems: [
          "Đèn và điều hòa bật không cần thiết",
          "Không tạo được không gian thoải mái",
          "Tốn điện khu vực chung",
        ],
        devices: [
          "Công tắc thông minh theo zone",
          "Điều khiển điều hòa từ xa",
          "Kịch bản 'Tiếp khách', 'Nghỉ ngơi'",
          "Cảm biến hiện diện",
        ],
        benefits: [
          "Tạo không gian thoải mái cho khách",
          "Tiết kiệm điện khu vực chung",
          "Nâng cao trải nghiệm khách hàng",
        ],
      },
      {
        id: "nha-bep",
        label: "Nhà bếp chung",
        icon: ChefHat,
        color: "cyan",
        problems: [
          "Lo lắng về an toàn gas, điện",
          "Quên tắt thiết bị sau khi dùng",
          "Không giám sát được khu vực bếp",
        ],
        devices: [
          "Cảm biến khói, gas thông minh",
          "Ổ cắm thông minh tự ngắt",
          "Camera giám sát bếp",
          "Cảnh báo qua app khi có sự cố",
        ],
        benefits: [
          "Cảnh báo sớm khi có nguy hiểm",
          "Tự động ngắt điện khi cần",
          "Yên tâm hơn khi cho thuê",
        ],
      },
    ],
  },

  "nha-tro": {
    title: "Nhà trọ thông minh - Quản lý hiệu quả",
    subtitle: "Giải pháp smart nhà trọ cho chủ nhà và người thuê.",
    areas: [
      {
        id: "cong",
        label: "Cổng / Lối vào",
        icon: Fence,
        color: "sky",
        problems: [
          "Không kiểm soát được người ra vào",
          "Mất chìa khóa cổng thường xuyên",
          "Không biết có người lạ vào",
        ],
        devices: [
          "Khóa thông minh cổng",
          "Camera AI nhận diện",
          "Chuông cửa thông minh",
          "Báo động khi có người lạ",
        ],
        benefits: [
          "Mở cổng bằng mã PIN hoặc vân tay",
          "Biết ai ra vào, khi nào",
          "Không còn lo mất chìa khóa",
        ],
      },
      {
        id: "hanh-lang",
        label: "Hành lang",
        icon: Footprints,
        color: "emerald",
        problems: [
          "Đèn hành lang bật 24/7",
          "Tốn điện chiếu sáng",
          "Không giám sát được khu vực chung",
        ],
        devices: [
          "Camera AI giám sát",
          "Cảm biến hiện diện tự bật đèn",
          "Đèn LED tiết kiệm theo zone",
          "Hẹn giờ tắt đèn đêm",
        ],
        benefits: [
          "Tiết kiệm điện đến 70%",
          "Giám sát hành lang 24/7",
          "Đèn chỉ bật khi cần",
        ],
      },
      {
        id: "phong-thue",
        label: "Phòng cho thuê",
        icon: DoorOpen,
        color: "amber",
        problems: [
          "Phải giao chìa khóa trực tiếp",
          "Không biết tình trạng phòng khi khách đi",
          "Lo lắng về an ninh phòng",
        ],
        devices: [
          "Khóa thông minh — mã PIN cho từng khách",
          "Công tắc thông minh theo dõi sử dụng",
          "Cảm biến cửa mở/bật",
          "Camera AI hành lang",
        ],
        benefits: [
          "Tạo mã PIN cho từng khách thuê",
          "Theo dõi tình trạng phòng từ xa",
          "Thu tiền điện dễ dàng qua app",
        ],
      },
      {
        id: "khu-de-xe",
        label: "Khu vực để xe",
        icon: Car,
        color: "slate",
        problems: [
          "Đèn bật liên tục không cần thiết",
          "Lo lắng về xe để ngoài trời",
          "Không giám sát được khu vực để xe",
        ],
        devices: [
          "Camera AI giám sát xe",
          "Đèn tự bật khi có chuyển động",
          "Cảm biến ánh sáng tiết kiệm điện",
          "Báo động khi phát hiện người lạ",
        ],
        benefits: [
          "Giám sát xe 24/7",
          "Tiết kiệm điện đến 60%",
          "An ninh khu vực để xe được đảm bảo",
        ],
      },
      {
        id: "san-vuong",
        label: "Khu vực sinh hoạt chung",
        icon: Sun,
        color: "violet",
        problems: [
          "Đèn sân bật cả đêm",
          "Tưới cây thủ công",
          "Không giám sát được khu vực ngoài trời",
        ],
        devices: [
          "Đèn sân thông minh",
          "Hệ thống tưới tự động",
          "Camera ngoài trời",
          "Cảm biến ánh sáng tự bật đèn",
        ],
        benefits: [
          "Đèn tự bật khi trời tối",
          "Tưới cây tự động",
          "Giám sát khu vực ngoài trời",
        ],
      },
      {
        id: "phong-giat",
        label: "Khu vực giặt ủi",
        icon: Droplets,
        color: "cyan",
        problems: [
          "Máy giặt bật không cần thiết",
          "Đèn và quạt chạy liên tục",
          "Không kiểm soát được việc sử dụng",
        ],
        devices: [
          "Ổ cắm thông minh hẹn giờ",
          "Công tắc thông minh theo zone",
          "Cảm biến hiện diện tự bật đèn",
          "Theo dõi điện sử dụng qua app",
        ],
        benefits: [
          "Tiết kiệm điện nước",
          "Kiểm soát việc sử dụng",
          "Tiện lợi cho người thuê",
        ],
      },
    ],
  },

  "cafe": {
    title: "Quán cafe thông minh - Không gian độc đáo",
    subtitle: "Tạo không gian cafe thông minh, tiết kiệm và ấn tượng.",
    areas: [
      {
        id: "quay-pha-che",
        label: "Quầy pha chế",
        icon: Coffee,
        color: "amber",
        problems: [
          "Nhiều thiết bị cần điều khiển riêng",
          "Không giám sát được khu vực pha chế",
          "Lo lắng về an toàn điện",
        ],
        devices: [
          "Camera AI giám sát quầy pha chế",
          "Ổ cắm thông minh — bật/tắt từ xa",
          "Cảm biến khói, nhiệt",
          "Đèn quầy thông minh",
        ],
        benefits: [
          "Quản lý quầy pha chế từ xa",
          "Cảnh báo sớm khi có sự cố",
          "Tiết kiệm điện đến 30%",
        ],
      },
      {
        id: "khu-khach-ngoi",
        label: "Khu vực khách ngồi",
        icon: Sofa,
        color: "emerald",
        problems: [
          "Đèn bật tắt không phù hợp theo thời gian",
          "Không tạo được không khí riêng biệt",
          "Tốn điện chiếu sáng cả ngày",
        ],
        devices: [
          "Đèn thông minh theo khu vực",
          "Kịch bản ngữ cảnh — sáng, chiều, tối",
          "Loa thông minh phát nhạc nền",
          "Cảm biến ánh sáng tự điều chỉnh",
        ],
        benefits: [
          "Tạo không gian ấm cúng theo thời gian",
          "Tiết kiệm điện đến 50%",
          "Trải nghiệm khách hàng tốt hơn",
        ],
      },
      {
        id: "san-ngoai-troi",
        label: "Sân ngoài trời",
        icon: Sun,
        color: "sky",
        problems: [
          "Đèn trang trí bật tắt thủ công",
          "Không giám sát được khu vực ngoài trời",
          "Tốn điện chiếu sáng ngoài trời",
        ],
        devices: [
          "Đèn trang trí thông minh",
          "Camera ngoài trời IP67",
          "Hẹn giờ bật tắt đèn",
          "Ổ cắm chống nước IP67",
        ],
        benefits: [
          "Đèn tự bật khi trời tối",
          "Giám sát khu vực ngoài trời",
          "Tiết kiệm điện đến 60%",
        ],
      },
      {
        id: "bang-hieu",
        label: "Bảng hiệu / Biển quảng cáo",
        icon: Lightbulb,
        color: "violet",
        problems: [
          "Bật tắt bảng hiệu thủ công",
          "Quên tắt bảng hiệu đêm khuya",
          "Tốn điện không cần thiết",
        ],
        devices: [
          "Ổ cắm thông minh hẹn giờ",
          "Điều khiển bật/tắt từ xa",
          "Hẹn giờ tự động theo giờ mở cửa",
          "Theo dõi tình trạng hoạt động",
        ],
        benefits: [
          "Bật tắt đúng giờ tự động",
          "Tiết kiệm điện đến 60%",
          "Quản lý từ xa qua app",
        ],
      },
      {
        id: "phong-nghi",
        label: "Khu vực nhân viên / Phòng nghỉ",
        icon: Bed,
        color: "indigo",
        problems: [
          "Đèn và điều hòa bật không cần thiết",
          "Tốn điện giờ nghỉ",
          "Không có không gian nghỉ ngơi thoải mái",
        ],
        devices: [
          "Công tắc thông minh hẹn giờ",
          "Cảm biến hiện diện",
          "Điều khiển điều hòa theo giờ",
          "Đèn tự tắt khi không có người",
        ],
        benefits: [
          "Tiết kiệm điện giờ nghỉ",
          "Nhân viên thoải mái hơn",
          "Không còn quên tắt thiết bị",
        ],
      },
      {
        id: "kho-nuoc",
        label: "Kho / Khu vực chứa đồ",
        icon: Archive,
        color: "slate",
        problems: [
          "Không giám sát được kho",
          "Đèn kho bật liên tục",
          "Lo lắng về đồ trong kho",
        ],
        devices: [
          "Camera AI giám sát",
          "Cảm biến chuyển động báo động",
          "Đèn tự bật khi có người",
          "Khóa thông minh kiểm soát",
        ],
        benefits: [
          "An ninh kho được đảm bảo",
          "Tiết kiệm điện chiếu sáng",
          "Theo dõi kho dễ dàng",
        ],
      },
    ],
  },
};

const COLOR_MAP = {
  sky: {
    active: "from-sky-400 to-sky-500",
    activeText: "text-sky-600",
    activeBg: "bg-sky-50 border-sky-300",
    activeIcon: "text-sky-500",
    accent: "bg-sky-100 text-sky-700",
  },
  emerald: {
    active: "from-emerald-400 to-emerald-500",
    activeText: "text-emerald-600",
    activeBg: "bg-emerald-50 border-emerald-300",
    activeIcon: "text-emerald-500",
    accent: "bg-emerald-100 text-emerald-700",
  },
  amber: {
    active: "from-amber-400 to-amber-500",
    activeText: "text-amber-600",
    activeBg: "bg-amber-50 border-amber-300",
    activeIcon: "text-amber-500",
    accent: "bg-amber-100 text-amber-700",
  },
  indigo: {
    active: "from-indigo-400 to-indigo-500",
    activeText: "text-indigo-600",
    activeBg: "bg-indigo-50 border-indigo-300",
    activeIcon: "text-indigo-500",
    accent: "bg-indigo-100 text-indigo-700",
  },
  cyan: {
    active: "from-cyan-400 to-cyan-500",
    activeText: "text-cyan-600",
    activeBg: "bg-cyan-50 border-cyan-300",
    activeIcon: "text-cyan-500",
    accent: "bg-cyan-100 text-cyan-700",
  },
  violet: {
    active: "from-violet-400 to-violet-500",
    activeText: "text-violet-600",
    activeBg: "bg-violet-50 border-violet-300",
    activeIcon: "text-violet-500",
    accent: "bg-violet-100 text-violet-700",
  },
  slate: {
    active: "from-slate-400 to-slate-500",
    activeText: "text-slate-600",
    activeBg: "bg-slate-50 border-slate-300",
    activeIcon: "text-slate-500",
    accent: "bg-slate-100 text-slate-700",
  },
};

const HouseFloorPlanSection = ({ activeType = "nha-o" }) => {
  const currentData = FLOOR_PLAN_DATA[activeType] || FLOOR_PLAN_DATA["nha-o"];
  const areas = currentData.areas;

  // Initialize selected with first area's id
  const [selectedAreaId, setSelectedAreaId] = useState(() => areas[0]?.id || null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayType, setDisplayType] = useState(activeType);
  const [isAreaSwitching, setIsAreaSwitching] = useState(false);

  // Get active area data from displayType
  const displayData = FLOOR_PLAN_DATA[displayType] || FLOOR_PLAN_DATA["nha-o"];
  const displayAreas = displayData.areas;
  const activeArea = displayAreas.find((a) => a.id === selectedAreaId);
  const colors = COLOR_MAP[activeArea?.color] || COLOR_MAP.emerald;

  // Handle area selection with animation
  const handleAreaSelect = (areaId) => {
    if (areaId === selectedAreaId) return;
    setIsAreaSwitching(true);
    setTimeout(() => {
      setSelectedAreaId(areaId);
      setIsAreaSwitching(false);
    }, 200);
  };

  // Reset when type changes
  useEffect(() => {
    if (activeType !== displayType) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setDisplayType(activeType);
        setSelectedAreaId(areas[0]?.id || null);
        setIsAnimating(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [activeType, displayType, areas]);

  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-5 md:px-8">

        {/* Section Header */}
        <div className={`max-w-3xl mx-auto text-center mb-10 transition-opacity duration-200 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
            {displayData.title}
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
            {displayData.subtitle}
          </p>
        </div>

        {/* Main Content: Floor Plan + Detail Panel */}
        <div className={`grid lg:grid-cols-[1fr_1.2fr] gap-6 xl:gap-8 transition-opacity duration-200 ${isAnimating ? "opacity-0" : "opacity-100"}`}>

          {/* ─── LEFT: Interactive Floor Plan ─── */}
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
            {/* House SVG Outline */}
            <div className="relative p-6 md:p-8 flex items-center justify-center">
              <div className="relative w-full max-w-sm">
                {/* House outline SVG */}
                <svg
                  viewBox="0 0 400 280"
                  className="w-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Roof */}
                  <polygon
                    points="200,20 40,110 360,110"
                    fill="#f1f5f9"
                    stroke="#cbd5e1"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />

                  {/* Main walls */}
                  <rect
                    x="60"
                    y="110"
                    width="280"
                    height="150"
                    rx="4"
                    fill="#f8fafc"
                    stroke="#cbd5e1"
                    strokeWidth="2"
                  />

                  {/* Upper divider */}
                  <line
                    x1="60"
                    y1="185"
                    x2="340"
                    y2="185"
                    stroke="#cbd5e1"
                    strokeWidth="1.5"
                  />

                  {/* Ground divider */}
                  <line
                    x1="200"
                    y1="185"
                    x2="200"
                    y2="260"
                    stroke="#cbd5e1"
                    strokeWidth="1.5"
                  />

                  {/* Door */}
                  <rect x="175" y="215" width="50" height="45" rx="3" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
                  <circle cx="218" cy="238" r="3" fill="#94a3b8" />

                  {/* Windows */}
                  <rect x="85" y="130" width="60" height="40" rx="3" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="1.5" />
                  <line x1="115" y1="130" x2="115" y2="170" stroke="#7dd3fc" strokeWidth="1" />
                  <line x1="85" y1="150" x2="145" y2="150" stroke="#7dd3fc" strokeWidth="1" />

                  <rect x="255" y="130" width="60" height="40" rx="3" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="1.5" />
                  <line x1="285" y1="130" x2="285" y2="170" stroke="#7dd3fc" strokeWidth="1" />
                  <line x1="255" y1="150" x2="315" y2="150" stroke="#7dd3fc" strokeWidth="1" />
                </svg>

                {/* Interactive Area Labels */}
                <div className="absolute inset-0 pointer-events-none">
                  {displayAreas.map((area, idx) => {
                    const positions = [
                      { top: "80%", left: "50%", width: "20%", height: "20%" },
                      { top: "70%", left: "15%", width: "20%", height: "20%" },
                      { top: "70%", left: "73%", width: "20%", height: "20%" },
                      { top: "45%", left: "72%", width: "20%", height: "20%" },
                      { top: "45%", left: "25%", width: "20%", height: "20%" },
                      { top: "8%", left: "50%", width: "20%", height: "20%" },
                    ];

                    const pos = positions[idx] || { top: "30%", left: "30%", width: "20%", height: "20%" };
                    const isActive = selectedAreaId === area.id;
                    const col = COLOR_MAP[area.color] || COLOR_MAP.emerald;
                    const Icon = area.icon;

                    return (
                      <button
                        key={area.id}
                        type="button"
                        onClick={() => handleAreaSelect(area.id)}
                        className={`
                          absolute pointer-events-auto
                          flex flex-col items-center justify-center gap-1
                          rounded-xl border-2 transition-all duration-200 cursor-pointer
                          ${isActive
                            ? `${col.activeBg} border-current ${col.activeText} shadow-md scale-110 z-10`
                            : "bg-white/70 border-slate-300 text-slate-500 hover:border-slate-400 hover:bg-white"
                          }
                        `}
                        style={{
                          top: pos.top,
                          left: pos.left,
                          width: pos.width,
                          height: pos.height,
                        }}
                        title={area.label}
                      >
                        <Icon
                          size={idx === 5 ? 14 : 18}
                          strokeWidth={2}
                          className={isActive ? col.activeIcon : "text-slate-400"}
                        />
                        <span
                          className={`
                            text-[9px] font-bold text-center leading-tight
                            ${isActive ? col.activeText : "text-slate-400"}
                          `}
                        >
                          {area.label.split(" / ").map((line, i) => (
                            <span key={i} className="block">{line}</span>
                          ))}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ─── RIGHT: Detail Panel ─── */}
          {activeArea && (
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">

              {/* Panel Header */}
              <div className={`
                px-6 md:px-8 py-5 md:py-6
                bg-gradient-to-r ${colors.active} to-white
                flex items-center gap-4
                transition-all duration-300
                ${isAreaSwitching ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}
              `}>
                <div className={`
                  w-12 h-12 md:w-14 md:h-14 rounded-2xl
                  bg-white/90 shadow-sm
                  flex items-center justify-center
                  ${colors.activeIcon}
                `}>
                  <activeArea.icon size={24} strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900">
                    {activeArea.label}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 mt-0.5">
                    Thiết bị smart home phù hợp
                  </p>
                </div>
              </div>

              {/* Panel Body */}
              <div className="flex-1 p-5 md:p-6 space-y-5 overflow-y-auto">

                {/* Room Diagram Visualization */}
                <div className={`
                  transition-all duration-300
                  ${isAreaSwitching ? "opacity-0 scale-95" : "opacity-100 scale-100"}
                `}>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Sơ đồ vị trí thiết bị
                  </h4>
                  <RoomDiagram 
                    areaId={activeArea.id} 
                    devices={activeArea.devices}
                    isAnimating={isAreaSwitching}
                  />
                </div>

                {/* Suggested Products */}
                {(() => {
                  const roomData = ROOM_DIAGRAMS[activeArea.id] || ROOM_DIAGRAMS.default;
                  if (!roomData.suggestedProducts || roomData.suggestedProducts.length === 0) return null;
                  return (
                    <div className={`
                      transition-all duration-300
                      ${isAreaSwitching ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}
                    `}>
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                        Thiết bị đề xuất
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                        {roomData.suggestedProducts.map((product, idx) => (
                          <DeviceCard
                            key={idx}
                            name={product.name}
                            brand={product.brand}
                            price={product.price}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* Vấn đề thường gặp */}
                <div className={`
                  rounded-2xl bg-red-50 border border-red-100 p-4
                  transition-all duration-300
                  ${isAreaSwitching ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}
                `}>
                  <h4 className="flex items-center gap-2 font-black text-red-600 text-sm mb-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    Vấn đề thường gặp
                  </h4>
                  <ul className="space-y-2">
                    {activeArea.problems.map((p, idx) => (
                      <li key={idx} className="flex gap-2 text-xs text-slate-700">
                        <span className="mt-1 w-1 h-1 rounded-full bg-red-400 shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Thiết bị đề xuất */}
                <div className={`
                  rounded-2xl bg-blue-50 border border-blue-100 p-4
                  transition-all duration-300
                  ${isAreaSwitching ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}
                `}>
                  <h4 className="flex items-center gap-2 font-black text-blue-700 text-sm mb-3">
                    <Smartphone size={13} className="shrink-0" />
                    Thiết bị phù hợp
                  </h4>
                  <ul className="space-y-2">
                    {activeArea.devices.map((d, idx) => (
                      <li key={idx} className="flex gap-2 text-xs text-slate-700">
                        <span className="mt-1 w-1 h-1 rounded-full bg-blue-400 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Lợi ích */}
                <div className={`
                  rounded-2xl bg-emerald-50 border border-emerald-100 p-4
                  transition-all duration-300
                  ${isAreaSwitching ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}
                `}>
                  <h4 className="flex items-center gap-2 font-black text-emerald-700 text-sm mb-3">
                    <Zap size={13} className="shrink-0" />
                    Lợi ích sau khi lắp
                  </h4>
                  <ul className="space-y-2">
                    {activeArea.benefits.map((b, idx) => (
                      <li key={idx} className="flex gap-2 text-xs text-slate-700">
                        <CheckCircle2 size={14} className={`${colors.activeIcon} shrink-0 mt-0.5`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Panel Footer: CTA */}
              <div className="px-5 md:px-6 pb-5 md:pb-6 pt-2">
                <Link
                  to="/contact"
                  className={`
                    w-full flex items-center justify-center gap-2
                    px-5 py-3.5 md:py-4 rounded-2xl
                    font-bold text-sm md:text-base
                    bg-gradient-to-r ${colors.active} text-white
                    shadow-lg hover:shadow-xl
                    hover:brightness-105 active:brightness-95
                    transition-all duration-200
                  `}
                >
                  <Lightbulb size={16} strokeWidth={2.2} />
                  Tư vấn khu vực này
                  <ArrowRight size={15} strokeWidth={2.5} />
                </Link>
              </div>

            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default HouseFloorPlanSection;
