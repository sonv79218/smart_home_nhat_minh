import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Lightbulb,
  Ruler,
  Zap,
} from "lucide-react";

// ==================== DATA ====================
const bannerImage = "https://sudospaces.com/lumi/2022/02/z3115361986276-ac2b854e53ddd032d71f1dcef3076389-2048x759.jpeg";
const requiredInfos = [
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Nhu cầu của chủ nhà",
    content:
      "Xác định rõ các giải pháp mong muốn như chiếu sáng, rèm tự động, điều hòa, an ninh để đưa ra số lượng thiết bị phù hợp.",
  },
  {
    icon: <Ruler className="h-6 w-6" />,
    title: "Bản vẽ xây dựng",
    content:
      "Diện tích, số phòng, số tầng và cách bố trí công năng ảnh hưởng trực tiếp đến số lượng công tắc và bộ điều khiển.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Hạ tầng hiện đại",
    content:
      "Kiểm tra hiện trạng điện, mạng, vị trí lắp đặt để đề xuất phương án phù hợp và tối ưu chi phí thi công.",
  },
];

const pricingTabs = ["Chung cư", "Nhà phố", "Biệt thự"];

const pricingPackages = {
  0: [
    {
      name: "Basic",
      price: "19.000.000 đ",
      popular: false,
      features: [
        { text: "Chiếu sáng thông minh", available: true },
        { text: "Điều hòa thông minh", available: true },
        { text: "Bình nóng lạnh thông minh", available: true },
        { text: "Cảm biến thông minh", available: false },
        { text: "Rèm tự động", available: false },
        { text: "Âm thanh đa vùng", available: false },
        { text: "Tưới tự động", available: false },
        { text: "Đèn Dimmer", available: false },
        { text: "An ninh thông minh", available: false },
      ],
    },
    {
      name: "Standard",
      price: "49.000.000 đ",
      popular: true,
      features: [
        { text: "Chiếu sáng thông minh", available: true },
        { text: "Điều hòa thông minh", available: true },
        { text: "Bình nóng lạnh thông minh", available: true },
        { text: "Cảm biến thông minh", available: true },
        { text: "Rèm tự động", available: true },
        { text: "Âm thanh đa vùng", available: false },
        { text: "Tưới tự động", available: false },
        { text: "Đèn Dimmer", available: false },
        { text: "An ninh thông minh", available: false },
      ],
    },
    {
      name: "Premium",
      price: "79.000.000 đ",
      popular: false,
      features: [
        { text: "Chiếu sáng thông minh", available: true },
        { text: "Điều hòa thông minh", available: true },
        { text: "Bình nóng lạnh thông minh", available: true },
        { text: "Cảm biến thông minh", available: true },
        { text: "Rèm tự động", available: true },
        { text: "Âm thanh đa vùng", available: true },
        { text: "Tưới tự động", available: true },
        { text: "Đèn Dimmer", available: true },
        { text: "An ninh thông minh", available: true },
      ],
    },
  ],

  1: [
    {
      name: "Basic",
      price: "35.000.000 đ",
      popular: false,
      features: [
        { text: "Chiếu sáng thông minh", available: true },
        { text: "Điều hòa thông minh", available: true },
        { text: "Bình nóng lạnh thông minh", available: true },
        { text: "Cảm biến thông minh", available: true },
        { text: "Rèm tự động", available: false },
        { text: "Âm thanh đa vùng", available: false },
        { text: "Tưới tự động", available: false },
        { text: "Đèn Dimmer", available: false },
        { text: "An ninh thông minh", available: false },
      ],
    },
    {
      name: "Standard",
      price: "75.000.000 đ",
      popular: true,
      features: [
        { text: "Chiếu sáng thông minh", available: true },
        { text: "Điều hòa thông minh", available: true },
        { text: "Bình nóng lạnh thông minh", available: true },
        { text: "Cảm biến thông minh", available: true },
        { text: "Rèm tự động", available: true },
        { text: "Âm thanh đa vùng", available: false },
        { text: "Tưới tự động", available: false },
        { text: "Đèn Dimmer", available: true },
        { text: "An ninh thông minh", available: true },
      ],
    },
    {
      name: "Premium",
      price: "120.000.000 đ",
      popular: false,
      features: [
        { text: "Chiếu sáng thông minh", available: true },
        { text: "Điều hòa thông minh", available: true },
        { text: "Bình nóng lạnh thông minh", available: true },
        { text: "Cảm biến thông minh", available: true },
        { text: "Rèm tự động", available: true },
        { text: "Âm thanh đa vùng", available: true },
        { text: "Tưới tự động", available: true },
        { text: "Đèn Dimmer", available: true },
        { text: "An ninh thông minh", available: true },
      ],
    },
  ],

  2: [
    {
      name: "Basic",
      price: "65.000.000 đ",
      popular: false,
      features: [
        { text: "Chiếu sáng thông minh", available: true },
        { text: "Điều hòa thông minh", available: true },
        { text: "Bình nóng lạnh thông minh", available: true },
        { text: "Cảm biến thông minh", available: true },
        { text: "Rèm tự động", available: true },
        { text: "Âm thanh đa vùng", available: false },
        { text: "Tưới tự động", available: false },
        { text: "Đèn Dimmer", available: true },
        { text: "An ninh thông minh", available: true },
      ],
    },
    {
      name: "Standard",
      price: "150.000.000 đ",
      popular: true,
      features: [
        { text: "Chiếu sáng thông minh", available: true },
        { text: "Điều hòa thông minh", available: true },
        { text: "Bình nóng lạnh thông minh", available: true },
        { text: "Cảm biến thông minh", available: true },
        { text: "Rèm tự động", available: true },
        { text: "Âm thanh đa vùng", available: true },
        { text: "Tưới tự động", available: true },
        { text: "Đèn Dimmer", available: true },
        { text: "An ninh thông minh", available: true },
      ],
    },
    {
      name: "Premium",
      price: "250.000.000 đ",
      popular: false,
      features: [
        { text: "Chiếu sáng thông minh", available: true },
        { text: "Điều hòa thông minh", available: true },
        { text: "Bình nóng lạnh thông minh", available: true },
        { text: "Cảm biến thông minh", available: true },
        { text: "Rèm tự động", available: true },
        { text: "Âm thanh đa vùng", available: true },
        { text: "Tưới tự động", available: true },
        { text: "Đèn Dimmer", available: true },
        { text: "An ninh thông minh", available: true },
      ],
    },
  ],
};

