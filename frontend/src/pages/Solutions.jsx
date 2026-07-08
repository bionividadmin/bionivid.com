import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ShieldCheck, Cloud, BarChart3, ArrowRight, MessageSquare, ExternalLink, Cpu, Terminal, CheckCircle2 } from "lucide-react";
import PageHero from "../components/common/PageHero";
import CTABanner from "../components/common/CTABanner";
import ClientsMarquee from "../components/common/ClientsMarquee";
import TestimonialsCarousel from "../components/common/TestimonialsCarousel";
import { Button } from "../components/ui/button";
import { SOLUTIONS, SITE } from "../data/mock";

const slugIcons = { "genome-station": Cpu, gstack: Cloud, sqit: Terminal };

export default function Solutions() {
  return (
    <>
      <Helmet>
        <title>Genomics Solutions — Bionivid Technology</title>
        <meta name="description" content="Innovative software & infrastructure solutions for modern genomics research — Genome Station, GStack, SQIT and more." />
      </Helmet>

      <PageHero
        eyebrow="Solutions"
        title="Genomics"
        accent="Solutions"
        description="Innovative software & infrastructure solutions for modern genomics research."
        image="https://images.pexels.com/photos/6248959/pexels-photo-6248959.jpeg"
        actions={<>
          <Button asChild className="bg-green-600 hover:bg-green-700 rounded-full px-6"><Link to="/contact"><MessageSquare className="w-4 h-4 mr-1" />Talk to Our Team</Link></Button>
          <Button asChild variant="outline" className="rounded-full px-6 border-gray-200"><a href={SITE.nivilabsUrl} target="_blank" rel="noopener noreferrer">Visit NiviLabs <ExternalLink className="w-4 h-4 ml-1" /></a></Button>
        </>}
      />

      {/* 3 highlight cards */}
      <section className="container-x py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: ShieldCheck, title: "End-to-End Solutions", body: "From data generation to biological insights, our solutions cover the entire genomics workflow with integrated platforms and advanced analytics." },
            { icon: Cloud, title: "All-in-One", body: "Unified solutions for sequencing, storage, analysis and collaboration — everything you need in one powerful ecosystem." },
            { icon: BarChart3, title: "Powered by AI & Advanced Tech", body: "Built with AI-driven analytics, high-performance computing and scalable architecture for faster discoveries." },
          ].map((c, i) => (
            <motion.div key={c.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-white border border-gray-100 rounded-2xl p-6 md:p-7 text-center hover:shadow-xl hover:-translate-y-1 hover:border-green-200 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-green-50 mx-auto flex items-center justify-center mb-4"><c.icon className="w-6 h-6 text-green-600" /></div>
              <h3 className="font-bold text-green-700 uppercase text-sm tracking-wider">{c.title}</h3>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">{c.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Solutions detailed */}
      {SOLUTIONS.map((sol, idx) => {
        const Icon = slugIcons[sol.slug] || Cpu;
        const reverse = idx % 2 === 1;
        return (
          <section key={sol.slug} id={sol.slug} className={`py-14 md:py-16 ${idx % 2 === 0 ? "bg-green-50/40" : "bg-white"}`}>
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
      })}

      {/* NiviLabs strip */}
      <section className="container-x py-14">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 to-emerald-600 p-8 md:p-12">
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">Featured Platform</span>
              <h3 className="text-white text-3xl md:text-4xl font-bold font-display">NiviLabs — Cloud Genomics Analytics</h3>
              <p className="text-green-50/90 mt-3">Analyze, collaborate and store NGS data on the cloud with automated pipelines and enterprise-grade security.</p>
            </div>
            <div className="md:justify-self-end">
              <Button asChild size="lg" className="bg-white text-green-700 hover:bg-green-50 rounded-full px-6"><a href={SITE.nivilabsUrl} target="_blank" rel="noopener noreferrer">Launch NiviLabs <ExternalLink className="w-4 h-4 ml-1" /></a></Button>
            </div>
          </div>
        </div>
      </section>

      <ClientsMarquee title="Our Clients" />
      <TestimonialsCarousel />
      <div className="pb-16"><CTABanner /></div>
    </>
  );
}
