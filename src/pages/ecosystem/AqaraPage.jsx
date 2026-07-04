import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  House,
  DraftingCompass,
  Wallet,
} from "lucide-react";
import PackageCard from "./aqara/PackageCard";
import EstimateSummary from "./aqara/EstimateSummary";
import {
  pricingPackages,
  housingTabs,
  packageKeys,
  defaultSelection,
} from "./aqara/aqaraPricingData";

// ==================== DATA ====================
const bannerImage = "https://aqaravn.com/opengraph-image";
const requiredInfos = [
  {
    icon: <House className="h-6 w-6" />,
    title: "Nhu cầu sử dụng",
    content:
      "Xác định các khu vực cần tự động hóa như chiếu sáng, điều hòa, rèm cửa, cảm biến, camera, khóa cửa và hệ thống an ninh.",
  },
  {
    icon: <DraftingCompass className="h-6 w-6" />,
    title: "Bản vẽ hoặc hiện trạng",
    content:
      "Diện tích, số tầng, số phòng và hiện trạng công trình sẽ quyết định số lượng thiết bị và phương án triển khai.",
  },
  {
    icon: <Wallet className="h-6 w-6" />,
    title: "Ngân sách đầu tư",
    content:
      "Ngân sách sẽ giúp lựa chọn hệ sinh thái Aqara phù hợp từ cơ bản đến cao cấp.",
  },
];

const whyChooseAqara = {
  title: "Tại sao nên lựa chọn Aqara?",
  description:
    "Aqara là thương hiệu nhà thông minh hàng đầu thế giới với hệ sinh thái hơn 1.000 thiết bị, hỗ trợ Matter, Apple Home, Google Home, Amazon Alexa và Samsung SmartThings. Aqara nổi bật với khả năng tự động hóa thông minh, độ ổn định cao và thiết kế hiện đại.",
  features: [
    "Chuẩn Matter",
    "Zigbee 3.0 ổn định",
    "Apple Home chính hãng",
    "Google Home",
    "Amazon Alexa",
    "Samsung SmartThings",
    "Tự động hóa mạnh mẽ",
    "Thiết kế cao cấp",
    "Dễ mở rộng",
    "Tiết kiệm điện",
  ],
};

const featuredProject = {
  title: "Công trình Aqara tiêu biểu",
  type: "Dự án tiêu biểu",
  img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
};

const projects = [
  {
    title: "Căn hộ cao cấp Aqara",
    type: "Căn hộ cao cấp",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
  },
  {
    title: "Biệt thự tự động hóa",
    type: "Biệt thự",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80",
  },
  {
    title: "Văn phòng thông minh",
    type: "Văn phòng",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
  },
];

const smartSolutions = [
  {
    title: "Chiếu sáng thông minh",
    desc: "Điều khiển đèn theo ngữ cảnh, lịch trình hoặc cảm biến hiện diện. Tích hợp Apple Home và Google Home.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
  },
  {
    title: "Rèm tự động",
    desc: "Quản lý ánh sáng tự nhiên, đóng mở rèm bằng app, giọng nói hoặc lịch hẹn thông minh.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
  },
  {
    title: "Camera Aqara",
    desc: "Giám sát an ninh thông minh với phát hiện chuyển động, nhận diện khuôn mặt và lưu trữ đám mây.",
    img: "https://images.unsplash.com/photo-1558002038-1055907df827?w=500&q=80",
  },
  {
    title: "Khóa cửa thông minh",
    desc: "Mở khóa bằng vân tay, mật khẩu, thẻ hoặc app. Tích hợp chuông cửa và camera trước cửa.",
    img: "https://images.unsplash.com/photo-1558002038-1055907df827?w=500&q=80",
  },
];


