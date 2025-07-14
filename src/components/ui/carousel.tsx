// src/components/ui/carousel.tsx
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  src: string;
  alt?: string;
}

interface CarouselProps {
  slides: Slide[];
  interval?: number; // ms
}

export default function Carousel({ slides, interval = 5000 }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const last = slides.length - 1;

  // Auto‐advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === last ? 0 : prev + 1));
    }, interval);
    return () => clearInterval(timer);
  }, [last, interval]);

  const goPrev = () => setCurrent((c) => (c === 0 ? last : c - 1));
  const goNext = () => setCurrent((c) => (c === last ? 0 : c + 1));

  return (
    <div className="relative w-full overflow-hidden bg-white">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map(({ src, alt }, idx) => (
          <div key={idx} className="flex-none w-full relative h-64 sm:h-96 bg-white">
            <Image
              src={src}
              alt={alt ?? `slide-${idx}`}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {/* Prev / Next */}
      <button
        onClick={goPrev}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
      >
        <ChevronLeft className="w-6 h-6 text-black" />
      </button>
      <button
        onClick={goNext}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
      >
        <ChevronRight className="w-6 h-6 text-black" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full ${
              idx === current ? "bg-white" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
