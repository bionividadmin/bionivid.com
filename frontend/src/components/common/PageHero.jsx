import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

export default function PageHero({ eyebrow, title, accent, description, image, actions, seoTitle, seoDesc }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-green-50/60 via-white to-white dna-pattern">
      {(seoTitle || seoDesc) && (
        <Helmet>
          {seoTitle && <title>{seoTitle}</title>}
          {seoDesc && <meta name="description" content={seoDesc} />}
          {seoTitle && <meta property="og:title" content={seoTitle} />}
          {seoDesc && <meta property="og:description" content={seoDesc} />}
        </Helmet>
      )}
      {/* Decorative helix */}
      <div aria-hidden className="absolute -left-8 top-10 bottom-10 w-24 opacity-20 hidden md:block">
        <svg viewBox="0 0 60 400" className="w-full h-full text-green-500" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 0 C 50 40, 10 80, 50 120 S 10 200, 50 240 S 10 320, 50 360" />
          <path d="M50 0 C 10 40, 50 80, 10 120 S 50 200, 10 240 S 50 320, 10 360" />
          {Array.from({ length: 12 }).map((_, i) => (<line key={i} x1="10" y1={i * 30 + 10} x2="50" y2={i * 30 + 10} strokeWidth="1" />))}
        </svg>
      </div>

      <div className="container-x py-14 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {eyebrow && (
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-0.5 w-8 bg-green-600" />
              <span className="text-xs md:text-sm font-semibold text-green-700 uppercase tracking-widest">{eyebrow}</span>
            </div>
          )}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display leading-[1.05] text-gray-900">
            {title} {accent && <span className="text-gradient-green block md:inline">{accent}</span>}
          </h1>
          {description && <p className="mt-5 text-base md:text-lg text-gray-600 max-w-xl leading-relaxed">{description}</p>}
          {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
        </motion.div>

        {image && (
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
            <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
              <img src={image} alt={title} className="w-full h-full object-cover" loading="eager" />
            </div>
            <div aria-hidden className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-green-500/10 -z-10 hidden md:block" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
