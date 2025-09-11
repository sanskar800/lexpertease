"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MessageCircle, ArrowRight, Clock, Shield, Award } from "lucide-react";

const CTA = () => {
  const features = [
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock legal assistance"
    },
    {
      icon: Shield,
      title: "Confidential",
      description: "Your privacy is our priority"
    },
    {
      icon: Award,
      title: "Expert Team",
      description: "Experienced legal professionals"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-[#0F8BDB] via-blue-600 to-blue-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-serif">
            Ready to Get Started?
          </h2>
          <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
            Contact us today for a free consultation and let our experienced team
            help you navigate your legal challenges with confidence.
          </p>
        </motion.div>
        
        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-center"
              >
                <div className="inline-flex p-4 bg-white bg-opacity-20 rounded-xl mb-4">
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="opacity-90">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="#contact"
              className="group bg-white text-[#0F8BDB] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl"
            >
              <Phone className="w-5 h-5" />
              Schedule Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/chat"
              className="group border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#0F8BDB] transition-all duration-300 inline-flex items-center gap-3"
            >
              <MessageCircle className="w-5 h-5" />
              Chat Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="border-t border-white border-opacity-30 pt-8">
            <p className="text-lg opacity-90 mb-4">
              Prefer to call? Reach us directly at:
            </p>
            <a 
              href="tel:+1234567890" 
              className="text-2xl font-bold hover:text-blue-200 transition-colors"
            >
              (123) 456-7890
            </a>
            <p className="mt-2 opacity-75">
              Available Monday - Friday, 8 AM - 6 PM EST
            </p>
          </div>
        </motion.div>
      </div>
      
      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default CTA;
