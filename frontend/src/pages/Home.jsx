import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Dna, BarChart3, Users, GraduationCap, Cpu, Cloud, Terminal, Briefcase, BookOpen, Presentation, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";
import HomeHero from "../components/home/HomeHero";
import StatsBar from "../components/common/StatsBar";
import SectionHeader from "../components/common/SectionHeader";
import ClientsMarquee from "../components/common/ClientsMarquee";
import TestimonialsCarousel from "../components/common/TestimonialsCarousel";
import CTABanner from "../components/common/CTABanner";
import { SERVICES, SOLUTIONS, PUBLICATIONS, PUBLISHERS, EDUCATION_PROGRAMS, SITE } from "../data/mock";

const iconMap = { Dna, BarChart3, Users, GraduationCap, Cpu, Cloud, Terminal, Briefcase, BookOpen, Presentation };

function ServiceCard({ s, i }) {
  const Icon = iconMap[s.icon] || Dna;
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group relative bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 hover:border-green-200 transition-all">
      <div className="w-14 h-14 rounded-xl bg-green-50 group-hover:bg-green-100 flex items-center justify-center mb-4 transition-colors">
        <Icon className="w-6 h-6 text-green-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{s.short}</p>
      <Link to="/genomics-services" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-green-700 group-hover:gap-2 transition-all">Know More <ArrowRight className="w-4 h-4" /></Link>
    </motion.div>
  );
}

