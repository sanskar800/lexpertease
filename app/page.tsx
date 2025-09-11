"use client";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Services from "../Components/Services";
import Testimonials from "../Components/Testimonials";
import FAQ from "../Components/FAQ";
import Footer from "../Components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}
