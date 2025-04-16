import React from "react";
import { IoCaretUp } from "react-icons/io5";
import { IoStatsChartOutline } from "react-icons/io5";
import { IoCaretDownOutline } from "react-icons/io5";
import { TbShoppingCartCopy } from "react-icons/tb";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { PiUsersThreeDuotone } from "react-icons/pi";
import { TbPointFilled } from "react-icons/tb";
import { TbShoppingCart } from "react-icons/tb";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { LuClipboardCheck } from "react-icons/lu";
import { LuCircleSlash } from "react-icons/lu";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoStatsChartSharp } from "react-icons/io5";
import Chart from "react-apexcharts";
const Dashbord = () => {
  //چارت براسی سفارشات داشبورد
  const series = [
    {
      name: "سفارشات",
      data: [40, 60, 50, 70, 80, 65, 90], // داده‌های نمودار
    },
  ];
  const options = {
    chart: {
      type: "line", // نوع نمودار
      height: 250, // ارتفاع نمودار
    },
    xaxis: {
      categories: [
        "شنبه",
        "یکشنبه",
        "دوشنبه",
        "سه‌شنبه",
        "چهارشنبه",
        "پنج‌شنبه",
        "جمعه",
      ], // محور X
    },
  };
  return (
    <>
      <section className="section1-dashbord px-4 mt-20">
        <div className="dashbord-card grid gap-4 md:grid-cols-1 lg:grid-cols-4">
          {/* Card 1 */}
          <div className="card w-full bg-slate-800 border-2 border-slate-700 shadow-md rounded-md p-3">
            <div className="card-content flex justify-between items-center">
              <div className="card-icon">
                <TbShoppingCartCopy className="text-2xl text-yellow-600 h-10 w-10 bg-yellow-50 rounded-full p-2" />
              </div>
              <div>
                <div className="card-title">
                  <span className="text-gray-400 text-xs font-medium">
                    سفارشات
                  </span>
                </div>
                <div className="number-card">
                  <h3 className="text-gray-300 text-lg font-semibold mt-1">
                    1234,76
                  </h3>
                </div>
              </div>
            </div>
            <div className="card-footer mt-5 p-3 bg-slate-700 flex items-center text-start">
              <span className="text-green-400 flex items-center text-sm">
                <IoCaretUp />
                33.3%
              </span>
              <span className="text-gray-400 mx-3 text-xs">از ماه گذشته</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card w-full bg-slate-800 border-2 border-slate-700 shadow-md rounded-md p-3">
            <div className="card-content flex justify-between items-center">
              <div className="card-icon">
                <IoStatsChartOutline className="text-2xl text-yellow-600 h-10 w-10 bg-yellow-50 rounded-full p-2" />
              </div>
              <div>
                <div className="card-title">
                  <span className="text-gray-400 text-xs font-medium">
                    فروش
                  </span>
                </div>
                <div className="number-card">
                  <h3 className="text-gray-300 text-lg font-semibold mt-1">
                    1234,76
                  </h3>
                </div>
              </div>
            </div>
            <div className="card-footer mt-5 p-3 bg-slate-700 flex items-center text-start">
              <span className="text-red-500 flex items-center text-sm">
                <IoCaretDownOutline />
                12.3%
              </span>
              <span className="text-gray-400 mx-3 text-xs">از ماه گذشته</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card w-full bg-slate-800 border-2 border-slate-700 shadow-md rounded-md p-3">
            <div className="card-content flex justify-between items-center">
              <div className="card-icon">
                <HiMiniCalendarDateRange className="text-2xl text-yellow-600 h-10 w-10 bg-yellow-50 rounded-full p-2" />
              </div>
              <div>
                <div className="card-title">
                  <span className="text-gray-400 text-xs font-medium">
                    رویداد ها
                  </span>
                </div>
                <div className="number-card">
                  <h3 className="text-gray-300 text-lg font-semibold mt-1">
                    5436,66
                  </h3>
                </div>
              </div>
            </div>
            <div className="card-footer mt-5 p-3 bg-slate-700 flex items-center text-start">
              <span className="text-green-400 flex items-center text-sm">
                <IoCaretUp />
                33.3%
              </span>
              <span className="text-gray-400 mx-3 text-xs">از ماه گذشته</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="card w-full bg-slate-800 border-2 border-slate-700 shadow-md rounded-md p-3">
            <div className="card-content flex justify-between items-center">
              <div className="card-icon">
                <PiUsersThreeDuotone className="text-2xl text-yellow-600 h-10 w-10 bg-yellow-50 rounded-full p-2" />
              </div>
              <div>
                <div className="card-title">
                  <span className="text-gray-400 text-xs font-medium">
                    کاربران
                  </span>
                </div>
                <div className="number-card">
                  <h3 className="text-gray-300 text-lg font-semibold mt-1">
                    2234,76
                  </h3>
                </div>
              </div>
            </div>
            <div className="card-footer mt-5 p-3 bg-slate-700 flex items-center text-start">
              <span className="text-green-400 flex items-center text-sm">
                <IoCaretUp />
                33.3%
              </span>
              <span className="text-gray-400 mx-3 text-xs">از ماه گذشته</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section2-dashbord px-4 mt-20 pb-10">
        <div className=" grid gap-4 md:grids-cols-1 lg:grid-cols-2">
          {/* وضعیت */}
          <div className="status-card w-full bg-slate-800 border-2 border-slate-700 shadow-md rounded-md p-3 ">
            <div className="card-title">
              <span className="text-gray-400 text-ms font-medium pt-2">
                وضعیت
              </span>
            </div>
            <div className="overflow-y-auto max-h-64 scroll px-3">
              <div className="status-card-content">
                <div className="card-content flex justify-between items-center mt-5">
                  <div className="flex items-center">
                    <TbPointFilled className="text-2xl text-emerald-300 text-ms" />
                    <TbShoppingCart className="text-2xl text-emerald-600 h-10 w-10 bg-emerald-50  rounded-full p-2" />
                    <p className="text-gray-400 text-justify text-sm mx-3">
                      شما حدود 65٪ از بودجه سالانه خود را خرج کرده اید.
                    </p>
                  </div>
                  <div className="date">
                    <span className="font-semibold  text-emerald-800 bg-emerald-100 px-2  rounded rounded-full ">
                      11/12/2025
                    </span>
                  </div>
                </div>
              </div>
              <div className="status-card-content">
                <div className="card-content flex justify-between items-center mt-5">
                  <div className="flex items-center">
                    <TbPointFilled className="text-2xl text-emerald-300 text-ms" />
                    <IoCheckmarkDoneSharp className="text-2xl text-emerald-600 h-10 w-10 bg-emerald-50 rounded-full p-2" />
                    <p className="text-gray-400 text-justify text-sm mx-3">
                      داشبورد مدیریت جدید خریداری شد و پرداخت شد از طریق آنلاین
                    </p>
                  </div>
                  <div className="date">
                    <span className="font-semibold  text-emerald-800 bg-emerald-100 px-2  rounded rounded-full ">
                      9/12/2025
                    </span>
                  </div>
                </div>
              </div>
              <div className="status-card-content">
                <div className="card-content flex justify-between items-center mt-5">
                  <div className="flex items-center">
                    <TbPointFilled className="text-2xl text-emerald-300 text-ms" />
                    <LuClipboardCheck className="text-2xl text-emerald-600 h-10 w-10 bg-emerald-50 rounded-full p-2" />
                    <p className="text-gray-400 text-justify text-sm mx-3">
                      بلیت جدیدی باز شد و به صهیون اختصاص یافت
                    </p>
                  </div>
                  <div className="date">
                    <span className="font-semibold  text-emerald-800 bg-emerald-100 px-2  rounded rounded-full ">
                      11/12/2025
                    </span>
                  </div>
                </div>
              </div>
              <div className="status-card-content">
                <div className="card-content flex justify-between items-center mt-5">
                  <div className="flex items-center">
                    <TbPointFilled className="text-2xl text-emerald-300 text-ms" />
                    <HiOutlineMailOpen className="text-2xl text-emerald-600 h-10 w-10 bg-emerald-50 rounded-full p-2" />
                    <p className="text-gray-400 text-justify text-sm mx-3">
                      اصغر سفارش را دریافت کرد
                    </p>
                  </div>
                  <div className="date">
                    <span className="font-semibold  text-emerald-800 bg-emerald-100 px-2  rounded rounded-full ">
                      11/12/2025
                    </span>
                  </div>
                </div>
              </div>
              <div className="status-card-content">
                <div className="card-content flex justify-between items-center mt-5">
                  <div className="flex items-center">
                    <TbPointFilled className="text-2xl text-emerald-300 text-ms" />
                    <LuCircleSlash className="text-2xl text-emerald-600 h-10 w-10 bg-emerald-50 rounded-full p-2" />
                    <p className="text-gray-400 text-justify text-sm mx-3">
                      با تشکر سارا، از شما می خواهم جیم را به اشتراک بگذارید
                      مشخصات.
                    </p>
                  </div>
                  <div className="date">
                    <span className="font-semibold  text-emerald-800 bg-emerald-100 px-2  rounded rounded-full ">
                      11/12/2025
                    </span>
                  </div>
                </div>
              </div>
              <div className="status-card-content">
                <div className="card-content flex justify-between items-center mt-5">
                  <div className="flex items-center">
                    <TbPointFilled className="text-2xl text-emerald-300 text-ms" />
                    <TbShoppingCart className="text-2xl text-emerald-600 h-10 w-10 bg-emerald-50 rounded-full p-2" />
                    <p className="text-gray-400 text-justify text-sm mx-3">
                      شما حدود 65٪ از بودجه سالانه خود را خرج کرده اید.
                    </p>
                  </div>
                  <div className="date">
                    <span className="font-semibold  text-emerald-800 bg-emerald-100 px-2  rounded rounded-full ">
                      11/12/2025
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* سفارشات */}
          <div className="orders-card w-full bg-slate-800 border-2 border-slate-700 shadow-md rounded-md p-3">
            <div className="card-title">
              <span className="text-gray-400 text-ms font-medium pt-2">
                سفارشات
              </span>
            </div>
            <div className="flex items-center justify-between mt-5 px-3">
              {/* orders-right */}
              <div className="orders-right flex flex-col">
                <div className="icon">
                  <IoStatsChartSharp className="text-2xl text-yellow-300 h-12 w-12 border-2 border-yellow-300 rounded-full p-2" />
                </div>
                <div className="price flex flex-col text-gray-400 ">
                  <span className="mt-3 text-lg font-semibold">
                    780,000 تومان
                  </span>
                  <span className="mt-3 text-sm fontt-medium">
                    بالاترین رشد فروش در دو سال گذشته
                  </span>
                </div>
                <span className="font-semibold text-center text-sm mt-6 text-yellow-600 bg-yellow-100 p-1  rounded rounded-md ">
                  47% رشد به بالا
                </span>
              </div>
              {/* orders-left */}
              <div>
                <div className="chart-container  w-46  hidden sm:block">
                  <Chart
                    options={options}
                    series={series}
                    type="line"
                    height={250}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashbord;
