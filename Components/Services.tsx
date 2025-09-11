"use client";
import { Building2, Heart, Shield, Home, Plane, Lightbulb } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Corporate Law",
      description: "Expert advice on business formation, contracts, mergers, and compliance matters.",
      icon: Building2,
    },
    {
      title: "Family Law",
      description: "Compassionate support for divorce, custody, adoption, and family-related legal matters.",
      icon: Heart,
    },
    {
      title: "Criminal Defense",
      description: "Strong defense strategies for criminal charges, investigations, and legal proceedings.",
      icon: Shield,
    },
    {
      title: "Real Estate Law",
      description: "Comprehensive guidance on property transactions, leases, disputes, and development.",
      icon: Home,
    },
    {
      title: "Immigration Law",
      description: "Professional assistance with visas, citizenship, deportation defense, and immigration processes.",
      icon: Plane,
    },
    {
      title: "Intellectual Property",
      description: "Protection and enforcement of trademarks, patents, copyrights, and trade secrets.",
      icon: Lightbulb,
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Legal Services
          </h2>
          <div className="w-16 h-1 bg-[#0F8BDB] mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            We offer comprehensive legal services across various practice areas
            to meet your diverse needs with expertise and dedication.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
              >
                <div className="inline-flex p-4 rounded-lg bg-[#0F8BDB] text-white mb-6">
                  <IconComponent className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-700 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-lg text-gray-700 mb-6">
            Need legal assistance in a different area? We're here to help.
          </p>
          <button className="bg-[#0F8BDB] text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Schedule a Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