// ==================== COMPONENTS ====================
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
const AqaraPage = () => {
  const [activeTab, setActiveTab] = useState(housingTabs[0].key);
  const [openFaq, setOpenFaq] = useState(null);

  // Selection state is keyed by `${housingType}:${packageKey}` so each
  // (loại nhà, gói) combo keeps its own checkbox choices.
  const [selectedItems, setSelectedItems] = useState(() => {
    const initial = {};
    for (const tab of housingTabs) {
      for (const pkgKey of packageKeys) {
        initial[`${tab.key}:${pkgKey}`] = new Set(defaultSelection[pkgKey]);
      }
    }
    return initial;
  });
  const [selectedPackage, setSelectedPackage] = useState(() => {
    // Initialize every tab so selectedPackage[tabKey] is always defined.
    const initial = {};
    for (const tab of housingTabs) {
      initial[tab.key] = packageKeys[1]; // default to "Smart"
    }
    return initial;
  });

  const handleFaqToggle = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const toggleDevice = (pkgKey, deviceId) => {
    const key = `${activeTab}:${pkgKey}`;
    setSelectedItems((prev) => {
      const nextSet = new Set(prev[key]);
      if (nextSet.has(deviceId)) nextSet.delete(deviceId);
      else nextSet.add(deviceId);
      return { ...prev, [key]: nextSet };
    });
  };

  const handleSelectPackage = (pkgKey) => {
    setSelectedPackage((prev) => ({ ...prev, [activeTab]: pkgKey }));
  };

  const activeTabPackages = pricingPackages[activeTab];
  const activePkgKey = selectedPackage[activeTab] ?? packageKeys[0];

  // Pre-compute totals per package so cards and the summary share one source of truth.
  const packageTotals = useMemo(() => {
    const totals = {};
    for (const pkgKey of packageKeys) {
      const ids = selectedItems[`${activeTab}:${pkgKey}`];
      totals[pkgKey] = activeTabPackages[pkgKey].devices
        .filter((d) => ids.has(d.id))
        .reduce((sum, d) => sum + d.price, 0);
    }
    return totals;
  }, [activeTab, activeTabPackages, selectedItems]);

  const selectedPkg = activeTabPackages[activePkgKey];
  const selectedDeviceIds = selectedItems[`${activeTab}:${activePkgKey}`] ?? new Set();
  const selectedDevices = selectedPkg
    ? selectedPkg.devices.filter((d) => selectedDeviceIds.has(d.id))
    : [];

  return (
    <div className="bg-white min-h-screen">
      {/* ==================== SECTION 1: HERO ==================== */}
      <section className="relative min-h-[650px] overflow-hidden">
        {/* Ảnh nền */}
        <img
          src={bannerImage}
          alt="Aqara Smart Home"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </section>

      {/* ==================== SECTION 2: GIỚI THIỆU ==================== */}
      <section className="mx-auto max-w-[1000px] px-4 py-16">
        <h2 className="text-center text-2xl font-extrabold text-gray-900 md:text-3xl">
          Báo giá nhà thông minh Aqara
        </h2>
        <p className="mt-6 text-center text-base leading-8 text-gray-600 md:text-lg">
          Giải pháp nhà thông minh Aqara chuẩn quốc tế với hệ sinh thái Zigbee, Matter và Apple Home. Điều khiển thông minh, tự động hóa mạnh mẽ và khả năng mở rộng linh hoạt cho mọi ngôi nhà.
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
                  style={{ backgroundColor: "#2563EB" + "15" }}
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
                  style={{ color: "#2563EB" }}
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
            Dự toán báo giá nhà thông minh Aqara
          </h2>

          {/* Tabs */}
          <div className="mb-10 flex justify-center">
            <div className="inline-flex rounded-none bg-gray-100 p-1">
              {housingTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`rounded-lg px-6 py-2 text-sm font-semibold transition-all duration-200 ${
                    activeTab === tab.key
                      ? "bg-white text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  style={activeTab === tab.key ? { backgroundColor: "#2563EB" } : {}}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Packages */}
          <div className="grid gap-8 lg:grid-cols-3 lg:items-stretch">
            {packageKeys.map((pkgKey) => (
              <PackageCard
                key={pkgKey}
                pkg={activeTabPackages[pkgKey]}
                selectedIds={selectedItems[`${activeTab}:${pkgKey}`]}
                total={packageTotals[pkgKey]}
                isActive={activePkgKey === pkgKey}
                onSelect={() => handleSelectPackage(pkgKey)}
                onToggleDevice={(id) => toggleDevice(pkgKey, id)}
              />
            ))}
          </div>

          {/* Estimate Summary */}
          <EstimateSummary
            pkg={selectedPkg}
            selectedDevices={selectedDevices}
            total={packageTotals[activePkgKey]}
          />
        </div>
      </section>

      {/* ==================== SECTION 5: TẠI SAO CHỌN AQARA ==================== */}
      <section
        className="py-16"
        style={{ backgroundColor: "#1E3A8A" }}
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:items-center lg:gap-8">
          {/* Left */}
          <div className="text-white">
            <h2 className="text-2xl font-extrabold md:text-3xl">
              {whyChooseAqara.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray-300">
              {whyChooseAqara.description}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {whyChooseAqara.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span style={{ color: "#3B82F6" }}>✓</span>
                  <span className="text-sm text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-8 rounded-none px-6 py-3 text-sm font-bold transition hover:opacity-90"
              style={{ backgroundColor: "#3B82F6", color: "white" }}
            >
              Xem thêm
            </button>
          </div>

          {/* Right - Image */}
          <div className="relative overflow-hidden rounded-none">
            <img
              src="https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80"
              alt="Aqara Smart Devices"
              className="h-80 w-full object-cover lg:h-96"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* ==================== SECTION 6: CTA ==================== */}
      <section
        className="py-16"
        style={{ background: "linear-gradient(135deg, #2563EB 0%, #1E3A8A 100%)" }}
      >
        <div className="mx-auto max-w-4xl px-4 text-center text-white">
          <h2 className="text-2xl font-extrabold md:text-3xl">
            Trải nghiệm nhà thông minh chuẩn quốc tế với Aqara
          </h2>
          <p className="mt-4 text-base text-blue-100">
            Đội ngũ chuyên gia Aqara sẵn sàng tư vấn và triển khai giải pháp phù hợp với ngôi nhà của bạn
          </p>
          <button
            type="button"
            className="mt-8 rounded-none bg-white px-8 py-4 text-base font-bold transition hover:bg-gray-50 hover:shadow-xl"
            style={{ color: "#2563EB" }}
          >
            Nhận báo giá
          </button>
        </div>
      </section>

      {/* ==================== SECTION 7: DỰ ÁN TIÊU BIỂU ==================== */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-10 text-center text-xl font-extrabold text-gray-900 md:text-2xl lg:text-3xl">
            Công trình Aqara tiêu biểu
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
                style={{ backgroundColor: "#3B82F6" }}
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
            Giải pháp nhà thông minh Aqara
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
        style={{ background: "linear-gradient(135deg, #2563EB 0%, #1E3A8A 100%)" }}
      >
        <div className="mx-auto max-w-4xl px-4 text-center text-white">
          <h2 className="text-2xl font-extrabold md:text-3xl">
            Sẵn sàng nâng cấp ngôi nhà cùng Aqara?
          </h2>
          <p className="mt-4 text-base text-blue-100">
            Liên hệ ngay để được tư vấn miễn phí và nhận báo giá chi tiết
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              className="rounded-none bg-white px-8 py-4 text-base font-bold transition hover:bg-gray-50"
              style={{ color: "#2563EB" }}
            >
              Nhận báo giá
            </button>
            <button
              type="button"
              className="rounded-none border-2 border-white px-8 py-4 text-base font-bold transition hover:bg-white/10"
            >
              Liên hệ tư vấn
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AqaraPage;