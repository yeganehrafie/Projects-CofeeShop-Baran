/**برای پیاده‌سازی فرآیندی که توضیح دادید، باید چند مرحله اصلی را طراحی و پیاده‌سازی کنید. این مراحل شامل تعامل با پایگاه داده (Database)، ارسال شماره تماس به API،
 *  ذخیره در پایگاه داده، ارسال کد تأیید به شماره تماس، و سپس هدایت کاربر به صفحه اصلی است. */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setPhoneNumber, setOtpToken, login } from "./../../stor/store";
import OTPInput from "../otpInput/otp";
import { IoCloseSharp } from "react-icons/io5";

const Login = ({ showModalLogin, handleshowModalLogin }) => {
  const [isCodeVerification, setIsCodeVerification] = useState(false); // State برای مدیریت نمایش فرم‌ها
  const [phoneNumber, setPhoneNumber] = useState(""); // شماره تماس
  const [otpCode, setOtpCode] = useState(""); // کد تأیید
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // استخراج وضعیت کاربر از Redux
  const { otpToken } = useSelector((state) => state.auth);

  // ارسال شماره تماس برای دریافت کد تأیید
  const handleSendOtp = () => {
    if (!/^\d{11}$/.test(phoneNumber) || !phoneNumber.startsWith("09")) {
      setErrorMsg("شماره تماس وارد شده نامعتبر است.");
      return;
    }

    setLoading(true);
    axios
      .post("https://api.atroshida.ir/authentication/login", {
        login: phoneNumber,
      })
      .then((res) => {
        console.log("API Response:", res.data);

        // بررسی وجود token در پاسخ API
        if (!res.data?.data?.token) {
          setErrorMsg("خطا در دریافت توکن. لطفاً دوباره تلاش کنید.");
          return;
        }

        // ذخیره شماره تماس و توکن در Redux
        dispatch(setPhoneNumber(phoneNumber));
        dispatch(setOtpToken(res.data.data.token));

        // تغییر حالت به فرم OTP
        setIsCodeVerification(true);
        setErrorMsg(null);
      })
      .catch((err) => {
        console.error(
          "Error sending OTP:",
          err.response ? err.response.data : err.message
        );
        console.error(
          "HTTP Status Code:",
          err.response ? err.response.status : "No response"
        );

        // مدیریت خطاهای مختلف
        const errorMessage =
          err.response?.data?.message ||
          "خطا در ارسال کد تأیید. لطفاً دوباره تلاش کنید.";
        setErrorMsg(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // تأیید کد
  const handleVerify = () => {
    if (!otpCode.trim() || otpCode.length !== 6) {
      setErrorMsg("کد تأیید باید 6 رقم باشد.");
      return;
    }

    setLoading(true);
    axios
      .post("https://api.atroshida.ir/authentication/verify", {
        token: otpToken,
        code: otpCode,
      })
      .then((response) => {
        console.log("Verification Successful:", response.data);
        dispatch(login()); // لاگین کاربر در Redux
        localStorage.setItem("isLoggedIn", "true"); // ذخیره وضعیت لاگین
        navigate("/"); // هدایت به صفحه اصلی
        handleshowModalLogin(); // بستن مودال
      })
      .catch((error) => {
        console.error(
          "Error verifying code:",
          error.response ? error.response.data : error.message
        );
        setErrorMsg(
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "کد تأیید نادرست است. لطفاً دوباره تلاش کنید."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {/* Modal Login */}
      <div
        className={`fixed z-40 right-20 top-10 flex items-center justify-center transition-opacity duration-500 ${
          showModalLogin ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={handleshowModalLogin}
      >
        {/* Modal Content */}
        <div
          className={`w-96 bg-slate-800 rounded-md shadow-md shadow-slate-400/50 p-6 transition-transform duration-500  ${
            showModalLogin ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors duration-200"
            onClick={handleshowModalLogin}
          >
            <IoCloseSharp className="text-xl text-red-500 hover:text-red-400 duration-500" />
          </button>

          {/* Form Content */}
          <form className="flex flex-col space-y-4">
            {!isCodeVerification ? (
              // فرم اول: ورود شماره تماس
              <div>
                <div className="input-field">
                  <input
                    type="text"
                    placeholder="09102605712"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="max-w-full w-full text-xs text-gray-300 bg-slate-800 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-amber-300 transition-colors duration-300"
                  />
                </div>

                <button
                  type="button"
                  className="mt-5 outline-none max-w-full w-full px-4 py-3 text-gray-50 bg-emerald-600 rounded-md hover:bg-emerald-500 duration-300"
                  onClick={handleSendOtp} // ارسال کد تأیید
                  disabled={loading}
                >
                  {loading ? "در حال ارسال..." : "ارسال کد تأیید"}
                </button>
              </div>
            ) : (
              // فرم دوم: تایید کد
              <div>
                <div className="input-field">
                  <OTPInput length={6} onChange={setOtpCode} />
                </div>
                <button
                  type="button"
                  className="mt-5 outline-none max-w-full w-full px-4 py-3 text-gray-50 bg-emerald-600 rounded-md hover:bg-emerald-500 duration-300"
                  onClick={handleVerify} // تأیید کد
                  disabled={loading}
                >
                  {loading ? "در حال تأیید..." : "تأیید کد"}
                </button>
              </div>
            )}
          </form>

          {/* Error Message */}
          {errorMsg && (
            <p className="mt-4 text-red-500 text-sm text-center">{errorMsg}</p>
          )}
        </div>
      </div>
      {/* End-modal Login */}
    </>
  );
};

export default Login;
