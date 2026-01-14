import React, { useRef } from "react";
import { Flower } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OurPromise = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "restart none none reverse",
        },
      });

      tl.from(".promise-icon", {
        scale: 0,
        rotation: -45,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      })
        .from(
          ".promise-title",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          ".promise-text",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .from(
          ".promise-image",
          {
            x: 50,
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
        <div className="grid md:grid-cols-2 gap-12 items-center bg-[#F9F9F9] border border-[rgb(237,227,200)] rounded-xl p-6 lg:p-12">
          {/* LEFT */}
          <div>
            <div className="promise-icon w-16 h-16 bg-[#B58718] rounded-lg flex items-center justify-center shadow-lg mb-6">
              <Flower size={32} className="text-white" />
            </div>

            <h2 className="promise-title text-[32px] font-bold text-[#0A0A0A] font-times mb-6">
              Our Promise
            </h2>

            <p className="promise-text text-[#0E0F13] leading-relaxed font-montserrat text-[16px]">
              Every TMT home is more than just a structure. It’s a legacy, a
              sanctuary, and a statement. We ensure that your home isn’t just
              beautiful — it’s functional, timeless, and uniquely yours. When
              you choose TMT, you’re choosing a partner who is committed to
              making your vision tangible, flawless, and unforgettable.
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center md:justify-end">
            <img
              src="/Assets/gallery1.png"
              alt="Our Promise"
              className="promise-image rounded-lg shadow-2xl object-cover w-full max-w-[490px] h-[40vh] lg:h-[360px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPromise;
