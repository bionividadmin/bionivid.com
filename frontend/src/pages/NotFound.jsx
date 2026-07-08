import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Home, ArrowRight, Dna } from "lucide-react";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <>
      <Helmet><title>Page Not Found — Bionivid</title></Helmet>
      <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-green-50/60 to-white dna-pattern">
        <div className="container-x text-center max-w-lg">
          <div className="w-20 h-20 rounded-2xl bg-green-100 text-green-700 mx-auto flex items-center justify-center mb-6"><Dna className="w-9 h-9" /></div>
          <h1 className="text-6xl md:text-8xl font-extrabold font-display text-gradient-green">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">Page not found</h2>
          <p className="text-gray-600 mt-3">The page you're looking for doesn't exist or has been moved. Let's get you back on track.</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Button asChild className="bg-green-600 hover:bg-green-700 rounded-full px-6"><Link to="/"><Home className="w-4 h-4 mr-1" /> Back to Home</Link></Button>
            <Button asChild variant="outline" className="rounded-full px-6 border-gray-200"><Link to="/contact">Contact Us <ArrowRight className="w-4 h-4 ml-1" /></Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
