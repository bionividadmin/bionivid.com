import React from "react";
import { Helmet } from "react-helmet-async";
import PageHero from "../components/common/PageHero";

const sections = [
  { title: "Use of Website", body: "By accessing this website you agree to use it only for lawful purposes and in a way that does not infringe on the rights of others or restrict their use." },
  { title: "Intellectual Property", body: "All content, trademarks and materials on this website are owned by Bionivid Technology Private Limited unless stated otherwise, and may not be reproduced without permission." },
  { title: "Services & Deliverables", body: "Services are provided in accordance with individual project agreements. Turnaround times, deliverables and pricing are governed by the signed Statement of Work." },
  { title: "Confidentiality", body: "We treat all client data, samples and project details as strictly confidential and follow industry best practices for research data handling." },
  { title: "Limitation of Liability", body: "Bionivid shall not be liable for indirect, incidental or consequential damages arising from the use of our website or services." },
  { title: "Governing Law", body: "These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Bengaluru, Karnataka." },
];

export default function Terms() {
  return (
    <>
      <Helmet><title>Terms & Conditions — Bionivid Technology</title></Helmet>
      <PageHero eyebrow="Legal" title="Terms &" accent="Conditions" description="The rules that govern your use of the Bionivid website and services." image="https://images.pexels.com/photos/9243559/pexels-photo-9243559.jpeg" />
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
