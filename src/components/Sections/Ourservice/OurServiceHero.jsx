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
          if (!img || !target) return;

          tl.to(img, {
            x: () => {
              const t = target.getBoundingClientRect();
              const i = img.getBoundingClientRect();
              return (t.left + t.width / 2 - (i.left + i.width / 2)) + 42 + idx * 41;
            },
            y: () => {
              const t = target.getBoundingClientRect();
              const i = img.getBoundingClientRect();
              return (t.top + t.height / 2 - (i.top + i.height / 2)) + 44 + idx * 20;
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
    <div ref={mainContainer} className="relative w-full overflow-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen w-full bg-[#B58718] z-30 flex flex-col">
        <Header bgColor="transparent" text="text-white" border="border-white/30" />
        
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

//       // LEFT TEXT ANIMATION
//       tl.from(".service-hero-text", {
//         y: 50,
//         opacity: 0,
//         duration: 1,
//         stagger: 0.2,
//       });

//       // RIGHT IMAGE ANIMATION
//       tl.from(
//         ".service-hero-img",
//         {
//           x: 60,
//           opacity: 0,
//           scale: 0.96,
//           duration: 1.2,
//         },
//         "-=0.8"
//       );
//     },
//     { scope: containerRef }
//   );

//   return (
//     <div ref={containerRef} className="relative overflow-hidden">
//       {/* HEADER */}
//       <Header
//         bgColor="bg-[#B88401]"
//         text="text-white"
//         border="border-white"
//       />

//       {/* HERO SECTION */}
//       <section className="relative min-h-screen flex items-center">
//         {/* BACKGROUND IMAGE */}
//         <img
//           src="https://ik.imagekit.io/b9tt0xvd7/Falverra/bgservice.jpg"
//           alt="Background"
//           className="absolute inset-0 w-full h-full object-cover"
//         />

//         {/* DARK OVERLAY */}
//         <div className="absolute inset-0 bg-black/10"></div>

//         {/* CONTENT */}
//         <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-[12vh]">
//           {/* LEFT CONTENT */}
//           <div className="text-white">
//             <h1 className="service-hero-text text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
//               Our <br /> Services
//             </h1>

//             <p className="service-hero-text max-w-lg text-base md:text-lg text-white/90">
//               Engineered with precision, our TMT bars redefine strength and
//               reliability. Designed to withstand extreme conditions, they
//               guarantee safety and durability for every project, big or small.
//             </p>
//           </div>

//           {/* RIGHT IMAGE */}
//           <div className="relative flex justify-center lg:justify-end">
//             <div
//   className="
//     service-hero-img
//     rounded-2xl overflow-hidden shadow-2xl

//     /* 📱 Mobile (default) */
//     w-[90vw] h-[45vh]

//     /* 💻 Desktop */
//     md:w-[42vw] md:h-[70vh]
//   "
// >
//   <img
//     src="https://ik.imagekit.io/b9tt0xvd7/Falverra/serviceherobuilding.jpg"
//     alt="Building Model"
//     className="w-full h-full object-cover"
//   />
// </div>

//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Hero;
