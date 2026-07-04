import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Lightbulb, Home, Wallet } from "lucide-react";
import PackageCard from "./aqara/PackageCard";
import EstimateSummary from "./aqara/EstimateSummary";
import {
  pricingPackages,
  housingTabs,
  packageKeys,
  defaultSelection,
} from "./hunonic/hunonicPricingData";

const theme = {
  primary: "#16A34A",
  borderClass: "border-green-600",
  accentClass: "accent-green-600",
  textClass: "text-green-600",
};

const bannerImage = "https://thaihungsmarthome.com/wp-content/uploads/2026/05/1779360945602_1070054269534547164_1070054269534547164_075272239e677ba506fafa5d503026e5-1536x716.jpg";

const requiredInfos = [
  { icon: <Lightbulb className="h-6 w-6" />, title: "Nhu cầu sử dụng", content: "Xác định các thiết bị cần điều khiển như đèn, điều hòa, bình nóng lạnh, cửa cuốn, cổng, rèm, camera..." },
  { icon: <Home className="h-6 w-6" />, title: "Hiện trạng công trình", content: "Nhà đang xây, đã hoàn thiện hay đang sử dụng sẽ quyết định phương án thi công phù hợp." },
  { icon: <Wallet className="h-6 w-6" />, title: "Ngân sách", content: "Dựa vào ngân sách để lựa chọn gói giải pháp phù hợp và tối ưu chi phí đầu tư." },
];

const whyChooseHunonic = {
  title: "Tại sao nên lựa chọn Hunonic?",
  description: "Hunonic là thương hiệu nhà thông minh Việt Nam tập trung vào giải pháp không dây, dễ lắp đặt, giá thành hợp lý và khả năng mở rộng linh hoạt.",
  features: ["Không cần đi lại dây điện", "Lắp đặt trong ngày", "Điều khiển từ xa", "Hỗ trợ Google Assistant", "Hỗ trợ Alexa", "Máy chủ tại Việt Nam", "Bảo hành chính hãng", "Dễ nâng cấp"],
};

