import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ---------- ACCORDION ITEM ---------- */
const AccordionItem = ({ index, question, answer, isOpen, onToggle }) => {
  const contentRef = useRef(null);

  useGSAP(
    () => {
      if (isOpen) {
        gsap.killTweensOf(".word");
        gsap.fromTo(
          ".word",
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.01,
            ease: "power2.out",
          }
        );
      }
    },
    { scope: contentRef, dependencies: [isOpen] }
  );

  const words = answer.split(" ");

  return (
    <div className="accordion-item border-b border-gray-200 pb-3">
      <button
        onClick={() => onToggle(index)}
        className="flex justify-between items-center w-full py-5 text-left"
      >
        <span
          className={`text-lg font-semibold transition ${
            isOpen ? "text-[#B58718]" : "text-gray-900"
          }`}
        >
          {question}
        </span>

        {isOpen ? (
          <ChevronUp size={22} className="text-[#B58718]" />
        ) : (
          <ChevronDown size={22} className="text-gray-600" />
        )}
      </button>

      <div
        className={`grid transition-all duration-500 ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div ref={contentRef} className="overflow-hidden">
          <p className="text-gray-600 leading-relaxed pb-3">
            {words.map((w, i) => (
              <span key={i} className="word inline-block mr-1 opacity-0">
                {w}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ---------- MAIN COMPONENT ---------- */
const MoreFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        })
        .from(".faq-image-wrapper", {
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 1.2,
          ease: "power4.inOut",
        })
        .from(".more-faq-label", { y: 20, opacity: 0, duration: 0.5 }, "-=0.8")
        .from(".more-faq-title", { y: 30, opacity: 0, duration: 0.6 }, "-=0.6")
        .from(".accordion-item", {
          y: 20,
          opacity: 0,
          stagger: 0.1,
        }, "-=0.5");
    },
    { scope: containerRef }
  );

  const faqs = [
    {
      question: "What does sustainability mean for your company?",
      answer:
        "Sustainability for us means operating in a way that minimizes environmental impact, supports social responsibility, and ensures long-term economic growth.",
    },
    {
      question:
        "How do you ensure your products/services are environmentally friendly?",
      answer:
        "We integrate eco-friendly materials, optimize for energy efficiency, and partner with suppliers who share our commitment to sustainability.",
    },
    {
      question: "Do you have any third-party environmental certifications?",
      answer:
        "Yes, many of our projects are certified under LEED and other green building standards.",
    },
    {
      question: "How do you track and measure environmental impact?",
      answer:
        "We conduct regular audits of our carbon footprint, waste generation, and water usage.",
    },
    {
      question: "What steps are you taking to reduce carbon emissions?",
      answer:
        "We are investing in renewable energy, optimizing supply chains, and using carbon-neutral materials.",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="bg-white py-12 lg:py-24 overflow-hidden"
    >
      {/* 🎯 SAME 87vw WRAPPER */}
      <div
        className="mx-auto w-full px-4 lg:px-0"
        style={{ maxWidth: "87vw" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* LEFT */}
          <div>
            <span className="more-faq-label text-[#B58718] font-semibold text-sm uppercase tracking-widest">
              FAQ'S
            </span>

            <h2 className="more-faq-title font-serif text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-10">
              Any More Enquires
            </h2>

            <div className="space-y-1">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  index={i}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === i}
                  onToggle={() =>
                    setOpenIndex(openIndex === i ? null : i)
                  }
                />
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex justify-end">
            <div className="faq-image-wrapper rounded-xl overflow-hidden shadow-xl w-full lg:w-[100%] h-[45vh] lg:h-[70vh]">
              <img
                src="/Assets/villa3.png"
                alt="Green building"
                className="w-full h-full object-cover transition duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoreFAQ;
