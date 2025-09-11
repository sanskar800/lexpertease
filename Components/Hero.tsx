"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Scale, Users, Award } from "lucide-react";

const Hero = () => {
  const stats = [
    { icon: Scale, label: "Cases Won", value: "500+" },
    { icon: Users, label: "Happy Clients", value: "1000+" },
    { icon: Award, label: "Years Experience", value: "25+" },
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                Professional Legal Services
              </h1>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Trusted legal representation and counsel for individuals and businesses. 
                Our experienced attorneys provide comprehensive legal solutions with integrity and dedication.
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#contact"
                className="bg-[#0F8BDB] text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center inline-flex items-center justify-center gap-2"
              >
                Schedule Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/chat"
                className="border-2 border-[#0F8BDB] text-[#0F8BDB] px-8 py-4 rounded-lg font-semibold hover:bg-[#0F8BDB] hover:text-white transition-colors text-center"
              >
                Chat With Us
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="mx-auto w-12 h-12 bg-[#0F8BDB] rounded-lg p-3 mb-3">
                      <IconComponent className="w-full h-full text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <Image
                src="/image1.jpg"
                alt="Professional legal consultation"
                width={600}
                height={500}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-8 bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center justify-between text-center">
                <div>
                  <div className="text-xl font-bold text-gray-900">4.9/5</div>
                  <div className="text-sm text-gray-600">Client Rating</div>
                </div>
                <div className="w-px h-8 bg-gray-300"></div>
                <div>
                  <div className="text-xl font-bold text-gray-900">24/7</div>
                  <div className="text-sm text-gray-600">Available</div>
                </div>
                <div className="w-px h-8 bg-gray-300"></div>
                <div>
                  <div className="text-xl font-bold text-gray-900">Free</div>
                  <div className="text-sm text-gray-600">Consultation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
