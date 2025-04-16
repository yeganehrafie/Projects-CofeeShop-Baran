import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { deleteProductCart } from "../../stor/store";

const ListOrder_Home = ({ showMenuBar, handleShowMenuBar, truncateText }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.carts || []);

  // محاسبه جمع کل و مالیات
  const calculateTotals = () => {
    const totalQuantity = cartItems.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
    );

    const totalPrice = cartItems.reduce((sum, item) => {
      const priceValue =
        item.price && typeof item.price === "string"
          ? parseInt(item.price.replace("T ", ""), 10)
          : 0;

      return sum + (item.quantity || 0) * priceValue;
    }, 0);

    const tax = totalPrice * 0.1; // 10% مالیات
    const totalWithTax = totalPrice + tax;

    return { totalQuantity, totalPrice, tax, totalWithTax };
  };

  const { totalQuantity, totalPrice, tax, totalWithTax } = calculateTotals();
  const handelDelete = (product) => {
    dispatch(deleteProductCart(product));
  };
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-start transition-opacity duration-500 ${
        showMenuBar ? "visible opacity-100" : "invisible opacity-0"
      }`}
      onClick={handleShowMenuBar}
    >
      {/* Modal Content */}
      <div
        className={`w-full md:max-w-screen-lg sm:max-w-screen-lg bg-slate-700 transition-transform duration-500 ${
          showMenuBar ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Menu Items */}
        <nav className="flex flex-col h-screen overflow-hidden">
          {/* Header */}
          <div className="flex flex-row justify-between items-center bg-slate-800 p-4">
            {/* Title */}
            <div className="title-listOrders">
              <h2 className="text-lg text-amber-300 font-semibold tracking-widest">
                لیست سفارشات
              </h2>
            </div>
            {/* Close Button */}
            <div>
              <button
                className="absolute px-4 left-0 text-amber-300 hover:text-amber-200 transition-colors duration-200"
                onClick={handleShowMenuBar}
              >
                <IoCloseSharp className="text-xl duration-500" />
              </button>
            </div>
          </div>

          {/* Products Container (Scrollable) */}
          <div className="flex-1 overflow-y-auto scroll p-6">
            <div className="flex flex-wrap items-center justify-center gap-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="card-body cursor-pointer w-full sm:w-1/3 p-4 bg-slate-800 bg-opacity-70 rounded-md shadow-md"
                >
                  <div className="card-content flex md:flex-row flex-col items-center justify-between mt-3 mb-0 gap-2">
                    {/* Image */}
                    <div className="image">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-24 h-24 rounded-md bg-gray-50 bg-opacity-70 border-2 border-slate-400"
                      />
                    </div>

                    <div className="flex flex-col text-end mx-3 ">
                      <div className="title">
                        <div className="description text-gray-300 ">
                          <p className="text-amber-300">{item.title}</p>
                        </div>
                      </div>
                      {/* Description */}
                      <div className="description text-gray-300 text-xs mt-2">
                        <p>{truncateText(item.description, 9)}</p>
                      </div>
                      {/* Price */}
                      <div className="price && number-product && btnDelete flex flex-grow items-center justify-between">
                        <span className="text-amber-300 font-semibold mt-2 text-md flex items-center">
                          {item.price}
                        </span>
                        {/**number product */}
                        <span className="text-emerald-300 text-xs font-semibold mt-2  mx-8 flex items-center">
                          <span className="mx-2">تعداد:</span>
                          {item.quantity}
                        </span>
                        {/*delete product */}
                        <div className="btnDelete">
                          <button
                            onClick={() => handelDelete(item)}
                            className="outline-none border-0 bg-transparent"
                          >
                            <RiDeleteBinLine className="text-red-500 text-md mt-2" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total Section (Fixed at Bottom) */}
          <div className="flex flex-col justify-start items-start bg-slate-800 p-4">
            <div className="total-number">
              <span className="text-gray-200">جمع تعداد:</span>
              <span className="text-amber-300 mx-1">{totalQuantity}</span>
            </div>
            <div className="total-price mt-2">
              <span className="text-gray-200">مبلغ کل:</span>
              <span className="text-amber-300 mx-1">{totalPrice} تومان</span>
            </div>
            <div className="tax mt-2">
              <span className="text-gray-200">مالیات (10%):</span>
              <span className="text-red-400 mx-1">{tax.toFixed(2)} تومان</span>
            </div>
            <div className="total-price mt-2">
              <span className="text-gray-200">جمع کل (با مالیات):</span>
              <span className="text-amber-300 mx-1">
                {totalWithTax.toFixed(2)} تومان
              </span>
            </div>
            <div className="payment mt-2 mb-2 text-center text-red-200">
              <button
                className="outline-none cursor-pointer bg-emerald-600 
              hover:bg-emerald-500 duration-500 px-5 py-3 max-w-40 w-40 rounded-sm"
              >
                پرداخت
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default ListOrder_Home;
