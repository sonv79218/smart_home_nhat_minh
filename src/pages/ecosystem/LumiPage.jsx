import { Link } from "react-router-dom";
import {
  Home,
  Lightbulb,
  ShieldCheck,
  Smartphone,
  Cpu,
  Waves,
  CheckCircle,
  ArrowRight,
  ImageIcon,
  MapPin,
  Phone,
} from "lucide-react";

const lumiGreen = "#009B5A";

const lumiImages = {
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
  <div className={`relative overflow-hidden bg-emerald-50 border border-emerald-100 ${className}`}>
    {src ? (
      <img src={src} alt={label} className="w-full h-full object-cover" />
    ) : (
      <div className="w-full h-full min-h-[180px] flex items-center justify-center text-center p-5">
        <div>
          <ImageIcon className="w-9 h-9 mx-auto mb-3 text-emerald-400" />
          <p className="text-sm font-bold text-emerald-700">{label}</p>
          <p className="text-xs text-emerald-500 mt-1">Thêm ảnh trong lumiImages</p>
        </div>
      </div>
    )}
  </div>
);

const strengths = [
  "Thương hiệu Smart Home Việt Nam",
  "App tiếng Việt, dễ sử dụng",
  "Phù hợp gia đình Việt",
  "Dễ bảo hành và hỗ trợ kỹ thuật",
  "Hệ sinh thái thiết bị đa dạng",
];

const solutions = [
  {
    icon: Lightbulb,
    image: lumiImages.solution1,
    title: "Chiếu sáng thông minh",
    desc: "Điều khiển đèn theo khu vực, lịch trình, cảm biến hoặc ngữ cảnh sinh hoạt.",
  },
  {
    icon: Smartphone,
    image: lumiImages.solution2,
    title: "Điều khiển qua app",
    desc: "Quản lý thiết bị từ xa, tạo ngữ cảnh và kiểm soát ngôi nhà dễ dàng.",
  },
  {
    icon: ShieldCheck,
    image: lumiImages.solution3,
    title: "An ninh thông minh",
    desc: "Kết hợp cảm biến, khóa cửa, camera và cảnh báo khi có bất thường.",
  },
  {
    icon: Waves,
    image: lumiImages.solution4,
    title: "Rèm & thiết bị tự động",
    desc: "Tự động hóa rèm, công tắc, cảm biến và các thiết bị trong nhà.",
  },
];

const projects = [
  { image: lumiImages.project1, title: "Nhà phố Lumi", desc: "Giải pháp gọn gàng, dễ dùng cho gia đình." },
  { image: lumiImages.project2, title: "Căn hộ thông minh", desc: "Điều khiển đèn, rèm, cảm biến và thiết bị qua app." },
  { image: lumiImages.project3, title: "Biệt thự Smart Home", desc: "Hệ thống Lumi đồng bộ cho nhiều khu vực trong nhà." },
  { image: lumiImages.project4, title: "Showroom / Văn phòng", desc: "Tối ưu vận hành, ánh sáng và an ninh." },
];

