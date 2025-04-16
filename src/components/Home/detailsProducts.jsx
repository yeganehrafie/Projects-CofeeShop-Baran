import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increase, decrease } from "../../stor/store";
import ImageZoom from "./../ImageZoom/imageZoom";
import { IoCloseSharp } from "react-icons/io5";
import ImgOlive from "./../../images/variety-green-black-whole-olives_114579-35110_prev_ui.png";

const DetailsProducts = ({
  showModalDetailsProducts,
  handleshowDetailsProducts,
  // productId,
}) => {
  // const selectedProduct = useSelector((state) =>
  //   state.products.products.find((product) => product.id === productId)
  // );

  // if (!selectedProduct) {
  //   return null;
  // }

  // const dispatch = useDispatch();
  // const counters = useSelector((state) => state.counter);
  // const selectorCount = counters[pro.id] || 0; // استخراج تعداد محصول با id مشخص

  // const handleIncrease = () => {
  //   dispatch(increase(pro.id)); // ارسال اکشن افزایش
  // };

  // const handleDecrease = () => {
  //   dispatch(decrease(pro.id)); // ارسال اکشن کاهش
  // };
  return (
    <section className="detailsProducts">
      <div
        className={`fixed inset-0 z-50 flex items-center justify-start transition-opacity duration-500 ${
          showModalDetailsProducts
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
        onClick={handleshowDetailsProducts}
      >
        {/* Modal Content */}
        <div
          className={`w-full max-w-[650px] max-h-[650px]  m-auto justify-center h-full  bg-slate-700  transition-transform duration-500  ${
            showModalDetailsProducts ? "translate-y-0" : "translate-y-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Menu Items */}
          <nav className="flex flex-col h-screen">
            {/* Header */}
            <div className="flex flex-row justify-between items-center bg-slate-800  p-4">
              {/* Title */}
              <div className="title-listOrders">
                <h2 className="text-lg text-amber-300 font-semibold tracking-widest">
                  جزییات محصول:
                </h2>
              </div>
              {/* Close Button */}
              <div>
                <button
                  className="absolute px-4 left-0 text-amber-300 hover:text-amber-200 transition-colors duration-500"
                  onClick={handleshowDetailsProducts}
                >
                  <IoCloseSharp className="text-xl duration-500" />
                </button>
              </div>
            </div>
            {/* Main Content */}
            <ul className="flex flex-col items-center space-y-8 px-6 font-medium text-lg ">
              <div className="image">
                <ImageZoom src={ImgOlive} loading="lazy" />
              </div>
              <div className="title">
                <h2 className="font-medium text-md text-amber-300 tracking-widest">
                  صبحانه انگلیسی
                </h2>
              </div>
              <div className="description text-gray-300 mt-1">
                <p className="text-justify text-gray-400 w-96">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ لورم
                  ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                </p>
              </div>
            </ul>
            <div className="flex items-center justify-end m-auto flex-row w-96 mb-32">
              <div className="price">
                <span className="text-amber-300 font-semibold mx-3">880T</span>
              </div>
              <div className="number-input flex items-center border-2 border-slate-500 rounded-md overflow-hidden w-24">
                {/* Button Minus */}
                <button
                  className="w-8 h-8 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-lg flex items-center justify-center cursor-pointer transition duration-300"
                  // onClick={handleDecrease}
                >
                  -
                </button>

                {/* Input Field */}
                <span className="w-16 text-center text-gray-300 font-medium">
                  {/* {selectorCount} */}0
                </span>

                {/* Button Plus */}
                <button
                  className="w-8 h-8 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-lg flex items-center justify-center cursor-pointer transition duration-300"
                  // onClick={handleIncrease}
                >
                  +
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
      {/* modal DetailsProducts */}
    </section>
  );
};
export default DetailsProducts;
