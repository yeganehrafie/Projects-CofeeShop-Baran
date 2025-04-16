import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { HiLocationMarker } from "react-icons/hi";
const SocialMedia = () => {
  return (
    <>
      <div className="socialMedia pb-5 z-10">
        <div className="flex flex-col justify-center items-center my-32">
          <div className="relative  w-1/4 min-w-[200px]  border-t-2 border-amber-300 ">
            <span className="absolute left-1/2 -top-4  px-1 text-2xl text-amber-300 z-10">
              §
            </span>
          </div>
          <div className="card-socialMedia mt-10 ">
            <div className="card-content bg-slate-800 bg-opacity-70 rounded-md shadow-lg shadow-slate-300/50 p-4 flex gap-6 w-80 justify-center items-center  text-center">
              <div className="icon-instagram">
                <a href="#">
                  <RiInstagramFill className="text-gray-300 text-xl font-bold h-10 w-10 p-2 text-amber-300 border-2 border-amber-300 rounded-full rounded-full duration-300 hover:shadow-lg hover:shadow-amber-400/50" />
                </a>
              </div>
              <div className="icon-phon">
                <a href="#">
                  <FaPhoneAlt className="text-gray-300 text-xl font-bold h-10 w-10 p-2 text-amber-300 border-2 border-amber-300 rounded-full rounded-full duration-300 hover:shadow-lg hover:shadow-amber-400/50" />
                </a>
              </div>
              <div className="icon-location">
                <a href="#">
                  <HiLocationMarker className="text-gray-300 text-xl font-bold h-10 w-10 p-2 text-amber-300 border-2 border-amber-300 rounded-full rounded-full duration-300 hover:shadow-lg hover:shadow-amber-400/50" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SocialMedia;