export default function Home() {
  const solutionIcons = { "genome-station": Cpu, gstack: Cloud, sqit: Terminal };
  const latestPubs = PUBLICATIONS.slice(0, 3);

  return (
    <>
      <Helmet>
        <title>Bionivid Technology — Advancing Genomics through Data & Innovation</title>
        <meta name="description" content="Bionivid is your trusted research partner in genomics and NGS data analytics since 2011. Explore our services, solutions and publications." />
        <meta property="og:title" content="Bionivid Technology — Genomics & Bioinformatics" />
        <meta property="og:description" content="End-to-end genomics services, bioinformatics analysis, and cutting-edge solutions like Genome Station, SQIT and GStack." />
      </Helmet>

      <HomeHero />

      {/* Stats - overlaps hero */}
      <div className="container-x -mt-16 md:-mt-14 relative z-10">
        <StatsBar variant="dark" />
      </div>

      {/* About Bionivid */}
      <section className="section-y">
        <div className="container-x grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-0.5 w-8 bg-green-600" />
              <span className="text-xs font-semibold text-green-700 uppercase tracking-widest">About Bionivid</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 leading-tight">Your trusted research partner in <span className="text-gradient-green">genomics</span></h2>
            <div className="mt-5 space-y-4 text-gray-600 leading-relaxed text-[15px]">
              <p>Bionivid is your trusted research partner for genomics and NGS application-based data analytics. Our mission is to actively collaborate on your research, providing timely solutions and scientific insights.</p>
              <p>With advanced bioinformatics software (SQIT) and cutting-edge hardware (Genome Station), we offer tailored solutions for research projects, leveraging our extensive genomics expertise. As a research collaborator, you will have transparent access to in-house developed protocols, commercial kits, and reagents required for major projects.</p>
            </div>
            <Button asChild size="lg" className="mt-6 bg-green-600 hover:bg-green-700 text-white rounded-full px-6">
              <Link to="/about">Learn More About Us <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-3 grid-rows-2 gap-3 h-[380px]">
            <img src="https://images.pexels.com/photos/15202224/pexels-photo-15202224.jpeg" alt="Bionivid Office" className="col-span-2 row-span-2 w-full h-full object-cover rounded-2xl" />
            <img src="https://images.pexels.com/photos/8533087/pexels-photo-8533087.jpeg" alt="Lab" className="w-full h-full object-cover rounded-2xl" />
            <img src="https://images.pexels.com/photos/5945799/pexels-photo-5945799.jpeg" alt="Team" className="w-full h-full object-cover rounded-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="section-y bg-gradient-to-b from-white to-green-50/40">
        <div className="container-x">
          <SectionHeader eyebrow="Our Services" title="What We" accent="Offer" description="End-to-end genomics services powered by advanced technologies and scientific expertise." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s, i) => <ServiceCard key={s.slug} s={s} i={i} />)}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeader eyebrow="Our Genomics Solutions" title="Purpose-built for" accent="Research Labs" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SOLUTIONS.map((s, i) => {
              const Icon = solutionIcons[s.slug] || Dna;
              return (
                <motion.div key={s.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group bg-white border border-gray-100 hover:border-green-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                  <div className="aspect-[16/10] bg-gradient-to-br from-green-50 to-green-100/40 flex items-center justify-center overflow-hidden">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-green-100 text-green-700 flex items-center justify-center"><Icon className="w-5 h-5" /></div>
                      <h3 className="text-lg font-semibold text-gray-900">{s.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.description}</p>
                    {s.slug === "sqit" ? (
                      <a href="https://sqit.online" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-green-700 group-hover:gap-2 transition-all">Learn More <ArrowRight className="w-4 h-4" /></a>
                    ) : (
                      <Link to={`/genomics-solutions#${s.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-green-700 group-hover:gap-2 transition-all">Learn More <ArrowRight className="w-4 h-4" /></Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* NiviLabs promo */}
      <section className="container-x">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 p-8 md:p-12 shadow-xl">
          <div aria-hidden className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">A Bionivid Product</span>
              <h2 className="text-white text-3xl md:text-4xl font-bold font-display leading-tight">niviLabs — Premium reagents, engineered for reproducibility.</h2>
              <p className="text-green-50/90 mt-3 max-w-lg">Browse our catalog of high-quality enzymes, kits, reagents, consumables and lab instruments — backed by a seamless one-click RFQ system.</p>
              <Button asChild size="lg" className="mt-6 bg-white text-green-700 hover:bg-green-50 rounded-full px-6">
                <a href="https://nivilabs.bionivid.com" target="_blank" rel="noopener noreferrer">Visit niviLabs <ArrowRight className="w-4 h-4 ml-1" /></a>
              </Button>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="grid grid-cols-2 gap-3">
                {["Enzymes", "Reagents", "Extraction Kits", "Consumables"].map((f) => (
                  <div key={f} className="bg-white/10 backdrop-blur border border-white/15 rounded-xl p-4">
                    <CheckCircle2 className="w-5 h-5 text-green-200 mb-2" />
                    <p className="text-sm text-white font-medium">{f}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Research & Publications */}
      <section className="section-y">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-1 bg-green-50/60 rounded-2xl p-6 md:p-8 border border-green-100">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-0.5 w-8 bg-green-600" />
                <span className="text-xs font-semibold text-green-700 uppercase tracking-widest">Research & Publications</span>
              </div>
              <div className="text-5xl md:text-6xl font-extrabold font-display text-gray-900">250+</div>
              <p className="text-sm text-gray-600 mt-1 mb-5">Publications across leading journals</p>
              <Button asChild className="bg-green-600 hover:bg-green-700 rounded-full"><Link to="/publications">View All Publications <ArrowRight className="w-4 h-4 ml-1" /></Link></Button>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              {latestPubs.map((p, i) => (
                <motion.article key={p.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-green-200 hover:shadow-lg transition-all">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-green-700">{p.publisher}</div>
                  <div className="mt-2 text-xs text-gray-500 border-b border-gray-100 pb-2">{p.publisher} | {p.year}</div>
                  <h4 className="mt-3 text-sm font-semibold text-gray-900 leading-snug line-clamp-4">{p.title}</h4>
                  <a href={p.link} className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-green-700">Read More <ArrowRight className="w-3.5 h-3.5" /></a>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Publishers strip */}
          <div className="mt-10 rounded-2xl border border-gray-100 bg-white px-6 py-5 flex flex-wrap items-center justify-around gap-6">
            {PUBLISHERS.map((p) => (
              <span key={p} className="text-gray-500 font-semibold text-sm md:text-base tracking-wide hover:text-green-700 transition-colors">{p}</span>
            ))}
          </div>
        </div>
      </section>

      <ClientsMarquee title="Trusted by leading research institutions" />
      <TestimonialsCarousel />

      <div className="pb-16"><CTABanner title="Ready to accelerate your research?" subtitle="Connect with our genomics experts and bring your ideas to life." /></div>
    </>
  );
}