const featuredProject = { title: "Công trình tiêu biểu", type: "Dự án tiêu biểu", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" };

const projects = [
  { title: "Nhà phố thông minh", type: "Nhà phố", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80" },
  { title: "Villa tự động hóa", type: "Villa", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80" },
  { title: "Quán Cafe thông minh", type: "Quán Cafe", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80" },
];

const smartSolutions = [
  { title: "Công tắc thông minh", desc: "Điều khiển đèn theo ngữ cảnh, lịch trình hoặc cảm biến hiện diện. Tiết kiệm đến 40% chi phí điện.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80" },
  { title: "Ổ cắm thông minh", desc: "Quản lý nguồn điện từ xa, lập lịch tự động và theo dõi mức tiêu thụ năng lượng theo thời gian thực.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80" },
  { title: "Bình nóng lạnh", desc: "Bật tắt, hẹn giờ và điều chỉnh nhiệt độ bình nóng lạnh từ xa thông qua ứng dụng Hunonic.", img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80" },
  { title: "Điều hòa", desc: "Điều khiển điều hòa từ xa, đặt nhiệt độ theo thói quen và tối ưu hóa mức tiêu thụ điện.", img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80" },
];

const faqs = [
  { question: "Hunonic có cần Internet không?", answer: "Hệ thống Hunonic hoạt động ổn định trên mạng Wi-Fi gia đình để điều khiển từ xa qua app. Một số chức năng cơ bản có thể hoạt động ngoại tuyến khi mạng mất." },
  { question: "Có phải đi lại dây điện không?", answer: "Không. Hunonic sử dụng giải pháp không dây, lắp đặt trực tiếp lên công tắc và thiết bị hiện có mà không cần đục đẽo hay đi lại dây điện." },
  { question: "Nhà đang ở có lắp được không?", answer: "Có. Hunonic phù hợp với cả nhà mới và nhà đang sử dụng. Thiết kế không dây giúp lắp đặt nhanh, không gây ồn ào và không cần sửa chữa lớn." },
  { question: "Có điều khiển bằng giọng nói không?", answer: "Có. Hunonic hỗ trợ điều khiển bằng giọng nói qua Google Assistant và Alexa, giúp bạn quản lý nhà thông minh dễ dàng hơn." },
  { question: "Có dùng Google Assistant không?", answer: "Có. Bạn có thể tích hợp Hunonic với Google Assistant để điều khiển thiết bị bằng giọng nói hoặc đặt lịch tự động hóa." },
  { question: "Có bảo hành bao lâu?", answer: "Tất cả thiết bị Hunonic được bảo hành chính hãng 24 tháng. Đội ngũ kỹ thuật hỗ trợ tư vấn và xử lý sự cố nhanh chóng." },
];

const FAQItem = ({ faq, isOpen, onToggle }) => (
  <div className="border-b border-gray-200">
    <button type="button" onClick={onToggle} className="flex w-full items-center justify-between py-5 text-left">
      <span className="text-base font-semibold text-gray-900 md:text-lg">{faq.question}</span>
      <span className={`ml-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-none bg-gray-100 text-gray-600 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>▼</span>
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 pb-5" : "max-h-0"}`}>
      <p className="text-sm leading-relaxed text-gray-600 md:text-base">{faq.answer}</p>
    </div>
  </div>
);

const HunonicPage = () => {
  const [activeTab, setActiveTab] = useState(housingTabs[0].key);
  const [openFaq, setOpenFaq] = useState(null);

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
    const initial = {};
    for (const tab of housingTabs) {
      initial[tab.key] = packageKeys[1];
    }
    return initial;
  });

  const handleFaqToggle = (index) => setOpenFaq(openFaq === index ? null : index);

  const toggleDevice = (pkgKey, deviceId) => {
    const key = `${activeTab}:${pkgKey}`;
    setSelectedItems((prev) => {
      const nextSet = new Set(prev[key]);
      if (nextSet.has(deviceId)) nextSet.delete(deviceId);
      else nextSet.add(deviceId);
      return { ...prev, [key]: nextSet };
    });
  };

  const handleSelectPackage = (pkgKey) => setSelectedPackage((prev) => ({ ...prev, [activeTab]: pkgKey }));

  const activeTabPackages = pricingPackages[activeTab];
  const activePkgKey = selectedPackage[activeTab] ?? packageKeys[0];

  const packageTotals = useMemo(() => {
    const totals = {};
    for (const pkgKey of packageKeys) {
      const ids = selectedItems[`${activeTab}:${pkgKey}`];
      totals[pkgKey] = activeTabPackages[pkgKey].devices.filter((d) => ids.has(d.id)).reduce((sum, d) => sum + d.price, 0);
    }
    return totals;
  }, [activeTab, activeTabPackages, selectedItems]);

  const selectedPkg = activeTabPackages[activePkgKey];
  const selectedDeviceIds = selectedItems[`${activeTab}:${activePkgKey}`] ?? new Set();
  const selectedDevices = selectedPkg ? selectedPkg.devices.filter((d) => selectedDeviceIds.has(d.id)) : [];

  return (
    <div className="bg-white min-h-screen">
      <section className="relative min-h-[650px] overflow-hidden">
        <img src={bannerImage} alt="Hunonic Smart Home" className="absolute inset-0 h-full w-full object-cover" />
      </section>

      <section className="mx-auto max-w-[1000px] px-4 py-16">
        <h2 className="text-center text-2xl font-extrabold text-gray-900 md:text-3xl">Báo giá nhà thông minh Hunonic</h2>
        <p className="mt-6 text-center text-base leading-8 text-gray-600 md:text-lg">
          Giải pháp nhà thông minh không dây Hunonic giúp điều khiển chiếu sáng, điều hòa, bình nóng lạnh, cửa cuốn, cổng và nhiều thiết bị khác ngay trên điện thoại. Phù hợp cả nhà mới và nhà đang sử dụng.
        </p>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-center text-xl font-extrabold text-gray-900 md:text-2xl lg:text-3xl">3 thông tin chính cần có để lên một báo giá nhà thông minh chuẩn xác</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {requiredInfos.map((info, index) => (
              <div key={index} className="group rounded-none border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-none text-2xl" style={{ backgroundColor: "#16A34A" + "15" }}>{info.icon}</div>
                <h3 className="text-lg font-bold text-gray-900">{info.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{info.content}</p>
                <Link to="/contact" className="mt-5 inline-block text-sm font-bold transition hover:underline" style={{ color: "#16A34A" }}>Liên hệ ngay →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center text-xl font-extrabold text-gray-900 md:text-2xl lg:text-3xl">Dự toán báo giá nhà thông minh Hunonic</h2>
          <div className="mb-10 flex justify-center">
            <div className="inline-flex rounded-none bg-gray-100 p-1">
              {housingTabs.map((tab) => (
                <button key={tab.key} type="button" onClick={() => setActiveTab(tab.key)} className={`rounded-lg px-6 py-2 text-sm font-semibold transition-all duration-200 ${activeTab === tab.key ? "bg-white text-white shadow-md" : "text-gray-600 hover:text-gray-900"}`} style={activeTab === tab.key ? { backgroundColor: theme.primary } : {}}>{tab.label}</button>
              ))}
            </div>
          </div>
          <div className="grid gap-8 lg:grid-cols-3 lg:items-stretch">
            {packageKeys.map((pkgKey) => (
              <PackageCard key={pkgKey} pkg={activeTabPackages[pkgKey]} selectedIds={selectedItems[`${activeTab}:${pkgKey}`]} total={packageTotals[pkgKey]} isActive={activePkgKey === pkgKey} onSelect={() => handleSelectPackage(pkgKey)} onToggleDevice={(id) => toggleDevice(pkgKey, id)} theme={theme} />
            ))}
          </div>
          <EstimateSummary pkg={selectedPkg} selectedDevices={selectedDevices} total={packageTotals[activePkgKey]} theme={theme} />
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: "#14532D" }}>
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:items-center lg:gap-8">
          <div className="text-white">
            <h2 className="text-2xl font-extrabold md:text-3xl">{whyChooseHunonic.title}</h2>
            <p className="mt-5 text-base leading-relaxed text-gray-300">{whyChooseHunonic.description}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {whyChooseHunonic.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2"><span style={{ color: "#22C55E" }}>✓</span><span className="text-sm text-gray-300">{feature}</span></div>
              ))}
            </div>
            <button type="button" className="mt-8 rounded-none px-6 py-3 text-sm font-bold transition hover:opacity-90" style={{ backgroundColor: "#22C55E", color: "white" }}>Xem thêm</button>
          </div>
          <div className="relative overflow-hidden rounded-none">
            <img src="https://images.unsplash.com/photo-1558002038-1055907df827?w=600&q=80" alt="Hunonic Smart Devices" className="h-80 w-full object-cover lg:h-96" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: "linear-gradient(135deg, #16A34A 0%, #14532D 100%)" }}>
        <div className="mx-auto max-w-4xl px-4 text-center text-white">
          <h2 className="text-2xl font-extrabold md:text-3xl">Trải nghiệm giải pháp nhà thông minh không dây từ Hunonic</h2>
          <p className="mt-4 text-base text-green-100">Đội ngũ chuyên gia Hunonic sẵn sàng tư vấn và triển khai giải pháp phù hợp với ngôi nhà của bạn</p>
          <button type="button" className="mt-8 rounded-none bg-white px-8 py-4 text-base font-bold transition hover:bg-gray-50 hover:shadow-xl" style={{ color: "#16A34A" }}>Nhận báo giá</button>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-10 text-center text-xl font-extrabold text-gray-900 md:text-2xl lg:text-3xl">Công trình tiêu biểu</h2>
          <Link to="/projects" className="group relative mb-8 block overflow-hidden rounded-none">
            <img src={featuredProject.img} alt={featuredProject.title} className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <span className="inline-block rounded-none px-3 py-1 text-xs font-bold" style={{ backgroundColor: "#22C55E" }}>{featuredProject.type}</span>
              <h3 className="mt-3 text-2xl font-extrabold">{featuredProject.title}</h3>
            </div>
          </Link>
          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project, idx) => (
              <Link key={idx} to="/projects" className="group overflow-hidden rounded-none bg-white shadow-lg">
                <div className="h-48 overflow-hidden"><img src={project.img} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" /></div>
                <div className="p-5"><span className="text-xs font-semibold" style={{ color: "#64748B" }}>{project.type}</span><h3 className="mt-1 text-base font-bold text-gray-900">{project.title}</h3></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-10 text-center text-xl font-extrabold text-gray-900 md:text-2xl lg:text-3xl">Giải pháp nhà thông minh Hunonic</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {smartSolutions.map((solution, idx) => (
              <div key={idx} className="group relative h-72 overflow-hidden rounded-none shadow-lg">
                <img src={solution.img} alt={solution.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-base font-bold">{solution.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-gray-300">{solution.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-10 text-center text-xl font-extrabold text-gray-900 md:text-2xl lg:text-3xl">Câu hỏi thường gặp</h2>
          <div className="rounded-none bg-white p-6 shadow-lg md:p-8">
            {faqs.map((faq, idx) => (<FAQItem key={idx} faq={faq} isOpen={openFaq === idx} onToggle={() => handleFaqToggle(idx)} />))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: "linear-gradient(135deg, #16A34A 0%, #14532D 100%)" }}>
        <div className="mx-auto max-w-4xl px-4 text-center text-white">
          <h2 className="text-2xl font-extrabold md:text-3xl">Sẵn sàng nâng cấp ngôi nhà cùng Hunonic?</h2>
          <p className="mt-4 text-base text-green-100">Liên hệ ngay để được tư vấn miễn phí và nhận báo giá chi tiết</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button type="button" className="rounded-none bg-white px-8 py-4 text-base font-bold transition hover:bg-gray-50" style={{ color: "#16A34A" }}>Nhận báo giá</button>
            <button type="button" className="rounded-none border-2 border-white px-8 py-4 text-base font-bold transition hover:bg-white/10">Liên hệ tư vấn</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HunonicPage;