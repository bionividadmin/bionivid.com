import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TESTIMONIALS } from "../../data/mock";

export default function TestimonialsCarousel() {
  const [idx, setIdx] = useState(0);
  const perView = 3;
  const total = TESTIMONIALS.length;
  const next = () => setIdx((i) => (i + 1) % total);
  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const visible = Array.from({ length: perView }).map((_, i) => TESTIMONIALS[(idx + i) % total]);

  return (
    <section className="section-y bg-white">
      <div className="container-x">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-0.5 w-8 bg-green-600" />
            <span className="text-xs font-semibold text-green-700 uppercase tracking-widest">Testimonials</span>
            <span className="h-0.5 w-8 bg-green-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900">What Researchers Say</h2>
        </div>

        <div className="relative">
          <div className="hidden md:grid md:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {visible.map((t, i) => (
                <motion.article key={t.name + idx + i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ delay: i * 0.06 }} className="bg-green-50/60 hover:bg-green-50 border border-green-100 rounded-2xl p-6 flex flex-col">
                  <Quote className="w-6 h-6 text-green-600 mb-3" />
                  <div className="flex gap-0.5 mb-3">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="w-3.5 h-3.5 fill-green-600 text-green-600" />)}</div>
                  <p className="text-gray-700 text-sm leading-relaxed flex-1">{t.quote}</p>
                  <div className="mt-5 pt-4 border-t border-green-100">
                    <p className="font-semibold text-gray-900 text-sm">— {t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {/* Mobile single view */}
          <div className="md:hidden">
            <AnimatePresence mode="wait">
              <motion.article key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-green-50/60 border border-green-100 rounded-2xl p-6">
                <Quote className="w-6 h-6 text-green-600 mb-3" />
                <p className="text-gray-700 text-sm leading-relaxed">{TESTIMONIALS[idx].quote}</p>
                <div className="mt-5 pt-4 border-t border-green-100">
                  <p className="font-semibold text-gray-900 text-sm">— {TESTIMONIALS[idx].name}</p>
                  <p className="text-xs text-gray-500">{TESTIMONIALS[idx].role}</p>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            <button onClick={prev} aria-label="Previous" className="w-10 h-10 rounded-full border border-gray-200 hover:bg-green-50 hover:border-green-300 flex items-center justify-center transition-colors"><ChevronLeft className="w-4 h-4 text-gray-700" /></button>
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} aria-label={`Slide ${i + 1}`} className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-green-600" : "w-1.5 bg-gray-300 hover:bg-gray-400"}`} />
              ))}
            </div>
            <button onClick={next} aria-label="Next" className="w-10 h-10 rounded-full border border-gray-200 hover:bg-green-50 hover:border-green-300 flex items-center justify-center transition-colors"><ChevronRight className="w-4 h-4 text-gray-700" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
