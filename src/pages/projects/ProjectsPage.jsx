import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Building2,
  Landmark,
  Store,
  KeyRound,
  Camera,
  Lightbulb,
  Blinds,
  ShieldCheck,
  ArrowRight,
  Phone,
  CheckCircle,
  Sparkles,
  ClipboardCheck,
  Wrench,
  Handshake,
  XCircle,
  X,
  Hotel,
  Coffee,
} from "lucide-react";

const filters = [
  { id: "nha-o", label: "Nhà ở", icon: Home },
  { id: "biet-thu", label: "Biệt thự", icon: Landmark },
  { id: "chung-cu", label: "Chung cư", icon: Building2 },
  { id: "van-phong", label: "Văn phòng", icon: Building2 },
  { id: "showroom", label: "Showroom", icon: Store },
  { id: "shop", label: "Shop", icon: Store },
  { id: "homestay", label: "Homestay", icon: Hotel },
  { id: "nha-tro", label: "Nhà trọ", icon: Home },
  { id: "cafe", label: "Cafe", icon: Coffee },
];

const houseTypes = [
  {
    type: "nha-o",
    icon: Home,
    title: "Nhà thông minh",
    budget: "Rất phổ biến",
    image:
      "../../../assets/images/solutions/nha_o.png",
    before: [
      "Đèn bật tắt thủ công",
      "Công tắc truyền thống",
      "Không có camera",
      "Không có rèm tự động",
    ],
    after: [
      "Đèn tự động theo ngữ cảnh",
      "Camera AI",
      "Rèm tự động",
      "Điều khiển bằng điện thoại",
    ],
    benefits: [
      "Phù hợp nhà nhiều tầng",
      "Dễ quản lý từng khu vực",
      "Tăng an toàn khi đi vắng",
    ],
    suggestedDevices: [
      "Công tắc thông minh",
      "Camera AI",
      "Rèm tự động",
      "Cảm biến chuyển động",
    ],
  },
  {
    type: "biet-thu",
    icon: Landmark,
    title: "Biệt thự thông minh",
    budget: "Cao cấp",
    image:
      "../../../assets/images/solutions/biet_thu.png",
    before: [
      "Hệ thống điện riêng lẻ",
      "Điều hòa bật thủ công",
      "Tưới cây thủ công",
    ],
    after: [
      "Kịch bản đón khách",
      "Tưới cây tự động",
      "Điều hòa tự động",
      "Điều khiển toàn bộ biệt thự",
    ],
    benefits: [
      "Đồng bộ toàn bộ không gian",
      "Tăng sự sang trọng",
      "Quản lý dễ dàng dù diện tích lớn",
    ],
    suggestedDevices: [
      "Hệ thống chiếu sáng thông minh",
      "Tưới cây tự động",
      "Camera sân vườn",
      "Điều khiển điều hòa",
    ],
  },
  {
    type: "chung-cu",
    icon: Building2,
    title: "Căn hộ Chung cư",
    budget: "Phổ biến",
    image:
      "../../../assets/images/solutions/chung_cu.png",
    before: ["Công tắc thường", "Khóa cơ", "Không có cảnh báo"],
    after: [
      "Khóa thông minh",
      "Cảm biến cửa",
      "Camera trong nhà",
      "Điều khiển qua điện thoại",
    ],
    benefits: [
      "Gọn gàng, ít can thiệp hạ tầng",
      "Dễ dùng cho gia đình",
      "Tăng an toàn khi ở chung cư",
    ],
    suggestedDevices: [
      "Khóa cửa thông minh",
      "Cảm biến cửa",
      "Camera trong nhà",
      "Công tắc thông minh",
    ],
  },
  {
    type: "van-phong",
    icon: Building2,
    title: "Văn phòng thông minh",
    budget: "Doanh nghiệp",
    image:
      "../../../assets/images/solutions/van_phong.png",
    before: ["Bật đèn toàn bộ văn phòng", "Điều hòa thủ công"],
    after: [
      "Đèn theo khu vực",
      "Điều hòa tự động",
      "Chấm công thông minh",
      "Quản lý năng lượng",
    ],
    benefits: [
      "Tối ưu chi phí vận hành",
      "Không gian làm việc hiện đại",
      "Quản lý thiết bị tập trung",
    ],
    suggestedDevices: [
      "Đèn thông minh",
      "Cảm biến hiện diện",
      "Điều khiển điều hòa",
      "Camera văn phòng",
    ],
  },
  {
    type: "showroom",
    icon: Store,
    title: "Showroom thông minh",
    budget: "Kinh doanh",
    image:
      "../../../assets/images/solutions/show_room.png",
    before: ["Khách tự xem sản phẩm", "Đèn cố định"],
    after: [
      "Kịch bản đón khách",
      "Điều khiển demo",
      "Màn hình điều khiển trung tâm",
    ],
    benefits: [
      "Tăng trải nghiệm khách hàng",
      "Demo thiết bị trực quan",
      "Không gian trưng bày chuyên nghiệp",
    ],
    suggestedDevices: [
      "Màn hình điều khiển trung tâm",
      "Đèn thông minh",
      "Công tắc demo",
      "Camera showroom",
    ],
  },
  {
    type: "shop",
    icon: Store,
    title: "Cửa hàng / Shop",
    budget: "Kinh doanh",
    image:
      "../../../assets/images/solutions/cua_hang.png",
    before: ["Mở cửa thủ công", "Camera cơ bản"],
    after: ["Camera AI", "Báo động chống trộm", "Điều khiển từ xa"],
    benefits: [
      "Giám sát cửa hàng từ xa",
      "Cảnh báo khi có bất thường",
      "Quản lý an ninh tốt hơn",
    ],
    suggestedDevices: ["Camera AI", "Cảm biến cửa", "Báo động", "Ổ cắm thông minh"],
  },
  {
    type: "homestay",
    icon: Hotel,
    title: "Khách sạn / Homestay",
    budget: "Dịch vụ",
    image:
      "../../../assets/images/solutions/home_stay.png",
    before: ["Khách dùng chìa khóa"],
    after: ["Khóa mật khẩu", "Check-in tự động", "Tiết kiệm điện"],
    benefits: [
      "Giảm công quản lý phòng",
      "Giao mã mở cửa từ xa",
      "Tăng trải nghiệm khách thuê",
    ],
    suggestedDevices: [
      "Khóa mật khẩu",
      "Cảm biến cửa",
      "Công tắc thông minh",
      "Điều khiển điều hòa",
    ],
  },
  {
    type: "cafe",
    icon: Coffee,
    title: "Quán Cafe",
    budget: "Dịch vụ",
    image:
      "../../../assets/images/solutions/quan_ca_phe.png",
    before: ["Bật đèn thủ công"],
    after: [
      "Điều khiển đèn theo khu vực",
      "Điều khiển loa",
      "Camera quản lý",
    ],
    benefits: [
      "Tạo không gian đẹp hơn",
      "Dễ đổi ánh sáng theo khung giờ",
      "Quản lý từ xa tiện lợi",
    ],
    suggestedDevices: [
      "Đèn thông minh",
      "Công tắc thông minh",
      "Camera quản lý",
      "Ổ cắm thông minh",
    ],
  },
  {
    type: "nha-tro",
    icon: KeyRound,
    title: "Nhà trọ",
    budget: "Đầu tư",
    image:
      "../../../assets/images/solutions/nha_tro.png",
    before: ["Khóa cơ", "Khó quản lý"],
    after: ["Khóa thông minh", "Camera hành lang", "Quản lý từ xa"],
    benefits: [
      "Dễ quản lý nhiều phòng",
      "Tăng an ninh hành lang",
      "Giao mã mở cửa không cần gặp trực tiếp",
    ],
    suggestedDevices: [
      "Khóa thông minh",
      "Camera hành lang",
      "Cảm biến cửa",
      "Công tắc thông minh",
    ],
  },
];