const whyChooseLumi = {
  title: "Tại sao lại lựa chọn nhà thông minh Lumi",
  description:
    "Lumi là thương hiệu nhà thông minh Việt Nam với hơn 10 năm kinh nghiệm, hệ sinh thái thiết bị đa dạng và đội ngũ kỹ thuật chuyên nghiệp. Giải pháp của Lumi tập trung vào sự tiện nghi, an toàn, tiết kiệm điện năng và khả năng điều khiển tập trung trên ứng dụng di động. Với hơn 5000+ công trình đã hoàn thành trên toàn quốc, Lumi tự tin mang đến trải nghiệm smarthome tốt nhất cho ngôi nhà của bạn.",
  features: [
    "Thiết bị đồng bộ từ đầu đến cuối",
    "Dễ dàng nâng cấp mở rộng",
    "Tối ưu chi phí đầu tư",
    "Hỗ trợ kỹ thuật 24/7",
    "Bảo hành 2 năm chính hãng",
    "Lắp đặt nhanh chóng chuyên nghiệp",
  ],
};

const featuredProject = {
  title: "Nhà của sao",
  type: "Dự án nổi bật",
  img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
};

const projects = [
  {
    title: "Biệt thự phong cách hiện đại",
    type: "Biệt thự",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80",
  },
  {
    title: "Căn hộ cao cấp view thành phố",
    type: "Chung cư",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
  },
  {
    title: "Nhà phố tối giản",
    type: "Nhà phố",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
  },
];

