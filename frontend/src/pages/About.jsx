import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Handshake, Trophy, Users, BadgeCheck, Linkedin, ArrowRight } from "lucide-react";
import PageHero from "../components/common/PageHero";
import StatsBar from "../components/common/StatsBar";
import SectionHeader from "../components/common/SectionHeader";
import CTABanner from "../components/common/CTABanner";
import ClientsMarquee from "../components/common/ClientsMarquee";
import ImageSlider from "../components/common/ImageSlider";
import { Button } from "../components/ui/button";
import { VALUES as MOCK_VALUES, LEADERSHIP as MOCK_LEAD, ABOUT_GALLERIES as MOCK_GAL } from "../data/mock";
import useContent from "../hooks/useContent";

const valueIcons = { Handshake, Trophy, Users, BadgeCheck };

export default function About() {
  const { data: VALUES } = useContent("values", MOCK_VALUES);
  const { data: LEADERSHIP } = useContent("leadership", MOCK_LEAD);
  const { data: galleriesData } = useContent("about-galleries", MOCK_GAL);
  const ABOUT_GALLERIES = galleriesData || MOCK_GAL;
  const valuesList = VALUES || [];
  const leaders = LEADERSHIP || [];
  return (
    <>
      <Helmet>
        <title>About Us — Bionivid Technology</title>
        <meta name="description" content="Learn about Bionivid Technology — your trusted genomics and bioinformatics research partner since 2011." />
      </Helmet>

      <PageHero
        eyebrow="About Us"
        title="Bionivid"
        accent="Technology"
        description="Your Trusted Research Partner — Since 2011"
        image="https://images.pexels.com/photos/25626587/pexels-photo-25626587.jpeg"
        actions={<>
          <Button asChild className="bg-green-600 hover:bg-green-700 rounded-full px-6"><Link to="/contact">Partner With Us <ArrowRight className="w-4 h-4 ml-1" /></Link></Button>
          <Button asChild variant="outline" className="rounded-full px-6 border-gray-200"><Link to="/publications">Our Publications</Link></Button>
        </>}
      />

      <div className="container-x -mt-10 md:-mt-14 relative z-10"><StatsBar /></div>

      {/* Who we are */}
      <section className="section-y">
        <div className="container-x grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <SectionHeader align="left" eyebrow="Who We Are" title="About" accent="Bionivid" />
            <div className="space-y-4 text-gray-600 leading-relaxed text-[15px]">
              <p><strong className="text-gray-900">Bionivid</strong> is your trusted research partner for genomics and NGS application-based data analytics. Our mission is to actively collaborate on your research, providing timely solutions and scientific insights.</p>
              <p>As pioneers in advanced bioinformatics software (SQIT) and cutting-edge hardware (Genome Station), we offer tailored solutions for genomics research projects. Leveraging our extensive genomics expertise, we've developed specialized NGS analysis pipelines to support life sciences and biotechnology researchers.</p>
              <p>As a research collaborator, you will have transparent access to in-house developed protocols, commercial kits, and reagents required for major projects in genomics, transcriptomics, metagenomics, and other omics applications. Our end-to-end research collaboration covers every step — from sample preparation and library generation to sequencing and data analysis. We also offer comprehensive project design consultation, including wet lab support.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <img src="https://images.pexels.com/photos/15202224/pexels-photo-15202224.jpeg" alt="Office building" className="col-span-2 aspect-[16/9] w-full object-cover rounded-2xl" />
            <img src="https://images.pexels.com/photos/8533087/pexels-photo-8533087.jpeg" alt="Lab interior" className="aspect-[4/3] w-full object-cover rounded-2xl" />
            <img src="https://images.pexels.com/photos/12903168/pexels-photo-12903168.jpeg" alt="Team meeting" className="aspect-[4/3] w-full object-cover rounded-2xl" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-y bg-gradient-to-b from-green-50/50 to-white">
        <div className="container-x">
          <SectionHeader eyebrow="Our Values" title="Company" accent="Values" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {valuesList.map((v, i) => {
              const Icon = valueIcons[v.icon] || BadgeCheck;
              return (
                <motion.div key={v.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 text-center hover:shadow-lg hover:-translate-y-1 hover:border-green-200 transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-4"><Icon className="w-6 h-6 text-green-600" /></div>
                  <h3 className="font-semibold text-gray-900">{v.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600 mt-2 leading-relaxed">{v.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-y">
        <div className="container-x grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          <div className="md:col-span-1">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-0.5 w-8 bg-green-600" />
              <span className="text-xs font-semibold text-green-700 uppercase tracking-widest">Our Leadership</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 leading-tight">Our <span className="text-gradient-green">Management</span></h2>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">Bionivid is led by a trio of professionals with proven expertise in genome research and deep data science. Being forerunners in genomics in India, the team has a profound knowledge of genomics project execution, analytics and product development.</p>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">Our vision is to develop Bionivid as an industry leader with an emphasis on innovation, authenticity, service excellence and supreme customer delight.</p>
          </div>
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {leaders.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img src={p.photo} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-5 text-center">
                  <h4 className="font-bold text-gray-900 uppercase tracking-wide text-sm">{p.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{p.role}</p>
                  <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex w-8 h-8 rounded-full bg-green-100 text-green-700 hover:bg-green-600 hover:text-white items-center justify-center transition-colors" aria-label={`${p.name} LinkedIn`}>
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Employees gallery */}
      <section className="section-y bg-green-50/40">
        <div className="container-x">
          <SectionHeader eyebrow={ABOUT_GALLERIES.team.eyebrow} title={ABOUT_GALLERIES.team.title} accent={ABOUT_GALLERIES.team.accent} description={ABOUT_GALLERIES.team.description} />
          <ImageSlider images={ABOUT_GALLERIES.team.images} variant="cards" />
        </div>
      </section>

      {/* Life at Bionivid - Culture gallery */}
      <section className="section-y bg-white">
        <div className="container-x">
          <SectionHeader eyebrow={ABOUT_GALLERIES.culture.eyebrow} title={ABOUT_GALLERIES.culture.title} accent={ABOUT_GALLERIES.culture.accent} description={ABOUT_GALLERIES.culture.description} />
          <ImageSlider images={ABOUT_GALLERIES.culture.images} variant="cards" />
        </div>
      </section>

      <ClientsMarquee title="Our Clients" />
      <div className="pb-16"><CTABanner /></div>
    </>
  );
}
