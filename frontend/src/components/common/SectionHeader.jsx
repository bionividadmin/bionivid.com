import React from "react";

export default function SectionHeader({ eyebrow, title, description, align = "center", accent }) {
  const isCenter = align === "center";
  return (
    <div className={`${isCenter ? "text-center max-w-2xl mx-auto" : "text-left max-w-xl"} mb-10 md:mb-12`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 mb-3 ${isCenter ? "" : ""}`}>
          <span className="h-0.5 w-8 bg-green-600" />
          <span className="text-xs font-semibold text-green-700 uppercase tracking-widest">{eyebrow}</span>
          {isCenter && <span className="h-0.5 w-8 bg-green-600" />}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900">
        {title} {accent && <span className="text-gradient-green">{accent}</span>}
      </h2>
      {description && <p className="mt-3 text-gray-600 leading-relaxed">{description}</p>}
    </div>
  );
}
