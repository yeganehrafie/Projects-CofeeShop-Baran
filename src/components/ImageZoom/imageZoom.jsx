import React, { useState } from "react";

const ImageZoom = ({ src, alt }) => {
  const [isHovered, setIsHovered] = useState(false); // بررسی اینکه موس روی تصویر است یا خیر
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // موقعیت موس

  // تابع برای به‌روزرسانی موقعیت موس
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
  };

  return (
    <div className="relative inline-block">
      {/* تصویر اصلی */}
      <img
        src={src}
        alt={alt}
        className="w-80 mt-10 rounded-md bg-slate-800 bg-opacity-50 
         hover:shadow-md hover:shadow-slate-300/50 cursor-pointer duration-500
         object-cover transition-transform hover:scale-110 cursor-zoom-in"
        onMouseEnter={() => setIsHovered(true)} // فعال کردن حالت زوم
        onMouseLeave={() => setIsHovered(false)} // غیرفعال کردن حالت زوم
        onMouseMove={handleMouseMove} // به‌روزرسانی موقعیت موس
      />

      {/* ذره‌بین */}
      {isHovered && (
        <div
          style={{
            position: "fixed",
            top: mousePosition.y + 20, // موقعیت عمودی ذره‌بین
            left: mousePosition.x + 20, // موقعیت افقی ذره‌بین
            transform: "translate(-100%, -100%)", // مرکز کردن ذره‌بین
          }}
          className="w-80  bg-gray-50 bg-opacity-70 shadow-lg border border-gray-300 overflow-hidden rounded-md"
        >
          <img src={src} alt={alt} className="w-full h-full object-contain" />
        </div>
      )}
    </div>
  );
};

export default ImageZoom;
