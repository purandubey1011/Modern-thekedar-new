import React, { useRef } from "react";
import Header from "../../common/Header";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // LEFT TEXT ANIMATION
      tl.from(".service-hero-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
      });

      // RIGHT IMAGE ANIMATION
      tl.from(
        ".service-hero-img",
        {
          x: 60,
          opacity: 0,
          scale: 0.96,
          duration: 1.2,
        },
        "-=0.8"
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* HEADER */}
      <Header
        bgColor="bg-[#B88401]"
        text="text-white"
        border="border-white"
      />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center">
        {/* BACKGROUND IMAGE */}
        <img
          src="https://ik.imagekit.io/b9tt0xvd7/Falverra/bgservice.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/10"></div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-[12vh]">
          {/* LEFT CONTENT */}
          <div className="text-white">
            <h1 className="service-hero-text text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Our <br /> Services
            </h1>

            <p className="service-hero-text max-w-lg text-base md:text-lg text-white/90">
              Engineered with precision, our TMT bars redefine strength and
              reliability. Designed to withstand extreme conditions, they
              guarantee safety and durability for every project, big or small.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center lg:justify-end">
            <div
  className="
    service-hero-img
    rounded-2xl overflow-hidden shadow-2xl

    /* 📱 Mobile (default) */
    w-[90vw] h-[45vh]

    /* 💻 Desktop */
    md:w-[42vw] md:h-[70vh]
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
