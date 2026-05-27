// ============================================
// ABOUT SECTION - TAILWIND
// Modern & Professional Company Introduction
// ============================================
import { useNavigate } from "react-router-dom";
import {
  Target,
  Zap,
  Award,
  Users,
  Shield,
  Truck,
  Headphones,
  CheckCircle,
} from "lucide-react";

const AboutSection = ({ companyInfo }) => {
  const navigate = useNavigate();

  if (!companyInfo) return null;

  const stats = [
    { value: "5+", label: "Năm kinh nghiệm" },
    { value: "10K+", label: "Khách hàng" },
    { value: "50+", label: "Sản phẩm" },
    { value: "24/7", label: "Hỗ trợ" },
  ];

  const features = [
    { icon: Shield, title: "Sản phẩm chính hãng", color: "blue" },
    { icon: Zap, title: "Công nghệ tiên tiến", color: "amber" },
    { icon: Users, title: "Khách hàng là trung tâm", color: "green" },
    { icon: Headphones, title: "Hỗ trợ 24/7", color: "purple" },
    { icon: Truck, title: "Giao hàng nhanh", color: "cyan" },
    { icon: Award, title: "Bảo hành dài hạn", color: "red" },
  ];

  const colorMap = {
    blue: "bg-blue-100 text-blue-600",
    amber: "bg-amber-100 text-amber-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    cyan: "bg-cyan-100 text-cyan-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white relative">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-300/30 to-transparent" />
      
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/50 rounded-full mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-600">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="text-sm font-semibold text-primary-600">Về chúng tôi</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary tracking-tight mb-3">
            Nhật Minh Smart Home
          </h2>
          <p className="text-slate-500 text-base md:text-lg italic">
            {companyInfo.slogan}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-14">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 md:p-8 bg-white rounded-2xl border border-slate-100 shadow-soft hover:-translate-y-1 hover:shadow-medium transition-all duration-300"
            >
              <span className="block text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-600 tracking-tighter">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wide mt-2 block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 mb-12 md:mb-14">
          {/* Left: Introduction */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Intro Card */}
            <div className="flex flex-col md:flex-row gap-6 p-6 md:p-8 bg-white rounded-3xl border border-slate-100 shadow-soft">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary-600 to-accent rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-secondary mb-3">Giới thiệu</h3>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                  {companyInfo.intro}
                </p>
              </div>
            </div>

            {/* Vision & Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="flex gap-4 p-5 md:p-6 bg-white rounded-2xl border border-slate-100 shadow-soft hover:-translate-y-1 hover:shadow-medium transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-secondary mb-2">Tầm nhìn</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{companyInfo.vision}</p>
                </div>
              </div>
              <div className="flex gap-4 p-5 md:p-6 bg-white rounded-2xl border border-slate-100 shadow-soft hover:-translate-y-1 hover:shadow-medium transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-secondary mb-2">Sứ mệnh</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{companyInfo.mission}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Values & Features */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Core Values */}
            <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-soft">
              <h3 className="flex items-center gap-2 text-lg font-bold text-secondary mb-5">
                <Award size={20} className="text-primary-600" />
                Giá trị cốt lõi
              </h3>
              <ul className="flex flex-col gap-3">
                {companyInfo.values?.map((value, index) => (
                  <li 
                    key={index} 
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-primary-600 transition-colors cursor-default"
                  >
                    <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Why Choose Us */}
            {/* <div className="grid grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-soft hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 cursor-default"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colorMap[feature.color]}`}>
                    <feature.icon size={20} />
                  </div>
                  <span className="text-xs font-semibold text-secondary leading-tight">
                    {feature.title}
                  </span>
                </div>
              ))}
            </div> */}
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-8 md:p-10 bg-gradient-to-br from-secondary to-slate-700 rounded-3xl shadow-strong">
          <div className="text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              Bạn cần tư vấn về giải pháp Smart Home?
            </h3>
            <p className="text-slate-300 text-sm md:text-base">
              Liên hệ ngay để được hỗ trợ miễn phí từ đội ngũ chuyên gia
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button 
              onClick={() => navigate("/products")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-accent text-white font-semibold rounded-xl shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Khám phá sản phẩm
            </button>
            <a 
              href={`tel:${companyInfo.phone}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border-2 border-white/20 hover:bg-white/20 transition-all duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {companyInfo.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
