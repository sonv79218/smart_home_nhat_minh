import { Link } from "react-router-dom";
import {
  Home,
  ShieldCheck,
  Smartphone,
  Cpu,
  Waves,
  CheckCircle,
  ArrowRight,
  ImageIcon,
  MapPin,
  Phone,
  Lock,
  Radio,
  Camera,
} from "lucide-react";

const aqaraBlue = "#5872A4";

const aqaraImages = {
  hero: "",
  intro: "",
  solution1: "",
  solution2: "",
  solution3: "",
  solution4: "",
  project1: "",
  project2: "",
  project3: "",
  project4: "",
  cta: "",
};

const ImageBox = ({ src, label, className = "" }) => (
  <div className={`relative overflow-hidden bg-blue-50 border border-blue-100 ${className}`}>
    {src ? (
      <img src={src} alt={label} className="w-full h-full object-cover" />
    ) : (
      <div className="w-full h-full min-h-[180px] flex items-center justify-center text-center p-5">
        <div>
          <ImageIcon className="w-9 h-9 mx-auto mb-3 text-blue-400" />
          <p className="text-sm font-bold text-blue-700">{label}</p>
          <p className="text-xs text-blue-500 mt-1">Thêm ảnh trong aqaraImages</p>
        </div>
      </div>
    )}
  </div>
);

const strengths = [
  "Hệ sinh thái thiết bị đa dạng",
  "Mạnh về cảm biến, hub, khóa và an ninh",
  "Phù hợp người dùng Apple HomeKit",
  "Thiết kế hiện đại, gọn gàng",
  "Dễ mở rộng theo từng khu vực trong nhà",
];

const solutions = [
  {
    icon: Radio,
    image: aqaraImages.solution1,
    title: "Hub trung tâm Aqara",
    desc: "Kết nối cảm biến, công tắc, rèm, khóa và các thiết bị Aqara trong cùng hệ thống.",
  },
  {
    icon: Waves,
    image: aqaraImages.solution2,
    title: "Cảm biến thông minh",
    desc: "Cảm biến cửa, chuyển động, nhiệt độ, độ ẩm giúp tự động hóa ngôi nhà linh hoạt.",
  },
  {
    icon: Lock,
    image: aqaraImages.solution3,
    title: "Khóa cửa thông minh",
    desc: "Mở khóa tiện lợi, quản lý người dùng và tăng khả năng bảo vệ cho gia đình.",
  },
  {
    icon: Camera,
    image: aqaraImages.solution4,
    title: "Camera & an ninh",
    desc: "Kết hợp camera, cảm biến và cảnh báo để theo dõi ngôi nhà an toàn hơn.",
  },
];

const projects = [
  { image: aqaraImages.project1, title: "Căn hộ Aqara", desc: "Hệ thống gọn gàng, hiện đại cho chung cư." },
  { image: aqaraImages.project2, title: "Nhà phố thông minh", desc: "Tự động hóa đèn, rèm, cảm biến và an ninh." },
  { image: aqaraImages.project3, title: "Biệt thự Smart Home", desc: "Giải pháp Aqara mở rộng cho nhiều khu vực." },
  { image: aqaraImages.project4, title: "Phòng mẫu / Showroom", desc: "Trải nghiệm thiết bị Aqara trực quan, dễ hiểu." },
];

