"use client";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/image3.jpg')", // ✅ background from /public
        backgroundSize: "cover",             // ✅ prevents zooming
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white font-serif">
            Expert Legal Services{" "}
            <span className="text-[#0F8BDB]">in Nepal</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-sans max-w-2xl mx-auto">
            Professional legal consultation and representation with our
            experienced team of lawyers and cutting-edge AI assistance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-[#0F8BDB] hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2 font-sans"
            >
              <Link href="/chat">
                <MessageCircle className="w-5 h-5" />
                Chat with AI Assistant
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white text-[#0F8BDB] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2 font-sans border-2 border-white"
            >
              <Link href="#contact">
                <Phone className="w-5 h-5" />
                Schedule Consultation
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
