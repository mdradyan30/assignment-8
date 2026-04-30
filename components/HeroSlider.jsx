"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    badge: "🔥 Hot Deals",
    title: "Summer Sale",
    highlight: "50% OFF",
    subtitle: "On all sunglasses & accessories",
    desc: "Stay cool, stay stylish. Explore our curated collection of summer essentials.",
    cta: "Shop Now",
    bg: "from-amber-400 via-orange-500 to-red-500",
    emoji: "☀️",
    pattern: "sunglasses",
  },
  {
    id: 2,
    badge: "🌊 Beach Ready",
    title: "New Arrivals",
    highlight: "Summer 2024",
    subtitle: "Fresh styles just landed",
    desc: "Discover the latest beach accessories, swimwear, and skincare essentials.",
    cta: "Explore Now",
    bg: "from-sky-400 via-cyan-500 to-teal-500",
    emoji: "🏖️",
    pattern: "beach",
  },
  {
    id: 3,
    badge: "✨ Skincare Special",
    title: "Protect Your",
    highlight: "Glow",
    subtitle: "Premium SPF collection",
    desc: "Keep your skin healthy and radiant all summer with our expert-curated skincare range.",
    cta: "Discover More",
    bg: "from-pink-400 via-rose-500 to-fuchsia-500",
    emoji: "🌸",
    pattern: "skincare",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${slide.bg} transition-all duration-700`}
      style={{ minHeight: "500px" }}>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-20 text-9xl sun-rotate select-none">☀</div>
        <div className="absolute bottom-10 left-10 text-6xl wave-float select-none">🌊</div>
        <div className="absolute top-1/2 right-1/4 text-5xl wave-float select-none" style={{ animationDelay: "1s" }}>⭐</div>
        {/* Circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border-4 border-white/20"></div>
        <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full border-4 border-white/20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div key={current} className="animate__animated animate__fadeInLeft">
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 badge-pulse">
              {slide.badge}
            </span>
            <h1 className="font-display text-5xl lg:text-7xl font-black text-white leading-tight mb-2">
              {slide.title}
            </h1>
            <h2 className="font-display text-5xl lg:text-7xl font-black text-white/90 mb-4 relative inline-block">
              {slide.highlight}
              <div className="absolute bottom-0 left-0 w-full h-2 bg-white/30 rounded-full"></div>
            </h2>
            <p className="text-white/90 text-lg font-semibold mb-2">{slide.subtitle}</p>
            <p className="text-white/75 text-base mb-8 max-w-md leading-relaxed">{slide.desc}</p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/#products"
                className="btn bg-white text-orange-600 hover:bg-amber-50 border-0 shadow-xl font-bold px-8 rounded-full text-sm">
                {slide.cta} →
              </Link>
              <Link href="/register"
                className="btn btn-outline border-white text-white hover:bg-white hover:text-orange-600 font-semibold px-8 rounded-full text-sm">
                Join Now Free
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10">
              {[["500+", "Products"], ["10K+", "Happy Buyers"], ["50%", "Max Discount"]].map(([num, label]) => (
                <div key={label} className="text-center">
                  <div className="font-display text-2xl font-black text-white">{num}</div>
                  <div className="text-white/70 text-xs font-medium">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Side */}
          <div key={current + "v"} className="hidden lg:flex justify-center items-center animate__animated animate__fadeInRight">
            <div className="relative">
              <div className="w-72 h-72 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <div className="w-56 h-56 rounded-full bg-white/30 flex items-center justify-center">
                  <span className="text-9xl wave-float">{slide.emoji}</span>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-2 shadow-xl">
                <div className="text-orange-500 font-black text-xl">50% OFF</div>
                <div className="text-gray-500 text-xs">Limited Time</div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-2 shadow-xl">
                <div className="text-green-500 font-bold text-sm flex items-center gap-1">⭐ 4.9 Rating</div>
                <div className="text-gray-500 text-xs">10K+ Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
