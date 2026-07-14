import { Link } from "react-router-dom";
import SectionHeader from "../components/common/SectionHeader";
import {
  Lightbulb,
  Blinds,
  Thermometer,
  ShieldAlert,
  Camera,
  Lock,
  Mic,
  Layers,
  Zap,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Phone,
} from "lucide-react";

// ==================== STATIC DATA ====================

const SOLUTIONS = [
  {
    id: "lighting",
    icon: <Lightbulb size={28} strokeWidth={1.8} />,
    title: "Điều khiển chiếu sáng",
    description:
      "Bật/tắt, dimmer, điều chỉnh màu sắc và độ sáng đèn theo ý muốn hoặc theo kịch bản tự động.",
    link: "/products?category=cong-tac",
  },
  {
    id: "curtains",
    icon: <Blinds size={28} strokeWidth={1.8} />,
    title: "Rèm cửa tự động",
    description:
      "Điều khiển rèm mở/đóng tự động theo thời gian, cường độ ánh sáng hoặc một chạm trên điện thoại.",
    link: "/products?category=rem-thong-minh",
  },
  {
    id: "ac",
    icon: <Thermometer size={28} strokeWidth={1.8} />,
    title: "Điều hòa và môi trường",
    description:
      "Tự động bật điều hòa khi về nhà, điều chỉnh nhiệt độ theo thói quen, kết hợp cảm biến nhiệt độ - độ ẩm.",
    link: "/products?category=dieu-hoa",
  },
  {
    id: "security",
    icon: <ShieldAlert size={28} strokeWidth={1.8} />,
    title: "An ninh và cảnh báo",
    description:
      "Cảm biến chuyển động, cảm biến cửa, báo động khi phát hiện xâm nhập. Gửi thông báo tức thì đến điện thoại.",
    link: "/products?category=cam-bien",
  },
  {
    id: "camera",
    icon: <Camera size={28} strokeWidth={1.8} />,
    title: "Camera thông minh",
    description:
      "Giám sát 24/7, phát hiện chuyển động, nhận diện khuôn mặt, lưu trữ đám mây an toàn.",
    link: "/products?category=camera",
  },
  {
    id: "lock",
    icon: <Lock size={28} strokeWidth={1.8} />,
    title: "Khóa cửa thông minh",
    description:
      "Mở khóa bằng vân tay, mật mã, thẻ từ hoặc smartphone. Theo dõi lịch sử ra vào chi tiết.",
    link: "/products?category=khoa-cua",
  },
  {
    id: "voice",
    icon: <Mic size={28} strokeWidth={1.8} />,
    title: "Điều khiển bằng giọng nói",
    description:
      "Tích hợp Google Assistant, Siri, Alexa — điều khiển toàn bộ ngôi nhà chỉ bằng giọng nói.",
    link: "/products",
  },
  {
    id: "scenarios",
    icon: <Layers size={28} strokeWidth={1.8} />,
    title: "Kịch bản tự động",
    description:
      "Cài đặt kịch bản 'Về nhà', 'Đi ngủ', 'Ra khỏi nhà' — hàng loạt thiết bị tự động theo một chạm.",
    link: "/solutions",
  },
];

const BENEFITS = [
  {
    icon: <Zap size={32} strokeWidth={1.6} />,
    title: "Tiện nghi",
    description:
      "Điều khiển mọi thiết bị trong nhà từ điện thoại hoặc bằng giọng nói, không cần di chuyển.",
  },
  {
    icon: <ShieldAlert size={32} strokeWidth={1.6} />,
    title: "An toàn",
    description:
      "Hệ thống an ninh thông minh, cảnh báo xâm nhập, giám sát từ xa bảo vệ ngôi nhà 24/7.",
  },
  {
    icon: <Lightbulb size={32} strokeWidth={1.6} />,
    title: "Tiết kiệm điện",
    description:
      "Tự động tắt đèn, điều hòa khi không có người, giảm 30–50% chi phí điện năng mỗi tháng.",
  },
  {
    icon: <Layers size={32} strokeWidth={1.6} />,
    title: "Cá nhân hóa",
    description:
      "Mỗi thành viên trong gia đình có kịch bản riêng, ngôi nhà thích ứng với thói quen của bạn.",
  },
];

