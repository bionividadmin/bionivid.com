import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Twitter, Linkedin, Facebook, Instagram, Youtube, Phone, Mail, MapPin, Dna } from "lucide-react";
import { SITE, FOOTER_LINKS } from "../../data/mock";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  const socials = [
    { icon: Twitter, href: SITE.socials.twitter, label: "Twitter" },
    { icon: Linkedin, href: SITE.socials.linkedin, label: "LinkedIn" },
    { icon: Facebook, href: SITE.socials.facebook, label: "Facebook" },
    { icon: Instagram, href: SITE.socials.instagram, label: "Instagram" },
    { icon: Youtube, href: SITE.socials.youtube, label: "YouTube" },
  ];

  return (
    <footer className="bg-[#0d3b1f] text-gray-200">
      <div className="container-x pt-12 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                <Dna className="w-5 h-5 text-green-300" />
              </div>
              <span className="text-2xl font-bold text-white font-display">bionivid</span>
            </div>
            <p className="text-sm text-green-100/80 leading-relaxed">Innovative genomics solutions and services for a healthier tomorrow.</p>
            <div className="flex gap-2 mt-5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-9 h-9 rounded-full border border-white/20 hover:bg-green-500 hover:border-green-500 text-white flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.quick.map((l) => (
                <li key={l.label}>
                  {l.href ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-green-100/70 hover:text-white transition-colors">{l.label}</a>
                  ) : (
                    <Link to={l.to} className="text-sm text-green-100/70 hover:text-white transition-colors">{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.services.map((l) => (
                <li key={l.label}><Link to={l.to} className="text-sm text-green-100/70 hover:text-white transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.solutions.map((l) => (
                <li key={l.label}>
                  {l.href ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-green-100/70 hover:text-white transition-colors">{l.label}</a>
                  ) : (
                    <Link to={l.to} className="text-sm text-green-100/70 hover:text-white transition-colors">{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Newsletter</h4>
            <p className="text-sm text-green-100/70 mb-3">Subscribe to our newsletter to get updates.</p>
            <form onSubmit={subscribe} className="flex bg-white/5 border border-white/15 rounded-full overflow-hidden focus-within:border-green-400">
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-green-100/50 outline-none" required />
              <button type="submit" className="bg-green-500 hover:bg-green-400 text-white text-sm font-medium px-4 transition-colors">Subscribe</button>
            </form>
            {subscribed && <p className="text-xs text-green-300 mt-2">Thanks! You're subscribed.</p>}
          </div>
        </div>

        {/* Contact strip */}
        <div className="border-t border-white/10 mt-10 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <a href={`tel:${SITE.phone}`} className="flex items-center gap-3 text-green-100/80 hover:text-white">
            <span className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center"><Phone className="w-4 h-4 text-green-300" /></span>{SITE.phone}
          </a>
          <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-green-100/80 hover:text-white">
            <span className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center"><Mail className="w-4 h-4 text-green-300" /></span>{SITE.email}
          </a>
          <div className="flex items-start gap-3 text-green-100/80">
            <span className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center shrink-0"><MapPin className="w-4 h-4 text-green-300" /></span>
            <span>{SITE.address}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-green-100/70">
          <p>&copy; {new Date().getFullYear()} Bionivid Technology Private Limited. All Rights Reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
