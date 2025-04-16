import React from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import ImgOrang from "./../../images/glass-orange-juice-with-orange-sacs-slices-fruits-isolate_252965-732.jpg";
import { TbPointFilled } from "react-icons/tb";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { HiMiniSlash } from "react-icons/hi2";
const OrderLists_PanelAdmin = () => {
  return (
    <section className="mt-10 px-4 m-auto max-w-[1300px]">
      <div className="card-header p-2 bg-slate-400 rounded rounded-sm flex items-center justify-start text-sm font-meduim">
        <span className="text-gray-800">داشبورد</span>
        <HiMiniSlash className="text-yellow-700" />
        <span className=" text-emerald-800">لیست سفارشات</span>
      </div>
      <div className="table-lists relative overflow-x-auto shadow-md rounded-md text-center p-4 bg-slate-700 mt-20">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-gray-300 text-ms font-medium flex items-center">
              <TbPointFilled className="text-2xl text-yellow-300 text-ms" />
              لیست سفارشات
            </span>
          </div>
          <div className="flex items-center">
            <input type="checkbox" />
            <span className="mx-2 text-red-300 text-sm ">حذف همه آیتم ها</span>
          </div>
        </div>
        <table className="w-full ms:w-80 text-sm mt-4">
          <thead className="text-xs text-gray-300 uppercase bg-slate-800 font-bold ">
            <tr>
              <th scope="col" className="px-3 py-3">
                عکس محصول
              </th>
              <th scope="col" className="px-3 py-3">
                عنوان محصول
              </th>
              <th scope="col" className="px-3 py-3">
                تعداد محصول
              </th>
              <th scope="col" className="px-3 py-3">
                قیمت محصول
              </th>
              <th scope="col" className="px-3 py-3">
                تاریخ ثبت سفارش
              </th>
              <th scope="col" className="px-3 py-3">
                کد سفارش
              </th>
              <th scope="col" className="px-3 py-3">
                حذف آیتم
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b  border-gray-500 hover:bg-slate-600 duration-300  font-meduim">
              <td className="px-3 py-2">
                <img
                  src={ImgOrang}
                  alt="img_user"
                  loading="lazy"
                  className="w-16  rounded-full border-4 border-slate-400 flex justify-center items-center m-auto"
                />
              </td>
              <td className="px-1 py-2 text-gray-200 ">آب پرتقال</td>
              <td className="px-3 py-2 text-gray-200 ">
                <input
                  type="number"
                  className="outline-none text-gray-900 text-xs p-1 text-center rounded-sm border-2 border-slate-400"
                />
              </td>
              <td className="px-3 py-2 text-gray-200 ">
                <span className="price">123تومان</span>
              </td>
              <td className="px-3 py-2 text-gray-200 ">
                <span className="date ">1403/12/10</span>
              </td>
              <td className="px-3 py-2 text-gray-200 ">#3387yt66</td>
              <td className="px-3 py-2">
                <button className="text-gray-200 outline-none bg-transparent">
                  <RiDeleteBin2Fill className="text-red-500  text-lg" />
                </button>
              </td>
            </tr>
            <tr className="border-b  border-gray-500 hover:bg-slate-600 duration-300  font-meduim">
              <td className="px-3 py-2">
                <img
                  src={ImgOrang}
                  alt="img_user"
                  loading="lazy"
                  className="w-16  rounded-full border-4 border-slate-400 flex justify-center items-center m-auto"
                />
              </td>
              <td className="px-3 py-2 text-gray-200 ">آب پرتقال</td>
              <td className="px-3 py-2 text-gray-200 ">
                <input
                  type="number"
                  className="outline-none text-gray-900 text-xs p-1 text-center rounded-sm border-2 border-slate-400"
                />
              </td>
              <td className="px-3 py-2 text-gray-200 ">
                <span className="price">123تومان</span>
              </td>
              <td className="px-3 py-2 text-gray-200 ">
                <span className="date">1403/12/10</span>
              </td>
              <td className="px-1 py-2 text-gray-200 ">#3387yt66</td>
              <td className="px-3 py-2">
                <button className="text-gray-200 outline-none bg-transparent">
                  <RiDeleteBin2Fill className="text-red-500  text-lg" />
                </button>
              </td>
            </tr>
          </tbody>
          <div className="total-price flex flex-grow">
            <span className="text-yellow-300 text-md font-bold mt-6 flex flex-start tracking-wider">
              قیمت کل:
            </span>
            <span className="text-gray-300 text-md font-bold mt-6 flex flex-start tracking-wider mx-2">
              4567000تومان
            </span>
          </div>
        </table>
        {/* pagination */}
        <div className="card-footer pagination flex justify-between items-center text-gray-400 mt-6">
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
  );
};
export default OrderLists_PanelAdmin;
