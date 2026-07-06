// ============================================
// SOLAR TESTIMONIALS — Slider đánh giá khách hàng
// ============================================

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { solarTestimonials } from "../../data/solarData";

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

const SolarTestimonials = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((next, dir) => {
    setDirection(dir);
    setIndex((next + solarTestimonials.length) % solarTestimonials.length);
  }, []);

  const next = useCallback(
    () => goTo(index + 1, 1),
    [index, goTo],
  );
  const prev = useCallback(
    () => goTo(index - 1, -1),
    [index, goTo],
  );

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % solarTestimonials.length);
    }, 6000);
    return () => clearInterval(t);
  }, [isPaused]);

  const current = solarTestimonials[index];

  return (
    <section className="overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-800 to-slate-900 py-16 text-white md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur md:text-sm"
          >
            <Star size={14} className="text-amber-300" />
            Khách hàng đánh giá
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl"
          >
            Hơn 500+ khách hàng{" "}
            <span className="bg-gradient-to-r from-amber-300 to-amber-200 bg-clip-text text-transparent">
              hài lòng
            </span>
          </motion.h2>
        </div>

        {/* Slider */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative mx-auto max-w-3xl">
            <Quote
              size={80}
              className="absolute -left-2 -top-6 text-white/10 md:-left-8"
              strokeWidth={1}
            />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur md:p-10"
              >
                {/* Rating */}
                <div className="mb-5 flex items-center gap-1">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="fill-amber-300 text-amber-300"
                    />
                  ))}
                </div>

                <p className="mb-8 text-base leading-relaxed text-white/90 md:text-lg">
                  "{current.content}"
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="h-14 w-14 rounded-full border-2 border-white/30 object-cover"
                    loading="lazy"
                  />
                  <div>
                    <div className="text-base font-bold text-white">
                      {current.name}
                    </div>
                    <div className="text-sm text-white/70">{current.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:scale-105 hover:bg-white/15"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
              {solarTestimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i, i > index ? 1 : -1)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-8 bg-amber-300"
                      : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:scale-105 hover:bg-white/15"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolarTestimonials;
