"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";
const bannerImages = ["/banner3.jpg", "/banner5.jpg", "/middle_aged_love.jpg"];

export default function Home() {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bannerImages.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);


  const howItWorks = [
    {
      emoji: "📝",
      title: "You Fill Out a Short Form",
      description: "Share basic details and what you’re looking for.",
    },
    {
      emoji: "🔍",
      title: "We Review & Match You",
      description:
        "Based on compatibility, I’ll introduce you to potential partners.",
    },
    {
      emoji: "💬",
      title: "You Connect Privately",
      description: "If you’re both interested, you take it from there.",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans">
      <Navbar />
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-start px-6 pt-52 pb-40 overflow-hidden">
        <img
          src={bannerImages[bgIndex]}
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 z-0"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        <div className="relative z-10">
          <div className="bg-white/20 p-6 rounded-xl shadow-md max-w-2xl text-left ml-4 sm:ml-20">
            <h1 className="text-4xl font-bold mb-4 text-white">
              Find Love Across the World 💕
            </h1>
            <p className="text-lg mb-6 text-white">
              FinestNeedle connects hearts across the world. Whether it's
              friendship or forever, start your journey here.
            </p>
            <Link
              href="/signup"
              className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition"
            >
              Get Started
            </Link>

          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-pink-100 text-center">
        <h2 className="text-4xl text-pink-600 font-bold mb-12">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto text-left">
          {howItWorks.map(({ emoji, title, description }, i) => (
            <div
              key={i}
              className="bg-white/30 backdrop-blur p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-pink-600 mb-2">
                <span className="text-3xl mr-2">{emoji}</span>
                {title}
              </h3>
              <p className="text-gray-700">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsMarquee />

      {/* Call to Action */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-2xl text-pink-600 font-bold mb-4">
          Your Person Might Be One Click Away
        </h2>

        <Link
          href="/signup"
          className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-[#ff4d88] transition"
        >
          Join Now!
        </Link>

        <p className="mt-6 text-gray-600 text-sm">
          Have questions? Contact us at{" "}
          <span className="font-semibold text-pink-600">+44 7449 079270</span>
        </p>
      </section>


      {/* Footer */}
      <footer className="text-sm text-center py-6 text-gray-500 bg-white">
        © {new Date().getFullYear()} FinestNeedle. All rights reserved.
      </footer>
    </div>
  );
}
