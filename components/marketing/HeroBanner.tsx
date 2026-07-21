"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function HeroBanner() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Apple-style scroll experience: Pin the hero and scale it down/fade out as the next section scrolls over
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1, // Smooth scrubbing
        pin: true,
        pinSpacing: false, // Allows the next section to overlap this one like a curtain
      }
    });

    // Subtly scale down and fade out the whole container (video + text)
    tl.to(containerRef.current, {
      scale: 0.95,
      opacity: 0,
      ease: "none"
    }, 0);

    // Parallax effect on the text content to move it upwards slightly faster than the container
    tl.to(contentRef.current, {
      y: -150,
      opacity: 0,
      ease: "none"
    }, 0);
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100vh] overflow-hidden bg-black flex items-center justify-center"
      aria-labelledby="hero-headline"
    >
      {/* ── Background Video ────────────────────────────────────────────────── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source 
          src="https://ik.imagekit.io/d5lm3vdk3/tast&/Ultra_realistic_cinematic_pr.mp4" 
          type="video/mp4" 
        />
      </video>

      {/* ── Subtle Dark Overlay ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />

      {/* ── Centered Content ────────────────────────────────────────────────── */}
      <div 
        ref={contentRef}
        className="relative z-20 flex flex-col items-center text-center px-6 max-w-4xl"
      >
        <h1 
          id="hero-headline"
          className="text-ivory text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 drop-shadow-xl font-display"
        >
          Taste & Tales
        </h1>
        <p className="text-ivory/90 text-lg md:text-2xl font-light drop-shadow-md font-sans max-w-2xl">
          Premium handcrafted Indian sweets & savouries.
          <br className="hidden sm:block" /> No preservatives. Just honest ingredients.
        </p>
      </div>

      {/* ── Smooth Scroll Indicator ─────────────────────────────────────────── */}
      <div className="absolute bottom-10 z-20 flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity">
        <span className="text-ivory/70 text-[0.65rem] tracking-[0.25em] uppercase mb-4 font-sans">
          Scroll to explore
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-ivory/80 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
