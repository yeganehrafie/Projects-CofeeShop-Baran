import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TbPointFilled } from "react-icons/tb";
import { IoNotificationsSharp } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { PiList } from "react-icons/pi";
import imgAdmin from "./../../images/12.jpg";
const Navigation_PanelAdmin = ({ setIsCollapsed, isCollapsed }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const searchQuery = useSelector((state) => state.search.query);
  const dispatch = useDispatch();
  // فانکشن برای باز کردن یا بستن دراپ‌داون
  const handelDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handelClosed = () => {
    setShowDropdown(false);
  };
  /*نمایش محدودست کلمات عنوان و توضیحات*/
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const UserNotification = Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    fullName: "یگانه رفیع",
    description:
      ".لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
    time: "5دقیقه قبل",
  }));
  return (
    <>
      <div className="navigation  p-2 px-4 bg-slate-800">
        <nav className="  ">
          <div className="flex justify-between items-center ">
            <div className="search-from flex items-center">
              <button
                type="button"
                className="text-gray-200  mx-6 mt-0 mb-0   outline-none bg-transparent font-semibold border-2 border-gray-400 rounded-md p-2 duration-300"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                <PiList />
              </button>
              <input
                value={searchQuery}
                onChange={(e) =>
                  dispatch({
                    type: "search/setSearchQuery",
                    payload: e.target.value,
                  })
                }
                type="search"
                placeholder="جستوجو کنید.."
                className="outline-none cursor-pointer rounded rounded-md text-sm font-meduimm
             text-gray-600 p-2 w-32 md:w-80 border-2 focus:border-emerald-300 duration-300"
              />
            </div>
            <div className="profile-admin flex items-center  space-x-2 sm:space-x-4">
              <div className="notification hidden sm:block mx-3 ">
                <div className="relative">
                  <button
                    className="outline-none text-gray-400 focus:outline-none duration-300 "
                    id="dropdown-button"
                    type="button"
                    onClick={handelDropdown}
                  >
                    <IoNotificationsSharp
                      id="dropdown-selected-option"
                      className="p-2 h-10 w-10 rounded-full  border-2 border-gray-400 "
                    />
                    <span className="absolute bottom-5  text-emerald-400 text-lg">
                      <TbPointFilled />
                    </span>
                  </button>
                </div>
                {/* showDropdown notifications */}

                {showDropdown && (
                  <div
                    id="dropdown-menu"
                    className="origin-top-left transition-all duration-300 overflow-y-auto  bg-slate-800 absolute left-32 mt-5  rounded-md shadow-lg  ring-1 ring-black ring-opacity-5 focus:outline-none z-50 w-[350px] max-w-[350px]"
                  >
                    <div className="p-3  text-gray-200 text-md font-semibold flex justify-between">
                      <div className="title">
                        <h3>اعلانات</h3>
                      </div>
                      <div className="closed">
                        <button
                          onClick={handelClosed}
                          className="bg-transparent outline-none"
                        >
                          <IoCloseSharp />
                        </button>
                      </div>
                    </div>
                    <div className="content-menu  bg-slate-700 flex   justify-center items-center  flex-col max-h-96 overflow-y-auto scroll ">
                      <div className="mt-5">
                        {UserNotification.map((item) => {
                          return (
                            <div
                              className="notif hover:bg-slate-600 duration-300 p-1 group"
                              key={item.id}
                            >
                              <div className="fullName mt-2">
                                <h3 className="text-gray-200 text-xs font-bold mx-3 group-hover:text-gray-400">
                                  {item.fullName}
                                </h3>
                              </div>
                              <div className="flex items-center mt-0 mb-0">
                                <div className="description flex-grow">
                                  <p className="text-xs text-gray-500 text-justify mx-3 mt-0 mb-0 break-words group-hover:text-gray-300">
                                    {truncateText(item.description, 8)}
                                  </p>
                                </div>
                                <div className="img-user ">
                                  <img
                                    src={imgAdmin}
                                    alt="profile-img"
                                    loading="lazy"
                                    className="w-12 h-12 rounded-full border-2 border-slate-300 "
                                  />
                                </div>
                              </div>
                              <div className="time mt-0 mb-0">
                                <span className="text-yellow-400 text-xs mx-3">
                                  {item.time}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <button
                      className="flex m-auto justify-center items-center w-[300px] max-w-[300px] mb-3 outline-none mt-3 text-gray-400
                    border-2 border-slate-600 text-xs font-bold py-2 px-3 rounded-md hover:bg-slate-700 hover:text-gray-200 duration-300"
                    >
                      مشاهده همه
                    </button>
                  </div>
                )}
              </div>
              <span className="text-slate-500 font-meduim text-xl hidden sm:block ">
                |
              </span>
              <span className="text-yellow-200 mx-3 font-meduim tracking-wide text-xs tracking-wider hidden sm:block">
                یگانه رفیع
              </span>
              <img
                src={imgAdmin}
                alt="profile-img"
                loading="lazy"
                className="w-12  rounded-full border-4 border-slate-600"
              />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
export default Navigation_PanelAdmin;