const LumiPage = () => {
  return (
    <main className="bg-white text-slate-900">
      {/* HERO */}
      <section className="relative min-h-[620px] bg-slate-950 overflow-hidden">
        <ImageBox
          src={lumiImages.hero}
          label="Ảnh hero Lumi"
          className="absolute inset-0 rounded-none border-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-emerald-900/20" />
        <div className="absolute -right-20 top-20 w-96 h-96 rounded-full bg-emerald-500/30 blur-3xl" />

        <div className="relative z-10 w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-5 md:px-8 min-h-[620px] flex items-center">
          <div className="max-w-3xl pt-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-sm font-bold mb-6">
              <Home size={16} />
              Hệ sinh thái Lumi
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight">
              Giải pháp Smart Home Lumi cho gia đình Việt
            </h1>

            <p className="mt-6 text-white/75 text-base md:text-xl leading-relaxed max-w-2xl">
              Nhật Minh Smart Home tư vấn, cung cấp và triển khai hệ sinh thái Lumi
              cho nhà phố, căn hộ, biệt thự, showroom và văn phòng.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-white font-bold transition"
                style={{ backgroundColor: lumiGreen }}
              >
                Nhận tư vấn Lumi
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/products?brand=lumi"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 border border-white/15 text-white font-bold hover:bg-white/15 transition"
              >
                Xem sản phẩm Lumi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-16 md:py-24">
        <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <ImageBox
            src={lumiImages.intro}
            label="Ảnh giới thiệu Lumi"
            className="h-[320px] md:h-[480px] rounded-3xl"
          />

          <div>
            <p className="font-extrabold mb-3" style={{ color: lumiGreen }}>
              Lumi là gì?
            </p>

            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-5">
              Thương hiệu nhà thông minh Việt Nam, dễ dùng và dễ triển khai
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Lumi là hệ sinh thái thiết bị Smart Home hướng đến trải nghiệm sử dụng
              đơn giản, phù hợp thói quen của người Việt. Nhật Minh Smart Home lựa chọn
              Lumi cho các công trình cần sự ổn định, dễ bảo hành và dễ mở rộng.
            </p>

            <div className="space-y-3">
              {strengths.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-emerald-500 shrink-0" />
                  <span className="font-semibold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-16 md:py-24 bg-emerald-50/60">
        <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-5 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="font-extrabold mb-3" style={{ color: lumiGreen }}>
              Vì sao Nhật Minh tư vấn Lumi?
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Phù hợp với nhiều công trình thực tế
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              ["Dễ sử dụng", "App tiếng Việt, thao tác gần gũi với người dùng."],
              ["Dễ hỗ trợ", "Thuận tiện khi cần bảo hành, cấu hình hoặc mở rộng."],
              ["Dễ triển khai", "Phù hợp nhà phố, chung cư, biệt thự và showroom."],
            ].map(([title, desc]) => (
              <div key={title} className="bg-white rounded-3xl border border-emerald-100 p-6 shadow-sm">
                <Cpu className="mb-4" size={30} style={{ color: lumiGreen }} />
                <h3 className="text-xl font-extrabold mb-2">{title}</h3>
                <p className="text-slate-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="py-16 md:py-24">
        <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-5 md:px-8">
          <div className="max-w-3xl mb-10">
            <p className="font-extrabold mb-3" style={{ color: lumiGreen }}>
              Giải pháp Lumi
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Một hệ thống, nhiều thiết bị hoạt động cùng nhau
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {solutions.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                  <ImageBox src={item.image} label={`Ảnh ${item.title}`} className="h-[210px] rounded-none border-0" />

                  <div className="p-5">
                    <Icon size={28} className="mb-3" style={{ color: lumiGreen }} />
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
        <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-emerald-300 font-extrabold mb-3">
                Lumi phù hợp với ai?
              </p>

              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-5">
                Phù hợp từ căn hộ nhỏ đến nhà phố và biệt thự
              </h2>

              <p className="text-slate-300 leading-relaxed">
                Với khả năng mở rộng linh hoạt, Lumi phù hợp cho khách hàng muốn
                bắt đầu từ vài thiết bị cơ bản rồi nâng cấp dần thành hệ thống hoàn chỉnh.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {["Nhà phố", "Chung cư", "Biệt thự", "Showroom"].map((item) => (
                <div key={item} className="rounded-3xl bg-white/5 border border-white/10 p-6">
                  <Home className="text-emerald-300 mb-4" size={30} />
                  <h3 className="text-xl font-extrabold">{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-5 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="font-extrabold mb-3" style={{ color: lumiGreen }}>
              Công trình Lumi
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Thêm ảnh thực tế để khách hàng thấy năng lực triển khai
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {projects.map((item) => (
              <div key={item.title} className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm">
                <ImageBox src={item.image} label={`Ảnh ${item.title}`} className="h-[230px] rounded-none border-0" />

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

      {/* COMPARISON */}
      <section className="py-16 md:py-24">
        <div className="max-w-[900px] mx-auto px-5">
          <div className="text-center mb-10">
            <p className="font-extrabold mb-3" style={{ color: lumiGreen }}>
              Tổng quan nhanh
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold">
              Lumi trong mắt Nhật Minh
            </h2>
          </div>

          <div className="rounded-3xl border border-emerald-100 overflow-hidden bg-white shadow-sm">
            {[
              ["Nguồn gốc", "Việt Nam"],
              ["Ngôn ngữ app", "Tiếng Việt, dễ dùng"],
              ["Chi phí", "Trung bình - cao"],
              ["Phù hợp", "Gia đình Việt, nhà phố, biệt thự"],
              ["Khả năng mở rộng", "Tốt"],
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-3 border-b last:border-b-0 border-emerald-100">
                <div className="col-span-1 bg-emerald-50 p-4 font-bold text-emerald-700">
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
      <section className="relative py-20 md:py-28 bg-emerald-700 overflow-hidden">
        <ImageBox
          src={lumiImages.cta}
          label="Ảnh CTA Lumi"
          className="absolute inset-0 rounded-none border-0 opacity-30"
        />

        <div className="absolute inset-0 bg-emerald-900/75" />

        <div className="relative z-10 max-w-[900px] mx-auto px-5 text-center text-white">
          <h2 className="text-3xl md:text-6xl font-extrabold leading-tight">
            Bạn muốn lắp hệ thống Smart Home Lumi?
          </h2>

          <p className="mt-5 text-white/80 text-base md:text-lg leading-relaxed">
            Nhật Minh Smart Home sẽ khảo sát, tư vấn và triển khai phương án Lumi
            phù hợp với công trình và ngân sách của bạn.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-emerald-700 font-extrabold hover:bg-emerald-50 transition"
            >
              Liên hệ tư vấn
              <ArrowRight size={18} />
            </Link>

            <a
              href="tel:0876906668"
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

export default LumiPage;