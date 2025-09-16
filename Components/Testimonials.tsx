"use client";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      title: "CEO, TechStart Inc",
      quote:
        "Lexpertease provided exceptional legal guidance that helped our startup navigate complex IP challenges. Their expertise in corporate law is unmatched.",
      rating: 5,
      avatar: "/image2.jpg",
    },
    {
      name: "Michael Rodriguez",
      title: "Real Estate Developer",
      quote:
        "Professional, knowledgeable, and trustworthy. The team at Lexpertease helped us close a multi-million dollar deal smoothly and efficiently.",
      rating: 5,
      avatar: "/image1.jpg",
    },
    {
      name: "Emily Chen",
      title: "Family Client",
      quote:
        "During a difficult family situation, Lexpertease provided compassionate support and excellent representation. I felt supported throughout the entire process.",
      rating: 5,
      avatar: "/image2.jpg",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <div className="w-16 h-1 bg-[#0F8BDB] mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied clients have to say about our legal services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-lg border border-gray-200"
            >
              {/* Stars */}
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <blockquote className="text-gray-700 text-lg leading-relaxed mb-8">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center">
                <div className="relative w-12 h-12 mr-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {testimonial.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-700 mb-6">
            Ready to experience exceptional legal representation?
          </p>
          <Button size="lg" className="bg-[#0F8BDB] text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Join Our Satisfied Clients
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
