import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FindUs = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "restart none none reverse",
        },
      });

      tl.from(".find-us-header", {
        y: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
      })
        .from(
          ".main-hr",
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.8,
          },
          "-=0.4"
        )
        .add("columns")
        .from(
          ".left-col-item",
          {
            x: -50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
          },
          "columns"
        )
        .from(
          ".right-col-item",
          {
            x: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
          },
          "columns"
        )
        .from(
          ".social-icon",
          {
            scale: 0,
            opacity: 0,
            rotation: -45,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  /* Flashlight effect */
  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    containerRef.current.style.setProperty(
      "--mouse-x",
      `${e.clientX - rect.left}px`
    );
    containerRef.current.style.setProperty(
      "--mouse-y",
      `${e.clientY - rect.top}px`
    );
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{ "--mouse-x": "50%", "--mouse-y": "50%" }}
      className="
        group relative w-full text-white
        bg-[url('/Assets/contact.jpg')] bg-cover bg-center
        before:absolute before:inset-0
        before:bg-gradient-to-br before:from-blue-900/70
        before:via-gray-900/70 before:to-blue-800/70
        overflow-hidden
      "
    >
      {/* Flashlight overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition"
        style={{
          background:
            "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.15), transparent 40%)",
        }}
      />

      {/* 🎯 CONTENT WRAPPER — SAME 87vw GRID */}
      <div
        className="relative z-10 mx-auto w-full px-4 lg:px-0 py-12 md:py-16"
        style={{ maxWidth: "87vw" }}
      >
        <h1 className="find-us-header font-serif text-4xl md:text-5xl font-bold mb-3">
          Find Us
        </h1>
        <p className="find-us-header text-lg text-gray-300 mb-6">
          Reach out for bookings, inquiries, or personalized packages!
        </p>

        <hr className="main-hr border-gray-500" />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {/* LEFT */}
          <div className="flex flex-col gap-8">
            <div className="left-col-item">
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 mt-1 text-gray-300" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">Office Address</h2>
                  <p className="text-gray-300">
                    1st Floor, SK Compound, Baneswar More, Eastern Bypass Road,
                    Siliguri, West Bengal 734006
                  </p>
                </div>
              </div>
              <hr className="border-gray-500 mt-8 opacity-50" />
            </div>

            <div className="left-col-item">
              <div className="flex gap-4">
                <Mail className="w-6 h-6 mt-1 text-gray-300" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">Email Us</h2>
                  <a
                    href="mailto:contact@themodernthekedar.com"
                    className="text-gray-300 hover:text-white"
                  >
                    contact@themodernthekedar.com
                  </a>
                </div>
              </div>
              <hr className="border-gray-500 mt-8 opacity-50" />
            </div>

            <div className="left-col-item flex items-center gap-4">
              <h2 className="text-xl font-semibold">Follow Us :</h2>
              <div className="flex gap-3">
                {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="social-icon p-2 border border-gray-400 rounded-full hover:bg-white hover:text-blue-900 transition"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-8">
            <div className="right-col-item">
              <div className="flex gap-4">
                <Clock className="w-6 h-6 mt-1 text-gray-300" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Operating Hours
                  </h2>
                  <p className="text-gray-300">
                    Monday–Saturday: 11:00 am – 6:00 pm
                  </p>
                </div>
              </div>
              <hr className="border-gray-500 mt-8 opacity-50" />
            </div>

            <div className="right-col-item">
              <div className="flex gap-4">
                <Phone className="w-6 h-6 mt-1 text-gray-300" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Contact Details
                  </h2>
                  <a
                    href="tel:+919332016086"
                    className="text-gray-300 hover:text-white"
                  >
                    +91 93320 16086
                  </a>
                </div>
              </div>
              <hr className="border-gray-500 mt-8 opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindUs;
