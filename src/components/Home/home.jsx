import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { RiInstagramFill } from "react-icons/ri";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // مدت زمان انیمیشن (به میلی‌ثانیه)
      once: true, // انیمیشن فقط یک بار اجرا شود
    });
  }, []);
  return (
    <>
      <div className=" h-screen bg-slate-900">
        <div className="flex flex-col justify-center items-center">
          <div className="logo mt-24">
            <div className="flex flex-col items-center gap-y-3 ">
              <p
                data-aos="fade-down"
                data-aos-delay="100"
                className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-600
               text-2xl font-medium tracking-widest uppercase text-md "
              >
                Baran Restaurant
              </p>
              <h1
                data-aos="fade-down"
                data-aos-delay="200"
                className="uppercase bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-200
                font-bold text-3xl    tracking-widest mt-2"
              >
                Making Moments special
              </h1>
            </div>
          </div>
        </div>

        <div className="section_buttons  mt-24">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          <div className="flex items-center justify-between mt-[50px] mb-[50px] ">
            <div className="btn-gallery">
              <Link to="/gallery">
                <button
                  data-aos="fade-left"
                  data-aos-delay="300"
                  className="outline-none rounded-full border-2 border-amber-400 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-200
                 px-10 py-2 text-md tracking-widest font-medium hover:shadow-lg hover:shadow-amber-700/50 duration-500"
                >
                  گالری رستوران باران
                </button>
              </Link>
            </div>
            <div className="btn-home">
              <Link to="/main">
                <button
                  data-aos="fade-right"
                  data-aos-delay="300"
                  className="outline-none rounded-full border-2 border-amber-400 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-200
                  px-10 py-2 text-md tracking-widest  font-medium  hover:shadow-lg hover:shadow-amber-700/50 duration-500"
                >
                  منوی دیجیتال
                </button>
              </Link>
            </div>
          </div>
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        </div>
        <div className="mt-24  text-amber-400 text-justify font-medium  flex items-center justify-center flex-col  text-center">
          <div className="address">
            <p
              className="text-md tracking-wides"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              لورم ایپسوم متن ساختگی با تولید سادگی نا مفهوم از صنعت چاپ
            </p>
          </div>
          <div className="date mt-5">
            <p className="text-md" data-aos="fade-up" data-aos-delay="500">
              همه روزه از 7صبح الی 12 شب
            </p>
          </div>
          <div className="phonNumber mt-5">
            <p className="text-md" data-aos="fade-up" data-aos-delay="600">
              026-998876
            </p>
          </div>
          <div className="socialMedia mt-5">
            <a href="#">
              <RiInstagramFill
                data-aos="fade-up"
                data-aos-delay="700"
                className="text-gray-300 text-xl font-bold h-10 w-10 p-2 text-amber-400 border-2 border-amber-400  rounded-full rounded-full duration-300 hover:shadow-lg hover:shadow-amber-400/50"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
