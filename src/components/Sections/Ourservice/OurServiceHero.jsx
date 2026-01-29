import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import Header from "../../common/Header";
import { useNavigate } from "react-router-dom";

const servicesData = [
  {
    id: 1,
    title: "TMT Standard",
    fullDesc: "Need strength and quality within a good budget?",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
    path: "/services/tmt-Standard",
  },
  {
    id: 2,
    title: "TMT Prime",
    fullDesc: "Looking to elevate your home with superior materials and finishes?",
    image: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=800&q=80",
    path: "/services/tmt-Prime",
  },
  {
    id: 3,
    title: "TMT Luxe",
    fullDesc: "Ready to build a no-compromise luxury home with the finest craftsmanship?",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
    path: "/services/tmt-Luxe",
  },
];

const HeroService = () => {
  const navigate = useNavigate();
  const mainContainer = useRef(null);
  const movingImagesRef = useRef([]);
  const targetRefs = useRef([]);
  const [isGsapReady, setIsGsapReady] = useState(false);

  useEffect(() => {
    const loadScripts = async () => {
      if (window.gsap && window.ScrollTrigger) {
        setIsGsapReady(true);
        return;
      }
      const loadScript = (src) =>
        new Promise((res) => {
          const s = document.createElement("script");
          s.src = src;
          s.onload = res;
          document.body.appendChild(s);
        });

      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js");
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js");
      window.gsap.registerPlugin(window.ScrollTrigger);
      setIsGsapReady(true);
    };
    loadScripts();
  }, []);

  useLayoutEffect(() => {
    if (!isGsapReady) return;
    const gsap = window.gsap;
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      
      const ctx = gsap.context(() => {
        window.ScrollTrigger.create({
          trigger: mainContainer.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mainContainer.current,
            start: "top top",
            end: "+=70%",
            scrub: 1,
          },
        });

        tl.to(".hero-text-content", { opacity: 0, y: -50 }, 0);

        movingImagesRef.current.forEach((img, idx) => {
          const target = targetRefs.current[idx];
          const scrollXAu = -0.1125 * window.innerWidth + 197
          const scrollYAu = 0.25316456 * window.innerHeight - 115.316
        
          if (!img || !target) return;
          tl.to(img, {
            x: () => {
              const t = target.getBoundingClientRect();
              // are ruko to
              const i = img.getBoundingClientRect();
              return (t.left + t.width / 2 - (i.left
                 + i.width / 2)) + scrollXAu + idx * 41;
            },
            y: () => {
              const t = target.getBoundingClientRect();
              const i = img.getBoundingClientRect();
              return (t.top + t.height / 2 - (i.top + i.height / 2)) + scrollYAu + idx * 20;
            },
            width: () => target.offsetWidth,
            height: () => target.offsetHeight,
            rotation: 0,
            borderRadius: "10px 10px 0 0",
            ease: "none",
          }, 0);
        });
      }, mainContainer);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [isGsapReady]);

  if (!isGsapReady) return (
    <div className="h-screen flex items-center justify-center bg-[#B58718] text-white">
      <Loader2 className="animate-spin" />
    </div>
  );

  return (

    <>
    <Header bgColor="" text="black" border="border"/>

    <div ref={mainContainer} className="relative w-full overflow-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen w-full bg-[#B58718] z-30 flex flex-col">
        {/* Responsive Grid Layout */}
        <div className="flex-grow flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">

            {/* LEFT CONTENT */}
            <div className="hero-text-content text-white">
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 mt-12">
                Our <br className="hidden md:block"/> Services
              </h1>
              <p className="text-lg text-white/90 max-w-lg">
                Engineered with precision, our TMT bars redefine strength and reliability.
                Designed to withstand extreme conditions, they guarantee safety and durability for every project.
              </p>
            </div>

            {/* RIGHT IMAGE (Mobile Only Static Version) */}
            <div className="md:hidden relative flex justify-center">
               <div className="w-[90vw] h-[45vh] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://ik.imagekit.io/b9tt0xvd7/Falverra/serviceherobuilding.jpg"
                    alt="Service Hero"
                    className="w-full h-full object-cover"
                  />
               </div>
            </div>
          </div>
        </div>

        {/* FLOATING IMAGES (Desktop Animation Only) */}
        <div className="hidden md:block absolute inset-0 z-40 pointer-events-none">
          {servicesData.map((service, i) => (
            <div
              key={i}
              ref={(el) => (movingImagesRef.current[i] = el)}
              className="absolute w-[22vw] h-[55vh] right-[10%] top-[30%] shadow-2xl overflow-hidden rounded-2xl will-change-transform"
              style={{
                zIndex: 40 - i,
                transform: `translate(${i * 40}px, ${i * 20}px) rotate(${i * 5}deg)`,
              }}
            >
              <img src={service.image} className="w-full h-full object-cover" alt="" />
            </div>
          ))}
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section className="relative min-h-screen py-32 bg-[#FAF8F3] z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicesData.map((service, i) => (
              <div
                key={i}
                onClick={() => navigate(service.path)}
                className="cursor-pointer bg-[#B587180D] rounded-md overflow-hidden transition-transform duration-500 hover:-translate-y-2 group"
              >
                {/* TARGET FOR GSAP (Desktop) / STATIC IMAGE (Mobile) */}
                <div
                   ref={(el) => (targetRefs.current[i] = el)}
                   className="w-full aspect-[3/2] overflow-hidden bg-gray-200"
                >
                    {/* Only visible on mobile to provide the visual content */}
                    <img
                        src={service.image}
                        className="md:hidden w-full h-full object-cover"
                        alt={service.title}
                    />
                </div>

                <div className="py-5 px-3">
                  <h3 className="text-2xl font-serif font-semibold text-[#1D1D1B] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#6B6B6B] mb-6 leading-relaxed max-w-[90%]">
                    {service.fullDesc}
                  </p>
                  <button className="flex items-center gap-2 text-[#B58718] font-semibold text-sm">
                    Learn More <ChevronDown size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>

    </>
  );
};

export default HeroService;



// import React, { useRef } from "react";
// import Header from "../../common/Header";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";

// const Hero = () => {
//   const containerRef = useRef(null);

//   useGSAP(
//     () => {
//       const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

//       // 1. Text & Image entrance
//       tl.from(".service-hero-text", {
//         y: 50,
//         opacity: 0,
//         duration: 1,
//         stagger: 0.2,
//       });
//       tl.from(
//         ".service-hero-img",
//         { x: 60, opacity: 0, scale: 0.96, duration: 2.2 },
//         "-=0.8"
//       );

//       // 2. THE MOVING GRADIENT ANIMATION
//       // We animate the background-position to create the "flow" effect
//       gsap.to(".moving-gradient", {
//         backgroundPosition: "100% 50%",
//         duration: 10,
//         repeat: -1,
//         yoyo: true,
//         ease: "sine.inOut",
//       });
//     },
//     { scope: containerRef }
//   );

//   return (
//     <div ref={containerRef} className="relative overflow-hidden bg-linear-to-t from-white via-[#B58718] to-[#B58718]">
//       <Header
//         bgColor="transparent"
//         text="text-white"
//         border="border-white/10"
//       />

//       <section className="relative min-h-screen flex items-center">
//         {/* THE MOVING GRADIENT LAYER */}
//         <div
//           className="moving-gradient absolute inset-0 opacity-60 z-0"
//           style={{
//             background: `linear-gradient(270deg, #1a1a1a, #B88401, #B88401, #B88401, #1a1a1a)`,
//             backgroundSize: "400% 400%",
//             clipPath: "polygon(0 0, 100% 0, 100% 94%, 0% 100%)",
//           }}
//         />

//         {/* OVERLAY IMAGE WITH BLEND MODE */}
//         {/* This allows the gradient to "shine through" the darker parts of your image */}
//         {/* <img
//           src="https://ik.imagekit.io/b9tt0xvd7/Falverra/bgservice.jpg"
//           alt="Background"
//           className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
//         /> */}

//         {/* CONTENT */}
//         <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-[12vh]">
//           <div className="text-white">
//             <h1 className="service-hero-text text-5xl md:text-7xl font-bold leading-tight mb-6">
//               Our <br /> <span className="text-white">Services</span>
//             </h1>
//             <p className="service-hero-text max-w-lg text-lg text-white/80 leading-relaxed">
//               Engineered with precision, our TMT bars redefine strength and
//               reliability. Designed to withstand extreme conditions, they
//               guarantee safety and durability for every project, big or small.
//             </p>
//           </div>

//           <div className="relative flex justify-center lg:justify-end">
//             <div className="service-hero-img rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(184,132,1,0.3)] w-[90vw] h-[45vh] md:w-[42vw] md:h-[70vh] border border-white/10">
//               <img
//                 src="https://ik.imagekit.io/b9tt0xvd7/Falverra/serviceherobuilding.jpg"
//                 alt="Building Model"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Hero;