const processSteps = [
  {
    icon: ClipboardCheck,
    title: "Khảo sát công trình",
    desc: "Kiểm tra hiện trạng điện, vị trí thiết bị và nhu cầu sử dụng thực tế.",
  },
  {
    icon: Sparkles,
    title: "Tư vấn giải pháp",
    desc: "Đề xuất thiết bị, thương hiệu và ngân sách phù hợp với từng loại nhà.",
  },
  {
    icon: Wrench,
    title: "Thi công lắp đặt",
    desc: "Lắp đặt gọn gàng, cấu hình app, hub, cảm biến và các ngữ cảnh tự động.",
  },
  {
    icon: Handshake,
    title: "Bàn giao sử dụng",
    desc: "Hướng dẫn khách hàng dùng app, tạo ngữ cảnh và bảo hành sau thi công.",
  },
];

const benefits = [
  {
    icon: Lightbulb,
    title: "Tiện nghi hơn",
    desc: "Điều khiển đèn, rèm, thiết bị điện chỉ bằng điện thoại hoặc giọng nói.",
  },
  {
    icon: ShieldCheck,
    title: "An toàn hơn",
    desc: "Camera, khóa cửa và cảm biến giúp kiểm soát ngôi nhà tốt hơn.",
  },
  {
    icon: Blinds,
    title: "Tự động hơn",
    desc: "Tạo ngữ cảnh về nhà, đi ngủ, ra ngoài, tiếp khách theo nhu cầu.",
  },
  {
    icon: Camera,
    title: "Dễ quản lý hơn",
    desc: "Theo dõi và điều khiển thiết bị từ xa, phù hợp cả nhà ở và cho thuê.",
  },
];

