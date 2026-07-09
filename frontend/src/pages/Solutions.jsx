import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ShieldCheck, Cloud, ArrowRight, MessageSquare, Cpu, Terminal, CheckCircle2, Globe, FlaskConical, Sparkles } from "lucide-react";
import PageHero from "../components/common/PageHero";
import CTABanner from "../components/common/CTABanner";
import ClientsMarquee from "../components/common/ClientsMarquee";
import TestimonialsCarousel from "../components/common/TestimonialsCarousel";
import { Button } from "../components/ui/button";
import { SOLUTIONS as MOCK_SOLUTIONS } from "../data/mock";
import useContent from "../hooks/useContent";

const slugIcons = {
  "genome-station": Cpu,
  "gstack": Cloud,
  "sqit": Terminal,
  "sqit-online": Globe,
  "nivilabs": FlaskConical,
};

// Solutions are fetched from the CMS. Local fallback is in data/mock.js.

function SolutionBlock({ sol, idx }) {
  const Icon = slugIcons[sol.slug] || Cpu;
  const reverse = idx % 2 === 1;
  return (
    <section id={sol.slug} className={`py-14 md:py-16 ${idx % 2 === 0 ? "bg-green-50/40" : "bg-white"}`}>
      <div className="container-x">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 items-center ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
          <div className="grid grid-cols-1 gap-3 md:gap-4 md:order-1">
            {sol.features.slice(0, 3).map((f) => (
              <div key={f} className="bg-white rounded-xl border border-gray-100 p-4 flex items-start gap-3 hover:border-green-200 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 leading-snug">{f}</p>
              </div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="text-center md:order-2">
            <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-700 mx-auto flex items-center justify-center mb-4"><Icon className="w-8 h-8" /></div>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-green-700">{sol.title}</h2>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{sol.tagline}</p>
            <div className="my-5 mx-auto max-w-sm aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <img src={sol.image} alt={sol.title} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed max-w-md mx-auto">{sol.description}</p>
            {sol.externalUrl && (
              <Button asChild className="mt-5 bg-green-600 hover:bg-green-700 rounded-full px-6">
                <a href={sol.externalUrl} target="_blank" rel="noopener noreferrer">Visit {sol.title} <ArrowRight className="w-4 h-4 ml-1" /></a>
              </Button>
            )}
          </motion.div>

          <div className="grid grid-cols-1 gap-3 md:gap-4 md:order-3">
            {sol.features.slice(3, 6).map((f) => (
              <div key={f} className="bg-white rounded-xl border border-gray-100 p-4 flex items-start gap-3 hover:border-green-200 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 leading-snug">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Solutions() {
  const { data: apiSolutions } = useContent("solutions", MOCK_SOLUTIONS);
  const allSolutions = (apiSolutions && apiSolutions.length) ? apiSolutions : MOCK_SOLUTIONS;
  return (
    <>
      <Helmet>
        <title>Genomics Solutions — Bionivid Technology</title>
        <meta name="description" content="Innovative software, infrastructure and reagent solutions for modern genomics research — Genome Station, GStack, SQIT, SQIT.online and niviLabs." />
      </Helmet>

      <PageHero
        eyebrow="Solutions"
        title="Genomics"
        accent="Solutions"
        description="Software, infrastructure and reagent solutions purpose-built for modern genomics research."
        image="https://images.pexels.com/photos/6248959/pexels-photo-6248959.jpeg"
        actions={<>
          <Button asChild className="bg-green-600 hover:bg-green-700 rounded-full px-6"><Link to="/contact"><MessageSquare className="w-4 h-4 mr-1" />Talk to Our Team</Link></Button>
        </>}
      />

      {/* Quick jump nav */}
      <section className="container-x -mt-6 relative z-10">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm px-4 py-3 flex flex-wrap gap-2 md:gap-4 justify-center text-sm">
          {allSolutions.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="px-3 py-1.5 rounded-full text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium transition-colors">{s.title}</a>
          ))}
        </div>
      </section>

      {/* 3 highlight cards */}
      <section className="container-x py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: ShieldCheck, title: "End-to-End Solutions", body: "From data generation to biological insights, our solutions cover the entire genomics workflow with integrated platforms and advanced analytics." },
            { icon: Cloud, title: "All-in-One", body: "Unified solutions for sequencing, storage, analysis and collaboration — everything you need in one powerful ecosystem." },
            { icon: Sparkles, title: "Powered by AI & Advanced Tech", body: "Built with AI-driven analytics, high-performance computing and scalable architecture for faster discoveries." },
          ].map((c, i) => (
            <motion.div key={c.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-white border border-gray-100 rounded-2xl p-6 md:p-7 text-center hover:shadow-xl hover:-translate-y-1 hover:border-green-200 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-green-50 mx-auto flex items-center justify-center mb-4"><c.icon className="w-6 h-6 text-green-600" /></div>
              <h3 className="font-bold text-green-700 uppercase text-sm tracking-wider">{c.title}</h3>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">{c.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* All solutions rendered in the same layout */}
      {allSolutions.map((sol, idx) => (
        <SolutionBlock key={sol.slug} sol={sol} idx={idx} />
      ))}

      <ClientsMarquee title="Our Clients" />
      <TestimonialsCarousel />
      <div className="pb-16"><CTABanner /></div>
    </>
  );
}
