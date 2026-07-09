import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * ImageSlider – premium sliding gallery
 * Props:
 *  - images: [{ src, caption }]
 *  - autoPlay: boolean (default true)
 *  - interval: ms (default 5000)
 *  - variant: "cover" | "cards"
 *      cover: single big image, prev/next thumbnails visible on sides
 *      cards: 3-up card row that scrolls
 */
export default function ImageSlider({ images = [], autoPlay = true, interval = 5000, variant = "cover", accent = "green" }) {
  const [idx, setIdx] = useState(0);
  const [hover, setHover] = useState(false);
  const total = images.length;

  const next = useCallback(() => setIdx((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    if (!autoPlay || hover || total <= 1) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [autoPlay, interval, next, hover, total]);

  if (total === 0) return null;

  // cards variant — 3 up
  if (variant === "cards") {
    const perView = 3;
    const visible = Array.from({ length: perView }).map((_, i) => images[(idx + i) % total]);
    return (
      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {visible.map((img, i) => (
              <motion.figure
                key={img.src + idx + i}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ delay: i * 0.06 }}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md ring-1 ring-black/5"
              >
                <img src={img.src} alt={img.caption || "Gallery"} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {img.caption && <figcaption className="absolute bottom-3 left-3 right-3 text-white text-sm font-medium">{img.caption}</figcaption>}
              </motion.figure>
            ))}
          </AnimatePresence>
        </div>
        <SliderControls idx={idx} total={total} onPrev={prev} onNext={next} onDot={setIdx} accent={accent} />
      </div>
    );
  }

  // cover variant
  const cur = images[idx];
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="relative">
      <div className="relative rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9] bg-gray-100 shadow-xl ring-1 ring-black/5">
        <AnimatePresence mode="wait">
          <motion.img
            key={cur.src}
            src={cur.src}
            alt={cur.caption || "Gallery image"}
            loading="lazy"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

        {cur.caption && (
          <div className="absolute bottom-5 left-5 right-5 md:left-8 md:right-8 flex items-end justify-between gap-4">
            <motion.h4 key={cur.caption} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-white text-lg md:text-2xl font-semibold font-display drop-shadow">{cur.caption}</motion.h4>
            <span className="text-white/80 text-xs md:text-sm font-medium bg-black/30 backdrop-blur px-3 py-1 rounded-full">{idx + 1} / {total}</span>
          </div>
        )}

        <button aria-label="Previous" onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/85 backdrop-blur hover:bg-white text-gray-800 flex items-center justify-center shadow-lg transition-colors"><ChevronLeft className="w-5 h-5" /></button>
        <button aria-label="Next" onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/85 backdrop-blur hover:bg-white text-gray-800 flex items-center justify-center shadow-lg transition-colors"><ChevronRight className="w-5 h-5" /></button>
      </div>

      {/* Thumbnails */}
      <div className="mt-4 grid grid-cols-4 md:grid-cols-6 gap-2 md:gap-3">
        {images.map((img, i) => (
          <button key={img.src} onClick={() => setIdx(i)} className={`relative aspect-[4/3] rounded-lg overflow-hidden ring-2 transition-all ${i === idx ? "ring-green-500 scale-[1.02]" : "ring-transparent hover:ring-green-200 opacity-80 hover:opacity-100"}`} aria-label={`Show image ${i + 1}`}>
            <img src={img.src} alt="thumb" loading="lazy" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

function SliderControls({ idx, total, onPrev, onNext, onDot }) {
  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      <button onClick={onPrev} aria-label="Previous" className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-green-50 hover:border-green-300 flex items-center justify-center transition-colors"><ChevronLeft className="w-4 h-4" /></button>
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <button key={i} onClick={() => onDot(i)} aria-label={`Slide ${i + 1}`} className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-green-600" : "w-1.5 bg-gray-300 hover:bg-gray-400"}`} />
        ))}
      </div>
      <button onClick={onNext} aria-label="Next" className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-green-50 hover:border-green-300 flex items-center justify-center transition-colors"><ChevronRight className="w-4 h-4" /></button>
    </div>
  );
}
