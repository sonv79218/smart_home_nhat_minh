// ============================================
// FEATURES BAR - CLEAN MOBILE FIRST
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
    title: "Miễn phí ship",
    subtitle: "Từ 500K",
  },
  {
    icon: ShieldCheck,
    title: "Chính hãng",
    subtitle: "Bảo hành rõ ràng",
  },
  {
    icon: Headphones,
    title: "Tư vấn nhanh",
    subtitle: "Hỗ trợ kỹ thuật",
  },
  {
    icon: RefreshCcw,
    title: "Đổi trả",
    subtitle: "Trong 7 ngày",
  },
];

const FeaturesBar = () => {
  return (
    <section className="mb-8 md:mb-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="
                flex items-center gap-3
                p-3 md:p-4
                rounded-2xl
                bg-white
                border border-slate-200
                shadow-sm
                hover:-translate-y-0.5 hover:shadow-md
                transition-all duration-200
              "
            >
              <div
                className="
                  w-10 h-10 md:w-11 md:h-11
                  rounded-xl
                  bg-slate-950
                  text-white
                  flex items-center justify-center
                  shrink-0
                "
              >
                <Icon size={20} strokeWidth={2} />
              </div>

              <div className="min-w-0">
                <h4 className="text-xs md:text-sm font-extrabold text-slate-900 leading-tight">
                  {feature.title}
                </h4>
                <p className="text-[11px] md:text-xs text-slate-500 leading-tight mt-0.5">
                  {feature.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesBar;