import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  const containerRef = useRef(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".hero-title", {
      y: 60,
      opacity: 0,
      duration: 1,
      delay: 0.2
    })
    // Updated selector to target the custom div
    .from(".hero-shape", {
      x: 100, // Slides in from the right
      opacity: 0,
      duration: 1.2,
      ease: "power2.out"
    }, "-=0.6");

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-white overflow-hidden md:min-h-screen flex flex-col">
      {/* Text content area */}
      <div className="container mx-auto px-6 pt-20 pb-12 md:pt-32 md:pb-0">
        <h1 className="hero-title text-4xl md:text-5xl lg:text-[80px] font-bold text-[#20000F] max-w-2xl mt-9 leading-tight">
          Building Homes <br /> That Reflect You
        </h1>
      </div>
      
      {/* The Custom Slanted Shape */}
<div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] mt-0 overflow-hidden">
  <div
    className="hero-shape w-full h-full animate-liquid-sun"
    style={{
      backgroundColor: "#ffb000",
      backgroundImage: `
        radial-gradient(at 0% 0%, #ff0055 0px, transparent 50%),   /* Hot Pink for Depth */
        radial-gradient(at 100% 0%, #ffea00 0px, transparent 50%), /* Bright Neon Yellow */
        radial-gradient(at 100% 100%, #ff8c00 0px, transparent 50%),/* Deep Orange */
        radial-gradient(at 0% 100%, #fff700 0px, transparent 50%), /* Pure Yellow */
        radial-gradient(at 50% 50%, #ffffff 0px, transparent 50%)   /* Central White Glow */
      `,
      backgroundSize: "150% 150%",
      clipPath: "polygon(0 40%, 100% 0, 100% 60%, 0% 100%)",
      filter: "saturate(1.8) contrast(1.2) drop-shadow(0px 30px 60px rgba(255, 165, 0, 0.5))",
    }}
  />

  <style jsx global>{`
    @keyframes liquid-sun {
      0% { background-position: 0% 0%; }
      25% { background-position: 100% 0%; }
      50% { background-position: 100% 100%; }
      75% { background-position: 0% 100%; }
      100% { background-position: 0% 0%; }
    }
    .animate-liquid-sun {
      animation: liquid-sun 8s infinite alternate ease-in-out;
    }
  `}</style>
</div>


    </section>
  );
}

export default Hero;