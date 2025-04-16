import React, { useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import ImgUser from "./../../images/8.jpg";
import { TbPointFilled } from "react-icons/tb";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { HiMiniSlash } from "react-icons/hi2";
import { FaEye } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";

const Notifications = () => {
  const [showModalView, setShowModalView] = useState(false);
  const [showAlert_1, setShowAlert_1] = useState(true);
  const [showAlert_2, setShowAlert_2] = useState(true);
  const [showAlert_3, setShowAlert_3] = useState(true);

  const closeModal = () => {
    setShowModalView(!showModalView);
  };
  // const closeAlert = () => {
  //   setShowAlert(!showAlert);
  // };
  const Users_notif = Array.from({ length: 2 }, (_, index) => ({
    id: index + 1,
    fullNmae: " یگانه رفیع",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوعا هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادر شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعهو متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری",
    status: "ثبت نام شده",
    date: "1403/11/12",
  }));

  /*نمایش محدودست کلمات عنوان و توضیحات*/
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <>
      <section className="mt-10 px-4 m-auto max-w-[1300px]">
        <div className="card-header p-2 bg-slate-400 rounded rounded-sm flex items-center justify-start text-sm font-meduim">
          <span className="text-gray-800">داشبورد</span>
          <HiMiniSlash className="text-yellow-700" />
          <span className=" text-emerald-800">لیست اعلانات</span>
        </div>
        {/* alert */}
        <div className="alert  mt-5 flex  flex-col md:flex-row items-center sm:flex-col gap-2">
          {showAlert_1 && (
            <div className="card-alert w-96 p-3 bg-yellow-300 rounded rounded-sm flex items-center justify-between text-sm font-meduim">
              <span className="text-gray-700">
                کاربر
                <strong className="text-emerald-800 text-md mx-1">
                  یگانه رفیع
                </strong>
                در سات 12:45 دقیقهه ثبت نام کرد
              </span>
              <button
                className="outline-none bg-transparent"
                onClick={() => setShowAlert_1(!showAlert_1)}
              >
                <IoCloseSharp className="text-red-700 text-lg" />
              </button>
            </div>
          )}
          {showAlert_2 && (
            <div className="card-alert  w-96 p-3 bg-gray-300 rounded rounded-sm flex items-center justify-between text-sm font-meduim">
              <span className="text-gray-700">
                کاربر
                <strong className="text-red-800 text-md mx-1">
                  یگانه رفیع
                </strong>
                در سات 12:45 دقیقهه ثبت نام کرد
              </span>
              <button
                onClick={() => setShowAlert_2(!showAlert_2)}
                className="outline-none bg-transparent"
              >
                <IoCloseSharp className="text-red-700 text-lg" />
              </button>
            </div>
          )}
          {showAlert_3 && (
            <div className="card-alert w-96 p-3 bg-emerald-300 rounded rounded-sm flex items-center justify-between text-sm font-meduim">
              <span className="text-gray-700">
                کاربر
                <strong className="text-yellow-800 text-md mx-1">
                  یگانه رفیع
                </strong>
                در سات 12:45 دقیقهه ثبت نام کرد
              </span>
              <button
                onClick={() => setShowAlert_3(!showAlert_3)}
                className="outline-none bg-transparent"
              >
                <IoCloseSharp className="text-red-700 text-lg" />
              </button>
            </div>
          )}
        </div>
        {/* table-lists */}
        <div className="table-lists relative overflow-x-auto shadow-md rounded-md text-center p-4 bg-slate-700 mt-20">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-gray-300 text-ms font-medium flex items-center">
                <TbPointFilled className="text-2xl text-yellow-300 text-ms" />
                لیست اعلانات
              </span>
            </div>
            <div className="flex items-center">
              <input type="checkbox" />
              <span className="mx-2 text-red-300 text-sm ">
                حذف همه آیتم ها
              </span>
            </div>
          </div>
          <table className="w-full ms:w-80 text-sm mt-4">
            <thead className="text-xs text-gray-300 uppercase bg-slate-800 font-bold ">
              <tr>
                <th scope="col" className="px-3 py-3">
                  عکس کاربر
                </th>
                <th scope="col" className="px-3 py-3">
                  نام کاربر
                </th>
                <th scope="col" className="px-3 py-3">
                  توضیحات
                </th>
                <th scope="col" className="px-3 py-3">
                  تاریخ ثبت نام
                </th>
                <th scope="col" className="px-3 py-3">
                  وضعیت
                </th>
                <th scope="col" className="px-3 py-3">
                  مشاهده بیشتر
                </th>
                <th scope="col" className="px-3 py-3">
                  حذف آیتم
                </th>
              </tr>
            </thead>
            <tbody>
              {Users_notif.map((items) => {
                return (
                  <tr
                    className="border-b  border-gray-500 hover:bg-slate-600 duration-300  font-meduim"
                    key={items.id}
                  >
                    <td className="px-3 py-2">
                      <img
                        src={ImgUser}
                        alt="img_user"
                        loading="lazy"
                        className="w-16  rounded-full border-4 border-slate-400 flex justify-center items-center m-auto"
                      />
                    </td>
                    <td className="px-1 py-2 text-gray-200 ">
                      {items.fullNmae}
                    </td>
                    <td className="px-1 py-2 text-gray-200 ">
                      {truncateText(items.description, 12)}
                    </td>

                    <td className="px-3 py-2 text-gray-200 ">
                      <span className="date ">{items.date}</span>
                    </td>
                    <td className="px-3 py-2 text-gray-200 ">نامشخص</td>
                    <td className="px-3 py-2">
                      <button
                        onClick={() => setShowModalView(!showModalView)}
                        className="text-gray-200 outline-none bg-transparent"
                      >
                        <FaEye className="text-yellow-200  text-lg" />
                      </button>
                    </td>
                    <td className="px-3 py-2">
                      <button className="text-gray-200 outline-none bg-transparent">
                        <RiDeleteBin2Fill className="text-red-500  text-lg" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* ModalView */}
          {showModalView && (
            <div className="fixed inset-0 flex items-center justify-center z-50 ">
              <div className=" rounded-lg p-6  relative z-10 w-96">
                <div className="content-modal fixed inset-0 flex items-center  justify-center bg-black/50 z-50">
                  <div className="modal-container bg-slate-700 w-96 rounded-md shadow-lg overflow-hidden">
                    <div className="modal-title bg-slate-800 text-yellow-300 py-3 px-4 text-md font-meduim flex items-center justify-between">
                      <h2>مشاهده بیشتر</h2>
                      <button
                        className="text-yellow-300 hover:text-yellow-400 transition-colors font-bold"
                        onClick={closeModal}
                      >
                        <IoCloseSharp />
                      </button>
                    </div>
                    <div className="modal-body p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="img_user">
                          <img
                            src={ImgUser}
                            alt="img_user"
                            loading="lazy"
                            className="w-24 rounded-full border-4 border-slate-400 "
                          />
                        </div>
                        <div className="data-user flex text-start flex-col text-[14px] font-meduim">
                          <span className="name_user text-gray-300">
                            نام کاربر:یگانه رفیع
                          </span>
                          <span className="date mt-2 mb-2 text-yellow-300">
                            تاریخ ثبت نام: 1403/10/12
                          </span>
                          <span className="status text-emerald-300">
                            وضعیت:نامشخص
                          </span>
                        </div>
                      </div>
                      <hr />
                      <div className="description">
                        <p className="flex items-center m-auto text-justify text-gray-400 text-sm tracking-widest">
                          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                          چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                          بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و
                          برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع
                          با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
                          در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه
                          و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری
                        </p>
                      </div>
                      <div className="flex justify-end gap-2 ">
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
          {/* pagination */}
          <div className="card-footer pagination flex justify-between items-center text-gray-400 mt-6 ">
            <div className="btn-pagination space-x-2 flex items-center">
              <button
                className="mx-1 outline-none h-8 w-8 p-1  rounded-full text-md font-meduim text-gray-300 
                border-2 border-slate-300 hover:bg-slate-400 hover:text-gray-800 duration-300"
              >
                <MdKeyboardDoubleArrowRight />
              </button>
              <button
                className="outline-none h-8 w-8 p-1  rounded-full text-md font-meduim text-gray-300 
            bg-slate-500  hover:bg-slate-400 hover:text-gray-800 duration-300 border-2 border-slate-300"
              >
                1
              </button>
              <button
                className="outline-none  h-8 w-8 p-1  rounded-full text-md font-meduim text-emerald-300 
                border-2 border-emerald-300 focus:bg-slate-400 focus:border-slate-300 focus:text-gray-800 duration-300"
              >
                2
              </button>
              <button
                className="outline-none h-8 w-8 p-1  rounded-full text-md font-meduim text-gray-300 
                border-2 border-slate-300 hover:bg-slate-400 hover:text-gray-800 duration-300"
              >
                <MdKeyboardDoubleArrowLeft />
              </button>
            </div>
            <div>
              <span>رکورد یک از دو</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Notifications;
