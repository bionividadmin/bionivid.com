import React from "react";
import { motion } from "framer-motion";
import { BookOpen, ClipboardList, TestTube2, Lightbulb } from "lucide-react";
import { STATS } from "../../data/mock";

const iconMap = { BookOpen, ClipboardList, TestTube2, Lightbulb };

export default function StatsBar({ variant = "light" }) {
  const dark = variant === "dark";
  return (
    <div className={`rounded-2xl ${dark ? "bg-gradient-to-r from-green-700 to-green-800 text-white" : "bg-white shadow-lg border border-gray-100"} px-4 py-5 md:px-6 md:py-6`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-2">
        {STATS.map((s, i) => {
          const Icon = iconMap[s.icon];
          return (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-center gap-3 md:gap-4 md:justify-center">
              <div className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0 ${dark ? "bg-white/10" : "bg-green-50"}`}>
                <Icon className={`w-5 h-5 md:w-6 md:h-6 ${dark ? "text-white" : "text-green-600"}`} />
              </div>
              <div>
                <div className={`text-xl md:text-2xl font-bold font-display ${dark ? "text-white" : "text-gray-900"}`}>{s.value}</div>
                <div className={`text-xs md:text-sm ${dark ? "text-green-100" : "text-gray-500"} font-medium`}>{s.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