const SCENARIOS = [
  {
    title: "Kịch bản 'Về nhà'",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    actions: [
      "Mở khóa cửa tự động khi về gần",
      "Bật đèn phòng khách với ánh sáng ấm",
      "Rèm mở 50%, điều hòa bật 26°C",
      "Nhạc nền nhẹ nhàng bật tự động",
    ],
  },
  {
    title: "Kịch bản 'Đi ngủ'",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80",
    actions: [
      "Tắt toàn bộ đèn trong nhà",
      "Rèm đóng hoàn toàn",
      "Điều hòa chuyển sang chế độ ngủ",
      "Cảm biến chuyển động bật chế độ canh gác",
    ],
  },
  {
    title: "Kịch bản 'Ra khỏi nhà'",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
    actions: [
      "Tắt hết đèn và thiết bị không cần thiết",
      "Rèm đóng, điều hòa tắt",
      "Camera và cảm biến chuyển sang chế độ canh gác",
      "Khóa cửa tự động sau 30 giây ra khỏi nhà",
    ],
  },
  {
    title: "Kịch bản 'Xem phim'",
    image:
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&q=80",
    actions: [
      "Đèn phòng khách dimmer xuống 20%",
      "Rèm đóng hoàn toàn",
      "Máy chiếu hoặc TV bật, nguồn âm thanh sẵn sàng",
      "Điều hòa giữ 24°C, chế độ yên tĩnh",
    ],
  },
];

const IMPLEMENTATION_STEPS = [
  {
    step: "01",
    title: "Khảo sát nhu cầu",
    description:
      "Kỹ thuật viên đến tư vấn trực tiếp, lắng nghe yêu cầu và khảo sát thực tế công trình.",
  },
  {
    step: "02",
    title: "Lên phương án",
    description:
      "Thiết kế sơ đồ bố trí thiết bị, lựa chọn giải pháp phù hợp với ngân sách và hiện trạng.",
  },
  {
    step: "03",
    title: "Thi công lắp đặt",
    description:
      "Đội ngũ thi công chuyên nghiệp lắp đặt nhanh chóng, sạch sẽ, không ảnh hưởng sinh hoạt.",
  },
  {
    step: "04",
    title: "Hướng dẫn & bảo hành",
    description:
      "Hướng dẫn sử dụng chi tiết từng tính năng, bảo hành thiết bị và hỗ trợ kỹ thuật dài hạn.",
  },
];

const BRAND_CARDS = [
  {
    name: "Lumi",
    tagline: "Hệ sinh thái Lumi — Thương hiệu Việt, chất lượng quốc tế",
    description:
      "Lumi là thương hiệu nhà thông minh Việt Nam hàng đầu, sản phẩm được phát triển và sản xuất tại Việt Nam theo tiêu chuẩn Châu Âu. Hệ sinh thái Lumi Home được tin dùng tại hàng nghìn công trình từ căn hộ đến biệt thự, văn phòng.",
    color: "emerald",
    colorBg: "bg-emerald-50",
    colorBorder: "border-emerald-200",
    colorText: "text-emerald-700",
    colorAccent: "bg-emerald-600",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    productsHref: "/products/lumi",
    ecosystemHref: "/ecosystem/lumi",
  },
  {
    name: "Aqara",
    tagline: "Hệ sinh thái Aqara — Smart home toàn cầu, Matter-ready",
    description:
      "Aqara là thương hiệu nhà thông minh thuộc tập đoàn Lumiagile, có mặt tại hơn 100 quốc gia. Nổi tiếng với hơn 1.000 thiết bị tương thích Matter, hỗ trợ Apple Home, Google Home, Alexa và SmartThings — phù hợp cho cả người dùng cá nhân lẫn tích hợp chuyên nghiệp.",
    color: "blue",
    colorBg: "bg-blue-50",
    colorBorder: "border-blue-200",
    colorText: "text-blue-700",
    colorAccent: "bg-blue-600",
    image:
      "https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=600&q=80",
    productsHref: "/products/aqara",
    ecosystemHref: "/ecosystem/aqara",
  },
];

// ==================== SECTION COMPONENTS ====================

