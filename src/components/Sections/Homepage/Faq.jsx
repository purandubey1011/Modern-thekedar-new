import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ---------- FAQ ITEM ---------- */
const FaqItem = ({ faq, isOpen, onClick }) => {
  const words = faq.answer.split(" ");

  return (
    <div className="border-b border-gray-300 pb-4">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left group"
      >
        <span
          className={`text-lg font-semibold font-poppins transition-colors duration-300 ${
            isOpen ? "text-[#B58718]" : "text-gray-800"
          } group-hover:text-[#B58718]`}
        >
          {faq.question}
        </span>

        {isOpen ? (
          <ChevronUp size={24} className="text-[#B58718]" />
        ) : (
          <ChevronDown
            size={24}
            className="text-gray-600 group-hover:text-[#B58718]"
          />
        )}
      </button>

      <div
        className={`grid transition-all duration-700 ease-in-out ${
          isOpen ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr] mt-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-gray-600 leading-relaxed font-poppins pt-2">
            {words.map((word, i) => (
              <span key={i} className="inline-block mr-[5px]">
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ---------- MAIN FAQ ---------- */
const Faq = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.from(".faq-title", {
        y: -30,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          ".faq-image",
          {
            x: 50,
            opacity: 0,
            scale: 0.95,
            duration: 1,
          },
          "-=0.6"
        )
        .from(
          ".faq-list",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.8"
        );
    },
    { scope: containerRef }
  );

  const faqs = [
    {
      question: "What Type Of Properties Do You Deal With?",
      answer:
        "Business murals are large-scale images or designs that cover entire walls, transforming commercial spaces into unique and engaging environments.",
    },
    {
      question: "How Do I Start The Process Of Buying A Property?",
      answer:
        "Starting the process is simple. Contact our advisory team for an initial consultation.",
    },
    {
      question: "What Should I Consider Before Purchasing A Property?",
      answer:
        "Consider factors like location, budget, property size, long-term value, and amenities.",
    },
    {
      question: "Can You Help With Financing Options?",
      answer:
        "Yes, we partner with leading financial institutions to offer bespoke financing solutions.",
    },
    {
      question: "Do You Offer Interior Design Services?",
      answer:
        "Absolutely. Our in-house design team can help transform any space to match your aesthetic.",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="py-16 font-sans overflow-hidden bg-white"
    >
      {/* 🎯 SAME 87vw WRAPPER */}
      <div
        className="mx-auto w-full px-4 lg:px-0"
        style={{ maxWidth: "87vw" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* LEFT */}
          <div className="flex flex-col">
            <h2 className="faq-title font-times text-4xl font-bold text-gray-800 mb-12">
              FAQ's About Property
            </h2>

            <div className="faq-list space-y-6">
              {faqs.map((faq, index) => (
                <FaqItem
                  key={index}
                  faq={faq}
                  isOpen={openFAQ === index}
                  onClick={() =>
                    setOpenFAQ(openFAQ === index ? null : index)
                  }
                />
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="faq-image w-full max-w-[650px] mx-auto">
            <img
              src="/Assets/villa.png"
              alt="Modern Villa"
              className="rounded-lg shadow-2xl w-full aspect-[4/3] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
