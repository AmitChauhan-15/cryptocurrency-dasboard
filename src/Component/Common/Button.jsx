import React from "react";

const Button = ({ child, variant, custClass = "", active, handleClick }) => {
  return (
    <button
      className={`xl:m-2 h-8 sm:h-10 font-medium rounded-md ${custClass} ${
        variant === "white"
          ? "text-sm sm:text-base text-center xl:px-5 py-1 px-3 sm:py-2  bg-gray-100  text-black hover:bg-gray-200"
          : "text-sm sm:text-base text-center xl:px-4 py-1 px-3 sm:py-0 bg-blue-700 text-white hover:bg-blue-500"
      }
        ${
          active === child
            ? "border-2 border-blue-600 text-blue-600"
            : "border-0"
        } 
        `}
      onClick={handleClick}
    >
      {child}
    </button>
  );
};

export default Button;
