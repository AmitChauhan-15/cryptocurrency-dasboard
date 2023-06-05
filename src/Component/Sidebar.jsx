import React, { useEffect, useState } from "react";
import Loader from "./Common/Loader";

function Sidebar({ active = false, setState }) {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const sidebarData = async () => {
      const url =
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false&price_change_percentage=24&locale=en";
      try {
        const response = await fetch(url);
        const data = await response.json();
        setCryptoData(data);
        console.log("AJAX CALL", data);
      } catch (error) {
        console.log("ERROR", error);
      }
    };
    cryptoData.length === 0 && sidebarData();

    //eslint-disable-next-line
  }, []);

  return (
    <>
      {/* OVERLAY */}
      <div
        className={`${
          active ? "block" : "hidden"
        } absolute top-0 left-0 xl:hidden w-full h-full z-10 bg-black opacity-50`}
        onClick={() => setState((prev) => !prev)}
      ></div>
      <div
        className={`${
          active ? "block" : "hidden"
        } absolute top-0 right-0 xl:relative rounded-l-md bg-white w-full h-screen xl:h-[calc(100vh-32px)] sm:w-96 xl:w-1/4 xl:block xl:rounded-lg p-6 xl:p-8 overflow-hidden z-20`}
      >
        <div
          className="block absolute top-3 right-4 xl:hidden hover:scale-110 cursor-pointer"
          onClick={() => setState((prev) => !prev)}
        >
          <i className="fas fa-close mb-4"></i>
        </div>
        <h3 className="font-semibold text-lg mb-4">
          Cryptocurrency by Market Cap
        </h3>
        <div className="relative h-full py-5 overflow-y-auto custom-scrollbar">
          {cryptoData.length > 0 &&
            cryptoData.map((crypto) => (
              <div
                key={crypto.name}
                className="flex justify-around items-center border-b py-4"
              >
                <div className="mr-4">
                  <strong className="text-base font-semibold">
                    {crypto.name}
                  </strong>
                  <p className="text-xs text-gray-500 font-semibold">
                    Mkt Cap: ${crypto.market_cap}
                  </p>
                </div>
                <div className="flex items-center">
                  <i
                    className={`${
                      crypto.price_change_percentage_24h >= 0
                        ? "text-green-500 border-green-500"
                        : "text-red-500 border-red-500"
                    } rounded-full px-2 py-1 mr-1`}
                  >
                    {crypto.price_change_percentage_24h >= 0 ? "▲" : "▼"}
                  </i>
                  <p
                    className={`text-sm ${
                      crypto.price_change_percentage_24h >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