const AqaraPage = () => {
  return (
    <main className="bg-white text-slate-900">
      {/* HERO */}
      <section className="relative min-h-[620px] bg-slate-950 overflow-hidden">
        <ImageBox
          src={aqaraImages.hero}
          label="Ảnh hero Aqara"
          className="absolute inset-0 rounded-none border-0"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-blue-900/30" />
        <div className="absolute -right-20 top-20 w-96 h-96 rounded-full bg-blue-400/30 blur-3xl" />
        <div className="absolute left-10 bottom-10 w-72 h-72 rounded-full bg-indigo-400/20 blur-3xl" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 min-h-[620px] flex items-center">
          <div className="max-w-3xl pt-20">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold mb-6"
              style={{
                backgroundColor: `${aqaraBlue}22`,
                borderColor: `${aqaraBlue}55`,
                color: "#dbeafe",
              }}
            >
              <Home size={16} />
              Hệ sinh thái Aqara
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight">
              Giải pháp Smart Home Aqara hiện đại cho ngôi nhà thông minh
            </h1>

            <p className="mt-6 text-white/75 text-base md:text-xl leading-relaxed max-w-2xl">
              Nhất Minh Smart Home tư vấn, cung cấp và triển khai hệ sinh thái Aqara
              cho căn hộ, nhà phố, biệt thự và các công trình cần sự gọn gàng, hiện đại.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-white font-extrabold hover:brightness-110 transition"
                style={{ backgroundColor: aqaraBlue }}
              >
                Nhận tư vấn Aqara
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/products?brand=aqara"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 border border-white/15 text-white font-bold hover:bg-white/15 transition"
              >
                Xem sản phẩm Aqara
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <ImageBox
            src={aqaraImages.intro}
            label="Ảnh giới thiệu Aqara"
            className="h-[320px] md:h-[480px] rounded-3xl"
          />

          <div>
            <p className="font-extrabold mb-3" style={{ color: aqaraBlue }}>
              Aqara là gì?
            </p>

            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-5">
              Hệ sinh thái nhà thông minh nổi bật với cảm biến, hub và an ninh
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Aqara phù hợp với khách hàng muốn xây dựng một hệ thống Smart Home hiện đại,
              gọn gàng và dễ mở rộng. Nhất Minh Smart Home triển khai Aqara theo nhu cầu
              thực tế của từng công trình: từ căn hộ nhỏ đến nhà phố và biệt thự.
            </p>

            <div className="space-y-3">
              {strengths.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-blue-500 shrink-0" />
                  <span className="font-semibold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-16 md:py-24 bg-blue-50/70">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="font-extrabold mb-3" style={{ color: aqaraBlue }}>
              Vì sao Nhất Minh tư vấn Aqara?
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Gọn gàng, thông minh và dễ mở rộng
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              ["Hệ sinh thái mạnh", "Nhiều thiết bị cảm biến, hub, khóa, camera và bộ điều khiển."],
              ["Tự động hóa linh hoạt", "Dễ tạo ngữ cảnh theo chuyển động, cửa, ánh sáng, thời gian."],
              ["Thiết kế hiện đại", "Thiết bị nhỏ gọn, phù hợp căn hộ, nhà phố và không gian cao cấp."],
            ].map(([title, desc]) => (
              <div key={title} className="bg-white rounded-3xl border border-blue-100 p-6 shadow-sm">
                <Cpu className="mb-4" size={30} style={{ color: aqaraBlue }} />
                <h3 className="text-xl font-extrabold mb-2">{title}</h3>
                <p className="text-slate-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="max-w-3xl mb-10">
            <p className="font-extrabold mb-3" style={{ color: aqaraBlue }}>
              Giải pháp Aqara
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Một hệ sinh thái, nhiều thiết bị kết nối thông minh
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {solutions.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition">
                  <ImageBox
                    src={item.image}
                    label={`Ảnh ${item.title}`}
                    className="h-[210px] rounded-none border-0"
                  />

                  <div className="p-5">
                    <Icon size={28} className="mb-3" style={{ color: aqaraBlue }} />
                    <h3 className="text-lg font-extrabold mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FIT */}
      <section className="py-16 bg-slate-950 text-white">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-blue-300 font-extrabold mb-3">
                Aqara phù hợp với ai?
              </p>

              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-5">
                Phù hợp khách hàng thích hệ sinh thái hiện đại, gọn và thông minh
              </h2>

              <p className="text-slate-300 leading-relaxed">
                Aqara là lựa chọn tốt cho người muốn bắt đầu từ cảm biến, hub, khóa,
                camera hoặc muốn xây dựng hệ thống tự động hóa có khả năng mở rộng lâu dài.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {["Căn hộ", "Nhà phố", "Biệt thự", "Người dùng Apple"].map((item) => (
                <div key={item} className="rounded-3xl bg-white/5 border border-white/10 p-6">
                  <Home className="text-blue-300 mb-4" size={30} />
                  <h3 className="text-xl font-extrabold">{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="font-extrabold mb-3" style={{ color: aqaraBlue }}>
              Công trình Aqara
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Thêm ảnh thực tế để khách hàng thấy rõ cách triển khai
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {projects.map((item) => (
              <div key={item.title} className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm">
                <ImageBox
                  src={item.image}
                  label={`Ảnh ${item.title}`}
                  className="h-[230px] rounded-none border-0"
                />

                <div className="p-5">
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                    <MapPin size={15} />
                    Công trình thực tế
                  </div>

                  <h3 className="text-lg font-extrabold mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="py-16 md:py-24">
        <div className="max-w-[900px] mx-auto px-5">
          <div className="text-center mb-10">
            <p className="font-extrabold mb-3" style={{ color: aqaraBlue }}>
              Tổng quan nhanh
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold">
              Aqara trong mắt Nhất Minh
            </h2>
          </div>

          <div className="rounded-3xl border border-blue-100 overflow-hidden bg-white shadow-sm">
            {[
              ["Thế mạnh", "Hub, cảm biến, khóa, camera và tự động hóa"],
              ["Phong cách", "Hiện đại, nhỏ gọn, tinh tế"],
              ["Chi phí", "Trung bình - cao tùy hệ thiết bị"],
              ["Phù hợp", "Căn hộ, nhà phố, biệt thự, người dùng Apple"],
              ["Khả năng mở rộng", "Tốt"],
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-3 border-b last:border-b-0 border-blue-100">
                <div className="col-span-1 bg-blue-50 p-4 font-bold text-blue-700">
                  {label}
                </div>
                <div className="col-span-2 p-4 font-semibold text-slate-700">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor: aqaraBlue }}>
        <ImageBox
          src={aqaraImages.cta}
          label="Ảnh CTA Aqara"
          className="absolute inset-0 rounded-none border-0 opacity-30"
        />

        <div className="absolute inset-0 bg-slate-950/55" />

        <div className="relative z-10 max-w-[900px] mx-auto px-5 text-center text-white">
          <h2 className="text-3xl md:text-6xl font-extrabold leading-tight">
            Bạn muốn lắp hệ thống Smart Home Aqara?
          </h2>

          <p className="mt-5 text-white/80 text-base md:text-lg leading-relaxed">
            Nhất Minh Smart Home sẽ khảo sát, tư vấn và triển khai phương án Aqara
            phù hợp với công trình, nhu cầu sử dụng và ngân sách của bạn.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-blue-700 font-extrabold hover:bg-blue-50 transition"
            >
              Liên hệ tư vấn
              <ArrowRight size={18} />
            </Link>

            <a
              href="tel:0888999888"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 border border-white/20 text-white font-extrabold hover:bg-white/15 transition"
            >
              <Phone size={18} />
              Gọi hotline
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AqaraPage;