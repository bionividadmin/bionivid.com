import React from "react";
import { Helmet } from "react-helmet-async";
import PageHero from "../components/common/PageHero";

const sections = [
  { title: "Information We Collect", body: "We collect information you provide when contacting us, subscribing to our newsletter, or engaging our services — including name, email, organization and project details." },
  { title: "How We Use Information", body: "We use your information to respond to enquiries, deliver services, share relevant updates, and improve our website. We never sell personal information to third parties." },
  { title: "Data Security", body: "We implement appropriate technical and organizational measures to protect your data. Genomics datasets processed through our services are handled with strict confidentiality and industry-standard encryption." },
  { title: "Cookies", body: "Our website uses cookies for basic analytics and to improve user experience. You may disable cookies via your browser settings." },
  { title: "Your Rights", body: "You have the right to access, correct or delete your personal information. Contact us at info@bionivid.com for any privacy-related requests." },
  { title: "Changes to this Policy", body: "We may update this policy from time to time. Any changes will be reflected on this page with an updated revision date." },
];

export default function Privacy() {
  return (
    <>
      <Helmet><title>Privacy Policy — Bionivid Technology</title></Helmet>
      <PageHero eyebrow="Legal" title="Privacy" accent="Policy" description="How we collect, use and protect your information." image="https://images.pexels.com/photos/8533087/pexels-photo-8533087.jpeg" />
      <section className="container-x py-12 md:py-16 max-w-3xl">
        <div className="space-y-6">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-xl font-bold text-gray-900 font-display">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed mt-2 text-[15px]">{s.body}</p>
            </div>
          ))}
          <p className="text-xs text-gray-500 pt-4">Last updated: January 2025</p>
        </div>
      </section>
    </>
  );
}
