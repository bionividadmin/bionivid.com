import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { HERO_SLIDES as MOCK } from "../../data/mock";
import { Button } from "../ui/button";
import useContent from "../../hooks/useContent";

export default function HomeHero() {
  const { data: HERO_SLIDES } = useContent("hero-slides", MOCK);
  const [idx, setIdx] = useState(0);
  const total = HERO_SLIDES?.length || 0;
  const next = () => setIdx((i) => (total ? (i + 1) % total : 0));
  const prev = () => setIdx((i) => (total ? (i - 1 + total) % total : 0));
  const nav = useNavigate();

  useEffect(() => {
    const id = setInterval(next, 6500);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const s = HERO_SLIDES && HERO_SLIDES.length ? HERO_SLIDES[idx % HERO_SLIDES.length] : null;
  if (!s) return <section className="min-h-[40vh]" />;
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-green-50/70 via-white to-white dna-pattern">
      <div aria-hidden className="absolute left-1/2 top-8 w-56 opacity-25 hidden lg:block">
        <svg viewBox="0 0 60 500" className="w-full text-green-500" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M10 0 C 50 40, 10 80, 50 120 S 10 200, 50 240 S 10 320, 50 360 S 10 440, 50 480" />
          <path d="M50 0 C 10 40, 50 80, 10 120 S 50 200, 10 240 S 50 320, 10 360 S 50 440, 10 480" />
          {Array.from({ length: 16 }).map((_, i) => (<line key={i} x1="10" y1={i * 30 + 10} x2="50" y2={i * 30 + 10} />))}
        </svg>
      </div>

      <div className="container-x pt-12 md:pt-16 pb-24 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 mb-4 bg-green-100/60 border border-green-200 text-green-800 px-3 py-1.5 rounded-full text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" /> {s.eyebrow}
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold font-display leading-[1.02] text-gray-900">
                {s.titleTop}<br />
                <span className="text-gradient-green">{s.titleAccent}</span><br />
                <span className="text-gray-800">{s.titleBottom}</span>
              </h1>
              <p className="mt-5 text-base md:text-lg text-gray-600 max-w-xl leading-relaxed">{s.body}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                {s.ctas.map((c) => c.href ? (
                  <Button key={c.label} asChild size="lg" className={c.primary ? "bg-green-600 hover:bg-green-700 text-white rounded-full px-6" : "bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 rounded-full px-6"}>
                    <a href={c.href} target="_blank" rel="noopener noreferrer">{c.label}<ArrowRight className="w-4 h-4 ml-1" /></a>
                  </Button>
                ) : (
                  <Button key={c.label} asChild size="lg" className={c.primary ? "bg-green-600 hover:bg-green-700 text-white rounded-full px-6" : "bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 rounded-full px-6"}>
                    <Link to={c.to}>{c.label}<ArrowRight className="w-4 h-4 ml-1" /></Link>
                  </Button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div key={"img" + idx} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.6 }} className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                <img src={s.image} alt={s.titleAccent} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-green-900/20 via-transparent to-transparent pointer-events-none" />
              </div>
              <div aria-hidden className="absolute -bottom-6 -right-6 w-40 h-40 rounded-3xl bg-green-500/10 -z-10 hidden md:block" />
              <div aria-hidden className="absolute -top-4 -left-4 w-24 h-24 rounded-3xl border-2 border-green-200 -z-10 hidden md:block" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* controls */}
        <div className="flex items-center gap-3 mt-8">
          <button onClick={prev} aria-label="Previous slide" className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-green-50 hover:border-green-300 flex items-center justify-center transition-colors"><ChevronLeft className="w-4 h-4" /></button>
          <div className="flex gap-1.5">
            {HERO_SLIDES.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} aria-label={`Slide ${i + 1}`} className={`h-1.5 rounded-full transition-all ${i === idx ? "w-10 bg-green-600" : "w-1.5 bg-gray-300 hover:bg-gray-400"}`} />
            ))}
          </div>
          <button onClick={next} aria-label="Next slide" className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-green-50 hover:border-green-300 flex items-center justify-center transition-colors"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
    </section>
  );
}
