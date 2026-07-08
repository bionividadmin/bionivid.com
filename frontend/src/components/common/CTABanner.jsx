import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "../ui/button";

export default function CTABanner({ title = "We would be glad to partner with you", subtitle = "Discuss your project specific goals with our genomics specialists", ctaLabel = "Contact Us", ctaTo = "/contact", ctaHref }) {
  return (
    <section className="container-x">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 to-green-700 px-6 py-6 md:px-10 md:py-8 shadow-lg">
        <div aria-hidden className="absolute right-0 top-0 bottom-0 w-56 opacity-20 pointer-events-none">
          <svg viewBox="0 0 200 200" className="w-full h-full text-white" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M20 0 C 120 40, 20 80, 120 120 S 20 200, 120 240" />
            <path d="M120 0 C 20 40, 120 80, 20 120 S 120 200, 20 240" />
          </svg>
        </div>
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-5 justify-between">
          <div className="flex items-start md:items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white text-lg md:text-2xl font-bold font-display">{title}</h3>
              <p className="text-green-50/90 text-sm md:text-base mt-1">{subtitle}</p>
            </div>
          </div>
          {ctaHref ? (
            <Button asChild size="lg" className="bg-white text-green-700 hover:bg-green-50 rounded-full px-6"><a href={ctaHref} target="_blank" rel="noopener noreferrer">{ctaLabel}<ArrowRight className="w-4 h-4 ml-1" /></a></Button>
          ) : (
            <Button asChild size="lg" className="bg-white text-green-700 hover:bg-green-50 rounded-full px-6"><Link to={ctaTo}>{ctaLabel}<ArrowRight className="w-4 h-4 ml-1" /></Link></Button>
          )}
        </div>
      </div>
    </section>
  );
}
