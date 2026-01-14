import React, { useRef } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "TMT Standard",
    desc: "Need strength and quality within a good budget?",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
    path: "/services/tmt-Standard",
  },
  {
    title: "TMT Prime",
    desc: "Looking to elevate your home with superior materials and finishes?",
    image:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=800&q=80",
    path: "/services/tmt-Prime",
  },
  {
    title: "TMT Luxe",
    desc: "Ready to build a no-compromise luxury home with the finest craftsmanship?",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
    path: "/services/tmt-Luxe",
  },
];

const ServicesCards = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".service-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="bg-[#FAF8F3] py-20 overflow-hidden"
    >
      {/* 🎯 SAME 87vw WRAPPER */}
      <div
        className="mx-auto w-full px-4 lg:px-0"
        style={{ maxWidth: "87vw" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className="
                service-card cursor-pointer
                bg-[#B587180D] rounded-md overflow-hidden
                transition-transform duration-500 hover:-translate-y-2
              "
            >
              {/* IMAGE */}
              <div className="w-full aspect-[3/2] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="py-5 px-4">
                <h3 className="text-2xl font-serif font-semibold text-[#1D1D1B] mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-[#6B6B6B] mb-6 leading-relaxed max-w-[90%]">
                  {item.desc}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(item.path);
                  }}
                  className="flex items-center gap-2 text-[#B58718] font-semibold text-sm hover:gap-3 transition-all"
                >
                  Learn More
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesCards;
