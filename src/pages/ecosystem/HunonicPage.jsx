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
  ToggleLeft,
} from "lucide-react";

const hunonicGreen = "#0bff03";

const hunonicImages = {
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
  <div className={`relative overflow-hidden bg-lime-50 border border-lime-100 ${className}`}>
    {src ? (
      <img src={src} alt={label} className="w-full h-full object-cover" />
    ) : (
      <div className="w-full h-full min-h-[180px] flex items-center justify-center text-center p-5">
        <div>
          <ImageIcon className="w-9 h-9 mx-auto mb-3 text-lime-500" />
          <p className="text-sm font-bold text-lime-700">{label}</p>
          <p className="text-xs text-lime-600 mt-1">Thêm ảnh trong hunonicImages</p>
        </div>
      </div>
    )}
  </div>
);

const strengths = [
  "Thương hiệu Smart Home Việt Nam",
  "Chi phí dễ tiếp cận hơn Lumi",
  "App tiếng Việt, dễ sử dụng",
  "Phù hợp người mới bắt đầu Smart Home",
  "Dễ bảo hành và hỗ trợ kỹ thuật",
];

const solutions = [
  {
    icon: ToggleLeft,
    image: hunonicImages.solution1,
    title: "Công tắc thông minh",
    desc: "Điều khiển đèn, bình nóng lạnh, thiết bị điện qua app hoặc theo ngữ cảnh.",
  },
  {
    icon: Lightbulb,
    image: hunonicImages.solution2,
    title: "Chiếu sáng thông minh",
    desc: "Bật tắt đèn theo lịch trình, khu vực, cảm biến hoặc thói quen sinh hoạt.",
  },
  {
    icon: Waves,
    image: hunonicImages.solution3,
    title: "Rèm cửa tự động",
    desc: "Điều khiển rèm từ xa, hẹn giờ mở đóng và kết hợp với ngữ cảnh trong nhà.",
  },
  {
    icon: ShieldCheck,
    image: hunonicImages.solution4,
    title: "Cảm biến & an ninh",
    desc: "Kết hợp cảm biến cửa, cảm biến chuyển động và cảnh báo để tăng an toàn.",
  },
];

const projects = [
  { image: hunonicImages.project1, title: "Nhà phố Hunonic", desc: "Giải pháp tiết kiệm, dễ dùng cho gia đình." },
  { image: hunonicImages.project2, title: "Căn hộ thông minh", desc: "Điều khiển công tắc, đèn, rèm và cảm biến qua app." },
  { image: hunonicImages.project3, title: "Gia đình mới bắt đầu", desc: "Lắp từ vài thiết bị cơ bản rồi nâng cấp dần." },
  { image: hunonicImages.project4, title: "Công trình dân dụng", desc: "Phù hợp nhu cầu thực tế, dễ bảo hành và hỗ trợ." },
];

