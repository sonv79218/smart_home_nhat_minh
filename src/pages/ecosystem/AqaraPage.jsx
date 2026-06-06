import { Link } from "react-router-dom";
import {
  Home,
  ShieldCheck,
  Smartphone,
  Cpu,
  Radio,
  Bluetooth,
  Network,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Phone,
  MessageCircle,
  Lock,
  Camera,
  Lightbulb,
  // Curtain,
  Building2,
  Star,
} from "lucide-react";

const aqaraImages = {
  hero: "/images/ecosystem/aqara/hero.png",
  hub: "/images/ecosystem/aqara/hub-m3.png",
  lock: "/images/ecosystem/aqara/lock-u200.png",
  camera: "/images/ecosystem/aqara/camera-g5.png",
  switch: "/images/ecosystem/aqara/switch-h2.png",
  sensor: "/images/ecosystem/aqara/sensor-p2.png",
  curtain: "/images/ecosystem/aqara/curtain-e1.png",
};

const platforms = [
  ["Apple HomeKit", "Tích hợp hoàn hảo với iPhone, iPad, Apple Watch", Home],
  ["Google Home", "Điều khiển bằng giọng nói Google Assistant", Home],
  ["Amazon Alexa", "Điều khiển bằng giọng nói Alexa", MessageCircle],
  ["Samsung SmartThings", "Kết nối hệ sinh thái Samsung", Network],
  ["Matter", "Chuẩn kết nối nhà thông minh thế hệ mới", Sparkles],
];

const connections = [
  ["Zigbee 3.0", "Ổn định, tiết kiệm pin, phản hồi nhanh", Radio],
  ["Bluetooth 5.0", "Kết nối nhanh, dễ dàng cài đặt", Bluetooth],
  ["Thread", "Mạng Mesh thế hệ mới, độ trễ thấp", Network],
  ["Matter", "Kết nối đa hãng trong cùng hệ sinh thái", Sparkles],
];

const packages = [
  {
    name: "Cơ bản",
    price: "15 - 30 triệu",
    color: "green",
    items: ["Chiếu sáng thông minh", "Công tắc - Ổ cắm", "Cảm biến cơ bản", "Điều khiển qua app"],
  },
  {
    name: "Phổ biến",
    price: "30 - 80 triệu",
    color: "blue",
    items: ["Chiếu sáng", "Rèm cửa", "Khóa cửa thông minh", "Camera an ninh", "Tự động hóa cơ bản"],
  },
  {
    name: "Cao cấp",
    price: "80 triệu+",
    color: "violet",
    items: ["Toàn bộ hệ sinh thái", "Tự động hóa nâng cao", "Kịch bản thông minh", "Apple HomeKit", "Bảo mật toàn diện"],
  },
];

const devices = [
  ["Hub M3", "Bộ não trung tâm", aqaraImages.hub],
  ["Khóa cửa U200", "Mở khóa đa phương thức", aqaraImages.lock],
  ["Camera G5 Pro", "Ghi hình 2K, AI detect", aqaraImages.camera],
  ["Công tắc H2", "Thiết kế cao cấp", aqaraImages.switch],
  ["Cảm biến P2", "Cảm biến hiện diện", aqaraImages.sensor],
  ["Rèm E1", "Động cơ rèm thông minh", aqaraImages.curtain],
];

const scenarios = [
  {
    title: "Về nhà",
    icon: Home,
    image: "/images/ecosystem/aqara/scenario-home.jpg",
    steps: ["Mở khóa cửa", "Đèn sáng", "Điều hòa bật", "Rèm mở"],
  },
  {
    title: "Đi ngủ",
    icon: Lightbulb,
    image: "/images/ecosystem/aqara/scenario-night.jpg",
    steps: ["Tắt đèn", "Đóng rèm", "Khóa cửa", "Bật camera"],
  },
  {
    title: "Rời nhà",
    icon: Lock,
    image: "/images/ecosystem/aqara/scenario-away.jpg",
    steps: ["Tắt thiết bị", "Bật an ninh", "Gửi cảnh báo"],
  },
];

