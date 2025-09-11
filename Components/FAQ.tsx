"use client";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "When should I use LexpertEase?",
      answer: "You should use LexpertEase when you need quick, reliable legal guidance for everyday legal questions, contract reviews, legal document preparation, or when you want to understand your rights in a particular situation. We're perfect for initial consultations, legal research, and ongoing legal support."
    },
    {
      question: "Why LexpertEase? My friends/family members know a lawyer already.",
      answer: "While personal referrals are valuable, LexpertEase offers several unique advantages: 24/7 availability, transparent pricing, specialized expertise across multiple practice areas, and no personal relationships that might complicate professional advice. We provide objective, professional counsel without the potential awkwardness of mixing personal and professional relationships."
    },
    {
      question: "How can I contact LexpertEase?",
      answer: "You can contact us through multiple channels: our 24/7 chat feature on this website, phone consultations at (123) 456-7890, email support, or by scheduling an online consultation. We're available Monday through Friday, 8 AM - 6 PM EST, with emergency support available outside regular hours."
    },
    {
      question: "I already have a lawyer, why should I use LexpertEase?",
      answer: "LexpertEase complements your existing legal representation beautifully. Use us for quick questions that don't warrant your attorney's full attention, second opinions, research support, or when you need immediate guidance outside your lawyer's availability. We can also help you prepare better questions and documentation for your existing attorney."
    },
    {
      question: "How much does it cost to use LexpertEase?",
      answer: "We offer transparent, affordable pricing with no hidden fees. Our basic chat consultations start at $50, phone consultations at $100 per 30 minutes, and document reviews from $150. We also offer monthly subscription plans for ongoing support. Contact us for a custom quote based on your specific needs."
    },
    {
      question: "How do I pay for the services?",
      answer: "We accept all major credit cards, PayPal, bank transfers, and offer flexible payment plans for larger projects. Payment is securely processed through our encrypted platform. For subscription services, we offer automatic billing with the ability to cancel anytime."
    },
    {
      question: "What if I am not happy with your service?",
      answer: "Your satisfaction is our priority. We offer a 100% satisfaction guarantee - if you're not completely satisfied with our service, we'll work to make it right or provide a full refund within 30 days. We also provide free follow-up consultations if clarification is needed on previous advice."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-serif text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-[#0F8BDB] mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-700">
            Get answers to the most common questions about our legal services and how we can help you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F8BDB] focus:ring-opacity-50"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-[#0F8BDB]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-700 mb-6">
              Don't see your question answered above? We're here to help with any legal questions you might have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/chat"
                className="bg-[#0F8BDB] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Chat With Us Now
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+1234567890"
                className="border-2 border-[#0F8BDB] text-[#0F8BDB] px-6 py-3 rounded-lg font-semibold hover:bg-[#0F8BDB] hover:text-white transition-colors"
              >
                Call (123) 456-7890
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;