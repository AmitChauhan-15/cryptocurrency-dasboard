import React from "react";

const Button = ({ child, variant }) => {
  return (
    <button
      className={`m-2 h-10 font-medium rounded-md ${
        variant === "white"
          ? "px-5 py-2  bg-gray-100  text-black border-blue-500 hover:bg-gray-100 focus:ring-2 focus:ring-blue-600 focus:text-blue-600 "
          : "px-4 py-0 bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-600"
      }`}
    >
      {child}
    </button>
  );
};

export default Button;