const SmartHomeHero = () => (
  <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-sky-50 py-16 md:py-24 lg:py-28 overflow-hidden">
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {/* Text */}
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
            <Zap size={14} />
            Giải pháp nhà thông minh
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight mb-5">
            Nhà thông minh cho{" "}
            <span className="text-blue-600">cuộc sống tiện nghi hơn</span>
          </h1>

          <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
            Kết nối và điều khiển đèn, rèm cửa, điều hòa, an ninh và mọi thiết bị
            trong ngôi nhà — chỉ bằng một chạm trên điện thoại hoặc giọng nói.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#solutions"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-6 py-3 transition-colors duration-200 shadow-sm"
            >
              Khám phá giải pháp
              <ArrowRight size={16} />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-xl px-6 py-3 border border-slate-200 transition-colors duration-200"
            >
              <Phone size={16} />
              Tư vấn miễn phí
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-200/50 aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80"
              alt="Không gian nhà thông minh hiện đại"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">8+ năm kinh nghiệm</p>
              <p className="text-xs text-slate-500">1.000+ công trình</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const WhatIsSmartHome = () => (
  <section className="py-16 md:py-20 bg-white">
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Image */}
        <div className="relative rounded-3xl overflow-hidden order-2 lg:order-1">
          <img
            src="https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=800&q=80"
            alt="Công nghệ nhà thông minh"
            className="w-full aspect-[4/3] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-sky-400/10" />
        </div>

        {/* Content */}
        <div className="order-1 lg:order-2">
          <SectionHeader
            badge="Giới thiệu"
            title="Nhà thông minh là gì?"
            subtitle="Nhà thông minh (Smart Home) là ngôi nhà được tích hợp các thiết bị điện tử và công nghệ IoT, cho phép kết nối, tự động hóa và điều khiển từ xa mọi hệ thống trong nhà — từ chiếu sáng, điều hòa, rèm cửa đến an ninh."
            size="md"
          />

          <div className="space-y-4">
            {[
              "Kết nối không dây — không cần đục tường, lắp đặt nhanh",
              "Điều khiển từ smartphone hoặc giọng nói",
              "Tự động hóa theo thời gian, vị trí hoặc cảm biến",
              "Mở rộng linh hoạt theo nhu cầu sử dụng",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2
                  size={18}
                  className="text-blue-600 mt-0.5 shrink-0"
                />
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const SolutionsSection = () => (
  <section id="solutions" className="py-16 md:py-20 bg-slate-50">
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        badge="Giải pháp"
        title="Hệ thống giải pháp toàn diện"
        subtitle="Khám phá các nhóm giải pháp chính giúp biến ngôi nhà của bạn thành không gian sống thông minh, tiện nghi và an toàn."
        size="md"
        align="center"
        className="max-w-2xl mx-auto"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SOLUTIONS.map((solution) => (
          <Link
            key={solution.id}
            to={solution.link}
            className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all duration-200 flex flex-col"
          >
            <div className="w-14 h-14 bg-blue-50 group-hover:bg-blue-100 rounded-2xl flex items-center justify-center mb-4 text-blue-600 transition-colors duration-200">
              {solution.icon}
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors duration-200">
              {solution.title}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed flex-1">
              {solution.description}
            </p>
            <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Tìm hiểu thêm
              <ChevronRight size={14} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const BenefitsSection = () => (
  <section className="py-16 md:py-20 bg-white">
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        badge="Lợi ích"
        title="Tại sao nên đầu tư nhà thông minh?"
        subtitle="Không chỉ là xu hướng công nghệ, nhà thông minh mang lại những giá trị thực tế cho cuộc sống hàng ngày của bạn."
        size="md"
        align="center"
        className="max-w-2xl mx-auto"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {BENEFITS.map((benefit, i) => (
          <div
            key={i}
            className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow duration-200"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600">
              {benefit.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              {benefit.title}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ScenariosSection = () => (
  <section className="py-16 md:py-20 bg-slate-50">
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        badge="Kịch bản"
        title="Cuộc sống tự động hóa"
        subtitle="Chỉ cần kích hoạt một kịch bản, hàng loạt thiết bị trong nhà sẽ hoạt động đồng bộ — tiết kiệm thời gian và mang lại trải nghiệm sống tuyệt vời."
        size="md"
        align="center"
        className="max-w-2xl mx-auto"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SCENARIOS.map((scenario, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-md transition-shadow duration-200 flex flex-col sm:flex-row"
          >
            <div className="sm:w-44 h-44 sm:h-auto shrink-0 overflow-hidden">
              <img
                src={scenario.image}
                alt={scenario.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 p-5">
              <h3 className="text-base font-bold text-slate-800 mb-3">
                {scenario.title}
              </h3>
              <ul className="space-y-2">
                {scenario.actions.map((action, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                    <span className="text-sm text-slate-500 leading-relaxed">
                      {action}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const BrandsSection = () => (
  <section className="py-16 md:py-20 bg-white">
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        badge="Thương hiệu"
        title="Hai hệ sinh thái đáng tin cậy"
        subtitle="Nhat Minh là đại lý ủy quyền của Lumi và Aqara — mang đến đầy đủ giải pháp từ cơ bản đến cao cấp cho mọi không gian."
        size="md"
        align="center"
        className="max-w-2xl mx-auto"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BRAND_CARDS.map((brand) => (
          <div
            key={brand.name}
            className={`rounded-3xl overflow-hidden border ${brand.colorBorder} ${brand.colorBg} flex flex-col`}
          >
            {/* Brand image */}
            <div className="h-48 overflow-hidden">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
              <div className="mb-1">
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${brand.colorText}`}
                >
                  {brand.name}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-3 leading-tight">
                {brand.tagline}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-1">
                {brand.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to={brand.productsHref}
                  className={`inline-flex items-center gap-2 ${brand.colorAccent} hover:opacity-90 text-white font-semibold rounded-xl px-5 py-2.5 text-sm transition-opacity duration-200`}
                >
                  Xem sản phẩm
                  <ArrowRight size={14} />
                </Link>
                <Link
                  to={brand.ecosystemHref}
                  className={`inline-flex items-center gap-2 bg-white border ${brand.colorBorder} ${brand.colorText} font-semibold rounded-xl px-5 py-2.5 text-sm transition-colors duration-200 hover:bg-slate-50`}
                >
                  Tư vấn — Báo giá
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ProcessSection = () => (
  <section className="py-16 md:py-20 bg-slate-50">
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        badge="Quy trình"
        title="Triển khai chuyên nghiệp"
        subtitle="Từ khảo sát đến bàn giao, đội ngũ Nhat Minh đồng hành xuyên suốt để đảm bảo giải pháp hoạt động hoàn hảo."
        size="md"
        align="center"
        className="max-w-2xl mx-auto"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {IMPLEMENTATION_STEPS.map((item, i) => (
          <div key={i} className="relative">
            {/* Connector line */}
            {i < IMPLEMENTATION_STEPS.length - 1 && (
              <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-blue-100 -translate-x-1/2 z-0" />
            )}

            <div className="relative z-10 flex flex-col items-center text-center bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-shadow duration-200">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 text-white font-extrabold text-lg shadow-md shadow-blue-200">
                {item.step}
              </div>
              <h3 className="text-base font-bold text-slate-800 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-16 md:py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-sky-600 relative overflow-hidden">
    {/* Decorative circles */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

    <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
        Bạn đang cần tư vấn giải pháp nhà thông minh?
      </h2>
      <p className="text-blue-100 text-base md:text-lg mb-8 max-w-xl mx-auto">
        Đội ngũ kỹ thuật Nhat Minh sẵn sàng khảo sát, tư vấn và báo giá chi tiết
        — hoàn toàn miễn phí cho mọi công trình.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <a
          href="tel:0876906668"
          className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold rounded-xl px-8 py-3.5 hover:bg-blue-50 transition-colors duration-200 shadow-lg shadow-blue-900/20"
        >
          <Phone size={18} />
          Gọi tư vấn ngay
        </a>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 border-2 border-white/60 text-white font-bold rounded-xl px-8 py-3.5 hover:bg-white/10 transition-colors duration-200"
        >
          Yêu cầu báo giá
          <ArrowRight size={18} />
        </Link>
      </div>

      <p className="mt-6 text-sm text-blue-200">
        Hotline:{" "}
        <a href="tel:0876906668" className="font-semibold underline hover:text-white">
          0876.906.668
        </a>{" "}
        — Kỹ thuật:{" "}
        <a href="tel:0972131477" className="font-semibold underline hover:text-white">
          0972.131.477
        </a>
      </p>
    </div>
  </section>
);

// ==================== PAGE COMPONENT ====================

const SmartHomePage = () => {
  return (
    <div className="min-h-screen">
      <SmartHomeHero />
      <WhatIsSmartHome />
      <SolutionsSection />
      <BenefitsSection />
      <ScenariosSection />
      <BrandsSection />
      <ProcessSection />
      <CTASection />
    </div>
  );
};

export default SmartHomePage;
