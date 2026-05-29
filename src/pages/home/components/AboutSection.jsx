// ============================================
// ABOUT SECTION - REAL SMART HOME COMPANY STYLE
// ============================================
import { useNavigate } from "react-router-dom";
import {
  Home,
  Camera,
  Wrench,
  ShieldCheck,
  Lightbulb,
  Lock,
  CheckCircle,
  ArrowRight,
  ImageIcon,
} from "lucide-react";

const aboutImages = {
  main: "",
  project1: "",
  project2: "",
  project3: "",
};

const ImageBox = ({ src, label, className = "" }) => {
  return (
    <div className={`relative overflow-hidden bg-slate-100 border border-slate-200 ${className}`}>
      {src ? (
        <img src={src} alt={label} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full min-h-[160px] flex items-center justify-center text-center p-5">
          <div>
            <ImageIcon className="w-8 h-8 mx-auto mb-2 text-slate-400" />
            <p className="text-sm font-semibold text-slate-500">{label}</p>
            <p className="text-xs text-slate-400 mt-1">Thêm ảnh trong aboutImages</p>
          </div>
        </div>
      )}
    </div>
  );
};

const AboutSection = ({ companyInfo }) => {
  const navigate = useNavigate();

  if (!companyInfo) return null;

  const services = [
    {
      icon: Lightbulb,
      title: "Chiếu sáng thông minh",
      desc: "Điều khiển đèn theo khu vực, lịch trình hoặc cảm biến.",
    },
    {
      icon: Lock,
      title: "Khóa cửa thông minh",
      desc: "Mở khóa bằng vân tay, mã số, thẻ từ và app.",
    },
    {
      icon: Camera,
      title: "Camera an ninh",
      desc: "Giám sát nhà ở, cửa hàng, văn phòng và cảnh báo từ xa.",
    },
    {
      icon: Home,
      title: "Tự động hóa nhà ở",
      desc: "Kết nối công tắc, rèm, cảm biến, camera thành hệ thống.",
    },
  ];

  const commitments = [
    "Tư vấn đúng nhu cầu sử dụng",
    "Thiết bị chính hãng, rõ nguồn gốc",
    "Thi công gọn gàng, đúng kỹ thuật",
    "Hướng dẫn sử dụng sau lắp đặt",
    "Bảo hành và hỗ trợ lâu dài",
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/40 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-5 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-100 text-sky-600 text-sm font-bold mb-4">
            <Home size={16} />
            Về Nhất Minh Smart Home
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Không chỉ bán thiết bị, chúng tôi thi công một hệ thống Smart Home hoàn chỉnh
          </h2>

          <p className="mt-4 text-slate-600 text-base md:text-lg leading-relaxed">
            Nhất Minh Smart Home tư vấn, cung cấp và lắp đặt các giải pháp nhà thông minh
            cho nhà phố, căn hộ, biệt thự, showroom và văn phòng.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
          {/* Left Image Area */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4 h-full">
              <ImageBox
                src={aboutImages.main}
                label="Ảnh showroom / đội ngũ / công trình chính"
                className="col-span-2 h-[280px] md:h-[420px] rounded-3xl"
              />

              <ImageBox
                src={aboutImages.project1}
                label="Ảnh thi công 1"
                className="h-[150px] md:h-[190px] rounded-2xl"
              />

              <ImageBox
                src={aboutImages.project2}
                label="Ảnh thi công 2"
                className="h-[150px] md:h-[190px] rounded-2xl"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            <div className="p-6 md:p-8 rounded-3xl bg-slate-950 text-white">
              <div className="w-14 h-14 rounded-2xl bg-sky-500 flex items-center justify-center mb-5">
                <Wrench size={28} />
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold mb-4">
                Thi công thực tế, tư vấn theo từng công trình
              </h3>

              <p className="text-slate-300 leading-relaxed">
                Mỗi ngôi nhà có nhu cầu khác nhau. Chúng tôi khảo sát hiện trạng,
                tư vấn hệ thiết bị phù hợp, lắp đặt, cấu hình app và hướng dẫn khách
                sử dụng các ngữ cảnh thông minh trong sinh hoạt hằng ngày.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {services.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="p-5 rounded-3xl bg-slate-50 border border-slate-200 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-4">
                      <Icon size={22} className="text-sky-500" />
                    </div>

                    <h4 className="font-extrabold text-slate-900 mb-2">
                      {item.title}
                    </h4>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Commitment Row */}
        <div className="mt-10 md:mt-14 grid lg:grid-cols-12 gap-6 md:gap-8">
          <div className="lg:col-span-4 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-sky-500 to-blue-600 text-white">
            <ShieldCheck size={34} className="mb-5" />
            <h3 className="text-2xl font-extrabold mb-3">
              Cam kết rõ ràng
            </h3>
            <p className="text-white/85 leading-relaxed">
              Chúng tôi ưu tiên giải pháp bền, dễ dùng và có thể hỗ trợ lâu dài
              sau khi bàn giao.
            </p>
          </div>

          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
            {commitments.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm"
              >
                <CheckCircle size={20} className="text-emerald-500 shrink-0" />
                <span className="font-semibold text-slate-700">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 md:mt-14 rounded-3xl bg-slate-100 border border-slate-200 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-2">
              Muốn biết nhà bạn nên lắp hệ Smart Home nào?
            </h3>
            <p className="text-slate-600">
              Gửi nhu cầu, Nhất Minh sẽ tư vấn phương án phù hợp với công trình và ngân sách.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-sky-500 text-white font-bold hover:bg-sky-400 transition"
            >
              Xem sản phẩm
              <ArrowRight size={18} />
            </button>

            <a
              href={`tel:${companyInfo.phone}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-950 text-white font-bold hover:bg-slate-800 transition"
            >
              Gọi tư vấn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;