// ============================================
// FEATURES BAR COMPONENT - MODERN STYLE
// ============================================
import {
  Truck,
  ShieldCheck,
  Headphones,
  RefreshCcw,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Miễn phí vận chuyển",
    subtitle: "Đơn hàng từ 500K",
    color: "blue",
  },
  {
    icon: ShieldCheck,
    title: "Thanh toán an toàn",
    subtitle: "100% bảo mật",
    color: "green",
  },
  {
    icon: Headphones,
    title: "Hỗ trợ 24/7",
    subtitle: "Luôn sẵn sàng",
    color: "purple",
  },
  {
    icon: RefreshCcw,
    title: "Đổi trả dễ dàng",
    subtitle: "Trong 7 ngày",
    color: "orange",
  },
];

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
    gradient: "from-blue-500 to-blue-600",
  },
  green: {
    bg: "bg-green-50",
    icon: "text-green-600",
    gradient: "from-green-500 to-green-600",
  },
  purple: {
    bg: "bg-purple-50",
    icon: "text-purple-600",
    gradient: "from-purple-500 to-purple-600",
  },
  orange: {
    bg: "bg-orange-50",
    icon: "text-orange-600",
    gradient: "from-orange-500 to-orange-600",
  },
};

const FeaturesBar = () => {
  return (
    <section className="mb-10">
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-soft">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 md:p-5 rounded-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-md ${colorMap[feature.color].bg}`}
            >
              <div className={`p-3 rounded-xl bg-gradient-to-br ${colorMap[feature.color].gradient} shadow-lg`}>
                <feature.icon size={28} strokeWidth={1.8} className="text-white" />
              </div>
              <div className="flex flex-col">
                <h4 className="font-bold text-secondary text-sm md:text-[15px] leading-tight">
                  {feature.title}
                </h4>
                <p className="text-slate-500 text-xs md:text-sm mt-0.5">
                  {feature.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesBar;
