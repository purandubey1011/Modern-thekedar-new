import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const tableData = [
  {
    feature: "Materials",
    standard: "Reliable, Standard",
    prime: "High Quality",
    luxe: "Premium, Handpicked, Exclusive",
  },
  {
    feature: "Finish",
    standard: "Practical & Durable",
    prime: "Elegant & Refined",
    luxe: "Luxurious, Tailored to Perfection",
  },
  {
    feature: "Design & Customization",
    standard: "Basic Options",
    prime: "Flexible Design Choices",
    luxe: "Fully Bespoke, Architect-Designed",
  },
  {
    feature: "Labor Quality",
    standard: "Skilled & Reliable",
    prime: "Advanced Skilled Craftsmanship",
    luxe: "Expert Artisans, Specialized Labor",
  },
  {
    feature: "Land Requirement",
    standard: "Minimum 3 Kottah",
    prime: "Minimum 4 Kottah",
    luxe: "More than 4 Kottah",
  },
  {
    feature: "Budget",
    standard: "Affordable & Value-for-Money",
    prime: "Mid-Range, Elevated",
    luxe: "High-End, Luxury Investment",
  },
  {
    feature: "Project Complexity",
    standard: "Simple & Straightforward",
    prime: "Moderate, Custom Features",
    luxe: "High-End, Fully Customized Projects",
  },
];

const ServicesTable = () => {
  const tableRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".table-row", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: tableRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: tableRef }
  );

  return (
    <section ref={tableRef} className="bg-[#FAF8F3]">
      <div className="mx-auto w-full px-4 lg:px-0 overflow-x-auto" style={{ maxWidth: "87vw" }}>
      <table className="w-full border-collapse rounded-2xl overflow-hidden bg-white border border-[#E6D6B8]">
  {/* TABLE HEAD */}
  <thead className="bg-[#B8901E] text-white font-serif">
    <tr>
      <th className="p-3 md:p-6 text-left">Feature</th>
      <th className="p-3 md:p-6 text-center">TMT Standard</th>
      <th className="p-3 md:p-6 text-center">TMT Prime</th>
      <th className="p-3 md:p-6 text-center">TMT Luxe</th>
    </tr>
  </thead>

  {/* TABLE BODY */}
  <tbody>
    {tableData.map((row, index) => (
      <tr
        key={index}
        className="table-row border-t border-[#EFE6D3] text-sm md:text-base text-gray-700"
      >
        <td className="p-3 md:p-6 font-medium text-gray-900">
          {row.feature}
        </td>
        <td className="p-3 md:p-6 text-center">{row.standard}</td>
        <td className="p-3 md:p-6 text-center">{row.prime}</td>
        <td className="p-3 md:p-6 text-center">{row.luxe}</td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </section>
  );
};

export default ServicesTable;
