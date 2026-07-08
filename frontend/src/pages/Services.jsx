import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { FlaskConical, Users, ShieldCheck, Clock, BarChart3, ArrowRight, FileText, Dna, Microscope, Activity, Cpu } from "lucide-react";
import PageHero from "../components/common/PageHero";
import SectionHeader from "../components/common/SectionHeader";
import CTABanner from "../components/common/CTABanner";
import ClientsMarquee from "../components/common/ClientsMarquee";
import { Button } from "../components/ui/button";
import { OMICS_CATEGORIES, TECH_PLATFORMS } from "../data/mock";

const omicsIcons = { Dna, Microscope, ShieldCheck, Activity };
const features = [
  { icon: FlaskConical, title: "Cutting-edge Technologies" },
  { icon: Users, title: "Expert Team of Scientists" },
  { icon: ShieldCheck, title: "Quality & Data Integrity" },
  { icon: Clock, title: "On-time Delivery & Support" },
  { icon: BarChart3, title: "Insightful & Actionable Results" },
];

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Genomics Services — Bionivid Technology</title>
        <meta name="description" content="End-to-end genomics and bioinformatics services powered by advanced technologies and scientific expertise." />
      </Helmet>

      <PageHero
        eyebrow="Services"
        title="Genomics"
        accent="Services"
        description="End-to-end genomics and bioinformatics services powered by advanced technologies and scientific expertise."
        image="https://images.pexels.com/photos/7693222/pexels-photo-7693222.jpeg"
        actions={<>
          <Button asChild className="bg-green-600 hover:bg-green-700 rounded-full px-6"><Link to="/contact">Contact Us <ArrowRight className="w-4 h-4 ml-1" /></Link></Button>
          <Button asChild variant="outline" className="rounded-full px-6 border-gray-200"><a href="#platforms"><FileText className="w-4 h-4 mr-1" /> Sample Reports</a></Button>
        </>}
      />

      {/* What we do */}
      <section className="container-x py-12 md:py-16">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-green-50/60 border border-green-100 rounded-3xl p-6 md:p-10">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 relative inline-block">What We Do<span className="block h-0.5 w-16 bg-green-600 mx-auto mt-2" /></h2>
            <p className="mt-4 text-gray-600 leading-relaxed text-[15px]">Our in-house molecular biology research laboratory and advanced computational facility are equipped to meet the needs of multi-omics research. Over the past 13+ years of continuous collaboration with various research labs worldwide, we have continually learned and enhanced our molecular biology and big data analytics skills by handling complex projects using Next-Generation Sequencing (NGS), microarrays, LC-MS, and other advanced technologies in genomics, proteomics, and related domains.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mt-4">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="bg-white rounded-2xl p-4 md:p-5 text-center border border-green-100 hover:border-green-300 hover:shadow-md transition-all">
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto mb-3"><f.icon className="w-5 h-5" /></div>
                <p className="text-xs md:text-sm font-medium text-gray-800 leading-tight">{f.title}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Tech Platforms */}
      <section id="platforms" className="section-y">
        <div className="container-x">
          <SectionHeader eyebrow="Platforms & Services" title="Technology" accent="Platforms & Services" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-stretch">
            <div className="md:col-span-1 bg-green-50/50 rounded-2xl p-6 border border-green-100 flex flex-col justify-center">
              <h3 className="text-2xl font-bold font-display text-green-700 leading-tight">Technology Platforms</h3>
              <div className="my-4 h-0.5 w-10 bg-green-600" />
              <h3 className="text-2xl font-bold font-display text-gray-900 leading-tight">Contract Research Services</h3>
              <p className="text-sm text-gray-600 mt-3">World-class equipment paired with expert scientific execution.</p>
            </div>
            {TECH_PLATFORMS.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-green-200 hover:shadow-lg transition-all">
                <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center overflow-hidden">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-4 text-center">
                  <h4 className="font-bold text-gray-900">{t.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{t.type}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Omics categories */}
      <section className="section-y bg-gradient-to-b from-green-50/40 to-white">
        <div className="container-x">
          <SectionHeader eyebrow="Multi-Omics Services" title="End-to-end" accent="omics workflows" description="From sample prep to insight — across genome, epigenome, microbiome and transcriptome." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {OMICS_CATEGORIES.map((cat, i) => {
              const Icon = omicsIcons[cat.icon] || Dna;
              return (
                <motion.div key={cat.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 hover:border-green-200 hover:shadow-lg transition-all">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="w-14 h-14 rounded-full bg-green-100 text-green-700 flex items-center justify-center mb-3"><Icon className="w-6 h-6" /></div>
                    <h3 className="font-bold text-green-700 tracking-wide">{cat.title}</h3>
                    <span className="block h-0.5 w-8 bg-green-600 mt-2" />
                  </div>
                  <ul className="space-y-2">
                    {cat.items.map((it) => (<li key={it} className="text-sm text-gray-700 relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-green-500">{it}</li>))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <ClientsMarquee title="Our Clients" />
      <div className="pb-16"><CTABanner title="Need a Customized Solution?" subtitle="Talk to our experts to design the right genomics solution for your research." ctaLabel="Get in Touch" /></div>
    </>
  );
}