const DetailModal = ({ solution, onClose }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!solution) return null;

  const Icon = solution.icon;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm px-4 py-5 md:py-8 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="max-w-5xl mx-auto bg-white rounded-[2rem] overflow-hidden shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative h-64 md:h-96">
          <img
            src={solution.image}
            alt={solution.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 w-11 h-11 rounded-full bg-white/90 text-slate-900 flex items-center justify-center hover:bg-white transition"
          >
            <X size={22} />
          </button>

          <div className="absolute left-5 right-5 bottom-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur text-white text-xs font-bold mb-3">
              <Icon size={16} />
              {solution.budget}
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-white">
              {solution.title}
            </h3>
          </div>
        </div>

        <div className="p-5 md:p-8">
          <div className="grid lg:grid-cols-2 gap-5">
            <div className="rounded-3xl bg-red-50 border border-red-100 p-5 md:p-6">
              <h4 className="flex items-center gap-2 font-black text-red-600 text-xl mb-4">
                <XCircle size={22} />
                Trước khi lắp đặt
              </h4>

              <div className="space-y-3">
                {solution.before.map((text) => (
                  <div key={text} className="flex gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    <span className="font-semibold text-slate-700">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-emerald-50 border border-emerald-100 p-5 md:p-6">
              <h4 className="flex items-center gap-2 font-black text-emerald-600 text-xl mb-4">
                <CheckCircle size={22} />
                Sau khi lắp đặt
              </h4>

              <div className="space-y-3">
                {solution.after.map((text) => (
                  <div key={text} className="flex gap-3">
                    <CheckCircle
                      size={18}
                      className="text-emerald-600 shrink-0 mt-0.5"
                    />
                    <span className="font-semibold text-slate-700">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-5 mt-5">
            <div className="rounded-3xl bg-blue-50 border border-blue-100 p-5 md:p-6">
              <h4 className="font-black text-blue-700 text-xl mb-4">
                Lợi ích chính
              </h4>

              <div className="space-y-3">
                {solution.benefits.map((text) => (
                  <div key={text} className="flex gap-3">
                    <CheckCircle
                      size={18}
                      className="text-blue-600 shrink-0 mt-0.5"
                    />
                    <span className="font-semibold text-slate-700">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-slate-50 border border-slate-200 p-5 md:p-6">
              <h4 className="font-black text-slate-900 text-xl mb-4">
                Thiết bị gợi ý
              </h4>

              <div className="flex flex-wrap gap-2">
                {solution.suggestedDevices.map((device) => (
                  <span
                    key={device}
                    className="px-3 py-2 rounded-full bg-white border border-slate-200 text-sm font-bold text-slate-700"
                  >
                    {device}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-slate-100 text-slate-700 font-extrabold hover:bg-slate-200 transition"
            >
              Đóng
            </button>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-extrabold hover:bg-blue-700 transition"
            >
              Nhận tư vấn giải pháp này
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const SolutionsByHousePage = () => {
  const [activeFilter, setActiveFilter] = useState("nha-o");
  const [selectedSolution, setSelectedSolution] = useState(null);

  const filteredHouseTypes = useMemo(() => {
    return houseTypes.filter((item) => item.type === activeFilter);
  }, [activeFilter]);

  return (
    <main className="bg-white text-slate-900">
      {/* <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950" />
        <div className="absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full bg-blue-500/25 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 font-bold mb-6">
            <Sparkles size={16} />
            Giải pháp Smart Home theo công trình
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-white leading-tight max-w-5xl mx-auto">
            Biến ngôi nhà của bạn thành Smart Home hiện đại
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-slate-300 text-base md:text-xl leading-relaxed">
            So sánh trước và sau khi lắp đặt nhà thông minh cho từng loại công
            trình: nhà ống, nhà cấp 4, biệt thự, chung cư, văn phòng, showroom
            và cửa hàng.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-blue-600 text-white font-extrabold hover:bg-blue-700 transition"
            >
              Nhận tư vấn miễn phí
              <ArrowRight size={18} />
            </Link>

            <a
              href="tel:0876906668"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 border border-white/15 text-white font-extrabold hover:bg-white/15 transition"
            >
              <Phone size={18} />
              Gọi hotline
            </a>
          </div>
        </div>
      </section> */}



      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-8">
            {/* <p className="text-blue-600 font-extrabold mb-3">
              Chọn nhanh loại công trình
            </p> */}

            <h2 className="text-3xl md:text-5xl font-black leading-tight">
              Tìm giải pháp giống ngôi nhà của bạn
            </h2>

          </div>

          <div className="sticky top-0 z-20 -mx-5 md:mx-0 px-5 md:px-0 py-4 bg-slate-50/95 backdrop-blur">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 md:gap-3">
              {filters.map((filter) => {
                const Icon = filter.icon;
                const isActive = activeFilter === filter.id;

                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActiveFilter(filter.id)}
                    className={`
                      flex flex-col items-center justify-center gap-1.5 md:gap-2
                      p-2.5 md:p-3
                      rounded-xl md:rounded-2xl
                      border-2
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-gradient-to-br from-blue-500 to-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/25 scale-[1.02]"
                          : "bg-white border-slate-200 text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:scale-[1.02]"
                      }
                    `}
                  >
                    <div
                      className={`
                        w-8 h-8 md:w-10 md:h-10
                        rounded-lg md:rounded-xl
                        flex items-center justify-center
                        transition-all duration-200
                        ${
                          isActive
                            ? "bg-white/20"
                            : "bg-slate-100 md:bg-slate-50"
                        }
                      `}
                    >
                      <Icon
                        size={16}
                        strokeWidth={isActive ? 2 : 1.8}
                        className={isActive ? "text-white" : "text-slate-500"}
                      />
                    </div>
                    <span
                      className={`
                        text-[10px] md:text-xs
                        font-bold
                        text-center leading-tight
                        ${
                          isActive
                            ? "text-white"
                            : "text-slate-600"
                        }
                      `}
                    >
                      {filter.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredHouseTypes.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                    <div className="absolute left-5 right-5 bottom-5">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur text-white text-xs font-bold mb-3">
                        <Icon size={15} />
                        {item.budget}
                      </div>

                      <h3 className="text-2xl font-black text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5">
                    <h4 className="text-sm font-black text-slate-500 uppercase tracking-wide mb-3">
                      Sau khi lắp đặt
                    </h4>

                    <div className="space-y-3">
                      {item.after.slice(0, 3).map((feature) => (
                        <div key={feature} className="flex gap-3">
                          <CheckCircle
                            size={18}
                            className="text-emerald-600 shrink-0 mt-0.5"
                          />
                          <span className="text-sm font-semibold text-slate-700">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedSolution(item)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-slate-100 text-slate-800 font-extrabold hover:bg-slate-200 transition"
                      >
                        Xem chi tiết
                      </button>

                      <Link
                        to="/contact"
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-blue-600 text-white font-extrabold hover:bg-blue-700 transition"
                      >
                        Tư vấn
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-4 gap-5">
            {benefits.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl bg-slate-50 border border-slate-200 p-6"
                >
                  <Icon className="text-blue-600 mb-4" size={30} />
                  <h3 className="text-xl font-black">{item.title}</h3>
                  <p className="mt-2 text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-950 text-white">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-blue-300 font-extrabold mb-3">
              Quy trình thi công Smart Home
            </p>

            <h2 className="text-3xl md:text-5xl font-black leading-tight">
              Từ khảo sát đến bàn giao, rõ ràng từng bước
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="relative rounded-3xl bg-white/5 border border-white/10 p-6"
                >
                  <div className="text-6xl font-black text-white/5 absolute right-5 top-3">
                    {index + 1}
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-blue-500/15 flex items-center justify-center text-blue-300 mb-5">
                    <Icon size={28} />
                  </div>

                  <h3 className="text-xl font-black">{step.title}</h3>

                  <p className="mt-3 text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* <section className="relative py-20 md:py-28 bg-gradient-to-r from-blue-600 to-indigo-700 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute left-0 bottom-0 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-[900px] mx-auto px-5 text-center text-white">
          <h2 className="text-3xl md:text-6xl font-black leading-tight">
            Bạn muốn biết nhà mình nên lắp Smart Home thế nào?
          </h2>

          <p className="mt-5 text-blue-100 text-base md:text-lg leading-relaxed">
            Nhất Minh Smart Home sẽ khảo sát, tư vấn thiết bị phù hợp với nhu
            cầu, loại công trình và ngân sách của bạn.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white text-blue-700 font-extrabold hover:bg-blue-50 transition"
            >
              Nhận tư vấn miễn phí
              <ArrowRight size={18} />
            </Link>

            <a
              href="tel:0876906668"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 border border-white/20 text-white font-extrabold hover:bg-white/15 transition"
            >
              <Phone size={18} />
              Gọi hotline
            </a>
          </div>
        </div>
      </section> */}

      {selectedSolution && (
        <DetailModal
          solution={selectedSolution}
          onClose={() => setSelectedSolution(null)}
        />
      )}
    </main>
  );
};

export default SolutionsByHousePage;