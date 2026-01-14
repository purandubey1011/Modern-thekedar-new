import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-animate-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
      });

      tl.from(
        ".hero-animate-img",
        {
          x: 50,
          opacity: 0,
          duration: 1.2,
        },
        "-=0.8"
      );

      tl.from(".hero-btn", {
        opacity: 0,
        y: 20,
        duration: 0.8,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[87vh] flex items-center overflow-hidden"
    >
      {/* BACKGROUND (FULL WIDTH) */}
      <div
        className="absolute w-[140vw] h-screen rounded-3xl -rotate-6 top-[-45%] left-[-25%]"
        style={{
          background: `
            radial-gradient(at 10% 20%, #ffedd4 0px, transparent 50%), 
            radial-gradient(at 80% 10%, #c19838 0px, transparent 50%), 
            radial-gradient(at 40% 50%, #eab308 0px, transparent 50%), 
            radial-gradient(at 70% 80%, #c19838 0px, transparent 50%), 
            radial-gradient(at 10% 90%, #ffedd4 0px, transparent 50%),
            #fef3c7
          `,
          backgroundSize: "200% 200%",
          filter: "blur(70px)",
          opacity: 0.7,
        }}
      />

      {/* 🎯 CENTERED CONTENT — SAME AS HEADER */}
      <div
        className="mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 
        items-center relative z-10 pt-20 lg:pt-28 pb-6 px-4 lg:px-0"
        style={{ maxWidth: "87vw" }}
      >
        {/* LEFT TEXT */}
        <div className="flex flex-col justify-center">
          <h1 className="hero-animate-text text-3xl md:text-6xl font-times font-bold text-gray-800 tracking-tight mt-6">
            For visionaries who demand more than just ordinary.
          </h1>

          <p className="hero-animate-text mt-6 text-sm lg:text-base text-gray-600 font-poppins leading-relaxed">
            Let’s be real for a second. Look around any city skyline — what do you see? Flats. Everywhere. Tall, lifeless boxes stacked one on top of another, pretending to be dreams. Same paint. Same tiles. Same floor plan. Same suffocating view. Every corridor looks the same, every door hides another copy-paste life. And somehow, people call that “home.” No, that’s not a home — that’s a high-rise excuse. A glorified pigeonhole built by someone who never knew your name, your taste, or your dream.
          </p>

          <button className="hero-btn bg-yellow-700 text-white font-semibold px-8 py-3 rounded-md hover:bg-yellow-800 duration-300 w-max mt-6">
            Enquire Now
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hero-animate-img rounded-2xl shadow-xl lg:h-[75vh] h-[300px] w-full overflow-hidden">
          <img
            src="/Assets/Hero.png"
            alt="Modern residential building"
            className="rounded-xl w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
