"use client";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "Corporate Law", href: "#services" },
        { name: "Family Law", href: "#services" },
        { name: "Criminal Defense", href: "#services" },
        { name: "Real Estate Law", href: "#services" },
        { name: "Immigration Law", href: "#services" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Our Team", href: "/team" },
        { name: "Careers", href: "/careers" },
        { name: "News & Updates", href: "/news" },
        { name: "Contact", href: "#contact" },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Legal Blog", href: "/blog" },
        { name: "FAQ", href: "/faq" },
        { name: "Case Studies", href: "/cases" },
        { name: "Legal Forms", href: "/forms" },
        { name: "Privacy Policy", href: "/privacy" },
      ]
    }
  ];

  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-400" },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-600" },
  ];

  const contactInfo = [
    { icon: Mail, text: "info@lexpertease.com", href: "mailto:info@lexpertease.com" },
    { icon: Phone, text: "(123) 456-7890", href: "tel:+1234567890" },
    { icon: MapPin, text: "123 Legal District, Suite 500\nNew York, NY 10001", href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center mb-6">
              <Image
                src="/logo.png"
                alt="Lexpertease Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            
            <p className="text-gray-300 leading-relaxed max-w-md">
              Professional legal services with integrity, expertise, and dedication. 
              We're committed to protecting your rights and achieving the best outcomes for our clients.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-start gap-3 text-gray-300 hover:text-white transition-colors"
                  >
                    <IconComponent className="w-5 h-5 mt-1" />
                    <span className="whitespace-pre-line">{item.text}</span>
                  </a>
                );
              })}
            </div>
          </div>
          
          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-4 text-white">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Social Links & Newsletter */}
        <div className="border-t border-gray-700 pt-8 pb-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-6">
              <span className="text-gray-300 font-medium">Follow Us:</span>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="p-2 bg-gray-700 rounded text-gray-300 hover:bg-gray-600 hover:text-white transition-colors"
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="flex items-center gap-4">
              <span className="text-gray-300 font-medium whitespace-nowrap">Stay Updated:</span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-gray-700 text-white rounded-l border border-gray-600 focus:outline-none focus:border-[#0F8BDB]"
                />
                <button className="px-6 py-2 bg-[#0F8BDB] hover:bg-blue-600 rounded-r font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400">
            &copy; 2024 Lexpertease. All rights reserved. | 
            <Link href="/terms" className="hover:text-white transition-colors ml-1">
              Terms of Service
            </Link> | 
            <Link href="/privacy" className="hover:text-white transition-colors ml-1">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
      
      {/* Scroll to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-[#0F8BDB] hover:bg-blue-600 text-white rounded-full shadow-lg transition-colors z-50"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
