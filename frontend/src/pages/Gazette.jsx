import React, { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Newspaper, Download, Calendar, Mail, ArrowRight, BookOpen } from "lucide-react";
import PageHero from "../components/common/PageHero";
import { Button } from "../components/ui/button";

const EDITIONS = [
  {
    id: "2025-q2",
    title: "The Bionivid Gazette — Q2 2025",
    date: "June 2025",
    cover: "https://images.pexels.com/photos/13014236/pexels-photo-13014236.jpeg",
    highlights: [
      "Single-cell RNA-seq milestones this quarter",
      "Case study: Population genomics in Indian buffalo",
      "New SQIT.online pipelines released",
      "Upcoming workshops calendar",
    ],
  },
  {
    id: "2025-q1",
    title: "The Bionivid Gazette — Q1 2025",
    date: "March 2025",
    cover: "https://images.pexels.com/photos/25626587/pexels-photo-25626587.jpeg",
    highlights: [
      "Metagenomics of paddy rhizosphere \u2014 our approach",
      "GStack v2 announcement",
      "Featured publications in Nature & Springer",
      "Researcher spotlight",
    ],
  },
  {
    id: "2024-q4",
    title: "The Bionivid Gazette — Q4 2024",
    date: "December 2024",
    cover: "https://images.pexels.com/photos/8533087/pexels-photo-8533087.jpeg",
    highlights: [
      "Year in review \u2014 5,000+ projects executed",
      "New niviLabs reagent launches",
      "Client stories from ICMR & ICAR",
      "Genome Education milestones",
    ],
  },
  {
    id: "2024-q3",
    title: "The Bionivid Gazette — Q3 2024",
    date: "September 2024",
    cover: "https://images.pexels.com/photos/9243559/pexels-photo-9243559.jpeg",
    highlights: [
      "Deep dive: Long-read sequencing at Bionivid",
      "SQIT.ai release notes",
      "Community events \u2014 workshops & conferences",
      "Sample-prep tips from our wet lab",
    ],
  },
];

export default function Gazette() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3500);
  };

  const [featured, ...rest] = EDITIONS;

  return (
    <>
      <Helmet>
        <title>Bionivid Gazette — Quarterly Newsletter</title>
        <meta name="description" content="The Bionivid Gazette — quarterly editions featuring case studies, publications, product updates and community news from Bionivid Technology." />
      </Helmet>

      <PageHero
        eyebrow="Newsletter"
        title="Bionivid"
        accent="Gazette"
        description="Our quarterly newsletter — case studies, publications, product updates and community stories, curated by the Bionivid team."
        image="https://images.pexels.com/photos/13014236/pexels-photo-13014236.jpeg"
        actions={<>
          <Button asChild className="bg-green-600 hover:bg-green-700 rounded-full px-6"><a href="#latest"><Newspaper className="w-4 h-4 mr-1" />Read Latest Edition</a></Button>
          <Button asChild variant="outline" className="rounded-full px-6 border-gray-200"><a href="#subscribe"><Mail className="w-4 h-4 mr-1" />Subscribe</a></Button>
        </>}
      />

      {/* Featured (latest) edition */}
      <section id="latest" className="section-y">
        <div className="container-x">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
            <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
              <img src={featured.cover} alt={featured.title} className="w-full h-full object-cover" loading="lazy" />
              <span className="absolute top-3 left-3 bg-green-600 text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Latest</span>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-green-700 text-xs font-semibold uppercase tracking-widest">
                <Calendar className="w-3.5 h-3.5" /> {featured.date}
              </div>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold font-display text-gray-900 leading-tight">{featured.title}</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">In this edition, we round up the most important highlights from the Bionivid ecosystem &mdash; new science, product launches and community moments.</p>
              <ul className="mt-5 space-y-2.5">
                {featured.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-green-600 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button className="bg-green-600 hover:bg-green-700 rounded-full px-5"><BookOpen className="w-4 h-4 mr-1" /> Read Online</Button>
                <Button variant="outline" className="rounded-full px-5 border-gray-200"><Download className="w-4 h-4 mr-1" /> Download PDF</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Past editions */}
      <section className="section-y bg-green-50/40">
        <div className="container-x">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-0.5 w-8 bg-green-600" />
              <span className="text-xs font-semibold text-green-700 uppercase tracking-widest">Past Editions</span>
              <span className="h-0.5 w-8 bg-green-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900">Browse the <span className="text-gradient-green">Archive</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((ed, i) => (
              <motion.article key={ed.id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-green-200 transition-all flex flex-col">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={ed.cover} alt={ed.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="inline-flex items-center gap-2 text-green-700 text-xs font-semibold uppercase tracking-widest"><Calendar className="w-3.5 h-3.5" /> {ed.date}</div>
                  <h3 className="mt-2 font-semibold text-gray-900 leading-snug">{ed.title}</h3>
                  <ul className="mt-3 space-y-1.5 flex-1">
                    {ed.highlights.slice(0, 3).map((h) => (
                      <li key={h} className="text-xs text-gray-600 leading-snug relative pl-4 before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-green-500">{h}</li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center justify-between gap-2 pt-3 border-t border-gray-100">
                    <button className="inline-flex items-center gap-1 text-sm font-medium text-green-700 hover:gap-2 transition-all">Read <ArrowRight className="w-3.5 h-3.5" /></button>
                    <button aria-label="Download PDF" className="w-8 h-8 rounded-full bg-green-50 text-green-700 hover:bg-green-100 flex items-center justify-center transition-colors"><Download className="w-4 h-4" /></button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section id="subscribe" className="container-x pb-16 pt-4">
        <div className="rounded-3xl bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 md:p-10 relative overflow-hidden">
          <div aria-hidden className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-3 py-1.5 rounded-full text-xs font-semibold mb-3"><Mail className="w-3.5 h-3.5" /> Never miss an edition</div>
              <h3 className="text-white text-2xl md:text-3xl font-bold font-display">Get the Bionivid Gazette in your inbox</h3>
              <p className="text-green-50/90 mt-2 text-sm md:text-base">Delivered quarterly. Free. No spam &mdash; ever.</p>
            </div>
            <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-2">
              <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-full bg-white/95 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white text-sm" />
              <Button type="submit" className="bg-white text-green-700 hover:bg-green-50 rounded-full px-6">Subscribe <ArrowRight className="w-4 h-4 ml-1" /></Button>
            </form>
          </div>
          {subscribed && <p className="relative mt-4 text-white text-sm">Thanks for subscribing &mdash; look out for the next Gazette.</p>}
        </div>
      </section>
    </>
  );
}
