import React from "react";

function Loader({ type = "default", size = "3", overlay = false }) {
  const LoaderType = {
    default: "fa-circle-notch",
    inr: "fa-inr",
    usd: "fa-usd",
    eur: "fa-eur",
    jpy: "fa-jpy",
  };
  return (
    <>
      {overlay && (
        <div className="absolute top-0 left-0 h-screen w-screen bg-black opacity-25 z-40"></div>
      )}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <i className={`fas ${LoaderType[type]} fa-spin fa-${size}x`}></i>
      </div>
    </>
  );
}

export default Loader;
