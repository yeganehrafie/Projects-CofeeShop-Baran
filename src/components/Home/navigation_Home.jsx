import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { RiInstagramFill } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
const Navigation_Home = ({ handleShowMenuBar, handleshowModalLogin }) => {
  const [showModalSearch, setShowModalSearch] = useState(false);
  const searchQuery = useSelector((state) => state.search.query);
  const dispatch = useDispatch();

  const handleshowModalSearch = () => {
    setShowModalSearch(!showModalSearch);
  };
  const cartItems = useSelector((state) => state.cart.carts);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    console.log("Total Quantity:", total);
  }, [cartItems]);
  return (
    <>
      {/* modal search */}
      <div
        className={`fixed  z-40 right-20 top-10 flex items-center justify-center transition-opacity duration-500 ${
          showModalSearch ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={handleshowModalSearch}
      >
        {/* Modal Content */}
        <div
          className={`w-96 bg-slate-800 rounded-md shadow-md shadow-slate-400/50 p-6 transition-transform duration-500 ${
            showModalSearch ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors duration-200"
            onClick={handleshowModalSearch}
          >
            <IoCloseSharp className="text-xl text-red-500 hover:text-red-400 duration-500" />
          </button>
          {/* Search Form */}
          <form className="flex flex-col space-y-4">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) =>
                dispatch({
                  type: "search/setSearchQuery",
                  payload: e.target.value,
                })
              }
              placeholder="جستجو..."
              className="max-w-full text-xs text-gray-300 bg-slate-800 mt-5 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-amber-300 transition-colors duration-300"
            />
          </form>
        </div>
      </div>
      {/* End-modal search */}

      {/* Navigation Bar */}
      <div className="navigation_Home   bg-slate-800 bg-opacity-50  px-6 py-2">
        <div className="flex items-center justify-between ">
          <div className="flex flex-col gap-y-3 items-center">
            {/* Search Icon */}
            <div className="search">
              <form className="search-form">
                <button
                  onClick={handleshowModalSearch}
                  type="button"
                  className=" outline-none cursor-pointer "
                >
                  <IoSearch className="text-gray-300 text-xl font-bold h-10 w-10 p-2 text-amber-300 border-2 border-amber-300 rounded-full duration-300 hover:shadow-lg hover:shadow-amber-400/50" />
                </button>
              </form>
            </div>
            {/* login/register */}
            <div className="Login cursor-pointer duration-300">
              <button
                onClick={handleshowModalLogin}
                type="button"
                className="bg-transparent outline-none cursor-pointer"
              >
                <FaRegUser className="text-gray-300 text-xl font-bold h-10 w-10 p-2 text-amber-300 border-2 border-amber-300 rounded-full rounded-full duration-300 hover:shadow-lg hover:shadow-amber-400/50" />
              </button>
            </div>
            {/* list orders */}
            <div className="list-orders cursor-pointer relative">
              <button
                onClick={handleShowMenuBar}
                type="button"
                className="bg-transparent outline-none cursor-pointer duration-300"
              >
                <HiOutlineMenuAlt3 className="text-gray-300 text-xl font-bold h-10 w-10 p-2 text-amber-300 border-2 border-amber-300 rounded-full rounded-full duration-300 hover:shadow-lg hover:shadow-amber-400/50" />
              </button>
              <span className="absolute h-6 w-6 p-1 text-xs top-0 right-8 left-0 rounded-full bg-emerald-500 text-gray-50   text-center">
                {totalQuantity}
              </span>
            </div>
          </div>
          {/* Logo */}
          <div className="logo">
            <div className="flex flex-col items-center gap-y-3 mt-2">
              <p
                className="bg-clip-text text-transparent bg-gradient-to-r from-amber-100 to-amber-300
               text-4xl font-bold tracking-widest uppercase  "
              >
                باران
              </p>
              <h1 className="typing w-[500px]  uppercase text-3xl flex flex-col xl:flex-row font-medium text-white tracking-widest mt-2">
                <p className="text-gray-50">به کافه رستوران</p>
                <strong className="text-amber-300 mx-2 ">باران</strong>
                <p className="text-gray-50">خوش آمدید</p>
              </h1>
            </div>
          </div>
          {/* communication */}
          <div className="communication flex items-center flex-col gap-y-3">
            <div className="icon-home">
              <Link to="/home">
                <IoHome className="text-gray-300 text-xl font-bold h-10 w-10 p-2 text-amber-300 border-2 border-amber-300 rounded-full rounded-full duration-300 hover:shadow-lg hover:shadow-amber-400/50" />
              </Link>
            </div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation_Home;
