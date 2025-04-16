import React, { useState, useRef } from "react";

const OTPInput = () => {
  const [otp, setOtp] = useState(new Array(6).fill("")); // حالت اولیه برای 6 مربع
  const inputRefs = useRef([]);

  // مدیریت تغییرات ورودی
  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // اگر مقدار وارد شده وجود داشته باشد، به مربع بعدی بروید
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // مدیریت کلید Backspace

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      // اگر Backspace زده شود و مربع فعلی خالی باشد، به مربع قبلی بروید
      inputRefs.current[index - 1].focus();
    }
  };
  return (
    <div className="flex justify-center space-x-3">
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          ref={(el) => (inputRefs.current[index] = el)} // ذخیره رفرنس هر مربع
          className="w-10 h-10 mx-3 text-center text-md  border border-gray-300 rounded-md focus:outline-none focus:border-amber-300 transition-colors duration-300"
        />
      ))}
    </div>
  );
};

export default OTPInput;
