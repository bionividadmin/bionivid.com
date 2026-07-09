import React from "react";
import { CLIENTS as MOCK } from "../../data/mock";
import useContent from "../../hooks/useContent";

export default function ClientsMarquee({ title = "Our Clients" }) {
  const { data: CLIENTS } = useContent("clients", MOCK);
  const source = CLIENTS && CLIENTS.length ? CLIENTS : [];
  const list = [...source, ...source];
  return (
    <section className="py-14 bg-white">
      <div className="container-x">
        {title && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2">
              <span className="h-0.5 w-8 bg-green-600" />
              <h3 className="text-2xl md:text-3xl font-bold font-display text-gray-900">{title}</h3>
              <span className="h-0.5 w-8 bg-green-600" />
            </div>
          </div>
        )}
        <div className="relative overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)" }}>
          <div className="flex gap-10 md:gap-14 items-center animate-marquee w-max">
            {list.map((c, i) => (
              <div key={i} className="shrink-0 w-24 h-20 md:w-32 md:h-24 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
                <img src={c.logo} alt={c.name} title={c.name} loading="lazy" className="max-h-full max-w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
