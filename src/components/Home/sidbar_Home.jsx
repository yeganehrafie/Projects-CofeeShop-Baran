import React from "react";
import Imgbreakfast from "./../../images/breakfast-realistic-style_640137-459_prev_ui.png";
import ImgSuggestion from "./../../images/suggestions_prev_ui.png";
import ImgSalad from "./../../images/salad.png";
import ImgBreak from "./../../images/brakfeast.png";
import ImgTea from "./../../images/teapot-with-design-it-that-says-teapot_1318828-5241_prev_ui.png";
import ImgFood1 from "./../../images/minimalist-chef-hat-utensils-restaurant-logo-icon-illustration-design_1277546-6309_prev_ui.png";
import ImgFood2 from "./../../images/minimalist-chef-hat-utensils-restaurant-logo-icon-illustration-design_1277546-6320_prev_ui.png";
import ImgShaik from "./../../images/chocolate-milk-glyph-solid-black-illustration_120816-10115_prev_ui.png";
import ImgIceCream from "./../../images/cream-soda-glyph-solid-black-illustration_120816-10151_prev_ui.png";
import ImgHot from "./../../images/glyph-hot-tea-cup-coffee-icon-black-silhouette-template-mug-drink-with-steam-element-logo-emblem_222220-341_prev_ui.png";
import Imgjuice from "./../../images/apple-juice-glyph-solid-black-illustration_120816-10153_prev_ui.png";

const Sidbar_Home = ({
  activeComponent_SidbarHom,
  setActiveComponent__SidbarHom,
}) => {
  const categoryProducts_sidbar = [
    { id: 1, imgage: Imgbreakfast, title: "صبحانه", sectionId: "breakfast" },
    {
      id: 2,
      imgage: ImgSuggestion,
      title: "پیشنهادی",
      sectionId: "suggestion",
    },
    { id: 3, imgage: ImgBreak, title: "پیش غذا", sectionId: "appetizer" },
    { id: 4, imgage: ImgSalad, title: "سالاد", sectionId: "salad" },
    {
      id: 5,
      imgage: ImgFood1,
      title: "غذای ایرانی",
      sectionId: "iranian-food",
    },
    { id: 6, imgage: ImgFood2, title: "غذای فرنگی", sectionId: "western-food" },
    { id: 7, imgage: ImgHot, title: "اسپرسو بار", sectionId: "espresso-bar" },
    { id: 9, imgage: ImgTea, title: "چای ", sectionId: "tea" },
    { id: 10, imgage: ImgShaik, title: "شیک", sectionId: "shake" },
    {
      id: 11,
      imgage: ImgIceCream,
      title: " آیس کافی ",
      sectionId: "ice-coffee",
    },
    { id: 12, imgage: Imgjuice, title: "آبمیوه ", sectionId: "juice" },
  ];

  // تابع اسکرول روان
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sidbar_Home z-10 w-full h-full bg-slate-800 bg-opacity-50 text-gray-300 flex flex-col justify-between overflow-y-auto scroll">
      <div className="content-sidbar mt-3 flex flex-col gap-6 items-center pb-4">
        {categoryProducts_sidbar.map((pro) => {
          return (
            <div className="breakfast flex flex-col text-center" key={pro.id}>
              <button
                className={`outline-none bg-transparent ${
                  activeComponent_SidbarHom === pro.sectionId
                    ? "bg-amber-300"
                    : "bg-amber-300 hover:shadow-lg hover:shadow-amber-400/50"
                } w-14 h-14 p-2 rounded-full border-2 border-amber-100 duration-300 hover:shadow-lg hover:shadow-amber-400/50`}
                onClick={() => {
                  setActiveComponent__SidbarHom(pro.sectionId); // تنظیم دسته‌بندی فعال
                  scrollToSection(pro.sectionId); // اسکرول به محتوای مربوطه
                }}
              >
                <img src={pro.imgage} alt={pro.title} loading="lazy" />
              </button>
              <span className="font-bold text-xs tracking-widest text-gray-200 mt-1">
                {pro.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidbar_Home;
