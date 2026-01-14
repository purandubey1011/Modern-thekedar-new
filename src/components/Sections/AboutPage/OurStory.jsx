import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OurStory = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "restart none none reverse",
        },
      });

      tl.from(".story-title", {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".story-text",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .from(
          ".story-image",
          {
            x: 50,
            scale: 0.9,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.6"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-10 lg:py-20 bg-white overflow-hidden"
    >
      {/* 🎯 SAME 87vw WRAPPER */}
      <div
        className="mx-auto w-full px-4 lg:px-0"
        style={{ maxWidth: "87vw" }}
      >
        {/* CARD */}
        <div className="grid md:grid-cols-2 gap-12 items-center bg-[rgb(251,249,243)] border border-[rgb(237,227,200)] rounded-xl p-6 lg:p-12">
          {/* LEFT */}
          <div>
            <h2 className="story-title text-[4vmax] lg:text-4xl font-bold text-[#0A0A0A] font-times mb-6">
              Who We Are
            </h2>

            <p className="story-text text-[#000000] leading-relaxed font-montserrat text-sm lg:text-[18px]">
              At TMT, we don’t just build houses — we create homes that tell your
              story. Every brick, every design choice, and every detail is crafted
              around you. We believe that a home should inspire, not just
              accommodate; it should reflect your personality, ambitions, and
              lifestyle. Our mission is to bring individuality, elegance, and
              timeless design back into home construction, so that no two TMT
              homes are ever alike.
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center md:justify-end">
            <img
              src="/Assets/about2.png"
              alt="Our Story"
              className="story-image rounded-lg shadow-2xl object-cover w-full max-w-[490px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
