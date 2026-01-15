import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-title", {
        y: 50,
        opacity: 0,
        duration: 1,
      }).from(
        ".hero-shape",
        {
          x: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
        },
        "-=0.7"
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="bg-white overflow-hidden md:min-h-screen flex flex-col"
    >
      {/* 🎯 TEXT CONTENT — SAME 87vw WRAPPER */}
      <div
        className="mx-auto w-full px-4 lg:px-0 pt-20 pb-12 md:pt-32 md:pb-0"
        style={{ maxWidth: "87vw" }}
      >
        <h1 className="hero-title text-4xl md:text-5xl lg:text-[80px] font-bold text-[#20000F] max-w-2xl mt-9 leading-tight">
          Building Homes <br /> That Reflect You
        </h1>
      </div>

      {/* FULL-WIDTH SHAPE */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
        <div
          className="hero-shape w-full h-full animate-smooth-flow"
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
            clipPath: "polygon(0 40%, 100% 0, 100% 60%, 0% 100%)",
          }}
        />
      </div>

      {/* GLOBAL ANIMATION */}
      <style jsx global>{`
        @keyframes smooth-flow {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 100%;
          }
        }
        .animate-smooth-flow {
          animation: smooth-flow 10s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
