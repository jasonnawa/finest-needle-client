"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
const bannerImages = ["/banner3.jpg", "/banner5.jpg"];


export default function Home() {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bannerImages.length);
    }, 6000); // switch every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const backgroundImage = `url(${bannerImages[bgIndex]})`;



  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans">
      <Navbar />
      {/* Hero Section */}
      <section
  className=" min-h-screen flex items-center justify-start px-6 pt-52 pb-40 bg-cover bg-center transition-all duration-1000"
  style={{ backgroundImage }}
>
  <div className="bg-white/20 p-6 rounded-xl shadow-md max-w-2xl text-left ml-4 sm:ml-20">
    <h1 className="text-4xl font-bold mb-4 text-white">Find Love Across the UK 💕</h1>
    <p className="text-lg mb-6 text-white">
      FinestNeedle connects hearts across the UK. Whether it's friendship or forever, start your journey here.
    </p>
    <Link
      href="/signup"
      className="bg-[var(--accent)] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#ff4d88] transition"
    >
      Get Started
    </Link>
  </div>
</section>


      {/* How It Works */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-12">How It Works</h2>c
        <div className="grid gap-10 sm:grid-cols-3 max-w-5xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-2">1. Create Your Profile</h3>
            <p className="text-gray-600">Tell us who you are and what you're looking for.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">2. Browse Matches</h3>
            <p className="text-gray-600">Explore verified profiles across the UK.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">3. Start Chatting</h3>
            <p className="text-gray-600">Connect, message, and build something real.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-[var(--accent-light)] text-center">
        <h2 className="text-3xl font-bold mb-12">Success Stories</h2>
        <div className="grid gap-10 sm:grid-cols-2 max-w-4xl mx-auto">
          <blockquote className="bg-white p-6 rounded-xl shadow text-left">
            <p className="italic text-gray-800">"We matched in two days and met in person within a week. Now we're engaged!"</p>
            <footer className="mt-4 text-sm text-gray-600">– Sarah & James, London</footer>
          </blockquote>
          <blockquote className="bg-white p-6 rounded-xl shadow text-left">
            <p className="italic text-gray-800">"I was skeptical... now I’m grateful. We just moved in together!"</p>
            <footer className="mt-4 text-sm text-gray-600">– Aisha & Tom, Manchester</footer>
          </blockquote>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-white text-center">
        <h2 className="text-2xl font-bold mb-4">Your Person Might Be One Click Away</h2>
        <Link
          href="/signup"
          className="bg-[var(--accent)] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#ff4d88] transition"
        >
          Join Now – It’s Free!
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-sm text-center py-6 text-gray-500 bg-white">
        © {new Date().getFullYear()} UK Match. All rights reserved.
      </footer>
    </div>
  );
}
