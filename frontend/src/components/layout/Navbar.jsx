import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV, SITE as MOCK_SITE } from "../../data/mock";
import { Button } from "../ui/button";
import useContent from "../../hooks/useContent";
import { assetUrl } from "../../lib/api";

const Logo = ({ src }) => (
  <Link to="/" className="flex items-center group" aria-label="Bionivid Home">
    {src ? (
      <img src={src} alt="Bionivid" className="h-8 md:h-9 w-auto object-contain" />
    ) : (
      <span className="text-2xl font-bold text-green-700 tracking-tight font-display">bionivid</span>
    )}
  </Link>
);

export default function Navbar() {
  const { data: siteData } = useContent("site", MOCK_SITE);
  const SITE = { ...MOCK_SITE, ...(siteData || {}) };
  const logoSrc = assetUrl(SITE?.logo);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setOpenDropdown(null); }, [loc.pathname]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-white"}`}>
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <Logo src={logoSrc} />

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => item.children ? (
            <div key={item.label} className="relative" onMouseEnter={() => setOpenDropdown(item.label)} onMouseLeave={() => setOpenDropdown(null)}>
              <NavLink to={item.to} className={({ isActive }) => `px-4 py-2 text-sm font-medium flex items-center gap-1 rounded-lg transition-colors ${isActive ? "text-green-700" : "text-gray-700 hover:text-green-700"}`}>
                {item.label}<ChevronDown className="w-4 h-4" />
              </NavLink>
              <AnimatePresence>
                {openDropdown === item.label && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.18 }} className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
                    {item.children.map((c) => (
                      <Link key={c.label} to={c.to} className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors">{c.label}</Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <NavLink key={item.label} to={item.to} className={({ isActive }) => `relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isActive ? "text-green-700" : "text-gray-700 hover:text-green-700"}`}>
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && <motion.span layoutId="navUnderline" className="absolute -bottom-1 left-3 right-3 h-0.5 bg-green-600 rounded-full" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden md:inline-flex bg-green-600 hover:bg-green-700 text-white rounded-full px-5">
            <Link to="/contact">Get in Touch</Link>
          </Button>
          <button aria-label="Menu" onClick={() => setOpen(true)} className="lg:hidden w-10 h-10 inline-flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 bg-black/40 z-40 lg:hidden" />
            <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.28 }} className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-50 lg:hidden shadow-2xl flex flex-col">
              <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
                <Logo src={logoSrc} />
                <button onClick={() => setOpen(false)} className="w-9 h-9 rounded-lg hover:bg-gray-100 inline-flex items-center justify-center"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex-1 overflow-y-auto py-4">
                {NAV.map((item) => (
                  <div key={item.label} className="px-4">
                    <NavLink to={item.to} className={({ isActive }) => `block py-3 text-base font-medium border-b border-gray-100 ${isActive ? "text-green-700" : "text-gray-800"}`}>{item.label}</NavLink>
                    {item.children && (
                      <div className="pl-3 pb-2">
                        {item.children.map((c) => (<Link key={c.label} to={c.to} className="block py-2 text-sm text-gray-600 hover:text-green-700">{c.label}</Link>))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="px-4 mt-4">
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700 rounded-full">
                    <Link to="/contact">Get in Touch</Link>
                  </Button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
