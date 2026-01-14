import React, { useRef } from "react";
import Header from "../../common/Header";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // TEXT
      tl.from(".service-hero-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
      });

      // IMAGE
      tl.from(
        ".service-hero-img",
        {
          x: 60,
          opacity: 0,
          scale: 0.96,
          duration: 2.2,
        },
        "-=0.8"
      );

      // MOVING GRADIENT
      gsap.to(".moving-gradient", {
        backgroundPosition: "100% 50%",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-black">
      <Header
        bgColor="transparent"
        text="text-white"
        border="border-white/10"
      />

      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* MOVING GRADIENT */}
        <div
          className="moving-gradient absolute inset-0 opacity-60 z-0"
          style={{
            background:
              "linear-gradient(270deg, #1a1a1a, #B88401, #facc15, #B88401, #1a1a1a)",
            backgroundSize: "400% 400%",
          }}
        />

        {/* IMAGE OVERLAY */}
        <img
          src="https://ik.imagekit.io/b9tt0xvd7/Falverra/bgservice.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
        />

        {/* 🎯 CONTENT — SAME 87vw WRAPPER */}
        <div
          className="relative z-10 mx-auto w-full px-4 lg:px-0 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-[12vh]"
          style={{ maxWidth: "87vw" }}
        >
          {/* LEFT */}
          <div className="text-white">
            <h1 className="service-hero-text text-5xl md:text-7xl font-bold leading-tight mb-6">
              Our <br /> Services
            </h1>

            <p className="service-hero-text max-w-lg text-lg text-white/80 leading-relaxed">
              Engineered with precision, our TMT bars redefine strength and
              reliability. Designed to withstand extreme conditions, they
              guarantee safety and durability for every project, big or small.
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="
                service-hero-img
                rounded-2xl overflow-hidden
                shadow-[0_0_60px_rgba(184,132,1,0.3)]
                border border-white/10
                w-full
                max-w-[520px]
                h-[45vh]
                md:h-[70vh]
              "
            >
              <img
                src="https://ik.imagekit.io/b9tt0xvd7/Falverra/serviceherobuilding.jpg"
                alt="Building Model"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