const HunonicPage = () => {
  return (
    <main className="bg-white text-slate-900">
      {/* HERO */}
      <section className="relative min-h-[620px] bg-slate-950 overflow-hidden">
        <ImageBox
          src={hunonicImages.hero}
          label="Ảnh hero Hunonic"
          className="absolute inset-0 rounded-none border-0"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-lime-900/20" />
        <div className="absolute -right-20 top-20 w-96 h-96 rounded-full bg-lime-500/30 blur-3xl" />
        <div className="absolute left-10 bottom-10 w-72 h-72 rounded-full bg-green-500/20 blur-3xl" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 min-h-[620px] flex items-center">
          <div className="max-w-3xl pt-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-500/10 border border-lime-400/20 text-lime-300 text-sm font-bold mb-6">
              <Home size={16} />
              Hệ sinh thái Hunonic
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight">
              Giải pháp Smart Home Hunonic dễ dùng cho gia đình Việt
            </h1>

            <p className="mt-6 text-white/75 text-base md:text-xl leading-relaxed max-w-2xl">
              Nhật Minh Smart Home tư vấn, cung cấp và triển khai hệ sinh thái Hunonic
              cho nhà phố, chung cư, gia đình mới bắt đầu và các công trình dân dụng.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-slate-950 font-extrabold hover:brightness-110 transition"
                style={{ backgroundColor: hunonicGreen }}
              >
                Nhận tư vấn Hunonic
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/products?brand=hunonic"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 border border-white/15 text-white font-bold hover:bg-white/15 transition"
              >
                Xem sản phẩm Hunonic
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <ImageBox
            src={hunonicImages.intro}
            label="Ảnh giới thiệu Hunonic"
            className="h-[320px] md:h-[480px] rounded-3xl"
          />

          <div>
            <p className="font-extrabold mb-3" style={{ color: hunonicGreen }}>
              Hunonic là gì?
            </p>

            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-5">
              Nhà thông minh Việt Nam, dễ dùng và chi phí dễ tiếp cận
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Hunonic là hệ sinh thái Smart Home Việt Nam tập trung vào sự đơn giản,
              dễ sử dụng và phù hợp với nhu cầu thực tế của gia đình Việt. Đây là lựa
              chọn tốt cho khách hàng muốn bắt đầu nhà thông minh với chi phí hợp lý.
            </p>

            <div className="space-y-3">
              {strengths.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-lime-500 shrink-0" />
                  <span className="font-semibold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-16 md:py-24 bg-lime-50/70">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="font-extrabold mb-3" style={{ color: hunonicGreen }}>
              Vì sao Nhật Minh tư vấn Hunonic?
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Dễ bắt đầu, dễ dùng, dễ nâng cấp
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              ["Chi phí dễ tiếp cận", "Phù hợp khách hàng muốn làm smart home với ngân sách hợp lý."],
              ["Dễ sử dụng", "App tiếng Việt, thao tác đơn giản, phù hợp nhiều độ tuổi."],
              ["Dễ triển khai", "Có thể lắp từ công tắc, đèn, rèm đến cảm biến theo từng giai đoạn."],
            ].map(([title, desc]) => (
              <div key={title} className="bg-white rounded-3xl border border-lime-100 p-6 shadow-sm">
                <Cpu className="mb-4" size={30} style={{ color: hunonicGreen }} />
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
            <p className="font-extrabold mb-3" style={{ color: hunonicGreen }}>
              Giải pháp Hunonic
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Từ thiết bị cơ bản đến hệ thống Smart Home hoàn chỉnh
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {solutions.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition">
                  <ImageBox src={item.image} label={`Ảnh ${item.title}`} className="h-[210px] rounded-none border-0" />

                  <div className="p-5">
                    <Icon size={28} className="mb-3" style={{ color: hunonicGreen }} />
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
              <p className="text-lime-300 font-extrabold mb-3">
                Hunonic phù hợp với ai?
              </p>

              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-5">
                Phù hợp cho người mới bắt đầu nhà thông minh
              </h2>

              <p className="text-slate-300 leading-relaxed">
                Hunonic phù hợp với khách hàng muốn trải nghiệm Smart Home theo cách
                đơn giản, dễ dùng và có thể nâng cấp dần theo nhu cầu sử dụng thực tế.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {["Nhà phố", "Chung cư", "Người mới bắt đầu", "Công trình dân dụng"].map((item) => (
                <div key={item} className="rounded-3xl bg-white/5 border border-white/10 p-6">
                  <Home className="text-lime-300 mb-4" size={30} />
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
            <p className="font-extrabold mb-3" style={{ color: hunonicGreen }}>
              Công trình Hunonic
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Thêm ảnh thực tế để khách hàng dễ hình dung
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

      {/* OVERVIEW */}
      <section className="py-16 md:py-24">
        <div className="max-w-[900px] mx-auto px-5">
          <div className="text-center mb-10">
            <p className="font-extrabold mb-3" style={{ color: hunonicGreen }}>
              Tổng quan nhanh
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold">
              Hunonic trong mắt Nhật Minh
            </h2>
          </div>

          <div className="rounded-3xl border border-lime-100 overflow-hidden bg-white shadow-sm">
            {[
              ["Nguồn gốc", "Việt Nam"],
              ["Ngôn ngữ app", "Tiếng Việt, dễ dùng"],
              ["Chi phí", "Dễ tiếp cận hơn Lumi"],
              ["Phù hợp", "Gia đình Việt, nhà phố, chung cư"],
              ["Khả năng mở rộng", "Tốt cho nhu cầu dân dụng"],
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-3 border-b last:border-b-0 border-lime-100">
                <div className="col-span-1 bg-lime-50 p-4 font-bold text-lime-700">
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
      <section className="relative py-20 md:py-28 bg-lime-600 overflow-hidden">
        <ImageBox
          src={hunonicImages.cta}
          label="Ảnh CTA Hunonic"
          className="absolute inset-0 rounded-none border-0 opacity-30"
        />

        <div className="absolute inset-0 bg-green-950/70" />

        <div className="relative z-10 max-w-[900px] mx-auto px-5 text-center text-white">
          <h2 className="text-3xl md:text-6xl font-extrabold leading-tight">
            Bạn muốn lắp hệ thống Smart Home Hunonic?
          </h2>

          <p className="mt-5 text-white/80 text-base md:text-lg leading-relaxed">
            Nhật Minh Smart Home sẽ khảo sát, tư vấn và triển khai phương án Hunonic
            phù hợp với công trình, nhu cầu sử dụng và ngân sách của bạn.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-lime-700 font-extrabold hover:bg-lime-50 transition"
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

export default HunonicPage;