// ============================================
// ABOUT SECTION - UNIFIED DESIGN SYSTEM
// Seamless sections with consistent styling
// ============================================
import { useNavigate } from "react-router-dom";
import SectionHeader from "@/components/common/SectionHeader";
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
  main: "https://cdn.phototourl.com/free/2026-06-05-38389b9c-7a29-484b-b66c-2c87a1e9f322.png",
  project1: "https://cdn.phototourl.com/free/2026-06-05-a974a7eb-b90c-4167-8842-13a01d72e2c4.jpg",
  project2: "https://cdn.phototourl.com/free/2026-06-05-230e8e27-db9e-4a12-aca9-57882348c0db.png",
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
      <div className="w-full max-w-[1200px] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto px-4 md:px-6">
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


        </div>


      </div>
    </section>
  );
};

export default AboutSection;
