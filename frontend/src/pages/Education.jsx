import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Briefcase, BookOpen, Presentation, GraduationCap, ArrowRight, CheckCircle2 } from "lucide-react";
import PageHero from "../components/common/PageHero";
import SectionHeader from "../components/common/SectionHeader";
import CTABanner from "../components/common/CTABanner";
import { Button } from "../components/ui/button";
import { EDUCATION_PROGRAMS } from "../data/mock";

const iconMap = { Briefcase, BookOpen, Presentation, GraduationCap };

const benefits = [
  "Real-world genomics datasets & pipelines",
  "Mentorship from senior bioinformaticians",
  "Certificate on successful completion",
  "Publication-ready project outputs",
  "Access to Bionivid's lab infrastructure",
  "Career support & industry connect",
];

export default function Education() {
  return (
    <>
      <Helmet>
        <title>The Genome Education — Bionivid Technology</title>
        <meta name="description" content="Training the next generation of genomics researchers through internships, dissertations, workshops and industrial training programs." />
      </Helmet>

      <PageHero
        eyebrow="Education"
        title="The Genome"
        accent="Education"
        description="Bridging the gap between science and society through structured training and outreach programs."
        image="https://images.unsplash.com/photo-1524178232363-1fb2b075b655"
        actions={<>
          <Button asChild className="bg-green-600 hover:bg-green-700 rounded-full px-6"><Link to="/contact">Enroll Now <ArrowRight className="w-4 h-4 ml-1" /></Link></Button>
        </>}
      />

      <section className="section-y">
        <div className="container-x">
          <SectionHeader eyebrow="Our Programs" title="Learning" accent="Pathways" description="Choose the program that fits your journey — from short workshops to long-term dissertations." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {EDUCATION_PROGRAMS.map((p, i) => {
              const Icon = iconMap[p.icon] || GraduationCap;
              return (
                <motion.div key={p.id} id={p.id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 hover:border-green-200 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4"><Icon className="w-5 h-5 text-green-600" /></div>
                  <h3 className="font-semibold text-gray-900">{p.title}</h3>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">{p.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-y bg-gradient-to-b from-green-50/40 to-white">
        <div className="container-x grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <SectionHeader align="left" eyebrow="Why join us" title="Learn with" accent="industry mentors" />
            <ul className="space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm md:text-base text-gray-700"><CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" /> {b}</li>
              ))}
            </ul>
            <Button asChild className="mt-6 bg-green-600 hover:bg-green-700 rounded-full"><Link to="/contact">Talk to Admissions <ArrowRight className="w-4 h-4 ml-1" /></Link></Button>
          </motion.div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
            <img src="https://images.pexels.com/photos/5945799/pexels-photo-5945799.jpeg" alt="Training session" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      <div className="pb-16"><CTABanner title="Ready to start your genomics journey?" subtitle="Apply now for our next batch of programs." ctaLabel="Apply Now" /></div>
    </>
  );
}
