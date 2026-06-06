import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  DoorOpen,
  Sofa,
  ChefHat,
  Bed,
  Bath,
  LayoutGrid,
  ArrowRight,
  Lightbulb,
  ShieldCheck,
  Zap,
  Smartphone,
  CheckCircle2,
} from "lucide-react";

const FLOOR_PLAN_AREAS = [
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
      "Mở cửa bằng mã PIN hoặc vân tay — không cần chìa khóa",
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
      "Điều hòa bật quên tắt khi ra ngoài"
    ],
    devices: [
      "Công tắc thông minh wifi",
      "Điều khiển điều hòa học thói quen",
      "Rèm tự động theo giờ",
      "Cảm biến hiện diện",
    ],
    benefits: [
      "Một chạm hoặc giọng nói bật cả kịch bản phòng khách",
      "Điều hòa tự tắt khi không có người",
      "Tạo không gian sống hiện đại, đẳng cấp hơn",
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
      "Cảnh báo ngay lập tức khi phát hiện khói hoặc gas",
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
      "Thức dậy vẫn thấy nóng hoặc lạnh vì điều hòa chạy cả đêm",
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
      "Đèn tự bật khi vào, tự tắt khi ra — không cần chạm công tắc",
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
      "Cảm biến ánh sáng tự bật đèn ban công",
      "Ổ cắm ngoài trời chống nước",
    ],
    benefits: [
      "Tưới cây đúng giờ, đúng lượng — không cần có mặt ở nhà",
      "Giám sát khu vực ngoài trời 24/7 qua điện thoại",
      "Đèn tự bật khi trời tối, tự tắt khi trời sáng",
    ],
  },
];

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
};

const HouseFloorPlanSection = () => {
  const [selected, setSelected] = useState("phong-khach");

  const active = FLOOR_PLAN_AREAS.find((a) => a.id === selected);
  const colors = COLOR_MAP[active?.color] || COLOR_MAP.emerald;

  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-5 md:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
            Khám phá ngôi nhà của bạn cần lắp gì
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
            Chọn từng khu vực trong sơ đồ để xem thiết bị smart home phù hợp cho ngôi nhà của bạn.
          </p>
        </div>

        {/* Main Content: Floor Plan + Detail Panel */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 xl:gap-8">

          {/* ─── LEFT: Interactive Floor Plan ─── */}
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
            {/* House SVG Outline */}
            <div className="relative p-6 md:p-8 flex items-center justify-center">
              <div className="relative w-full max-w-sm">
                {/* Ground line */}
                {/* <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300 rounded-full" /> */}

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
                  {FLOOR_PLAN_AREAS.map((area, idx) => {
                    const positions = [
                      { top: "80%", left: "50%", width: "20%", height: "20%" },   // cong-san-truoc
                      { top: "70%", left: "15%", width: "20%", height: "20%" },   // phong-khach
                      { top: "70%", left: "73%", width: "20%", height: "20%" },   // bep
                      { top: "45%", left: "72%", width: "20%", height: "20%" },   // phong ngu
                      { top: "45%", left: "25%", width: "20%", height: "20%" }, // nha-ve-sinh
                      { top: "8%", left: "50%", width: "20%", height: "20%" },  // ban-cong-san-thuong
                    ];

                    const pos = positions[idx] || { top: "30%", left: "30%", width: "20%", height: "20%" };
                    const isActive = selected === area.id;
                    const col = COLOR_MAP[area.color];
                    const Icon = area.icon;

                    return (
                      <button
                        key={area.id}
                        type="button"
                        onClick={() => setSelected(area.id)}
                        className={`
                          absolute pointer-events-auto
                          flex flex-col items-center justify-center gap-1
                          rounded-xl border-2 transition-all duration-200 cursor-pointer
                          ${isActive
                            ? `${col.activeBg} border-current ${col.activeText} shadow-md`
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
          {active && (
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">

              {/* Panel Header */}
              <div className={`
                px-6 md:px-8 py-5 md:py-6
                bg-gradient-to-r ${colors.active} to-white
                flex items-center gap-4
              `}>
                <div className={`
                  w-12 h-12 md:w-14 md:h-14 rounded-2xl
                  bg-white/90 shadow-sm
                  flex items-center justify-center
                  ${colors.activeIcon}
                `}>
                  <active.icon size={24} strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900">
                    {active.label}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 mt-0.5">
                    Thiết bị smart home phù hợp
                  </p>
                </div>
              </div>

              {/* Panel Body */}
              <div className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">

                {/* Vấn đề thường gặp */}
                <div className="rounded-2xl bg-red-50 border border-red-100 p-5">
                  <h4 className="flex items-center gap-2 font-black text-red-600 text-sm mb-4">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    Vấn đề thường gặp
                  </h4>
                  <ul className="space-y-2.5">
                    {active.problems.map((p) => (
                      <li key={p} className="flex gap-3 text-sm text-slate-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Thiết bị đề xuất */}
                <div className="rounded-2xl bg-blue-50 border border-blue-100 p-5">
                  <h4 className="flex items-center gap-2 font-black text-blue-700 text-sm mb-4">
                    <Smartphone size={15} className="shrink-0" />
                    Thiết bị đề xuất
                  </h4>
                  <ul className="space-y-2.5">
                    {active.devices.map((d) => (
                      <li key={d} className="flex gap-3 text-sm text-slate-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Lợi ích */}
                <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5">
                  <h4 className="flex items-center gap-2 font-black text-emerald-700 text-sm mb-4">
                    <Zap size={15} className="shrink-0" />
                    Lợi ích sau khi lắp
                  </h4>
                  <ul className="space-y-2.5">
                    {active.benefits.map((b) => (
                      <li key={b} className="flex gap-3 text-sm text-slate-700">
                        <CheckCircle2 size={16} className={`${colors.activeIcon} shrink-0 mt-0.5`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Panel Footer: CTA */}
              <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2">
                <Link
                  to="/contact"
                  className={`
                    w-full flex items-center justify-center gap-2
                    px-6 py-3.5 md:py-4 rounded-2xl
                    font-bold text-base
                    bg-gradient-to-r ${colors.active} text-white
                    shadow-lg hover:shadow-xl
                    hover:brightness-105 active:brightness-95
                    transition-all duration-200
                  `}
                >
                  <Lightbulb size={18} strokeWidth={2.2} />
                  Tư vấn khu vực này
                  <ArrowRight size={17} strokeWidth={2.5} />
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
