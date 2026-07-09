import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ShieldCheck, Cloud, ArrowRight, MessageSquare, Cpu, Terminal, CheckCircle2, Globe, Server, FileSearch, FlaskConical, Droplets, Package, Beaker, Sparkles, Target, Compass } from "lucide-react";
import PageHero from "../components/common/PageHero";
import SectionHeader from "../components/common/SectionHeader";
import CTABanner from "../components/common/CTABanner";
import ClientsMarquee from "../components/common/ClientsMarquee";
import TestimonialsCarousel from "../components/common/TestimonialsCarousel";
import { Button } from "../components/ui/button";
import { SOLUTIONS, NIVILABS, SQIT_ONLINE } from "../data/mock";

const slugIcons = { "genome-station": Cpu, gstack: Cloud, sqit: Terminal };
const catIcons = { FlaskConical, Droplets, Package, Beaker };

export default function Solutions() {
  return (
    <>
      <Helmet>
        <title>Genomics Solutions — Bionivid Technology</title>
        <meta name="description" content="Innovative software, infrastructure and reagent solutions for modern genomics research — Genome Station, GStack, SQIT, SQIT.online and NiviLabs." />
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
          {[
            { id: "genome-station", label: "Genome Station" },
            { id: "gstack", label: "GStack" },
            { id: "sqit", label: "SQIT Workbench" },
            { id: "sqit-online", label: "SQIT.online" },
            { id: "nivilabs", label: "NiviLabs" },
          ].map((it) => (
            <a key={it.id} href={`#${it.id}`} className="px-3 py-1.5 rounded-full text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium transition-colors">{it.label}</a>
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

      {/* SQIT.online */}
      <section id="sqit-online" className="py-16 md:py-20 bg-gradient-to-b from-white to-green-50/60">
        <div className="container-x">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-0.5 w-8 bg-green-600" />
              <span className="text-xs font-semibold text-green-700 uppercase tracking-widest">Cloud Analysis Gateway</span>
              <span className="h-0.5 w-8 bg-green-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900">
              <span className="text-gradient-green">{SQIT_ONLINE.title}</span>
            </h2>
            <p className="mt-2 text-sm md:text-base text-gray-500 uppercase tracking-wider">{SQIT_ONLINE.tagline}</p>
            <p className="mt-5 max-w-3xl mx-auto text-gray-600 leading-relaxed">{SQIT_ONLINE.intro}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SQIT_ONLINE.steps.map((s, i) => {
              const StepIcon = [Globe, Server, FileSearch][i] || Globe;
              return (
                <motion.div key={s.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="relative bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-green-200 transition-all">
                  <div className="absolute -top-3 -left-3 w-10 h-10 rounded-xl bg-green-600 text-white flex items-center justify-center font-bold shadow-md">{i + 1}</div>
                  <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center mb-4 ml-6"><StepIcon className="w-5 h-5" /></div>
                  <h3 className="font-semibold text-gray-900">{s.title}</h3>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">{s.body}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {SQIT_ONLINE.perks.map((p) => (
              <div key={p} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                <p className="text-sm text-gray-700">{p}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 rounded-full px-6"><Link to="/contact">Submit an Analysis Request <ArrowRight className="w-4 h-4 ml-1" /></Link></Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-6 border-gray-200"><a href={SQIT_ONLINE.url} target="_blank" rel="noopener noreferrer">Visit SQIT.online</a></Button>
          </div>
        </div>
      </section>

      {/* NIVILABS - big premium section */}
      <section id="nivilabs" className="relative overflow-hidden">
        {/* Hero band */}
        <div className="relative bg-gradient-to-br from-green-700 via-green-600 to-emerald-600 text-white py-16 md:py-20">
          <div aria-hidden className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
          <div aria-hidden className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-emerald-300/20 blur-3xl" />
          <div className="container-x relative">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-3">
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur border border-white/20 px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
                  <Sparkles className="w-3.5 h-3.5" /> A Bionivid Product
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold font-display leading-tight">
                  <span className="text-white">niviLabs</span>
                </h2>
                <p className="text-lg md:text-xl text-green-50 mt-3 font-medium">{NIVILABS.tagline}</p>
                <p className="mt-5 text-green-50/90 leading-relaxed max-w-2xl">{NIVILABS.intro}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild size="lg" className="bg-white text-green-700 hover:bg-green-50 rounded-full px-6"><a href={NIVILABS.url} target="_blank" rel="noopener noreferrer">Browse Catalog <ArrowRight className="w-4 h-4 ml-1" /></a></Button>
                  <Button asChild size="lg" variant="outline" className="rounded-full px-6 bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white"><Link to="/contact">Request a Quote</Link></Button>
                </div>
              </div>
              <div className="md:col-span-2 hidden md:block">
                <div className="grid grid-cols-2 gap-3">
                  {NIVILABS.categories.slice(0, 4).map((c) => {
                    const Icon = catIcons[c.icon] || FlaskConical;
                    return (
                      <div key={c.title} className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-4">
                        <Icon className="w-6 h-6 text-white mb-2" />
                        <p className="text-white font-semibold text-sm">{c.title}</p>
                        <p className="text-green-50/70 text-xs mt-1">{c.tags[0]}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="bg-gradient-to-br from-green-700 to-emerald-700 text-white py-14 md:py-16">
          <div className="container-x grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-6 md:p-8">
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-4"><Compass className="w-6 h-6 text-white" /></div>
              <h3 className="text-2xl font-bold font-display">Our Vision</h3>
              <p className="mt-3 text-green-50/95 leading-relaxed text-sm md:text-base">{NIVILABS.visionMission.vision}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-6 md:p-8">
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-4"><Target className="w-6 h-6 text-white" /></div>
              <h3 className="text-2xl font-bold font-display">Our Mission</h3>
              <p className="mt-3 text-green-50/95 leading-relaxed text-sm md:text-base">{NIVILABS.visionMission.mission}</p>
            </motion.div>
          </div>
        </div>

        {/* Custom inquiry */}
        <div className="container-x py-14 md:py-16">
          <div className="rounded-3xl bg-green-50/70 border border-green-100 p-8 md:p-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold font-display text-gray-900">Can&apos;t find a product? Submit a custom inquiry.</h3>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">Our scientific procurement team can source specialty reagents, OEM consumables, and bulk volumes from validated global suppliers.</p>
            <Button asChild size="lg" className="mt-6 bg-green-600 hover:bg-green-700 rounded-full px-6"><Link to="/contact">Contact Us <ArrowRight className="w-4 h-4 ml-1" /></Link></Button>
          </div>
        </div>
      </section>

      <ClientsMarquee title="Our Clients" />
      <TestimonialsCarousel />
      <div className="pb-16"><CTABanner /></div>
    </>
  );
}
