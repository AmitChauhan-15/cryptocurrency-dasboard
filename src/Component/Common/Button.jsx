import React from "react";

const Button = ({ child, variant, custClass = "" }) => {
  return (
    <button
      className={`xl:m-2 h-8 sm:h-10 font-medium rounded-md ${custClass} ${
        variant === "white"
          ? "text-sm sm:text-base xl:px-5 py-1 px-3 sm:py-2  bg-gray-100  text-black border-blue-500 hover:bg-gray-100 focus:ring-2 focus:ring-blue-600 focus:text-blue-600 "
          : "text-sm sm:text-base xl:px-4 py-1 px-3 sm:py-0 bg-blue-700 text-white hover:bg-blue-500"
      }`}
    >
      {child}
    </button>
  );
};

export default Button;
