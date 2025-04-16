import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { IoCloseSharp } from "react-icons/io5";
import Img1 from "./../../images/gallery-img1.jpg";
import Img2 from "./../../images/gallery-img2.jpg";
import Img3 from "./../../images/gallery-img3.jpg";
import Img4 from "./../../images/gallery-img4.jpg";
import Img5 from "./../../images/gallery-img5.jpg";

const Gallery = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true, // انیمیشن فقط یک بار اجرا شود
    });
  }, []);

  const imagesArray = [
    { images: Img1 },
    { images: Img2 },
    { images: Img3 },
    { images: Img4 },
    { images: Img5 },
    { images: Img1 },
    { images: Img2 },
    { images: Img3 },
  ];

  return (
    <div className="gallery h-screen overflow-y-auto scroll bg-slate-900 pb-10 relative">
      {/* عنوان گالری */}
      <div className="title flex justify-center items-center">
        <p
          data-aos="fade-down"
          data-aos-delay="100"
          className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-600
               text-2xl font-medium tracking-widest uppercase text-md mt-20"
        >
          Gallery Baran Restaurant
        </p>
      </div>

      {/* محتوای گالری */}
      <div className="content-gallery flex flex-wrap justify-center items-center gap-4 mt-32 px-10">
        {imagesArray.map((item, index) => (
          <div
            key={index}
            data-aos="fade-down"
            data-aos-delay={200 + index * 100}
            className="images-content relative w-80 h-80 cursor-pointer transition-transform duration-500 overflow-hidden hover:scale-95"
          >
            {/* تصویر */}
            <img
              src={item.images}
              alt="img-gallery"
              loading="lazy"
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="overlay absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 transition-opacity duration-500 hover:opacity-100">
              <button
                onClick={() => handleModal(item.images)}
                className="text-amber-400 text-lg font-semibold outline-none"
              >
                نمایش تصویر
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50"
          onClick={closeModal}
        >
          <div
            className="modal-content bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-500 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="selected"
              className="max-w-[80vw] max-h-[80vh] object-contain"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-xl font-bold bg-black bg-opacity-50 rounded-full w-8 h-8 flex justify-center items-center hover:bg-opacity-75 transition duration-300"
            >
              <IoCloseSharp className="text-red-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
