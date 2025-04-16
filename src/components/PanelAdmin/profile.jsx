import React, { useState } from "react";
import { HiMiniSlash } from "react-icons/hi2";
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineMore } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { TiStar } from "react-icons/ti";
import imgAdmin from "./../../images/12.jpg";

const Profile_PanelAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <section className="mt-10 px-4  m-auto max-w-[1300px]">
        <div className="card-header p-2 bg-slate-400  rounded rounded-sm flex items-center justify-start text-sm font-meduim">
          <span className="text-gray-800">داشبورد</span>
          <HiMiniSlash className="text-yellow-700" />
          <span className=" text-emerald-800">پروفایل ادمین</span>
        </div>
        <div className="card-profile mt-20  p-2 w-full  px-4 bg-slate-800 shadow-lg shadow-slate-500/50 rounded-md  border border-slate-500">
          <div className="card-content flex  justify-between items-center flex-col md:flex-row gap-y-5 py-4 px-5">
            <div className="editeProfile">
              <button
                onClick={openModal}
                className="relative flex items-center text-md outline-none text-gray-300 rounded-lg border-2 
                border-gray-400 py-2 px-3 bg-slate-800 group overflow-hidden  duration-300 "
              >
                <span className="relative z-10 ">به روز رسانی</span>
                <MdOutlineEdit className="mx-1 relative z-10" />
                <span className="absolute inset-0 bg-slate-600  transform translate-x-full  group-hover:translate-x-0 transition-transform duration-300"></span>
              </button>
            </div>
            <div className="flex items-center">
              <div className="fullName flex flex-col">
                <h2 className="mx-2 text-md font-semibold text-gray-300 tracking-wider sm:mx-4">
                  یگانه رفیع
                </h2>
                <div className="tracking-wider flex text-xs mt-4 mx-4">
                  <span className="text-gray-400 ">آخرین به روزرسانی</span>
                  <AiOutlineMore className="text-gray-400  font-bold" />
                  <span className="text-emerald-300">12/12/1403</span>
                </div>
              </div>
              <div className="profile-img">
                <img
                  src={imgAdmin}
                  alt="profile-img"
                  loading="lazy"
                  className="w-24 rounded-full border-4 border-slate-500 "
                />
              </div>
            </div>
            {/* modal update button */}
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50 ">
                <div className=" rounded-lg p-6  relative z-10 w-96">
                  <div className="content-modal fixed inset-0 flex items-center  justify-center bg-black/50 z-50">
                    <div className="modal-container bg-slate-700 w-96 rounded-md shadow-lg overflow-hidden">
                      <div className="modal-title bg-slate-800 text-yellow-300 py-3 px-4 text-md font-meduim flex items-center justify-between">
                        <h2>به روزرسانی پروفایل ادمین</h2>
                        <button
                          className="text-yellow-300 hover:text-yellow-400 transition-colors font-bold"
                          onClick={closeModal}
                        >
                          <IoCloseSharp />
                        </button>
                      </div>
                      <div className="modal-body p-6 space-y-4">
                        <div className="input-field">
                          <label className="block  font-medium mb-1 flex items-center text-xs">
                            <TiStar className="text-emerald-100  " />
                            <span className="text-gray-300 mx-1">عکس:</span>
                          </label>
                          <input
                            type="file"
                            className="w-full bg-gray-200 text-gray-500 py-1 px-2 mt-3 border border-gray-300 rounded-md outline-gray-100 focus:outline-none focus:border-emerald-400 duration-300"
                          />
                        </div>

                        <div className="flex gap-4">
                          <div className="input-field w-1/2">
                            <label className="block font-medium mb-1 flex items-center text-xs">
                              <TiStar className="text-emerald-100" />
                              <span className="text-gray-300 mx-1">
                                نام و نام خانوادگی:
                              </span>
                            </label>
                            <input
                              type="text"
                              className="w-full bg-gray-200 py-1 px-2 mt-3 border border-gray-300 rounded-md outline-gray-100 focus:outline-none focus:border-emerald-400 duration-300"
                            />
                          </div>
                          <div className="input-field w-1/2">
                            <label className="block  font-medium mb-1 flex items-center text-xs">
                              <TiStar className="text-emerald-100 " />
                              <span className="text-gray-300 mx-1">تاریخ:</span>
                            </label>
                            <input
                              type="date"
                              className="w-full bg-gray-200 py-1 px-2 mt-3 border border-gray-300 rounded-md outline-gray-100 focus:outline-none focus:border-emerald-400 duration-300"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 ">
                          <button className="mt-3 text-md bg-emerald-600 hover:bg-emerald-500 text-gray-200 font-medium py-2 px-4 rounded-md transition-colors duration-300">
                            ثبت تغییرات
                          </button>
                          <button
                            onClick={closeModal}
                            className="mt-3 text-md  bg-red-600 hover:bg-red-500 text-gray-200 font-medium py-2 px-4 rounded-md transition-colors duration-300"
                          >
                            لغو
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default Profile_PanelAdmin;
