// ============================================
// ABOUT SECTION - UNIFIED DESIGN SYSTEM
// Seamless sections with consistent styling
// ============================================
import { useNavigate } from "react-router-dom";
import SectionHeader from "../../../components/common/SectionHeader";
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
};

const ImageBox = ({ src, label, className = "" }) => (
  <div className={`relative overflow-hidden bg-slate-100 border border-slate-200 ${className}`}>
    {src ? (
      <img src={src} alt={label} className="w-full h-full object-cover" />
    ) : (
      <div className="w-full h-full min-h-[120px] flex items-center justify-center text-center p-4">
        <div>
          <ImageIcon className="w-6 h-6 mx-auto mb-2 text-slate-400" />
          <p className="text-xs font-medium text-slate-500">{label}</p>
        </div>
      </div>
    )}
  </div>
);

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
    <section className="py-10 md:py-16 bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Header with Badge */}
        <SectionHeader
          badge="Về Nhật Minh Smart Home"
          title="Không chỉ bán thiết bị, chúng tôi thi công một hệ thống Smart Home hoàn chỉnh"
          subtitle="Nhật Minh Smart Home tư vấn, cung cấp và lắp đặt các giải pháp nhà thông minh cho nhà phố, căn hộ, biệt thự, showroom và văn phòng."
          size="md"
          className="max-w-3xl mb-6 md:mb-8"
        />

        {/* Main Grid */}
        <div className="grid lg:grid-cols-12 gap-4 md:gap-6 mb-8 md:mb-10">
          {/* Left Image Area */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-3">
              <ImageBox
                src={aboutImages.main}
                label="Ảnh showroom / đội ngũ"
                className="col-span-2 h-[180px] md:h-[280px] rounded-xl md:rounded-2xl"
              />
              <ImageBox
                src={aboutImages.project1}
                label="Công trình 1"
                className="h-[100px] md:h-[140px] rounded-xl md:rounded-xl"
              />
              <ImageBox
                src={aboutImages.project2}
                label="Công trình 2"
                className="h-[100px] md:h-[140px] rounded-xl md:rounded-xl"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Main CTA Card */}
            <div className="p-5 md:p-6 rounded-xl md:rounded-2xl bg-slate-900 text-white flex-1">
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-sky-500 flex items-center justify-center mb-4">
                <Wrench size={22} />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2">
                Thi công thực tế, tư vấn theo từng công trình
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Mỗi ngôi nhà có nhu cầu khác nhau. Chúng tôi khảo sát hiện trạng,
                tư vấn hệ thiết bị phù hợp, lắp đặt, cấu hình app và hướng dẫn khách
                sử dụng các ngữ cảnh thông minh trong sinh hoạt hằng ngày.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-2 gap-3">
              {services.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-4 rounded-xl bg-white border border-slate-200 hover:shadow-sm transition-shadow"
                  >
                    <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center mb-3">
                      <Icon size={18} className="text-sky-500" />
                    </div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Commitment Row */}
        <div className="grid lg:grid-cols-12 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Commitment Card */}
          <div className="lg:col-span-4 p-5 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white">
            <ShieldCheck size={28} className="mb-3" />
            <h3 className="text-lg font-bold mb-2">Cam kết rõ ràng</h3>
            <p className="text-white/85 text-sm leading-relaxed">
              Chúng tôi ưu tiên giải pháp bền, dễ dùng và có thể hỗ trợ lâu dài sau khi bàn giao.
            </p>
          </div>

          {/* Commitments List */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-2.5">
            {commitments.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2.5 p-3 rounded-lg bg-white border border-slate-200 shadow-sm"
              >
                <CheckCircle size={18} className="text-emerald-500 shrink-0" />
                <span className="font-medium text-slate-700 text-sm">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-xl md:rounded-2xl bg-white border border-slate-200 p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Muốn biết nhà bạn nên lắp hệ Smart Home nào?
            </h3>
            <p className="text-sm text-slate-600">
              Gửi nhu cầu, Nhật Minh sẽ tư vấn phương án phù hợp với công trình và ngân sách.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto shrink-0">
            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-sky-500 text-white font-semibold text-sm hover:bg-sky-600 transition"
            >
              Xem sản phẩm
              <ArrowRight size={16} />
            </button>
            <a
              href={`tel:${companyInfo.phone}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition"
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