const smartSolutions = [
  {
    title: "Chiếu sáng thông minh",
    desc: "Điều khiển đèn theo ngữ cảnh, lịch trình hoặc cảm biến hiện diện. Tiết kiệm đến 40% chi phí điện.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
  },
  {
    title: "Rèm cửa tự động",
    desc: "Quản lý ánh sáng tự nhiên, đóng mở rèm bằng app, giọng nói hoặc lịch hẹn thông minh.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
  },
  {
    title: "Điều hòa không khí",
    desc: "Bật tắt điều hòa từ xa, thiết lập nhiệt độ theo thói quen và tối ưu điện năng tiêu thụ.",
    img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80",
  },
  {
    title: "An ninh chống trộm",
    desc: "Kết hợp cảm biến cửa, cảm biến chuyển động, camera và cảnh báo tức thời qua điện thoại.",
    img: "https://images.unsplash.com/photo-1558002038-1055907df827?w=500&q=80",
  },
];

const faqs = [
  {
    question: "Chi phí nhà thông minh bao nhiêu?",
    answer:
      "Chi phí nhà thông minh dao động từ 19 triệu đến 79 triệu tùy theo gói giải pháp và quy mô công trình. Gói Basic phù hợp căn hộ nhỏ, gói Standard cho gia đình muốn tự động hóa nhiều khu vực, và gói Premium trọn bộ tiện nghi cao cấp.",
  },
  {
    question: "Chung cư có lắp được không?",
    answer:
      "Hoàn toàn có thể lắp đặt nhà thông minh cho chung cư. Lumi có các giải pháp riêng cho căn hộ chung cư với việc không cần đục đẽo hay thay đổi hệ thống điện hiện tại.",
  },
  {
    question: "Có cần đi lại dây điện không?",
    answer:
      "Với giải pháp của Lumi, bạn không cần đi lại dây điện. Hệ thống hoạt động trên nền tảng dây điện hiện có thông qua các module thông minh lắp đặt tại công tắc và ổ cắm.",
  },
  {
    question: "Bảo hành bao lâu?",
    answer:
      "Tất cả thiết bị Lumi được bảo hành chính hãng 24 tháng. Đội ngũ kỹ thuật hỗ trợ 24/7 và có các trung tâm bảo hành tại nhiều tỉnh thành trên cả nước.",
  },
];

