import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  nextPage,
  prevPage,
  jumpToPage,
  setProducts,
  deleteProduct,
  updateProduct,
  addProduct,
} from "../../stor/store";
import axios from "axios";
import { HiMiniSlash } from "react-icons/hi2";
import { TiPlusOutline } from "react-icons/ti";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import { IoCloseSharp } from "react-icons/io5";
import { TiStar } from "react-icons/ti";
const Category_PanelAdmin = ({
  isCollapsed,
  truncateText,
  setActiveCategoryComponent,
}) => {
  /*category*/
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    category: "",
  });
  const baseUrl = "http://192.168.43.127:8000/api/categories?page=1";

  const dispatch = useDispatch();
  // دریافت وضعیت پیجینیشن و محصولات از Redux
  const { currentPage, itemsPerPage } = useSelector(
    (state) => state.pagination
  );
  const categoriesProducts = useSelector((state) => state.products.products);

  const [isModalOpen_AddProducts, setIsModalOpen_AddProducts] = useState(false);
  const modalOpen_AddProducts = () => {
    setIsModalOpen_AddProducts(true);
  }; //modal add products

  const [isModalOpen_UpdateProducts, setIsModalOpen_UpdateProducts] =
    useState(false); // modal update

  const [selectedProduct, setSelectedProduct] = useState(null); // محصول انتخاب‌شده برای اپدیت
  const [updatedData, setUpdatedData] = useState({
    title: "",
    description: "",
  });
  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => {
        if (
          response.data.categories &&
          response.data.categories.data &&
          Array.isArray(response.data.categories.data)
        ) {
          dispatch(setProducts(response.data.categories.data));
        } else {
          console.error("Invalid API response structure:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dispatch]);

  /* حذف محصول */
  const handleDelete = (categoryId) => {
    axios
      .delete(`http://192.168.43.127:8000/api/categories/${categoryId}`)
      .then(() => {
        // حذف محصول از Redux
        dispatch(deleteProduct(categoryId));
        alert("محصول با موفقیت حذف شد!");
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        alert("خطا در حذف محصول! لطفاً دوباره امتحان کنید.");
      });
  };

  const handleUpdate = (categoryId) => {
    const product = categoriesProducts.find(
      (p) => p.category_id === categoryId
    );
    if (!product) {
      console.error("Product not found");
      return;
    }
    setSelectedProduct(product);
    setUpdatedData({
      title: product.title,
      description: product.description,
    });
    setIsModalOpen_UpdateProducts(true);
  };
  // تابع به‌روزرسانی محصول
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm_Update()) return;

    try {
      const response = await axios.put(
        `http://192.168.43.127:8000/api/categories/${selectedProduct.category_id}`,
        updatedData
      );
      dispatch(updateProduct({ id: selectedProduct.id, updatedData }));
      setIsModalOpen_UpdateProducts(false);
      alert("محصول با موفقیت به‌روزرسانی شد!");
    } catch (error) {
      console.error("Error updating product:", error.response?.data);
      alert("مشکلی پیش آمد. لطفاً دوباره امتحان کنید.");
    }
  };

  // اعتبارسنجی داده‌ها
  const validateForm_Update = () => {
    if (!updatedData.title || !updatedData.description) {
      alert("لطفاً تمام فیلدها را پر کنید.");
      return false;
    }
    return true;
  };
  /**نمایش اطلاعات در مرورگر بعد از اد  با متدget  */

  // Effect برای دریافت داده‌ها از سرور
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(baseUrl); // درخواست GET
        if (
          response.data &&
          response.data.categories &&
          Array.isArray(response.data.categories.data)
        ) {
          dispatch(setProducts(response.data.categories.data)); // ذخیره داده‌ها در Redux
        } else {
          console.error("Invalid API response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts(); // فراخوانی تابع برای دریافت داده‌ها
  }, [dispatch]);
  // افزودن محصول
  const handleSubmit_AddProducts = async (e) => {
    e.preventDefault();

    // اعتبارسنجی داده‌ها
    if (!validateFormAdd_Products(newProduct)) return;

    try {
      const response = await axios.post(
        "http://192.168.10.34:8000/api/categories", // مسیر صحیح برای افزودن محصول
        newProduct // ارسال داده‌های محصول جدید
      );

      dispatch(addProduct(response.data));

      alert("محصول با موفقیت اضافه شد!");

      // پاک کردن فیلدها
      setNewProduct({
        title: "",
        description: "",
      });
    } catch (error) {
      console.error("خطا در اضافه کردن محصول:", error);
      alert("مشکلی پیش آمد. لطفاً دوباره امتحان کنید.");
    }
  };

  // اعتبارسنجی داده‌ها
  const validateFormAdd_Products = (product) => {
    if (!product.title || !product.description) {
      alert("لطفاً تمام فیلدها را پر کنید.");
      return false;
    }
    return true;
  };

  /**pagination */
  const totalPages = Math.ceil(categoriesProducts.length / itemsPerPage);

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages - 1) {
      dispatch(nextPage());
    } else if (direction === "prev" && currentPage > 0) {
      dispatch(prevPage());
    }
  };

  const handleJumpToPage = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      dispatch(jumpToPage(pageNumber));
    }
  };

  const startIndex = currentPage * itemsPerPage;
  const currentProducts = categoriesProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const showPaginationButtons = () => {
    const buttons = [];
    for (let i = 0; i < Math.min(3, totalPages); i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => jumpToPage(i)}
          className={`btn ${
            i === currentPage
              ? "outline-none h-8 w-8 p-1  rounded-full text-md font-meduim text-gray-300 bg-slate-500  hover:bg-slate-400 hover:text-gray-800 duration-300 border-2 border-slate-300"
              : "outline-none  h-8 w-8 p-1  rounded-full text-md font-meduim text-emerald-300 border-2 border-emerald-300 duration-300"
          }`}
          disabled={i === currentPage}
        >
          {i + 1}
        </button>
      );
    }
    if (totalPages > 6) {
      buttons.push(
        <button
          key="ellipsis"
          onClick={() => dispatch(nextPage())}
          disabled={currentPage >= totalPages - 3}
          className="outline-none   h-8 w-8 p-1 flex items-center  rounded-full text-md font-meduim text-gray-300 bg-slate-500  hover:bg-slate-400 hover:text-gray-800 duration-300 border-2 border-slate-300 "
        >
          ...
        </button>
      );
    }
    for (let i = Math.max(totalPages - 3, 3); i < totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => jumpToPage(i)}
          className={`btn ${
            i === currentPage
              ? "outline-none  h-8 w-8 p-1  rounded-full text-md font-meduim text-gray-300 bg-slate-500  hover:bg-slate-400 hover:text-gray-800 border-2 border-emerald-300 duration-300"
              : "outline-none  h-8 w-8 p-1  rounded-full text-md font-meduim text-emerald-300 border-2 border-emerald-300 duration-300"
          }`}
          disabled={i === currentPage}
        >
          {i + 1}
        </button>
      );
    }

    return buttons;
  };
  /**End-pagination */

  return (
    <>
      {/* Modal for Update */}
      {isModalOpen_UpdateProducts && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <form onSubmit={handleSubmitUpdate}>
            <div className=" rounded-lg p-6  relative z-10 w-96">
              <div className="content-modal fixed inset-0 flex items-center  justify-center bg-black/50 z-50">
                <div className="modal-container bg-slate-700 w-96 rounded-md shadow-lg overflow-hidden">
                  <div className="modal-title bg-slate-800 text-yellow-300 py-3 px-4 text-md font-meduim flex items-center justify-between">
                    <h2>به روز رسانی محصول</h2>
                    <button
                      className="text-yellow-300 hover:text-yellow-400 transition-colors font-bold"
                      onClick={() =>
                        setIsModalOpen_UpdateProducts(
                          !isModalOpen_UpdateProducts
                        )
                      }
                    >
                      <IoCloseSharp />
                    </button>
                  </div>
                  <div className="modal-body p-6 space-y-4">
                    <div className="flex gap-4">
                      <div className="input-field w-full">
                        <label className="block font-medium mb-1 flex items-center text-xs">
                          <TiStar className="text-emerald-100" />
                          <span className="text-gray-300 mx-1">
                            عنوان دسته بندی:
                          </span>
                        </label>
                        <input
                          type="text"
                          value={updatedData.title}
                          onChange={(e) =>
                            setUpdatedData({
                              ...updatedData,
                              title: e.target.value,
                            })
                          }
                          className="w-full bg-gray-200 text-gray-800 py-1 px-2 mt-3 border border-gray-300 rounded-md outline-gray-100 focus:outline-none focus:border-emerald-400 duration-300"
                        />
                      </div>
                    </div>
                    <div className="input-field">
                      <label className="block  font-medium mb-1 flex items-center text-xs">
                        <TiStar className="text-emerald-100  " />
                        <span className="text-gray-300 mx-1">
                          توضیحات دسته بندی:
                        </span>
                      </label>
                      <textarea
                        value={updatedData.description}
                        onChange={(e) =>
                          setUpdatedData({
                            ...updatedData,
                            description: e.target.value,
                          })
                        }
                        className="w-full bg-gray-200 text-gray-800 py-1 px-2 mt-3 border border-gray-300 rounded-md outline-gray-100 focus:outline-none focus:border-emerald-400 duration-300"
                      ></textarea>
                    </div>
                    <div className="flex justify-end gap-2 ">
                      <button className="mt-3 text-md bg-emerald-600 hover:bg-emerald-500 text-gray-200 font-medium py-2 px-4 rounded-md transition-colors duration-300">
                        ثبت تغییرات
                      </button>
                      <button
                        onClick={() =>
                          setIsModalOpen_UpdateProducts(
                            !isModalOpen_UpdateProducts
                          )
                        }
                        className="mt-3 text-md  bg-red-600 hover:bg-red-500 text-gray-200 font-medium py-2 px-4 rounded-md transition-colors duration-300"
                      >
                        لغو
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* modal for Add_products */}
      {isModalOpen_AddProducts && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <form onSubmit={handleSubmit_AddProducts}>
            <div className=" rounded-lg p-6  relative z-10 w-96">
              <div className="content-modal fixed inset-0 flex items-center  justify-center bg-black/50 z-50">
                <div className="modal-container bg-slate-700 w-96 rounded-md shadow-lg overflow-hidden">
                  <div className="modal-title bg-slate-800 text-yellow-300 py-3 px-4 text-md font-meduim flex items-center justify-between">
                    <h2>افزودن محصولات</h2>
                    <button
                      className="text-yellow-300 hover:text-yellow-400 transition-colors font-bold"
                      onClick={() =>
                        setIsModalOpen_AddProducts(!isModalOpen_AddProducts)
                      }
                    >
                      <IoCloseSharp />
                    </button>
                  </div>
                  <div className="modal-body p-6 space-y-4">
                    <div className="flex ">
                      <div className="input-field w-full">
                        <label className="block font-medium mb-1 flex items-center text-xs">
                          <TiStar className="text-emerald-100" />
                          <span className="text-gray-300 mx-1">
                            عنوان دسته بندی:
                          </span>
                        </label>
                        <input
                          type="text"
                          value={newProduct.title}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              title: e.target.value,
                            })
                          }
                          className="w-full bg-gray-200 py-1 px-2 mt-3 border border-gray-300 rounded-md outline-gray-100 focus:outline-none focus:border-emerald-400 duration-300"
                        />
                      </div>
                    </div>

                    <div className="input-field">
                      <label className="block  font-medium mb-1 flex items-center text-xs">
                        <TiStar className="text-emerald-100  " />
                        <span className="text-gray-300 mx-1">
                          توضیحات دسته بندی:
                        </span>
                      </label>
                      <textarea
                        value={newProduct.description}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            description: e.target.value,
                          })
                        }
                        className="w-full bg-gray-200 text-gray-900 py-1 px-2 mt-3 border border-gray-300 rounded-md outline-gray-100 focus:outline-none focus:border-emerald-400 duration-300"
                      ></textarea>
                    </div>
                    <div className="flex justify-end gap-2 ">
                      <button className="mt-3 text-md bg-emerald-600 hover:bg-emerald-500 text-gray-200 font-medium py-2 px-4 rounded-md transition-colors duration-300">
                        ثبت محصول
                      </button>
                      <button
                        onClick={() =>
                          setIsModalOpen_AddProducts(!isModalOpen_AddProducts)
                        }
                        className="mt-3 text-md  bg-red-600 hover:bg-red-500 text-gray-200 font-medium py-2 px-4 rounded-md transition-colors duration-300"
                      >
                        لغو
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      <section className=" m-auto max-w-[1300px]">
        <div className="container mt-10  px-4">
          <div className="card-header  p-2  bg-slate-400 rounded rounded-sm flex items-center justify-start text-sm font-meduim">
            <span className="text-gray-800">داشبورد</span>
            <HiMiniSlash className="text-yellow-700" />
            <span className="text-emerald-800">دسته بندی محصولات</span>
          </div>
          {/* add_Products */}
          <div className="add_Products">
            <button
              onClick={modalOpen_AddProducts}
              className="flex items-center mt-5 mb-0 text-gray-50 py-2 px-3 bg-yellow-500 hover:bg-yellow-400 duration-300 text-md rounded-md"
            >
              <TiPlusOutline className="mx-1" />
              افزودن محصول
            </button>
          </div>
          <div className="cards-category flex flex-wrap items-center justify-start mt-10 gap-5 pb-5">
            {categoriesProducts.map((item) => {
              return (
                <>
                  <div
                    key={item.category_id}
                    className={` group cursor-pointer w-1/4 min-w-[300px] 
                    bg-slate-800 
                    hover:bg-gradient-to-r hover:from-slate-700 hover:via-slate-600 hover:to-slate-500
                    shadow-lg shadow-slate-600/50 
                    p-4 rounded-md 
                    duration-700
                    transform transition-all
                    ${isCollapsed ? "w-96" : "w-96"}`}
                  >
                    <div
                      onClick={() => {
                        setActiveCategoryComponent(item.category_id); // استفاده از ID واقعی دسته‌بندی
                      }}
                      className="card-content flex flex-col"
                    >
                      <div className="title">
                        <h2 className="font-medium text-md text-amber-300 tracking-widest">
                          {truncateText(item.title, 3)}
                        </h2>
                      </div>
                      <div className="description text-gray-400 group-hover:text-gray-50 text-xs font-bold  mt-2">
                        <p>{truncateText(item.description, 8)}</p>
                      </div>
                    </div>
                    <div className="card-footer flex items-center justify-between mt-6">
                      <div className="price">
                        <span className="text-amber-300 group-hover:text-emerald-500 duration-500 font-semibold mx-3 ">
                          {item.price}
                        </span>
                      </div>
                      <div className="card-icons flex">
                        <button
                          className="delete mx-2"
                          type="submit"
                          onClick={() => handleDelete(item.category_id)}
                        >
                          <RiDeleteBin5Line className="font-bold bg-slate-600 rounded-full h-10 w-10 p-2 text-gray-300 border-2 border-slate-500 hover:text-red-400 hover:border-red-400 hover:shadow-md hover:shadow-slate-500/50 duration-300 cursor-pointer" />
                        </button>
                        <button
                          className="update"
                          type="button"
                          onClick={() => handleUpdate(item.category_id)}
                        >
                          <GrUpdate className="font-bold bg-slate-600 rounded-full h-10 w-10 p-2 text-gray-300 border-2 border-slate-500 hover:text-emerald-400 hover:border-emerald-400 hover:shadow-md hover:shadow-slate-500/50 duration-300 cursor-pointer" />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          {/* pagination */}
          <div className="pagination flex justify-between items-center text-gray-400 mt-6 pb-6">
            <div className="pagination-body flex items-center  space-x-2  ">
              <button
                onClick={() => handlePageChange("prev")}
                disabled={currentPage === 0}
                className="mx-1 outline-none h-8 w-8 p-1  rounded-full text-md font-meduim text-gray-300
                border-2 border-slate-300 hover:bg-slate-400 hover:text-gray-800 duration-300"
              >
                <MdKeyboardDoubleArrowRight />
              </button>

              {showPaginationButtons()}

              <button
                onClick={() => handlePageChange("next")}
                disabled={currentPage === totalPages - 1}
                className="outline-none h-8 w-8 p-1  rounded-full text-md font-meduim text-gray-300
                border-2 border-slate-300 hover:bg-slate-400 hover:text-gray-800 duration-300"
              >
                <MdKeyboardDoubleArrowLeft />
              </button>
            </div>
            <span>
              صفحه {currentPage + 1} از {totalPages}
            </span>
          </div>
        </div>
      </section>
    </>
  );
};
export default Category_PanelAdmin;
