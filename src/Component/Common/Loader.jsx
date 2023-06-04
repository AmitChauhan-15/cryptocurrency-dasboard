import React from "react";

function Loader({ type = "default", size = "3" }) {
  const LoaderType = {
    default: "fa-circle-notch",
    INR: "fa-inr",
    USD: "fa-usd",
    EUR: "fa-eur",
    JPY: "fa-jpy",
  };
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <i className={`fas ${LoaderType[type]} fa-spin fa-${size}x`}></i>
    </div>
  );
}

export default Loader;
