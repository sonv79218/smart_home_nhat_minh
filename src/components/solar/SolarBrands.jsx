// ============================================
// SOLAR BRANDS — Logo carousel vô tận
// Marquee animation thuần CSS, không phụ thuộc lib
// ============================================

import { motion } from "framer-motion";
import { solarBrands } from "../../data/solarData";

const BrandItem = ({ name }) => (
  <div className="flex h-24 w-44 shrink-0 items-center justify-center rounded-2xl border border-slate-100 bg-white px-6 shadow-sm transition-all duration-300 hover:border-emerald-200 hover:shadow-md">
    <span className="text-base font-bold tracking-tight text-slate-700 transition-colors hover:text-emerald-700 md:text-lg">
      {name}
    </span>
  </div>
);

const SolarBrands = () => {
  return (
    <section className="overflow-hidden bg-gray-50 py-14 md:py-20">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center md:mb-14"
        >
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm md:text-sm">
            Đối tác thương hiệu
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl lg:text-4xl">
            Thương hiệu <span className="text-emerald-600">hàng đầu</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 md:text-base">
            Chúng tôi là đối tác chính thức của các thương hiệu inverter,
            pin lưu trữ và tấm pin hàng đầu thế giới.
          </p>
        </motion.div>
      </div>

      {/* Marquee container */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        {/* Row 1: scroll left */}
        <div className="flex w-max animate-marquee gap-5 pb-2">
          {[...solarBrands, ...solarBrands].map((b, i) => (
            <BrandItem key={`r1-${b.id}-${i}`} name={b.name} />
          ))}
        </div>

        {/* Row 2: scroll right (slower) */}
        <div
          className="mt-5 flex w-max animate-marquee-reverse gap-5"
          style={{ animationDuration: "35s" }}
        >
          {[...solarBrands.slice().reverse(), ...solarBrands.slice().reverse()].map(
            (b, i) => (
              <BrandItem key={`r2-${b.id}-${i}`} name={b.name} />
            )
          )}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default SolarBrands;
