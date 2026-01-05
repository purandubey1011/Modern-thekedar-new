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
    .from(".hero-shape", {
      x: 100, 
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
      
      {/* The Custom Slanted Shape - Smooth Diagonal Flow */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] mt-0 overflow-hidden">
        <div
          className="hero-shape w-full h-full animate-smooth-flow"
          style={{
            background: `linear-gradient(135deg, 
              #ffedd4 0%, 
              #facc15 25%, 
              #c19838 50%, 
              #facc15 75%, 
              #ffedd4 100%
            )`,
            backgroundSize: "400% 400%",
            clipPath: "polygon(0 40%, 100% 0, 100% 60%, 0% 100%)",
          }}
        />

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
      </div>
    </section>
  );
}

export default Hero;