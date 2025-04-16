import React, { useState } from "react";
import { BiCaretDown } from "react-icons/bi";
import { BiCaretRight } from "react-icons/bi";
import { BiSolidMessageDetail } from "react-icons/bi";
import { IoNotificationsSharp } from "react-icons/io5";
import { MdTask } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";
import { PiUserListFill } from "react-icons/pi";
import { FaThList } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { SiMcafee } from "react-icons/si";
import { Link } from "react-router-dom";
const Sidbar_PanelAdmin = ({
  activeComponent,
  setActiveComponent,
  // setActiveComponent_categoryAdmin,
  showSidbar,
  isCollapsed,
}) => {
  // const [activeCategory, setActiveCategory] = useState(null); //   مدیریت باز و بسته شدن دسته‌بندی‌ها

  // const menuData = [
  //   {
  //     id: 1,
  //     title: "دسته بندی محصولات",
  //     items: [
  //       "دسر ها",
  //       "نوشیدنی های گرم",
  //       "نوشیدنی های سرد",
  //       "غذا ها",
  //       "صبحانه",
  //     ],
  //   },
  // ];

  //  باز و بسته کردن دسته‌بندی‌ها
  // const toggleCategory = (id) => {
  //   setActiveCategory(activeCategory === id ? null : id);
  // };
  //برای سایدبار
  if (!showSidbar) return null;
  return (
    showSidbar && (
      <div className="sidbar-admin ">
        <div
          className={` bg-slate-800 text-gray-300  z-50 transition-all duration-300  min-h-screen overflow-y-auto   scroll  ${
            isCollapsed ? "w-20" : "w-80"
          }`}
        >
          <div className="logo ">
            {!isCollapsed && (
              <Link to="/home">
                <div className="flex m-auto items-center justify-center gap-2 mt-6 mb-6 ">
                  {/* لوگو */}
                  <div className="p-2 bg-slate-800 rounded-md shadow-md shadow-slate-500/50 hidden sm:block">
                    <SiMcafee className="text-3xl text-yellow-400 " />
                  </div>

                  {/* عنوان */}
                  <h1 className="text-xl font-semibold text-white tracking-wide hidden sm:block">
                    <span className="text-yellow-400">کافه</span>
                    <span className="text-gray-300">باران</span>
                  </h1>
                </div>
              </Link>
            )}
          </div>

          <ul className="pl-4 space-y-1 overflow-hidden transition-all duration-300 mt-2">
            <li
              tabIndex="0"
              onClick={() => setActiveComponent("dashboard")}
              className={`px-4 py-2  text-gray-300 hover:bg-slate-700 rounded transition-colors flex items-center tracking-wide cursor-pointer ${
                activeComponent === "dashboard"
                  ? "bg-slate-700 text-emerald-200"
                  : ""
              }`}
            >
              <MdDashboard className="font-bold mx-2 text-2xl sm:text-lg" />
              <span className="hidden sm:block">
                {!isCollapsed && "داشبورد"}
              </span>
            </li>
          </ul>
          <ul className="space-y-2 mt-2 ">
            {/*  دسته‌بندی */}
            <ul className="pl-4 space-y-1 overflow-hidden transition-all duration-300 mt-2 cursor-pointer">
              <li
                tabIndex="0"
                className={`px-4 py-2  text-gray-300 hover:bg-slate-700 rounded transition-colors flex items-center tracking-wide ${
                  activeComponent === "categories"
                    ? "bg-slate-700 text-emerald-200"
                    : ""
                }`}
                onClick={() => setActiveComponent("categories")}
              >
                <BiSolidCategoryAlt className="font-bold mx-2 text-2xl sm:text-lg" />
                <span className="hidden sm:block">
                  {!isCollapsed && "دسته بندی محصولات"}
                </span>
              </li>
            </ul>

            {/* {menuData.map((category) => (
              <li key={category.id}> */}
            {/*  دسته‌بندی */}
            {/* <div
                  className="flex justify-between text-gray-300 cursor-pointer  items-center px-4 py-2 hover:bg-slate-700 transition-colors tracking-wide"
                  onClick={() => toggleCategory(category.id)}
                >
                  <span className="flex items-center">
                    <BiSolidCategoryAlt className="font-bold mx-2 text-xl sm:text-lg " />
                    <span className="">{!isCollapsed && category.title}</span>
                  </span>
                  <span className="text-sm">
                    {activeCategory === category.id ? (
                      <BiCaretDown />
                    ) : (
                      <BiCaretRight />
                    )}
                  </span>
                </div> */}

            {/* زیرمنوها */}
            {/* <ul
                  className={`pl-4 space-y-1 overflow-hidden transition-all duration-300 ${
                    activeCategory === category.id ? "max-h-[200px]" : "max-h-0"
                  }`}
                >
                  {category.items.map((item, index) => (
                    <li
                      key={index}
                      onClick={() =>
                        setActiveComponent(
                          item.toLowerCase().replace("دسر ها", "categories")
                        )
                      }
                      tabIndex="0"
                      className="px-4 py-2 text-gray-500 hover:bg-slate-700 hover:text-yellow-200 rounded transition-colors tracking-wide text-sm cursor-pointer"
                    >
                      {item}
                    </li>
                  ))}
                </ul> */}
            {/* </li>
            ))} */}

            <ul className="pl-4 space-y-1 overflow-hidden transition-all duration-300 mt-2 cursor-pointer">
              <li
                tabIndex="0"
                className="px-4 py-2 justify-between text-gray-300 focus:text-emerald-200 hover:bg-slate-700 rounded transition-colors flex items-center tracking-wide"
              >
                <span className="flex items-center ">
                  <BiSolidMessageDetail className="font-bold mx-2 text-xl sm:text-lg" />
                  <span className="hidden sm:block">
                    {!isCollapsed && "پیام ها"}
                  </span>
                </span>
                {!isCollapsed && (
                  <span className="bg-emerald-100 text-emerald-700 text-sm font-meduim  rounded-full w-8 h-8 p-2 flex items-center ">
                    {17}
                  </span>
                )}
              </li>
            </ul>
            <ul className="pl-4 space-y-1 overflow-hidden transition-all duration-300 mt-2 cursor-pointer">
              <li
                tabIndex="0"
                onClick={() => setActiveComponent("notifications")}
                className={`px-4 py-2 focus:text-emerald-200   justify-between text-gray-300 hover:bg-slate-700 rounded transition-colors flex items-center tracking-wide ${
                  activeComponent === "notifications"
                    ? "bg-slate-700 text-emerald-200"
                    : ""
                }`}
              >
                <span className="flex items-center">
                  <IoNotificationsSharp className="font-bold mx-2 text-2xl sm:text-lg" />
                  <span className="hidden sm:block">
                    {!isCollapsed && "اعلانات"}
                  </span>
                </span>
                {!isCollapsed && (
                  <span className="bg-red-100 text-red-700 text-sm font-meduim  rounded-full w-8 h-8 p-2 flex items-center hidden sm:block">
                    {12}
                  </span>
                )}
              </li>
            </ul>
            <ul className="pl-4 space-y-1 overflow-hidden transition-all duration-300 mt-2 cursor-pointer">
              <li
                tabIndex="0"
                className={`px-4 py-2  text-gray-300 hover:bg-slate-700 rounded transition-colors flex items-center tracking-wide ${
                  activeComponent === "orderList"
                    ? "bg-slate-700 text-emerald-200"
                    : ""
                }`}
                onClick={() => setActiveComponent("orderList")}
              >
                <FaThList className="font-bold mx-2 text-2xl sm:text-lg" />
                <span className="hidden sm:block">
                  {!isCollapsed && "لیست سفارشات"}
                </span>
              </li>
            </ul>
            <ul className="pl-4 space-y-1 overflow-hidden transition-all duration-300 mt-2 cursor-pointer">
              <li
                tabIndex="0"
                className={`px-4 py-2  text-gray-300 hover:bg-slate-700 rounded transition-colors flex items-center tracking-wide ${
                  activeComponent === "users"
                    ? "bg-slate-700 text-emerald-200"
                    : ""
                }`}
                onClick={() => setActiveComponent("users")}
              >
                <PiUserListFill className="font-bold mx-2 text-2xl sm:text-lg" />
                <span className="hidden sm:block">
                  {!isCollapsed && "لیست کاربران"}
                </span>
              </li>
            </ul>
            <ul className="pl-4 space-y-1 overflow-hidden transition-all duration-300 mt-10 ">
              {!isCollapsed && (
                <span className="px-7 py-2  font-meduim text-sm text-yellow-200 hidden sm:block">
                  تسک ها
                </span>
              )}
            </ul>
            <ul className="pl-4 space-y-1 overflow-hidden transition-all duration-300 mt-2 cursor-pointer">
              <li
                tabIndex="0"
                className="px-4 py-2 focus:text-emerald-200 text-gray-300 hover:bg-slate-700 rounded transition-colors flex items-center tracking-wide"
              >
                <MdTask className="font-bold mx-2 text-2xl sm:text-lg" />
                <span className="hidden sm:block">
                  {!isCollapsed && "تسک های در دسترس"}
                </span>
              </li>
            </ul>
            <ul className="pl-4 space-y-1 overflow-hidden transition-all duration-300 mt-10">
              {!isCollapsed && (
                <span className="px-7 py-2  font-meduim text-sm text-yellow-200 hidden sm:block">
                  تنظیمات
                </span>
              )}
            </ul>
            <ul className="pl-4 space-y-1 overflow-hidden transition-all duration-300 mt-2 cursor-pointer">
              <li
                tabIndex="0"
                className={`px-4 py-2   text-gray-300 hover:bg-slate-700 rounded transition-colors flex items-center tracking-wide ${
                  activeComponent === "profileAdmin"
                    ? "bg-slate-700 text-emerald-200"
                    : ""
                }`}
                onClick={() => setActiveComponent("profileAdmin")}
              >
                <FaUserAlt className="font-bold mx-2 text-2xl sm:text-lg" />
                <span className="hidden sm:block">
                  {!isCollapsed && "پروفایل"}
                </span>
              </li>
            </ul>
            <ul className="pl-4 space-y-1 overflow-hidden transition-all duration-300 mt-2 cursor-pointer">
              <li
                tabIndex="0"
                className="px-4 py-2 focus:text-emerald-200 text-gray-300 hover:bg-slate-700 rounded transition-colors flex items-center tracking-wide"
              >
                <IoSettingsSharp className="font-bold mx-2 text-2xl sm:text-lg" />
                <span className="hidden sm:block">
                  {!isCollapsed && "تنظیمات"}
                </span>
              </li>
            </ul>
            <ul className="pl-4 space-y-1 overflow-hidden transition-all duration-300 mt-2 cursor-pointer">
              <li
                className="px-4 py-2 text-gray-300 hover:bg-slate-700 focus:text-red-400 rounded transition-colors flex items-center tracking-wide"
                tabIndex="0" // این ویژگی برای قابلیت فوکوس با Tab کلید
              >
                <RiLogoutBoxFill className="font-bold mx-2 text-2xl sm:text-lg" />
                <span className="hidden sm:block">
                  {!isCollapsed && "خروج"}
                </span>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    )
  );
};
export default Sidbar_PanelAdmin;
