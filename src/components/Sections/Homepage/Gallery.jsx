import React from "react";

const Gallery = () => {
  const images = [
    {
      src: "/Assets/gallery1.png",
      alt: "Green architecture building with vertical forest",
      gridClass: "col-span-1 row-span-1",
    },
    {
      src: "/Assets/gallery2.png",
      alt: "Modern curved building with grass roof",
      gridClass: "col-span-1 row-span-1",
    },
    {
      src: "/Assets/gallery3.png",
      alt: "Apartment building with green balconies",
      gridClass: "col-span-2 row-span-1",
    },
    {
      src: "/Assets/galley4.png",
      alt: "Aerial view of green garden path on a building",
      gridClass: "col-span-1 row-span-1",
    },
    {
      src: "/Assets/gallery5.png",
      alt: "Apartment building covered in trees and plants",
      gridClass: "col-span-1 row-span-1",
    },
  ];

  return (
    <section className="bg-white pt-12">
      {/* 🎯 SAME 87vw WRAPPER */}
      <div
        className="mx-auto w-full px-4 lg:px-0"
        style={{ maxWidth: "87vw" }}
      >
        <div className="grid grid-cols-2 grid-rows-3 gap-4 md:gap-6 h-[120vh]">
          {images.map((img, index) => (
            <div
              key={index}
              className={`${img.gridClass} overflow-hidden rounded-lg shadow-lg`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