const reasons = [
  ["Tương thích cao", "Hỗ trợ Apple HomeKit, Matter và các hệ sinh thái lớn.", Sparkles],
  ["Ổn định & Bảo mật", "Kết nối nhanh, ổn định, nhiều lớp bảo vệ.", ShieldCheck],
  ["Thiết bị đa dạng", "Hơn 200+ thiết bị cho nhiều nhu cầu sử dụng.", Cpu],
  ["Giá trị vượt trội", "Cân bằng giữa cao cấp, ổn định và dễ tiếp cận.", Star],
];

const projects = [
  ["Nhà phố - Hạ Long", "/images/projects/project-1.jpg"],
  ["Biệt thự - Quảng Ninh", "/images/projects/project-2.jpg"],
  ["Chung cư cao cấp", "/images/projects/project-3.jpg"],
  ["Showroom - Hải Phòng", "/images/projects/project-4.jpg"],
  ["Văn phòng thông minh", "/images/projects/project-5.jpg"],
];

const ImageFallback = ({ src, alt, className = "" }) => {
  if (!src) {
    return (
      <div className={`bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center ${className}`}>
        <span className="text-sm font-semibold text-slate-400">{alt}</span>
      </div>
    );
  }

  return <img src={src} alt={alt} className={`object-contain ${className}`} />;
};