// ==================== COMPONENTS ====================
const CheckIcon = ({ active }) => (
  <span
    className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-none text-xs font-bold ${
      active ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-400"
    }`}
  >
    {active ? "✓" : "×"}
  </span>
);

const FAQItem = ({ faq, isOpen, onToggle }) => (
  <div className="border-b border-gray-200">
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between py-5 text-left"
    >
      <span className="text-base font-semibold text-gray-900 md:text-lg">
        {faq.question}
      </span>
      <span
        className={`ml-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-none bg-gray-100 text-gray-600 transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
      >
        ▼
      </span>
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ${
        isOpen ? "max-h-96 pb-5" : "max-h-0"
      }`}
    >
      <p className="text-sm leading-relaxed text-gray-600 md:text-base">
        {faq.answer}
      </p>
    </div>
  </div>
);

// ==================== MAIN COMPONENT ====================
const LumiPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const activePackages = pricingPackages[activeTab];



  return (
    <div className="bg-white min-h-screen">
      {/* ==================== SECTION 1: HERO ==================== */}
<section className="relative min-h-[650px] overflow-hidden">
  {/* Ảnh nền */}
  <img
    src={bannerImage}
    alt="Lumi Smart Home"
    className="absolute inset-0 h-full w-full object-cover"
  />
</section>

      {/* ==================== SECTION 2: GIỚI THIỆU ==================== */}
      <section className="mx-auto max-w-[1000px] px-4 py-16">
        <h2 className="text-center text-2xl font-extrabold text-gray-900 md:text-3xl">
          Báo giá nhà thông minh (Update 2025)
        </h2>
        <p className="mt-6 text-center text-base leading-8 text-gray-600 md:text-lg">
          Báo giá giải pháp nhà thông minh là một trong những bước quan trọng
          khi tiến hành thiết kế nội thất smarthome. Việc nắm rõ chi phí sẽ giúp
          gia chủ chủ động trong việc lên kế hoạch tài chính, lựa chọn giải pháp
          phù hợp với nhu cầu và không gian sống của mình. Lumi cung cấp báo giá
          chi tiết, minh bạch cho từng hạng mục thiết bị và công lắp đặt, giúp
          khách hàng yên tâm từ đầu đến cuối.
        </p>
      </section>

      {/* ==================== SECTION 3: 3 THÔNG TIN CẦN CÓ ==================== */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-center text-xl font-extrabold text-gray-900 md:text-2xl lg:text-3xl">
            3 thông tin chính cần có để lên một báo giá nhà thông minh chuẩn xác
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {requiredInfos.map((info, index) => (
              <div
                key={index}
                className="group rounded-none border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-none text-2xl"
                  style={{ backgroundColor: "#0B5ED7" + "15" }}
                >
                  {info.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{info.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {info.content}
                </p>
                <Link
                  to="/contact"
                  className="mt-5 inline-block text-sm font-bold transition hover:underline"
                  style={{ color: "#0B5ED7" }}
                >
                  Liên hệ ngay →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SECTION 4: BẢNG GIÁ ==================== */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center text-xl font-extrabold text-gray-900 md:text-2xl lg:text-3xl">
            Dự toán báo giá nhà thông minh Lumi
          </h2>

          {/* Tabs */}
          <div className="mb-10 flex justify-center">
            <div className="inline-flex rounded-none bg-gray-100 p-1">
              {pricingTabs.map((tab, index) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(index)}
                  className={`rounded-lg px-6 py-2 text-sm font-semibold transition-all duration-200 ${
                    activeTab === index
                      ? "bg-white text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  style={activeTab === index ? { backgroundColor: "#0B5ED7" } : {}}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Packages */}
          <div className="grid gap-8 lg:grid-cols-3 lg:items-stretch">
           {activePackages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative flex flex-col rounded-none border-2 bg-white p-8 shadow-lg transition-all duration-300 ${
                  pkg.popular
                    ? "scale-105 border-blue-500 shadow-xl"
                    : "border-gray-200"
                }`}
                style={pkg.popular ? { borderColor: "#0B5ED7" } : {}}
              >
                {pkg.popular && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-none px-4 py-1 text-xs font-bold text-white"
                    style={{ backgroundColor: "#0B5ED7" }}
                  >
                    Phổ biến
                  </span>
                )}

                <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                <div
                  className="mt-3 text-3xl font-extrabold"
                  style={{ color: "#0B5ED7" }}
                >
                  {pkg.price}
                </div>

                <div className="mt-6 flex-1 space-y-3">
                  {pkg.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-sm text-gray-700"
                    >
                      <CheckIcon active={feature.available} />
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="mt-8 w-full rounded-none py-3 text-sm font-bold transition-all"
                  style={
                    pkg.popular
                      ? { backgroundColor: "#0B5ED7", color: "white" }
                      : { backgroundColor: "#0B5ED7", color: "white" }
                  }
                >
                  Hẹn lịch tư vấn
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SECTION 5: TẠI SAO CHỌN LUMI ==================== */}
      <section
        className="py-16"
        style={{ backgroundColor: "#0F172A" }}
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:items-center lg:gap-8">
          {/* Left */}
          <div className="text-white">
            <h2 className="text-2xl font-extrabold md:text-3xl">
              {whyChooseLumi.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray-300">
              {whyChooseLumi.description}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {whyChooseLumi.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span style={{ color: "#10B981" }}>✓</span>
                  <span className="text-sm text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-8 rounded-none px-6 py-3 text-sm font-bold transition hover:opacity-90"
              style={{ backgroundColor: "#10B981", color: "white" }}
            >
              Xem thêm
            </button>
          </div>

          {/* Right - Image */}
          <div className="relative overflow-hidden rounded-none">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
              alt="Lumi Smart Devices"
              className="h-80 w-full object-cover lg:h-96"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* ==================== SECTION 6: CTA ==================== */}
      <section
        className="py-16"
        style={{ background: "linear-gradient(135deg, #10B981 0%, #059669 100%)" }}
      >
        <div className="mx-auto max-w-4xl px-4 text-center text-white">
          <h2 className="text-2xl font-extrabold md:text-3xl">
            Hẹn lịch tư vấn cùng đội ngũ chuyên gia của Lumi Smarthome
          </h2>
          <p className="mt-4 text-base text-emerald-100">
            Đội ngũ kỹ thuật viên giàu kinh nghiệm sẵn sàng hỗ trợ bạn 24/7
          </p>
          <button
            type="button"
            className="mt-8 rounded-none bg-white px-8 py-4 text-base font-bold transition hover:bg-gray-50 hover:shadow-xl"
            style={{ color: "#10B981" }}
          >
            Hẹn lịch ngay
          </button>
        </div>
      </section>

      {/* ==================== SECTION 7: DỰ ÁN TIÊU BIỂU ==================== */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-10 text-center text-xl font-extrabold text-gray-900 md:text-2xl lg:text-3xl">
            Dự án tiêu biểu
          </h2>

          {/* Featured project */}
          <Link
            to="/projects"
            className="group relative mb-8 block overflow-hidden rounded-none"
          >
            <img
              src={featuredProject.img}
              alt={featuredProject.title}
              className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <span
                className="inline-block rounded-none px-3 py-1 text-xs font-bold"
                style={{ backgroundColor: "#10B981" }}
              >
                {featuredProject.type}
              </span>
              <h3 className="mt-3 text-2xl font-extrabold">
                {featuredProject.title}
              </h3>
            </div>
          </Link>

          {/* 3 project cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project, idx) => (
              <Link
                key={idx}
                to="/projects"
                className="group overflow-hidden rounded-none bg-white shadow-lg"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "#64748B" }}
                  >
                    {project.type}
                  </span>
                  <h3 className="mt-1 text-base font-bold text-gray-900">
                    {project.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SECTION 8: GIẢI PHÁP THÔNG MINH ==================== */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-10 text-center text-xl font-extrabold text-gray-900 md:text-2xl lg:text-3xl">
            Hệ thống thông minh cho ngôi nhà của bạn
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {smartSolutions.map((solution, idx) => (
              <div
                key={idx}
                className="group relative h-72 overflow-hidden rounded-none shadow-lg"
              >
                <img
                  src={solution.img}
                  alt={solution.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-base font-bold">{solution.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-gray-300">
                    {solution.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ==================== SECTION 11: CTA CUỐI ==================== */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #0B5ED7 0%, #0F172A 100%)" }}
      >
        <div className="mx-auto max-w-4xl px-4 text-center text-white">
          <h2 className="text-2xl font-extrabold md:text-3xl">
            Sẵn sàng nâng cấp ngôi nhà của bạn?
          </h2>
          <p className="mt-4 text-base text-blue-100">
            Liên hệ ngay để được tư vấn miễn phí và nhận báo giá chi tiết
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              className="rounded-none bg-white px-8 py-4 text-base font-bold transition hover:bg-gray-50"
              style={{ color: "#0B5ED7" }}
            >
              Nhận báo giá
            </button>
            <button
              type="button"
              className="rounded-none border-2 border-white px-8 py-4 text-base font-bold transition hover:bg-white/10"
            >
              Liên hệ ngay
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LumiPage;
