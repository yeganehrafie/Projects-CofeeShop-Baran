/*****تمایم دیتا ها و استیت ها همه باید با دیتاهایی ک در api هست هم نام باشند *****/
/*
نکته::
  وقتی یه کامپوننت برای دسته بندی ها داریم فقط اون سکشنه ک ایدی برای دسته بندی میخواد
برای ایتم های هر دسته بندی نیازی به باکس دسته بندی نداریم و
 فقط باید با استفاده از فیلتر توی برنامه نویسی ایدی ها رو برابر باهم قرار بدیم
*/

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setProducts,
  deleteProduct,
  updateProduct,
  addProduct,
} from "../../stor/store";
import axios from "axios";
import ImgOlive from "./../../images/variety-green-black-whole-olives_114579-35110_prev_ui.png";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import { HiMiniSlash } from "react-icons/hi2";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TiPlusOutline } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";
import { TiStar } from "react-icons/ti";
const Breakfast_ProductsAdmin = ({
  truncateText,
  categoryId,
  isCollapsed,
  onBack,
}) => {
  const dispatch = useDispatch();
  const baseUrl = "http://192.168.43.127:8000/api/items?page=1";
  const itemsCategories = useSelector((state) => state.products.products);
  const [loading, setLoading] = useState(true);
  const [
    isModalOpen_AddProducts_brakfast,
    setIsModalOpen_AddProducts_brakfast,
  ] = useState(false);
  const modalOpen_AddProducts_brakfast = () => {
    setIsModalOpen_AddProducts_brakfast(true);
  }; //modal add products
  const [selectedProduct, setSelectedProduct] = useState(null); // محصول انتخاب‌شده برای اپدیت
  const [
    isModalOpen_UpdateProducts_brakfast,
    setIsModalOpen_UpdateProducts_brakfast,
  ] = useState(false); // modal update
  const [updatedData, setUpdatedData] = useState({
    images: [],
    title: "",
    price: "",
    category_id: "",
    description: "",
  });
  const [selectedProduct_Admin, setSelectedProduct_Admin] = useState(null);
  const [showModalDetailsPro_Admin, setShowModalDetailsPro_Admin] =
    useState(false);
  const handleshowDetailsPro_Admin = (product) => {
    setSelectedProduct_Admin(product); // ذخیره محصول
    setShowModalDetailsPro_Admin(true); // نام صحیح state
  };
  /*category_items*/
  const [newProduct_barkfast, setNewProduct_barkfast] = useState({
    title: "",
    price: "",
    description: "",
    //و برای اینکه مشخص بشه ایتم ها مربوط به کدوم دسته بندی اند
    category_id: categoryId, // استفاده از categoryId برای تعیین دسته‌بندی
    images: [], // آرایه‌ای از تصاویر
  });
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file)); // ایجاد URL برای تصاویر
    setNewProduct_barkfast({
      ...newProduct_barkfast,
      images: imageUrls, // اضافه کردن تصاویر به آرایه
    });
  };
  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => {
        if (
          response.data.items &&
          response.data.items.data &&
          Array.isArray(response.data.items.data)
        ) {
          dispatch(setProducts(response.data.items.data));
        } else {
          console.error("Invalid API response structure:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dispatch]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://192.168.10.43.127:8000/api/items?item_id=${categoryId}`
        );

        // فیلتر محصولات بر اساس category_id
        //فلیتر برای نمایش درست دسته بندی ها
        // const filteredProducts = response.data.items.data.filter(
        //   (item) => item.item_id === categoryId
        // );
        const filteredProducts = response.data.items.data.filter(
          (item) => item.item_id === categoryId
        );
        dispatch(setProducts(filteredProducts));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (categoryId) fetchProducts();
  }, [categoryId, dispatch]);

  /**اگر تصاویر باید به سرور ارسال شوند،
   *  باید آن‌ها را به صورت فایل ارسال کنید (نه به صورت URL). برای این کار، می‌توانید از FormData */

  /**handleSubmit_AddProducts_brakfastاین رو بردار و handleSubmit_AddProducts_brakfast_2 رو تست کن */
  const handleSubmit_AddProducts_brakfast_2 = async (e) => {
    e.preventDefault();
    if (!validateFormAdd_Products(newProduct_barkfast)) return;

    const formData = new FormData();
    formData.append("title", newProduct_barkfast.title);
    formData.append("price", newProduct_barkfast.price);
    formData.append("description", newProduct_barkfast.description);
    formData.append("category_id", newProduct_barkfast.category_id);

    // اضافه کردن تصاویر به FormData
    newProduct_barkfast.images.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    try {
      const response = await axios.post(
        "http://192.168.43.127:8000/api/items",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // ضروری برای ارسال فایل‌ها
          },
        }
      );
      dispatch(addProduct(response.data));
      alert("محصول با موفقیت اضافه شد!");
      setNewProduct_barkfast({
        title: "",
        price: "",
        category_id: categoryId,
        description: "",
        images: [],
      });
    } catch (error) {
      console.error("خطا در اضافه کردن محصول:", error);
      alert("مشکلی پیش آمد. لطفاً دوباره امتحان کنید.");
    }
  };
  const handleSubmit_AddProducts_brakfast = async (e) => {
    e.preventDefault();

    if (!validateFormAdd_Products(newProduct_barkfast)) return;

    try {
      const response = await axios.post(
        "http://192.168.43.127:8000/api/items",
        newProduct_barkfast // ارسال داده‌های محصول جدید
      );

      dispatch(addProduct(response.data));

      alert("محصول با موفقیت اضافه شد!");

      // پاک کردن فیلدها
      setNewProduct_barkfast({
        title: "",
        price: "",
        category_id: categoryId, //
        description: "",
        images: [],
      });
    } catch (error) {
      console.error("خطا در اضافه کردن محصول:", error);
      alert("مشکلی پیش آمد. لطفاً دوباره امتحان کنید.");
    }
  };
  const validateFormAdd_Products = (product) => {
    if (
      !product.title ||
      !product.price ||
      !product.description ||
      !product.images.length === 0 // بررسی کنید که آیا حداقل یک تصویر انتخاب شده است
    ) {
      alert("لطفاً تمام فیلدها را پر کنید.");
      return false;
    }
    return true;
  };
  /* حذف محصول */
  const handleDelete = (categoryId) => {
    axios
      .delete(`http://192.168.10.23:8000/api/items/${categoryId}`)
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
  const handleUpdate = (itemId) => {
    const product = itemsCategories.find((p) => p.item_id === itemId);
    if (!product) {
      console.error("Product not found");
      return;
    }
    setSelectedProduct(product);
    setUpdatedData({
      image_url: product.image_url,
      title: product.title,
      price: product.price,
      // category_id: product.category_id,
      category_id: product.categoryId,
      description: product.description,
    });
    setIsModalOpen_UpdateProducts_brakfast(true);
  };
  // تابع به‌روزرسانی محصول
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm_Update()) return;

    try {
      const response = await axios.put(
        `http://192.168.10.23:8000/api/items/${selectedProduct.item_id}`,
        updatedData
      );
      dispatch(updateProduct({ id: selectedProduct.id, updatedData }));
      setIsModalOpen_UpdateProducts_brakfast(false);
      alert("محصول با موفقیت به‌روزرسانی شد!");
    } catch (error) {
      console.error("Error updating product:", error.response?.data);
      alert("مشکلی پیش آمد. لطفاً دوباره امتحان کنید.");
    }
  };
  // اعتبارسنجی داده‌ها
  const validateForm_Update = () => {
    if (
      !updatedData.title ||
      !updatedData.price ||
      !updateProduct.category_id ||
      !updatedData.description ||
      (!updatedData.image_url && !selectedProduct?.image_url) // نمایش عکس اپلود شده در کنار اینپوت
    ) {
      alert("لطفاً تمام فیلدها را پر کنید.");
      return false;
    }
    return true;
  };

  return (
    <>
      {/* modal for Add_products_brakfast */}
      {isModalOpen_AddProducts_brakfast && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <form onSubmit={handleSubmit_AddProducts_brakfast}>
            <div className=" rounded-lg p-6  relative z-10 w-96">
              <div className="content-modal fixed inset-0 flex items-center  justify-center bg-black/50 z-50">
                <div className="modal-container bg-slate-700 w-96 rounded-md shadow-lg overflow-hidden">
                  <div className="modal-title bg-slate-800 text-yellow-300 py-3 px-4 text-md font-meduim flex items-center justify-between">
                    <h2>افزودن محصولات</h2>
                    <button
                      className="text-yellow-300 hover:text-yellow-400 transition-colors font-bold"
                      onClick={() =>
                        setIsModalOpen_AddProducts_brakfast(
                          !isModalOpen_AddProducts_brakfast
                        )
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
                          <span className="text-gray-300 mx-1">عکس محصول:</span>
                        </label>
                        <input
                          type="file"
                          multiple // اجازه انتخاب چندین فایل
                          onChange={handleImageChange}
                          className="w-full bg-gray-200 py-1 px-2 mt-3 border border-gray-300 rounded-md outline-gray-100 focus:outline-none focus:border-emerald-400 duration-300"
                        />

                        {/* <input
                          type="file"
                          onChange={(e) =>
                            setNewProduct_barkfast({
                              ...newProduct_barkfast,
                              image_url: e.target.files,
                            })
                          }
                          className="w-full bg-gray-200 py-1 px-2 mt-3 border border-gray-300 rounded-md outline-gray-100 focus:outline-none focus:border-emerald-400 duration-300"
                        /> */}
                      </div>
                    </div>
                    <div className="flex ">
                      <div className="input-field w-full">
                        <label className="block font-medium mb-1 flex items-center text-xs">
                          <TiStar className="text-emerald-100" />
                          <span className="text-gray-300 mx-1">
                            عنوان محصول:
                          </span>
                        </label>
                        <input
                          type="text"
                          value={newProduct_barkfast.title}
                          onChange={(e) =>
                            setNewProduct_barkfast({
                              ...newProduct_barkfast,
                              title: e.target.value,
                            })
                          }
                          className="w-full bg-gray-200 py-1 px-2 mt-3 border border-gray-300 rounded-md outline-gray-100 focus:outline-none focus:border-emerald-400 duration-300"
                        />
                      </div>
                    </div>
                    <div className="flex ">
                      <div className="input-field w-full">
                        <label className="block font-medium mb-1 flex items-center text-xs">
                          <TiStar className="text-emerald-100" />
                          <span className="text-gray-300 mx-1">
                            قیمت محصول:
                          </span>
                        </label>
                        <input
                          type="number"
                          value={newProduct_barkfast.price}
                          onChange={(e) =>
                            setNewProduct_barkfast({
                              ...newProduct_barkfast,
                              price: e.target.value,
                            })
                          }
                          className="w-full bg-gray-200 py-1 px-2 mt-3 border border-gray-300 rounded-md outline-gray-100 focus:outline-none focus:border-emerald-400 duration-300"
                        />
                      </div>
                    </div>

                    <div className="input-field">
                      <label className="block  font-medium mb-1 flex items-center text-xs">
                        <TiStar className="text-emerald-100  " />
                        <span className="text-gray-300 mx-1">توضیحات:</span>
                      </label>
                      <textarea
                        value={newProduct_barkfast.description}
                        onChange={(e) =>
                          setNewProduct_barkfast({
                            ...newProduct_barkfast,
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
                          setIsModalOpen_AddProducts_brakfast(
                            !isModalOpen_AddProducts_brakfast
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
      {/* Modal for Update */}
      {isModalOpen_UpdateProducts_brakfast && (
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
                        setIsModalOpen_UpdateProducts_brakfast(
                          !isModalOpen_UpdateProducts_brakfast
                        )
                      }
                    >
                      <IoCloseSharp />
                    </button>
                  </div>
                  <div className="modal-body p-6 space-y-4">
                    <div className="flex gap-4">
                      <div className="input-field w-full ">
                        <label className="block font-medium mb-1 flex items-center text-xs">
                          <TiStar className="text-emerald-100" />
                          <span className="text-gray-300 mx-1">عکس محصول:</span>
                        </label>
                        <div className="flex items-center justify-between">
                          <input
                            type="file"
                            value={updatedData.image_url}
                            onChange={(e) =>
                              setUpdatedData({
                                ...updatedData,
                                image_url: e.target.value,
                              })
                            }
                            className="w-48 bg-gray-200 text-gray-800 py-1 px-2 mt-3 border border-gray-300 rounded-md outline-gray-100 focus:outline-none focus:border-emerald-400 duration-300"
                          />
                          {/* نمایش عکس اپلود شده در کنار اینپوت */}
                          {selectedProduct?.image_url && (
                            <div>
                              <img
                                src={selectedProduct.image_url}
                                // src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQA0wMBEQACEQEDEQH/xAAcAAACAQUBAAAAAAAAAAAAAAAFBgQAAQIDBwj/xABAEAABAwMCAwUFBQYFBAMAAAABAgMEAAUREiEGEzEiQVFhcQcUMoGRFSNCobEzUmLB0fAIJHLh8RZTY5I0c4L/xAAaAQACAwEBAAAAAAAAAAAAAAACAwABBAUG/8QAMhEAAgIBBAAEBQIGAgMAAAAAAAECAxEEEiExEyJBUQUUMmFxgZEjQqGx0fDB4RUzUv/aAAwDAQACEQMRAD8A4dUIVUIVUIXCVKzpSTjrgVCF9Cv3T9KrJDHB8KshVQhVQhVQhVQhVQhVQhVQhVQhWKhAlFsV0mREyosJ1xhSilK0gYJHUDxpFmqprnsnLDHQ09s47orKLv8AD15jgKdtcwAjOQyoj8qkdVRLqa/cp0WLuLB7jTjStLqFIV4KGDTk0+hbTXZhirKN0WO9KkIjx21OPOKCEIT1JPdULSz0dNsNla4UYK5aAu7q78bNDwT5+JrFbY5vC6OhTR4ay+zZMmH3iKJys63O0kH8PU/pj50CQ2XRtVIQtlRTjUtZJ/v50YtkF6OFpOe81MgYIT0dKDjrVlYIixk6UAfOrKZpLS891XwUJ9ajGVUIXSMqxUINfDciOw2qOtgLQvdS8bmr3pLBMNhl6AzJwITIBPiKROUUNjBmcbhtZWC8ygjv2pfiIPYwtceHbMIGlmKkPY32prkpLysDa0+UCbdwxBlsuRlRtC1fj7xR1yzwwbI45Rtf9k0hTWuHKyrwUKcoJis4EW/2SbYZxiT0BK8ZSR0UPGhlHaWnkGUJZVQhVQhVQg3+zzgt7i24uAu8qFGwX1p3WrOcJT5/pSNRd4UeFljK4b3z0dxbtMC2RokWPGKOQdLLQGUjzV+prz1sf5rV5n+p1q5y2tQ+kgX9qCy2tUt4suL3R2ykHzx4UhRrUs4y/suDVRKyXEVlC07fOHXGkxJDUiQEjSlYYSrbwwcVorpsi8tY/U0z0Vsvb9QA9wrZ78V/ZKhEe7kPDQSfQDH0ro16myDw3lHN1Pw/wvqX6oLcFWa38Na5cuGty4s5SVv4Cc/+P+taHqVZ0zNDTxhx6ku9yETJSX9SUkJyrO+k9+KBSTNaWY4Fe4x3JUlT7CVkpGnCTnA/pVpNC5Y6NDaZkdvtR3CnyGasW0akTZDz4ZbQUqJxlQ6VaQORkjWhAj8x/Kln8SjUbwDjJBfgNpVnpk4q1IjiaPdk1MlYObVtOeVUIbGXOWvVjO3SqayWhgsc8c7BaGjHhSZZQ6PI5QbjEKeysJV4Upjkn6E/31OEkLAzQl4MVTkA7qz8qF3Rj2Eqm+UF+HQmU8pwJBbTsTRQ1dWexdlMsDmyw7BgvTR20JSVBPoK6NclNZTMU1g87cb8VO8V3NEpbIZbbSUoT34PjUlLcRLAt0BZVQhVQhtjtc59prJGtQTnGcZNVJ4TYUI7pKK9Tr9hU7YmlRrCXmmBlbjne6vpk/yArzeq1Dtluk8fqewr+GaeinE+Wx+tZnuwEvXBQD5TktJJBPr51y7mllJ8r0z2vucuXh78RXHuc4v7cqVcpJuqVsSXd2FvK7GAduvSutQtsVt/X3O/TKEKl4fP4IFn4fmvvLUwpLjgOAshQQFeA8zTLr48RwDLFK32S/Q6FYOF02kNGUVOvKGS4egPTbvFZ7N+9SfRytTrXqFiPRPkWVqU4404pK2m8KwR4Hu/5rK6Jqb2ywkZVdtiuOQXc+HmpQQeQhuPgoRoPax3E4p26yPMC67EnyLt34fTblpkMturZR8RyUqFaaNXOMttgTrU45h2S35EBdpQ6wVOak5Kl7EHwI7q6K5MwsQE/wCaU6kJ6+Ao88ABt+QUtbk+QFBkvAu3W+R4eA+SpechtPWjhXKQE7YR7AiuLlZOmLt3ZVTfA+4j5j7CtWkylVCFxUIFLOs/s0jdW2fClTQ2HQztWUdlTLmHCN8mkM1QsxwyR7l7mUuvulSx8KQetJnNRHRe/okiW4lI1xsIPfSFdBvDD2ezOkcDphPWlbaQA4oknzrpU11zhho59s7IyHJbSBYn2vwBsj02NaYQUMRRmm93J46XstQByAcCqfZF0Y1RZVQhVQg/cB8MIDSOI72OXbms8hGe1IX02HgPGubr9SlHwo/UzrfC9POVqlFc+nt+f8e40zr4VKabjQ1JbydKc7jfbpXEq0nLcmemWmz9b5CVo41dakIhzYgSkZKngd04Hn9Kj0cK4OcOWZdT8PTzKtjZAELiO2vmVDDkYnUjmDIV6eFHRGbjNZw1/Q5Vrlp7I7ZciRfeIAlK7bawqFDj6k62CEuKV0OnG4HXzNMpjZFRy8v7nVq0qmvEu5k/7Auwx1XGU40xc5DUlCSplS1qzn5nf/etrTZdjhXBLasevAzcHcQPyJK4V2dUZgB1lQCRkHHQd+9ZHWoSyumZNbpYwip1rgapcuM0lSHMK0gBOdqqST4OasvkWOIr5CDIjgrWhS088pPgckAHx6VI0+iQUZOLzkFcYM655fioQ3qQFPNoPXI/UDFdCp4jyBHIvz34Vp/bOJbWADg9aaoyl0BKUY9i7c+LVLQUQUkKz+0V3eia0V0Y+ozWX5WIis64t1xS3FFS1HJUepNaMYMz5MKhCqhCqhCqhAnZlASUZIpchsRrXIWnlttq0lR61ium0uDTVFPkzfK23mS85rSPyrFuc0zXDGOAjKlse7EBW5GwrJCuW4JReQ/wS9IZU0vVlsqAxW3T61wvVYq6uMkzqN0dLfDkxwdeSo/lXoV2cdo8e0oIqoQqoQIWG2ru95hW9BKTJfS2VDqATufpVSeE2WuTtXH9lnMOQoNphk2+MwhtlCfw4658z1rz9lkPmG58P0PWfCLaq9O03zkAQ4V0ExHu8ZxDiElO6SEtpKe1nO3QmqlYlFyOnK2nZ53/AL6DXw7waG0PT7gtT7byBykg/F4k0DzOlSax+Dl6v4k5TVdfHuM8FoQgsctTbS28AAYSlOPpWOFjqlLcmlJHOsfiJY5aZxu/soh3V5KyeaN0qVnBB7/p+ddPTvdWsdHoo6hOO4EtPaHveHMBxKgQ2B1+X0rQ4vG1GeVi3bmFYjwYuLkyQrl6WVOuDUPuxkb+J3pSrlOG2KyYdTrItNOQ6zLg3E9nyeJHFl1xyOCyFAjKyopTkepzWirSpWYkcWzUZ5iccTxNc0yS+t5LiyfxIGE+lbPlq8YQlamxdm5/i+7PHKXUNHxQnf8APNRaetFvUzfQFlSHpbqnpDqnXVfEtRyTTkkuhDbfZpqyiqhCqhCqhCqhCqhCbbgA+hRpUmNiNgCFsp1Eg9xrJfhIfU2EYUWOsannQryJpEIxY5zkuiQI8JDmkjr0yaF7U8BKU8ZGrg6Czzwrnakg5SnNO0unqdm59i7rZqPQ+39ejhWcc4wwv9DXZXZzMnkakhlVCGSfGoQ7P7M+GI/DrjV1uzSnrk6yhxloZHuyVjqf4sHvxjNcrW6xRbr9jpafQynWrcnXW1oWlt06SCnsqG9ZlKL2zeOUA4tZiDJaQ9NS22lKitPaWrcae8YrK4p34azldmiEsV56wVJukWAFNrPYAOADsK0+JFeTHAvZKfm9RfvN/eekPNx3E8ttIwB0xjO9DbF2PAyEFHlnOuLr1aGrk41zOcpsZKUj8QHw5HTcVp0+ks9OEFLWquOG8sRpV8fdBSwlMdB66B2leqjvXRhpoR75MNusts+yN1iiTbo3cY8Bh+RJcZRhLYKj+0TnPl609GVvI/8AtiS9Z+HuF+H2nkiI3FCnGx8SnEgDJ8u0rH+1AsN5I+jkxOSTRlE+y2ebe5yYdva5jpGT4AedRchwg5vCGhz2YcQN4BDOtQyApRGapvBpjo5zWUxWu9muFmlGNcorjDoPRQ2Poe+rM065QeGiCRioAWqEKqEKqEKqEJsPAWnJpUkNXQzRnEFoBWSAe7ek2xUkMgwpHhLewtpl4+QQaQtNnob4uOwozZpLwClxndI8qv5Ivxxk4eiQYiSoFxLwPj0rTTpa4vPqKstnJYDHGtycZ4Km8tQOWlD8qq7V+HbGCXYmNScWzzRWkWVUIEeH4Zn3aPHCdSSoKWMZ7I3O3fSb7PCrcjTo9P8AM3Rq9z0TwvZ5LilXO5leqQVKAKsYT5+NcGuDsW9+vZ3tfqq44op6iH5kpENrl9lKdOkAbY8KqU41R29HLit7yAZ1x9zhuBlaVv5HYQMr3NZ9PKUp7Ir/AH8jpL1lwgLxg+izQY0qW9lUqS22hpJ3UkkavyzXXr0e/OTK9Tt6CPtNjw+HfZ9cnILYQ9IDbHNHxEEgdfTP1rZRVCL4M9lspHm8qyc1qEGNQh1j/Dwg/wDUV2UR2RBAJ8CXE4/SgsbSCj2RfbWJFz43LLSSW40dCMnoCdz+opasjXHEjZp9BfqeYLj3EP7HeJ3cQPU0PzMTW/gl67aOo+xOCqBcZiZraAH0dhwKBG3dVR1UJWbUC9Fbp6HJ95/oN/G0yI1Mt65c/lORyRy0YJ23BI8Ku+cYtPJr0GmtsUlXHhgK4X20Xy13GPdWffFOJzHwnCkq8j5Ut66tN5NtnwS1xjH09TlqrczHOjk9oddXWlq6UuUwv/Haeny7P3MORH/7KaLfP3B+W0//AMIbo/sYu6/29wit+QBNdHB4/IWjexRkf/KvCz/9TYH65qbSZCcb2PWBoDnyZTx/iWB+mKvCIGons74aiYKISVEd6jnNTCLyFmOHLSyPuYTSR6VMImSUiCy2MNtISPIVCiy4yflULAV9ZWxDeVE0h0AkUMuuC49iXdL9IunCUyKWxzgkg49KzQSlLMh04tI5BWgQXG5qEOy+yrg+M3ww/wAQzxiRIymMVbaEA41DxyR+Vcz4klOva3wb9DY655j6nUoEoyHoLIU22CzqUjv0jp+X60imTslGPXHQdqUd8vuKXEF+hGJfbg081KbtaAOW2vKVLUcAEjz8PGhjoHfL+JxH09yvmFXDEOZepfgG4tuWC5XwqYX72I6EtpGAhwNIQpOO77zUfnXWqrhU9sVhGKc52cyYk+2B5bXE9nta3C4G2mF7/gVqUk+ucA/IUxNPLAfsNf8AiBfUzwjb4wI+9lgEeSUE/wBKCvthS6PPxpoAz8KcD3fiiQGoKWW0kait1eAB6d9RcltNLJ2r2X8EL4QXc0yZbcmQ+ttCi0MBsJBOD6lY+lKu4jgOMX2C+I7XCvb98uLa1KlMSFNkDuCOz/Kubd5pSkvQ9dob56euqpriSz+/Jy6cA2opz0q63nk3aqSwRIsySzJSlh9beo47KsU+UI4y0cmFkpWqHowjPmvqe7a1uunA1KOSaRCG7lnWv1C0+IVkZ8T2UB1SFaTvt3U1Qh0c5667OUzSu4uPt4dAOO89aioUXwSXxCVkfMiNzqPYI8c9Kc492fWugeYwbG3STuRV5KwbNdQmCubjvqEwXU8lIyamSGlcxCBVZJghvXBIzg4oXIJIB3e6ISghSwDg7UtzDSRyh65qj+9lBOFahis9be4dP6ROKSDgg5rYZMGTba3FpQ2gqUo6UgDqT3VCHq+Fw6iLZLfa1uHkQo6EEn8WE7nHrk1yrafGt56Nldvhx4Fm5OXJ+58UNWXKlMRkQIwGMqkOAFRz3BCMbedaKdNXVLxfUVZfOxbPQA2fgGfG9nM21TSmJKmTULdJOrS2ggj9K0ufmFqORp4ctNvg2O3WOIpeEvhxSyPjIVqJoVJPLCcGlk577WmHH/atbm8E8wRUJ7O3xYwPr+dHX9AEuwz/AIkH9P2EwO9T6yPTQP51UPUkujiNMBDNsnvxkpcYkvR1t7amXCg/UUuTafA+OHFZPRnszjLg8FRH5S1qela5Ti151KB3BOfIClvLaTJLGWl6HGEcYzWFXNbSG0pnFSjqTukFRP13pPgwy8ep0Xq7cRUv5RWdnuKUSrfJ76ZGlIKXxOyXaI4mKDqV4+E5pjrysCFrZKxT9iS7cQt5Lic9mlxq2rBq1HxCN09yC7XETK2FNSGzuOopUqJ5yhD1SzlAd1cYrOh86T/Aa0KLxyLlqEzVra/7i/8A0otoHjno73kEEJNE5GbaYplgKwVgfOq3E2mxdyabTuoH0q95NgNevzSCcGh3l7CI7xClXRQ8etTcTaDZPEiEE6lD61e7BWwDTeKy47y2MqPTakTua6Ac9r2rlg27ouMzlLMeRzcBSEaD20nwrH4yb83QqcbpS2uLTIkqMwWHFONGPIaThbaxg59KY71uSguCpWyitkuwnwfbbNdrY7EmpR70onSoda6tEYzhj1EStcXnJK4G4QEjjiO06jMeGsvrJTsdPwj64rPNbJNZN0XugpHc5+RGVsSVKSlWPAnc0mC5bCf2B9mbbt0QofQGpDi1SXj/AOR0lahnyzj5Uyc4rgkYN4aMb662LI6tStOpG2etA35Q4LzECzIaULQlJz92tZ8fhV/UVIvgKXTCl14ftl4nQJktGZEF1DzR79ST3+Vac/wjL/Mc59uEMTJtnKhqCGXsf+yP9qzxnhDtuTlyrI3nZNF4jJ4ZZNkccKY0dKi4+oIQAOqicD9am/lFqOEej+KCm2cG3JDHYRGgqbbx4BOBVQlum2wccHl1Sxy8HJIokh0nkiLo0KZroii+QKrBeUi2oVMFJouCKmAkzPNUFk68OIS6nLCHXd8dhJIJrLK2MPqeBqg30i8J65TpaGW47iCv8To0pA8Tmky1lK/mDWnsazt4JCbTfpK3QpTDLaOilLPa9NqQ/iVWFjLfsG9LJSwSeHbLD96dcvU2M+gJ7DaF7DxJpd3xFPEYJr7/AOBnydkH5lyEkf8AT8pamGER3G2viw0N/PNc6V2prfM3hm2WjnGOZQ5MTarDPQl5nh8KKOilbJI89962z1qhDCznsxy0z3ecqHY7NFLjsW1NNrOQAUBfarNDW3KeWtw6mmEJceoEucTiSBIYksqdcZbbCcIPwoBJCdPgMnpRRnXfHFna6O1G7StNYXIWtkK3Xpx912ysqktKHP5ue1kZyT302UrIpKL/AKnCv01HiOT9fsAr5bL1FkOyIFvYhw21YQYYA27iT1q69RXnc5c/lnS0a0kYbMZb+w7+y+2zIlpXMujijKnuakBfxJbT/vv9K6tUY43L1OR8Su32eHH6YjmtQLqW1JBSO0Sf78jRwk932Oc+uOxAk3pqbd9CZSJapLhQ203k8lOeprkTV1tu5vhvo7MKlXVjGMErjtanW48ZIUG9ONaFADV4H5Vt1FkuNnRi00Vznsj8ALeXPOoZaZjqShRPXKht+RodPe5p8YJqYKEVj1DVqdkyOL7xrz7vGbQ2jwKlAE1vnJ7cGTCwgL7WGALZBm6NQadU0rHXtY/mKTFNwyRfUcuEkOfC0r6VeGGhp9m1uXO4lakKZKGYn3hUU57RyEjy7zR1RzLIFjwjoXtEChwPeACcqjkbeZAoq0km2UuZpHm9+A4CdwRS43I0yqZBejrScYp0ZoVsZGKSnrTEwGsGs0QtlwnNVktRyZacVWQ9uDLUahNx3uyX2TJSpDkKOMnGGpKAEDpsMV52EqKVhp/qv8nobaPDxz/ckRoSwtx4zkNx/wAMZ5Qcx6dMfWsso1TW6uIVmpUopOPm9+gq041IazzWsqTkFwAYFZYwslHCksfs1/cySSUsJEK92OLf2wxyGA6NkvFRSpO/QYHQ1u00trxU+X+w2Nrq8028CsoxeHlqtrkBptxK8KUrLvMHiDjptRTjdZJy3ZOrRCNkVOMw1GeakcqTzZbeSGm0ttnGBvnT4dd6BKxQ837HP1dajPHq/X/gyufFUS2ylRtSCoowpQ7J1d2cA+dM2Sti3jHHHQNWglKG9kJ7iO4NNqTDkwlr+JTRbUsEf6s+FBTWqVh5ND0lc+XFk+zXEG3yYCI7yboglbkdBAO47O/eMdKVqKpcJ/S+v+0ZVBKzLawgBaIV/vV7jsSUyWozjhDpUpQ0ITuT4eVb6NNp29kTdqraaKnOCT/7OxMpQHStB7ASG2kjolI6/wAvoK6slFLP7Hk8tv8AuQ73OEe1z5CVj7qM5p8jirqe9ZyXFeeKfucGsMic3OamOvKJR8LeT6/KudYoJbYLk9DqNS7I4kxgvvELD0UOTFpbcHVIVlR9BUjp3Ls5fiKHQ4+ytpS7Uq5KZcaQ/nlhwblIPX571uroVcGZLbd0sDkkMtreLaQFuqClnxOAB+QoL7FloGEQfxLblXKySGGxqcGFIT3FQ3H9KOvDrwuys4lyJq+B7sh9DaWmFhQGVoVhKfXNVKmzoNWwxkdOHrIzZIaGELQ4+t0qccSMDOnoPLFaaopQayInJylkvxW0JHD8to75Tv6A5pbx4Ego/wDtRyKXwyHir3dSQf3TXOcuTpbuAFM4VuccEKjE07fjsDMfQWJ1onNrUFw3hjwTmtkLI+4ixA9cR9vJWw6PVBpykn0zO1gwShR6IUflUyi02Z8lw9UEetDuXuXyVyV/un6VNyAwzqzXD8J+eO0qK1p7K239QWQfqK8/drJwrT29nqHbNLLeRnFtjMNqKO2UJ26HeuXFubzJ8CZXzk1kCTU32dAf5iolvZjqBAQtXMJ7tWkHY+FdGqqiuKklu/37mqqVcZYinl9Z/wCyBEvd9ZVHSbhDfDY1pLuQo/MgE0x11Re+MWhkqa7G+P2/wHYKo95Vi6W9txRVqUsO6yVHvIzt8qRZZKPKkZraJUrNcmMMZtmO7qVMUhkJGpOjHYT3VWjcbbHGcuDLNymuI+b/AJEe7t2OYZDTr7UWS4vsOIGUHvzgdP8AmtVW+Lfqjo79QklFZWOvUgQrDMjyQLfcI8qG4QhTjTwASfBQ/sU26UHHLXJKtXKt/wAVP9hsjWW8QnOa25GakPLbbDrbhUeXuTqP57UiUHiKf+s5074WylJfkbeam2wVMty2XLgtODqc/ZjwrbpqlVHz9+pz7H4ksqPBKjTmmIhUXgsBOlvfdaqbqLkocCvCkp5awCXC7dLbLhoS4C82QVKTtuDWejUxqg44bDlU9ykJK4UK3uR7VcGmZMxaFB0trUlAWcYAIIIx0pEpyU3Krr9DsabRq3T77PUgMcMcOQb2lF6DkZaVDLBeyh3v69QK106mxZVizgy6nQR2Kyh8M6pBvVu5aI7b6EY2RpPZI/dHpipHVtQamYZaSX1InCS2Cp1Sk6eoVnasjs8259EUH0gc1xPb5CnFsvjDQ+8CwUkDOx7XUVHqZwamlx6jpaKyK2yXPoR4XHlpuL6ozMhbK9WEqcRhKwNspPT64rbffY1tQqOhmo78cB2NMBjrLZCkJ21g53NZqtRKNclH07/IudfmWSM64p7U0tKiy4koUcZ0576Gm+xvGMp9klCK59RMW8uJLVF5bqH+0hKkt5B36g01pp8MdzJfYPot0lm1tx3JBmPodysupGMEd2ehG1actrD7MEp8+Xg2R0COogss/JAFMgsehTlJ9ske8o04U00R4aBvTfE9AeSFKs9huY0yrew04ro60gJIPy61MVz+pBKc4ibxBwjGtrgLjYcjr/ZupGx8j51mtqdf4NNdqmAvsW3fu/lQZYfAVa4jjoWmC4IakpXjmReynHjvjFci/RyfMW8Hd8FY355+4wRbpCbcEeJLDzjhwG8Z29d6x+DbHmK/PGBDpnNbpRwguqS09b1tSGGQ25jUnASSfHIoo6u1VuLimv8Afv8A8AbZQsUk3lCNxBw8w++p03NLWElLTZSAlHgM5zitmn1LhHDga43zbBNtt8GJIaX9q/5xLvwMr7JT/qp1l8pxa2cD7JzlHrge2XOZFU9HZbcSOyeaoj126VyHDD4ZiVmHiXH4OdXu2R37uFIeahBZGtRUNGe8jpXf0l26tKXJdqm1uimbra1GtYKXrwhKVOBSvdkF0qTt2SobD5Zqr5eJxGOfzwXXXqJJOX9Q0IEW8BabfxDJ5ykhISsqCgB4ZApNcpQeZRXAN/iRi044+4a4gsaLTbftJl5xyU5jW4sbDI/EBuB6UcNifmfYWn1MrX4SjjH+8CT9vXBZ5clxTRbOUOMrGB9TTfBp7Q9KXbX7oYHOMbg1GbZlsNOOPADUSOYrpuNOw/vxoZZkmnj8+pS01D8ybX29ABxBLuDBwu34zg85SQSo4/5qqIVuK8wMLZJ+VNoiP2SdcFsrky0LDwTyzr1qx542T6Gm+NGr6VktxnbF84SHjhqyJS8kJXEe5OpIIcBUnuIxgn6VkblJPf0YLt0HxlEe6cVy4zE+EwyzzUrLTY3ylPic7Zqq4Rck2uDVDRRaU8/cSobNwuE1LK0TnWljta9Sxj5ZwPSty2QjiOP0DUY5bmnn7sZLZEsU2XFhMJDE4ANh5OQCoZyVgHH89qzSd7njPD9+Bllaqg7O17HQbNaHIrWXHdORhWrOFYPxY1dfM0qNM5Jt8HJ1GpjN4S/39gmJzSUqLbyV6fi0qG/r3UyFkE+Jf1MzrlnlAmzPNz7whrdLhSXXUHBUAMYBPj0q9LDxL976Q6+Xh04DhTiQtXctWSDXSUMPJyCJPZwlTjR3GMjxFU4tPKCBvMJTv0q+yZMC8U7ip0X2ZT1C42eXDW6GytpRbWcdhYBIO/nTq5KSxIH6XlHCvtriIbaM47wyk0Gyn3GeLL3HSdwLrkreYmssxFrPKDiOnl54riw+IppeVno43uP1LkKWrgIMalOzEl1Q7Kk7YHlQ2alze3oL5/HMVyTI3CaHW3IsiRJkHdwct4pxgeA23q4qyUv4KTF2a2VmHJYFniKxRlqfkpD7GkAIacbKSr5460WlusisM1/VhJ5/BBtnCjT51z5D8ZH4Ett8xSvkK0fObpbIrLBsplDmI5WOx2mLEjympjmXslpL6ynIScfD0+RFYb3c/PZhfsZ75SU9jWcexA4sulwZeUzFiNcrJJkBAWTnwHcKCmqqx5sfPt0bNPFKOWKC2r5OdS223IeCzpSnQBn5V0q1QuF2HbbOPXRMiC42x/8AzsOS24nG+kj5ZpdnhT4jJAxk7OG+CVxBeZMhhCGZUonAKGFJBSlJz1PeaurT0xWfUXXmDxBL8+pDtdruT3LfDwbX8aUuAAH5k0zMG8IOVrj9eR4t8i689tf2bHUhIKVBtsdo+IO/61htfP8AgRZGhweZcmm9cDLuaUvmVIblqOtxpxYUgn06ijrvdK27eTP805NJ9fYCyuCrqzIUpl1pkBIJCDtjx9Kr5yPUoM1Q1cWkmwtbolxiQUcl2N7w0ch3S2pSD37daU9U0+I8FzsplLzc59OQwiAw+hMiYyy9NUrUt1LYyrO2fDvrOrZt8Ni5W7fLH6fYhW9yTD96atkiQ84FkKU7HOBv3YHSmOyyEn5Vhr0DzVZjxOkSLdAuel596PHZfBylTeNQHlnvz3VpjCE44ziXfJj1NkVPyvKDQmxIcMCdJGdsrLmCaXDdjG1syyjJyyuBbvnEDIWgxIyUcsK0un8XhnxrTHTxtit0cJBZdbxnJXsvuKpXEj3POsrjqSHD3kKGQK6Wngo/SuDFqpOS5OgysJV6U9oxEJ5wA4JyDQkBsxH3epBGU/pVNEFHiTiZmzME6VOSCMpbA/M+VD2yOWBA+2bnepJemvuhncBtB0hG2xx3/OqtaisCbHkil5aDpQ66EjoAdqVgA6Uq92tTGG3AvCSpIUc71y1pkuGeodr7yYQ+L5n2QiXLYQy0t7lNqIIWrAycfKr+WVcsQ5+4OYyWWGonFEV2KVw5TSFqAysYCj60UoXdJ4BSgzRdLxb7lHAfCi9ndbbmBn0q51bln1Lrk4Ph8AuQpmeuMluUmKuPukskdo/xHvpdcLKXuSQ/x1hpslQIkRtnSuaHHNyNSvh9PCsmojqJyyksDI3RAN/soecU5BnDXjtIW8cZ8vCtGn1LgttsP6GqNqksZF2SblDW2pZfwnGFNryNu/IroQ8GfWAt6j9xitPGdzmJZtrbDKipYKlvbYA8TWeehgotZ4YvNW7fJM2Xfi1Uea7brbFaKkfE44nO564A60D+GxzulJ4EaZRsm/XBCavl9SFYaQ80rqlLWk/pRLTaaPT5/Jomk5col2bie/Qn0spZcLQ3KVBRwPI+NVKmtLMZYYctNRZ6DcZ9xusOQ9CkpjuEZb5jW/zzSntcsyOY4V1z2tZFCVB4nnyXXp7zq2NODyFdlRHdjoK0K7T7eDXW4xaSSBr9j5TXNluIiKKjsHO1jzxUjrIt7YJsZa4P+YPWTieNaLdoeuAkJa20pHaHh60iym2c1sjjJns8FrOTCV7UG0hwQWUgEYyrrT/kLZcS4/Qwuypc9sWpHtBmPOhOsNt7dlB2rTX8OjBJ94Fy1abwuCDJ4mfWCVulZPw5GTitMa59LgVK2K7NC72sJCJKitCDkN6vyJpsNPFcy5Ez1DlwjTZeKLjC4gi3Fo6uSs6WGxhIQfiAHpT5YwZ+T0A3eo0+A3MjOJU24nV16UlyJtICrsyoHtp286HKBIMniCCyDzZTSFeGsVTmkskykIPEUuFOnS5SXU6y0UjJzqPdik7t3KESeWLVqlMpalIWFa1J+73zjyo7IdMozRGKkhRWlOe5R3FM8KYfhsifZc5neO+SPOhdsH9SOkoWL6WbZE6+ux22HMqbZPZAHSqjXp08oJ234w0CxJmME/Ggk7jGK0eHXIR4tkS6rrMIwXDiq+XrJ48zJq8S2jlLmD6VT08CLUSXZtRfJwWTzzVPTQ9g46h55LrvUp39o8T41Xy0AvmS8e8PMOlaXCPAZ2+lVLTRksMbDWKPqT4HErUVWp2A044divvrPboHNYUsINa9epMRxLaC6l9+3OLWlWSgOYBqlo7UsbhkdfCK4JEjj7WSWohQQMIAOwFI/wDE5eZMOXxVJYSIS+PLmEEMBDZP4sU2PwmlPMnkzS+JSfSIx41vmkgyuv8ADWh/D6H6Cfnp+xEf4mu7ydK5jmPAHFFHQ0R6iC9ZayC9cJbww7IcUPAmnRphHpCndN9s081WCCo7+dHtK8R4LJ1K2SPyqwctm1EZ4nKWln/8mqyWkUs8nYdf0qsZI2ae0tQxkk91F6Adh+2W/wB2TzHAFOkdP3aROzPQ2MPcMMXSTZmFrS+pLKjjlEdkml8z4QTSigBcr7JmlZW6oZ6BJIpkKcdmJqUpZIdq1OXJoLWrCj2j1OKK3CgwpdBBTDAuQ5mttjm7pUeiaSpPZwLzwMU1LEMB6IlHLSnIJGKGMW+SlkDOXILWVKbSSe/FXifuFyDWrtJb7waa6kzoqxkhF8eHVIxQulBKxmRujTo+8RQ+FgniJmtUiGpJy0FH0q9svcm5Fm029YBU1pPhmo3Z7k8nsZiHAUeuAfOqc7C9lfsbBbLeR8Svkqq8W1FeHWYuWmHnsuL+tW75lKiDNCrSx0Dys+Yq1qJexHRH0NSrWAMJc1K7hRfMclfLo1LtUlPcnH+qjV8AHp5F02mSRlSQB5b1T1EPQpaeXqZi2fvFQoXeF4BGlMoYWEjJ9abCTkBKCiRuppgpsKW62B4a5GUp7k+NKnZjhDYV55YYZTHgdokKSeqaSpSyNxEiXG9NOJKIzfLGCCTuTTooTJgA9te1M6FvkYLJGgx2lvTCVPkdhI6JpM554GRjjk3mQw2lS9RwBnJ7qWlnga+ADMmuSlnUv7sbpSe6nxhtM0nl5L6oiWU41qfHUnpUak2LwzFl/S8FJ2x3jao45WCOLwS5FwZfjhPLwsq7Rz3UEa3FlKJeJLLkVbL6iUJII8qk4YeURx5MFODUcE1NrIDsmnYNCZQUarBeTLJqYLyX1GqwW2VmoWmUCc9amCi/MWk7KNTCLzgzTJdHRRoXBE3My97eBHbqtkSb2SkyndOcjNC4ILey7j7m29CoRC3szRKeAwFkULriEpsuqQ7+8apQiXuZYulaMKSk+eKvbhkbyZNFIGzaPpQvJFg28xRVvVEZpljW1gk0cHhi2gS4kajWpMzyRtjoSO3jcUMpMuMUSC6tWMn6UOEGR5bq1YQT2fCiikBJsi0wWbo4BVk0MgomTiiDtiqSCZqUatAMoKISrB60WCiuYrxqsFYP/9k="
                                alt="محصول"
                                className="w-48 mx-2 h-24 object-cover rounded-md border-2 border-slate-500"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="input-field w-full">
                        <label className="block font-medium mb-1 flex items-center text-xs">
                          <TiStar className="text-emerald-100" />
                          <span className="text-gray-300 mx-1">
                            عنوان محصول:
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
                    <div className="flex ">
                      <div className="input-field w-full">
                        <label className="block font-medium mb-1 flex items-center text-xs">
                          <TiStar className="text-emerald-100" />
                          <span className="text-gray-300 mx-1">
                            قیمت محصول:
                          </span>
                        </label>
                        <input
                          type="number"
                          value={newProduct_barkfast.price}
                          onChange={(e) =>
                            setNewProduct_barkfast({
                              ...newProduct_barkfast,
                              price: e.target.value,
                            })
                          }
                          className="w-full bg-gray-200 py-1 px-2 mt-3 border border-gray-300 rounded-md outline-gray-100 focus:outline-none focus:border-emerald-400 duration-300"
                        />
                      </div>
                    </div>
                    <div className="input-field">
                      <label className="block  font-medium mb-1 flex items-center text-xs">
                        <TiStar className="text-emerald-100  " />
                        <span className="text-gray-300 mx-1">توضیحات:</span>
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
                          setIsModalOpen_UpdateProducts_brakfast(
                            !isModalOpen_UpdateProducts_brakfast
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
      {/* Modal for DetailsProducts_Admin */}
      {showModalDetailsPro_Admin && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <form onSubmit={handleshowDetailsPro_Admin}>
            <div
              className={`w-full max-w-[650px] max-h-[650px]  m-auto justify-center h-full  bg-slate-700  transition-transform duration-500  ${
                showModalDetailsPro_Admin ? "translate-y-0" : "translate-y-full"
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
                      onClick={() =>
                        setShowModalDetailsPro_Admin(!showModalDetailsPro_Admin)
                      }
                    >
                      <IoCloseSharp className="text-xl duration-500" />
                    </button>
                  </div>
                </div>
                {/* Main Content */}
                <ul className="flex flex-col items-center space-y-8 px-6 font-medium text-lg ">
                  <div className="image">
                    <img
                      src={ImgOlive}
                      alt="img-details"
                      loading="lazy"
                      className="w-80 mt-10 rounded-md bg-slate-800 bg-opacity-50
                      hover:shadow-md hover:shadow-slate-300/50 cursor-pointer duration-500
                      object-cover transition-transform hover:scale-110 "
                    />
                  </div>
                  <div className="title">
                    <h2 className="font-medium text-md text-amber-300 tracking-widest">
                      صبحانه انگلیسی
                    </h2>
                  </div>
                  <div className="description mt-1">
                    <p className="text-justify text-gray-400 w-96 text-md">
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                    </p>
                  </div>
                </ul>
              </nav>
            </div>
          </form>
        </div>
      )}
      <section className="mt-10 px-4  m-auto max-w-[1300px] ">
        <div className="card-header p-2 bg-slate-400  rounded rounded-sm flex items-center justify-between text-sm font-meduim">
          <div className="flex">
            <span className="text-gray-800">داشبورد</span>
            <HiMiniSlash className="text-yellow-700" />
            <span className=" text-emerald-800">محتوای دسته بندی صبحانه</span>
          </div>
          <div>
            <button
              onClick={onBack}
              className="outline-none text-emerald-800 flex items-center text-sm"
            >
              <TbPlayerTrackPrevFilled className="mx-3 text-center " />
              بازگشت به صفحه قبل
            </button>
          </div>
        </div>
        {/* add_Products */}
        <div className="add_Products">
          <button
            onClick={modalOpen_AddProducts_brakfast}
            className="flex items-center mt-5 mb-0 text-gray-50 py-2 px-3 bg-yellow-500 hover:bg-yellow-400 duration-300 text-md rounded-md"
          >
            <TiPlusOutline className="mx-1" />
            افزودن محصول
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-start gap-5 mt-10 pb-10">
          {itemsCategories.map((pro) => {
            return (
              <div
                key={pro.item_id}
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
                  onClick={handleshowDetailsPro_Admin}
                  className="card-content flex justify-between items-center md:flex-row flex-col items-center gap-2   "
                >
                  <div className="images">
                    <img
                      src={pro.image_url}
                      // src="http://192.168.10.23:8000/storage/assets/item_image/image/2NOh9zDiGsmxZvZl9tTXb095CTmTcCxWXrcfFc5E.jpg"
                      alt={pro.title}
                      className="w-24 h-24 object-cover rounded-md scale-100 group-hover:scale-90 duration-500 "
                    />
                  </div>
                  <div className="mx-0">
                    <div className="title">
                      <h2 className="font-medium text-md text-amber-300 tracking-widest">
                        {truncateText(pro.title, 3)}
                      </h2>
                    </div>
                    <div className="description text-gray-300  font-bold group-hover:text-gray-50 text-xs mt-2">
                      <p>{truncateText(pro.description, 4)}</p>
                    </div>
                  </div>
                </div>
                <div className="card-footer flex items-center justify-between mt-6 mx-0">
                  <div className="price">
                    <span className="text-amber-300 font-semibold  group-hover:text-emerald-500 duration-500">
                      {pro.price}
                    </span>
                  </div>
                  <div className="card-icons flex">
                    <button
                      className="delete mx-2"
                      type="submit"
                      onClick={() => handleDelete(pro.item_id)}
                    >
                      <RiDeleteBin5Line className="font-bold bg-slate-600 rounded-full h-10 w-10 p-2 text-gray-300 border-2 border-slate-500 hover:text-red-400 hover:border-red-400 hover:shadow-md hover:shadow-slate-500/50 duration-300 cursor-pointer" />
                    </button>
                    <button
                      className="update"
                      type="button"
                      onClick={() => handleUpdate(pro.item_id)}
                    >
                      <GrUpdate className="font-bold bg-slate-600 rounded-full h-10 w-10 p-2 text-gray-300 border-2 border-slate-500 hover:text-emerald-400 hover:border-emerald-400 hover:shadow-md hover:shadow-slate-500/50 duration-300 cursor-pointer" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Breakfast_ProductsAdmin;
