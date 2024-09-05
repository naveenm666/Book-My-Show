"use client"

import { useState, useEffect } from "react";

const ImageSlider: React.FC = () => {
  const images = [
    "https://assets-in.bmscdn.com/promotions/cms/creatives/1717080055549_playcardweb.jpg",
    "https://assets-in.bmscdn.com/promotions/cms/creatives/1725277509061_webbannerbandland.jpg",
    "https://assets-in.bmscdn.com/promotions/cms/creatives/1725254659586_exhumareviewwebstream.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  return (
    <div className="relative overflow-hidden w-full max-w-[800px] mx-auto">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * (100 / images.length)}%)`, width: `${images.length * 100}%` }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Promotional Image ${index + 1}`}
            className="w-[100%] flex-shrink-0"
            style={{ width: `${100 / images.length}%`, objectFit: 'cover' }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
