import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.from(".contact-image-wrapper", {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          ".contact-form-wrapper",
          {
            x: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "<"
        )
        .fromTo(
          ".form-item",
          { y: 20, opacity: 0.5 },
          {
            y: 0,
            opacity: 1,
            duration: 0.2,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.4"
        );
    },
    { scope: containerRef }
  );

  const FormInput = ({ label, type = "text", placeholder }) => (
    <div className="form-item flex flex-col group">
      <label className="text-sm font-semibold text-gray-700 mb-1 group-focus-within:text-[#B58718]">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="px-4 py-3 border border-gray-300 rounded-md shadow-sm
        focus:outline-none focus:ring-2 focus:ring-[#B58718]
        hover:border-[#B58718] transition"
      />
    </div>
  );

  return (
    <section
      ref={containerRef}
      className="bg-stone-100 py-24 font-sans overflow-hidden"
    >
      {/* 🎯 SAME 87vw WRAPPER */}
      <div
        className="mx-auto w-full px-4 lg:px-0"
        style={{ maxWidth: "87vw" }}
      >
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          {/* LEFT IMAGE */}
          <div className="contact-image-wrapper relative w-full h-full">
            <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition z-10" />
            <img
              src="/Assets/villa2.png"
              alt="Modern Residence"
              className="w-full h-full object-cover transform hover:scale-105 transition duration-700"
            />
          </div>

          {/* RIGHT FORM */}
          <div className="contact-form-wrapper p-8 md:p-12 bg-white">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormInput label="First Name" placeholder="First Name" />
                <FormInput label="Last Name" placeholder="Last Name" />
              </div>

              <FormInput
                label="Email Address"
                type="email"
                placeholder="Email Address"
              />

              <FormInput label="Requirement" placeholder="Requirement" />

              <div className="form-item flex flex-col group">
                <label className="text-sm font-semibold text-gray-700 mb-1 group-focus-within:text-[#B58718]">
                  Message
                </label>
                <textarea
                  rows="6"
                  placeholder="Enter Message"
                  className="px-4 py-3 border border-gray-300 rounded-md shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-[#B58718]
                  hover:border-[#B58718] transition"
                />
              </div>

              <div className="form-item flex items-center gap-3">
                <input type="checkbox" className="h-4 w-4 text-[#B58718]" />
                <span className="text-sm text-gray-600">
                  Agree to our terms and conditions
                </span>
              </div>

              <div className="form-item pt-2">
                <button
                  type="submit"
                  className="bg-[#B58718] text-white font-semibold px-10 py-3 rounded-md
                  hover:bg-black transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
