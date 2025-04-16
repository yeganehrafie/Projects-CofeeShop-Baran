import React from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../stor/store";
const Breakfast_ProductsHome = ({
  truncateText,
  handleshowDetailsProducts,
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.carts);
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const products_juice = [
    {
      id: 1,
      title: "صبحانه انگلیسی",
      description: "خوراک لوبیـا + بیکن + تخم مرغ + سیب زمینی + سوسیس",
      price: "T 360",
    },
    {
      id: 2,
      title: "صبحانه ایـرانی",
      description:
        "پنیـر + گردو + سبزی خوردن + کره + مربا + عسل + خامه + زیتون + خرما + گو",
      price: "T 360 ",
    },
    {
      id: 3,
      title: " املت فرانسوی",
      description: "تخم مرغ رپ + بیکن + قارچ + زیتون + پنیـر سالاد مخصوص",
      price: "T 270",
    },
    {
      id: 4,
      title: "املت استیک",
      description:
        " فیلـه گوساله + فلفل دلمـه + تخم مرغ + پیـاز + زیتون + سالاد مخصوص",
      price: "T 270",
    },
    {
      id: 5,
      title: "صبحانه انگلیسی",
      description: "خوراک لوبیـا + بیکن + تخم مرغ + سیب زمینی + سوسیس",
      price: "T 270",
    },
    {
      id: 6,
      title: "صبحانه انگلیسی",
      description: "خوراک لوبیـا + بیکن + تخم مرغ + سیب زمینی + سوسیس",
      price: "T 270",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 mt-32">
      <div
        id="juice"
        className="card-title w-full  bg-slate-800 bg-opacity-70 shadow-lg shadow-slate-500/50 p-4 mx-10 rounded-md text-center"
      >
        <h2 className="text-xl font-bold text-amber-300 tracking-widest">
          آبمیوه
        </h2>
      </div>
      {products_juice.map((pro) => {
        const itemInCart = cartItems.find((item) => item.id === pro.id);
        const selectorCount = itemInCart ? itemInCart.quantity : 0;
        return (
          <div
            key={pro.id}
            className="card-body cursor-pointer w-1/4 min-w-[200px] bg-slate-800 bg-opacity-70 shadow-lg shadow-slate-600/50 p-4 rounded-md"
          >
            <div
              onClick={handleshowDetailsProducts}
              className="card-content flex flex-col"
            >
              <div className="title">
                <h2 className="font-medium text-md text-amber-300 tracking-widest">
                  {pro.title}
                </h2>
              </div>
              <div className="description text-gray-300 mx-3">
                <p>{truncateText(pro.description, 9)}</p>
              </div>
            </div>
            <div className="card-footer flex items-center justify-between mt-3 mb-0 mt-0">
              <div>
                <div className="cart">
                  <span className="text-emerald-500 text-xl font-meduim mx-3">
                    <MdOutlineAddShoppingCart
                      onClick={() => handleAddToCart(pro)}
                    />
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="price">
                  <span className="text-amber-300 font-semibold mx-3">
                    {pro.price}
                  </span>
                </div>
                <div className="number-input flex items-center border-2 border-slate-500 rounded-md overflow-hidden w-24">
                  {/* Button Minus */}
                  <button className="w-8 h-8 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-lg flex items-center justify-center cursor-pointer transition duration-300">
                    -
                  </button>

                  {/* Input Field */}
                  <span className="w-16 text-center text-gray-300 font-medium">
                    {selectorCount}
                  </span>

                  {/* Button Plus */}
                  <button className="w-8 h-8 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-lg flex items-center justify-center cursor-pointer transition duration-300">
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Breakfast_ProductsHome;