const AqaraPage = () => {
  return (
    <main className="bg-white text-slate-900">
      {/* HERO */}
      <section className="py-8 md:py-12">
        <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-4 md:px-6">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-blue-50 via-white to-slate-100 p-6 md:p-10 lg:p-14">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-6xl font-black text-blue-950 leading-tight">
                  Hệ sinh thái <br />
                  nhà thông minh toàn diện
                </h1>

                <p className="mt-4 text-slate-600 text-base md:text-lg max-w-xl">
                  Một ứng dụng - Kết nối mọi thiết bị - Tự động hóa toàn bộ ngôi nhà của bạn.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-7">
                  {[
                    ["200+", "Thiết bị"],
                    ["Matter", "Chuẩn kết nối mới"],
                    ["Ổn định", "Bảo mật cao"],
                    ["Thông minh", "Tự động hóa"],
                  ].map(([title, desc]) => (
                    <div key={title} className="rounded-2xl bg-white/80 border border-blue-100 p-3">
                      <p className="font-black text-blue-800">{title}</p>
                      <p className="text-xs text-slate-500">{desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/products?brand=aqara"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-white font-bold hover:bg-blue-800 transition"
                  >
                    Khám phá sản phẩm
                    <ArrowRight size={18} />
                  </Link>

                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-5 py-3 text-blue-700 font-bold hover:bg-blue-50 transition"
                  >
                    Tư vấn giải pháp
                  </Link>
                </div>
              </div>

              <div className="relative">
                <ImageFallback
                  src={aqaraImages.hero}
                  alt="Aqara app và thiết bị"
                  className="w-full h-[360px] md:h-[480px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="py-8">
        <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-4 md:px-6">
          <h2 className="text-center text-2xl md:text-3xl font-black mb-6 text-blue-950">
            Aqara hoạt động hoàn hảo với các hệ sinh thái hàng đầu
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {platforms.map(([title, desc, Icon]) => (
              <div key={title} className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
                <Icon className="text-blue-600 mb-3" size={28} />
                <h3 className="font-black text-slate-900">{title}</h3>
                <p className="text-sm text-slate-500 mt-2">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONNECTIONS */}
      <section className="py-10 bg-blue-50/60">
        <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-blue-950">
                Kết nối đa dạng, ổn định và mạnh mẽ
              </h2>
              <p className="text-slate-600 mt-4">
                Aqara sử dụng các chuẩn kết nối hiện đại để hệ thống hoạt động ổn định,
                phản hồi nhanh và dễ mở rộng.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {connections.map(([title, desc, Icon]) => (
                <div key={title} className="rounded-2xl bg-white border border-blue-100 p-5 text-center shadow-sm">
                  <div className="w-12 h-12 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-3">
                    <Icon className="text-blue-700" size={24} />
                  </div>
                  <h3 className="font-black text-slate-900">{title}</h3>
                  <p className="text-xs text-slate-500 mt-2">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="py-12">
        <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-4 md:px-6">
          <h2 className="text-center text-2xl md:text-3xl font-black mb-7 text-blue-950">
            Giải pháp phù hợp với mọi nhu cầu
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {packages.map((pkg) => (
              <div key={pkg.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="uppercase text-sm font-black text-blue-600">{pkg.name}</p>
                <h3 className="text-3xl font-black mt-2 text-blue-950">{pkg.price}</h3>

                <div className="mt-5 space-y-3">
                  {pkg.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <CheckCircle size={18} className="text-green-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEVICES */}
      <section className="py-12 bg-slate-50">
        <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-4 md:px-6">
          <h2 className="text-center text-2xl md:text-3xl font-black mb-7 text-blue-950">
            Các thiết bị nổi bật trong hệ sinh thái Aqara
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {devices.map(([name, desc, image]) => (
              <div key={name} className="rounded-2xl bg-white border border-slate-200 p-4 text-center shadow-sm">
                <ImageFallback src={image} alt={name} className="w-full h-28 mb-3" />
                <h3 className="font-black text-slate-900">{name}</h3>
                <p className="text-xs text-slate-500 mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCENARIOS */}
      <section className="py-12">
        <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-4 md:px-6">
          <h2 className="text-center text-2xl md:text-3xl font-black mb-7 text-blue-950">
            Tự động hóa cho cuộc sống tiện nghi
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {scenarios.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm">
                  <div className="h-44 bg-blue-50">
                    <ImageFallback src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon className="text-blue-600" size={22} />
                      <h3 className="text-xl font-black">{item.title}</h3>
                    </div>

                    <div className="space-y-2">
                      {item.steps.map((step) => (
                        <div key={step} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle size={16} className="text-blue-500" />
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-12 bg-blue-50/60">
        <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-4 md:px-6">
          <h2 className="text-center text-2xl md:text-3xl font-black mb-7 text-blue-950">
            Vì sao nên chọn Aqara?
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {reasons.map(([title, desc, Icon]) => (
              <div key={title} className="rounded-2xl bg-white border border-blue-100 p-5 shadow-sm">
                <Icon className="text-blue-600 mb-3" size={28} />
                <h3 className="font-black">{title}</h3>
                <p className="text-sm text-slate-500 mt-2">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-12">
        <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-4 md:px-6">
          <h2 className="text-center text-2xl md:text-3xl font-black mb-7 text-blue-950">
            Công trình thực tế
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {projects.map(([title, image]) => (
              <div key={title} className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm">
                <ImageFallback src={image} alt={title} className="w-full h-36 object-cover" />
                <div className="p-4 flex items-center gap-2">
                  <Building2 size={18} className="text-blue-600" />
                  <h3 className="font-bold text-sm">{title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10">
        <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-4 md:px-6">
          <div className="rounded-[28px] bg-gradient-to-r from-slate-950 to-blue-950 p-8 md:p-10 text-white flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-4xl font-black">
                Sẵn sàng xây dựng ngôi nhà thông minh Aqara?
              </h2>
              <p className="text-white/70 mt-2">
                Khảo sát - Tư vấn - Thi công - Bảo hành trọn gói
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:0876906668"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-bold hover:bg-blue-700 transition"
              >
                <Phone size={18} />
                Gọi ngay
              </a>

              <a
                href="https://zalo.me/0876906668"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-blue-700 hover:bg-blue-50 transition"
              >
                <MessageCircle size={18} />
                Nhắn Zalo
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AqaraPage;