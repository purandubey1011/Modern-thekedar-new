import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// --- Sub-Component for Accordion Item ---
const AccordionItem = ({ index, question, answer, isOpen, onToggle }) => {
  const contentRef = useRef(null);

  useGSAP(() => {
    if (isOpen) {
      // 1. Cleanup
      gsap.killTweensOf(".word");
      
      // 2. Cinematic Soft Focus Text Animation
      gsap.fromTo(".word", 
        { 
          opacity: 0, 
          y: 8, 
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.01, // Fast ripple effect
          ease: "power2.out",
          delay: 0.1 
        }
      );
    }
  }, { scope: contentRef, dependencies: [isOpen] });

  const words = answer.split(" ");

  return (
    <div className="accordion-item border-b border-gray-200 group">
      <button
        onClick={() => onToggle(index)}
        className="flex justify-between items-center w-full py-5 text-left focus:outline-none"
      >
        <span
          className={`text-lg font-semibold transition-colors duration-300 ${
            isOpen ? "text-[#B58718]" : "text-gray-800 group-hover:text-[#B58718]"
          }`}
        >
          {question}
        </span>
        {isOpen ? (
          <ChevronUp size={20} className="text-[#B58718]" />
        ) : (
          <ChevronDown size={20} className="text-gray-500 group-hover:text-[#B58718]" />
        )}
      </button>

      {/* Smooth Grid Transition for Height */}
      <div
        className={`grid transition-all duration-500 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div ref={contentRef} className="overflow-hidden">
          <div className="pb-5"> 
            <p className="text-gray-600 font-poppins pt-1 leading-relaxed">
              {words.map((word, i) => (
                <span 
                  key={i} 
                  className="word inline-block mr-[4px] opacity-0 will-change-transform"
                >
                  {word}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
const MoreFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const containerRef = useRef(null);

  // GSAP Section Animation
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        // CHANGED: 'none' at the end prevents it from reversing/disappearing on scroll up
        toggleActions: "play none none none", 
      }
    });

    // 1. Image Curtain Reveal (Unrolls from bottom)
    tl.fromTo(".faq-image-wrapper", 
      { clipPath: "inset(100% 0% 0% 0%)" }, // Start hidden at bottom
      { 
        clipPath: "inset(0% 0% 0% 0%)", // Reveal fully
        duration: 1.2,
        ease: "power4.inOut" 
      }
    )
    
    // 2. Text Slide Up (Simultaneous with image)
    .from(".more-faq-label", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.8")
    .from(".more-faq-title", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    
    // 3. Accordion Items Cascade
    .from(".accordion-item", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.4");

  }, { scope: containerRef });
  

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
        "Yes, many of our projects are certified under LEED (Leadership in Energy and Environmental Design) and other local green building standards.",
    },
    {
      question: "How do you track and measure environmental impact?",
      answer:
        "We conduct regular audits of our carbon footprint, water usage, and waste generation, setting clear targets for reduction each year.",
    },
    {
      question: "What steps are you taking to reduce carbon emissions?",
      answer:
        "We are investing in renewable energy sources for our operations, optimizing our supply chain, and incorporating carbon-neutral materials in our construction.",
    },
  ];

  return (
    <section ref={containerRef} className="bg-white py-12 font-sans overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: FAQs */}
        <div className="flex flex-col">
          <span className="more-faq-label text-[#B58718] font-semibold text-sm tracking-widest uppercase mb-2 block">
            FAQ'S
          </span>
          <h2 className="more-faq-title font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-8">
            Any More Enquires
          </h2>

          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                index={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={(i) => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Image with Wrapper for Clip-Path Animation */}
        <div className="lg:w-[430px] h-full mt-10 lg:mt-0 lg:ml-39 relative">
          {/* Wrapper div handles the curtain reveal */}
          <div className="faq-image-wrapper h-full w-full overflow-hidden rounded-lg shadow-xl">
            <img
              src="/Assets/villa3.png"
              alt="Building with vertical gardens"
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoreFAQ;