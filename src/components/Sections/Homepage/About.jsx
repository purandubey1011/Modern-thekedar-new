import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".about-text", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      gsap.from(imageRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
  ref={containerRef}
  className="relative py-6 lg:py-16 overflow-hidden bg-white"
>
  <div
    className="
      mx-auto
      w-full
      px-4
      lg:px-0
      grid
      grid-cols-1
      md:grid-cols-2
      gap-6
      lg:gap-16
      items-center
      relative
      z-10
    "
    style={{ maxWidth: "87vw" }}
  >
    {/* LEFT IMAGE */}
    <div className="flex justify-center">
      <img
        ref={imageRef}
        src="/Assets/About.png"
        alt="Luxury modern villa"
        className="
          rounded-3xl
          shadow-xl
          w-full
          object-cover
          h-[30vh]
          sm:h-[40vh]
          md:h-[45vh]
          lg:h-[50vh]
          xl:h-[55vh]
        "
      />
    </div>

    {/* RIGHT TEXT */}
    <div className="font-poppins">
      <h5 className="about-text text-[#B58718] font-semibold text-xl">
        About Us
      </h5>

      <h2 className="about-text mt-3 lg:mt-5 font-times text-3xl md:text-4xl font-bold leading-snug text-gray-900">
        The Illusion of Choice Flats or <br />
        Chaos, Both Are Traps.
      </h2>

      <p className="about-text mt-3 lg:mt-6 text-gray-600 leading-relaxed text-[2vmax] md:text-[16px] max-w-xl">
        At The Modern Thekedar (TMT), we’re redefining how homes are built.
        No cramped flats. No chaotic construction. Just smart design, honest
        execution, and peace of mind. We blend modern design expertise with
        traditional craftsmanship — giving you the freedom of a custom home
        and the ease of a seamless, professional process.
      </p>
    </div>
  </div>
</section>
  );
};

export default About;
