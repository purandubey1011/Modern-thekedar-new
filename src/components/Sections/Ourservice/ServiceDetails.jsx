import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "TMT Standard",
    desc: `TMT Standard is perfect for clients who want a solid, dependable foundation for their homes without the frills. We use standard quality materials and offer functional design, ensuring that your home is built to last while staying within budget. With skilled labor and solid construction techniques, TMT Standard provides a reliable, cost-effective solution without compromising the core values of craftsmanship and durability.`,
    tags: [
      "Reliable Materials",
      "Skilled Labor",
      "Affordable",
      "Budget-Friendly Design",
    ],
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "TMT Prime",
    desc: `TMT Prime is ideal for clients seeking better finishes, higher-quality materials, and greater design flexibility than the TMT Standard offers. With above-standard materials and enhanced craftsmanship, TMT Prime homes are designed to make a statement while still being conscious of your budget. This option provides an elevated living experience perfect for those who desire premium finishes and long-lasting quality.`,
    tags: [
      "Above-Standard Materials",
      "Advanced Skilled Labor",
      "More Customization",
      "Enhanced Aesthetics",
    ],
    image:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "TMT Luxe",
    desc: `TMT Luxe is not just a service—it’s a vision turned into reality. Designed for clients who don’t settle for anything less than perfection, this option includes premium materials, unlimited design choices, and expert craftsmanship. From concept to completion, TMT Luxe ensures your home is a timeless masterpiece that reflects your unique taste and lifestyle.`,
    tags: [
      "Bespoke Design",
      "Premium Materials",
      "Cutting-Edge Technology",
      "Expert Craftsmanship",
    ],
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
  },
];

const ServiceDetails = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.utils.toArray(".service-block").forEach((block, index) => {
        const text = block.querySelector(".service-text");
        const image = block.querySelector(".service-image");

        const fromX = index % 2 === 0 ? -60 : 60;

        gsap.from([text, image], {
          y: 50,
          x: fromX,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: block,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="bg-[#FAF8F3] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {services.map((service, index) => (
          <div
            key={index}
            className="
              service-block
              grid grid-cols-1 lg:grid-cols-2 gap-12 items-center
              rounded-xl border border-[#EADFC8] p-10 bg-[#FAF8F3]
            "
          >
            {/* TEXT */}
            <div className="service-text">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#1D1D1B] mb-4">
                {service.title}
              </h2>

              <p className="text-sm leading-relaxed text-[#6B6B6B] mb-6">
                {service.desc}
              </p>

              <div className="flex flex-wrap gap-3">
                {service.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-4 py-1.5 rounded-full bg-[#FFF1D6] text-[#B58718] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* IMAGE */}
            <div className="service-image rounded-xl overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceDetails;
