import React, { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Phone, Mail, MapPin, Send, Building2, MessageSquare } from "lucide-react";
import PageHero from "../components/common/PageHero";
import { Button } from "../components/ui/button";
import { SITE } from "../data/mock";
import { submitContact } from "../lib/api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", org: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    setStatus("sending");
    submitContact({
      name: form.name,
      email: form.email,
      org: form.org || null,
      phone: form.phone || null,
      subject: form.subject || null,
      message: form.message,
    })
      .then(() => {
        setStatus("sent");
        setForm({ name: "", email: "", org: "", phone: "", subject: "", message: "" });
        setTimeout(() => setStatus(null), 4000);
      })
      .catch(() => {
        setStatus("error");
        setTimeout(() => setStatus(null), 4000);
      });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us — Bionivid Technology</title>
        <meta name="description" content="Get in touch with Bionivid Technology — our genomics specialists are ready to discuss your project." />
      </Helmet>

      <PageHero
        eyebrow="Contact Us"
        title="Let's build something"
        accent="remarkable together"
        description="Reach out to discuss your project, request a quote, or learn more about our services."
        image="https://images.pexels.com/photos/8533023/pexels-photo-8533023.jpeg"
      />

      <section className="section-y">
        <div className="container-x grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Info cards */}
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: Phone, title: "Phone", value: SITE.phone, href: `tel:${SITE.phone}` },
              { icon: Mail, title: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
              { icon: MapPin, title: "Address", value: SITE.address, href: "https://maps.google.com" },
              { icon: Building2, title: "Working Hours", value: "Mon – Sat, 9:30 AM – 6:30 PM IST" },
            ].map((it) => (
              <motion.a key={it.title} href={it.href} target={it.href?.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-5 hover:border-green-200 hover:shadow-md transition-all cursor-pointer">
                <div className="w-11 h-11 rounded-xl bg-green-50 text-green-700 flex items-center justify-center shrink-0"><it.icon className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold">{it.title}</div>
                  <div className="text-sm text-gray-800 mt-0.5">{it.value}</div>
                </div>
              </motion.a>
            ))}
            <div className="rounded-2xl overflow-hidden border border-gray-100 h-56">
              <iframe title="Map" src="https://www.google.com/maps?q=Kattigenahalli+Bengaluru&output=embed" className="w-full h-full" loading="lazy" />
            </div>
          </div>

          {/* Form */}
          <motion.form onSubmit={submit} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-3 bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-green-600 text-white flex items-center justify-center"><MessageSquare className="w-5 h-5" /></div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold font-display text-gray-900">Send us a message</h2>
                <p className="text-sm text-gray-500">We usually respond within one business day.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "name", label: "Full Name", type: "text", required: true },
                { name: "email", label: "Email Address", type: "email", required: true },
                { name: "org", label: "Organization", type: "text" },
                { name: "phone", label: "Phone", type: "tel" },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">{f.label}{f.required && " *"}</label>
                  <input required={f.required} type={f.type} value={form[f.name]} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all" />
                </div>
              ))}
            </div>

            <div className="mt-4">
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Subject</label>
              <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all" placeholder="Genomics services enquiry" />
            </div>

            <div className="mt-4">
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Message *</label>
              <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all resize-none" placeholder="Tell us about your project..." />
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <p className="text-xs text-gray-500">By submitting, you agree to our privacy policy.</p>
              <Button type="submit" disabled={status === "sending"} className="bg-green-600 hover:bg-green-700 rounded-full px-6">
                {status === "sending" ? "Sending..." : (<><Send className="w-4 h-4 mr-1" /> Send Message</>)}
              </Button>
            </div>
            {status === "sent" && <div className="mt-4 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm px-4 py-3">Thanks for reaching out. Our team will get back to you shortly.</div>}
            {status === "error" && <div className="mt-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3">Something went wrong. Please try again in a moment.</div>}
          </motion.form>
        </div>
      </section>
    </>
  );
}
