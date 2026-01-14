import React, { useRef } from "react";
import { MoveRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const LatestArticle = () => {
  const containerRef = useRef(null);

  const articles = [
    {
      img: "/Assets/BlogThumbnail.png",
      category: "Architecture",
      title: "Home Staging Tips to Attract Buyers Quickly",
      date: "July 9, 2024",
      author: "Brooklyn Simmons",
    },
    {
      img: "/Assets/BlogThumbnail (1).png",
      category: "Building",
      title: "Navigating the Mortgage Approval Process",
      date: "July 9, 2024",
      author: "Brooklyn Simmons",
    },
    {
      img: "/Assets/BlogThumbnail (2).png",
      category: "Real Estate",
      title: "The Ultimate Checklist for First-Time Home Buyers",
      date: "July 9, 2024",
      author: "Brooklyn Simmons",
    },
  ];

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 20%",
          toggleActions: "restart none none reverse",
        },
      });

      tl.from(".section-header", {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }).from(
        ".article-card",
        {
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        },
        "-=0.4"
      );
    },
    { scope: containerRef }
  );

  const ArticleCard = ({ article }) => (
    <div className="article-card flex flex-col group cursor-pointer transition-transform duration-500 hover:-translate-y-2">
      {/* Image */}
      <div className="relative mb-6 rounded-xl overflow-hidden shadow-md group-hover:shadow-2xl transition">
        <div className="relative w-full h-64">
          <img
            src={article.img}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition" />

          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full shadow z-10">
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-1">
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-amber-700 transition">
          {article.title}
        </h3>
        <div className="flex items-center text-sm text-gray-500 gap-3 font-medium">
          <span>{article.date}</span>
          <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>
          <span>{article.author}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section
      ref={containerRef}
      className="bg-white min-h-[80vh] flex flex-col justify-center py-16 overflow-hidden"
    >
      {/* 🎯 SAME 87vw WRAPPER */}
      <div
        className="mx-auto w-full px-4 lg:px-0"
        style={{ maxWidth: "87vw" }}
      >
        {/* Header */}
        <div className="section-header flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900">
            Latest Articles
          </h2>

          <a
            href="#"
            className="group flex items-center text-amber-700 font-semibold border border-amber-700 rounded-full px-6 py-3 hover:bg-amber-700 hover:text-white transition"
          >
            Discover More
            <MoveRight
              size={20}
              className="ml-2 transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestArticle;
