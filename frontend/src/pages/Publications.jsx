import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ExternalLink, Search, ArrowUpDown, BookOpen, ChevronLeft, ChevronRight, Mail } from "lucide-react";
import PageHero from "../components/common/PageHero";
import { Button } from "../components/ui/button";
import { PUBLICATIONS as MOCK_PUBS } from "../data/mock";
import useContent from "../hooks/useContent";
import { subscribeNewsletter } from "../lib/api";

export default function Publications() {
  const { data: PUBLICATIONS } = useContent("publications", MOCK_PUBS);
  const [q, setQ] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState("year");
  const [sortDir, setSortDir] = useState("desc");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered = useMemo(() => {
    let list = PUBLICATIONS.filter((p) => `${p.title} ${p.publisher} ${p.year}`.toLowerCase().includes(q.toLowerCase()));
    list = [...list].sort((a, b) => {
      const va = a[sortKey], vb = b[sortKey];
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [q, sortKey, sortDir, PUBLICATIONS]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const rows = filtered.slice(start, start + pageSize);

  const toggleSort = (k) => {
    if (sortKey === k) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(k); setSortDir("asc"); }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    subscribeNewsletter({ email, source: "publications" })
      .then(() => { setSubscribed(true); setEmail(""); setTimeout(() => setSubscribed(false), 3000); })
      .catch(() => { setSubscribed(true); setEmail(""); setTimeout(() => setSubscribed(false), 3000); });
  };

  return (
    <>
      <Helmet>
        <title>Publications — Bionivid Technology</title>
        <meta name="description" content="Explore Bionivid's research contributions and scientific publications in genomics and bioinformatics." />
      </Helmet>

      <PageHero
        eyebrow="Publications"
        title=""
        accent="Publications"
        description="Explore our research contributions and scientific publications in genomics and bioinformatics."
        image="https://images.pexels.com/photos/13014236/pexels-photo-13014236.jpeg"
        actions={<>
          <Button asChild className="bg-green-600 hover:bg-green-700 rounded-full px-6">
            <a href="https://scholar.google.com/scholar?q=Bionivid" target="_blank" rel="noopener noreferrer"><BookOpen className="w-4 h-4 mr-1" />Google Scholar</a>
          </Button>
          <Button asChild variant="outline" className="rounded-full px-6 border-gray-200">
            <a href="#table">Scientific Blog</a>
          </Button>
        </>}
      />

      <section id="table" className="container-x py-10 md:py-14">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="border border-gray-200 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:border-green-500">
                {[10, 25, 50, 100].map((n) => (<option key={n} value={n}>{n}</option>))}
              </select>
              <span>entries per page</span>
            </div>
            <div className="flex items-center gap-2 relative">
              <label className="text-sm text-gray-600">Search:</label>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Search publications..." className="pl-8 pr-3 py-1.5 border border-gray-200 rounded-md text-sm w-56 md:w-72 focus:outline-none focus:border-green-500" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-green-700 text-white">
                  <th onClick={() => toggleSort("year")} className="text-left px-4 py-3 font-semibold cursor-pointer select-none w-24"><span className="inline-flex items-center gap-1">Year <ArrowUpDown className="w-3.5 h-3.5" /></span></th>
                  <th onClick={() => toggleSort("title")} className="text-left px-4 py-3 font-semibold cursor-pointer select-none"><span className="inline-flex items-center gap-1">Title <ArrowUpDown className="w-3.5 h-3.5" /></span></th>
                  <th onClick={() => toggleSort("publisher")} className="text-left px-4 py-3 font-semibold cursor-pointer select-none w-56"><span className="inline-flex items-center gap-1">Publisher <ArrowUpDown className="w-3.5 h-3.5" /></span></th>
                  <th className="text-left px-4 py-3 font-semibold w-28">Link</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-green-50/40 transition-colors">
                    <td className="px-4 py-3 text-green-700 font-bold">{r.year}</td>
                    <td className="px-4 py-3 text-gray-800 leading-snug">{r.title}</td>
                    <td className="px-4 py-3 text-gray-600">{r.publisher}</td>
                    <td className="px-4 py-3"><a href={r.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-green-700 hover:text-green-800 font-medium"><ExternalLink className="w-3.5 h-3.5" /> View</a></td>
                  </tr>
                ))}
                {rows.length === 0 && (<tr><td colSpan={4} className="text-center py-10 text-gray-500">No publications match your search.</td></tr>)}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-4 text-sm text-gray-600">
            <div>Showing {total === 0 ? 0 : start + 1} to {Math.min(start + pageSize, total)} of {total} entries</div>
            <div className="flex items-center gap-1">
              <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="w-8 h-8 rounded-md border border-gray-200 disabled:opacity-40 hover:bg-gray-50 flex items-center justify-center"><ChevronLeft className="w-4 h-4" /></button>
              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                const p = i + 1;
                return (
                  <button key={p} onClick={() => setPage(p)} className={`w-8 h-8 rounded-md border ${p === page ? "bg-green-600 text-white border-green-600" : "border-gray-200 hover:bg-gray-50"} text-sm font-medium`}>{p}</button>
                );
              })}
              {totalPages > 6 && <span className="px-2 text-gray-400">…</span>}
              {totalPages > 5 && (<button onClick={() => setPage(totalPages)} className={`w-8 h-8 rounded-md border ${totalPages === page ? "bg-green-600 text-white border-green-600" : "border-gray-200 hover:bg-gray-50"} text-sm font-medium`}>{totalPages}</button>)}
              <button disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="w-8 h-8 rounded-md border border-gray-200 disabled:opacity-40 hover:bg-gray-50 flex items-center justify-center"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </motion.div>

        {/* Stay updated */}
        <div className="mt-8 rounded-2xl bg-green-50/70 border border-green-100 p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0"><Mail className="w-5 h-5" /></div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Stay Updated</h4>
              <p className="text-sm text-gray-600">Subscribe to our newsletter and never miss the latest research and updates.</p>
            </div>
          </div>
          <form onSubmit={handleSubscribe} className="flex flex-1 md:justify-end gap-2 w-full">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email" className="flex-1 md:max-w-sm px-4 py-2.5 rounded-full border border-green-200 bg-white text-sm focus:outline-none focus:border-green-500" />
            <Button type="submit" className="bg-green-600 hover:bg-green-700 rounded-full px-5">Subscribe</Button>
          </form>
        </div>
        {subscribed && <p className="text-sm text-green-700 mt-2">Subscribed! We'll keep you posted.</p>}
      </section>
    </>
  );
}
