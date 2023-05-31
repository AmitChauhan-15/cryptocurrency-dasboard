import React from "react";
import Sidebar from "./Component/Sidebar";
import Dashboard from "./Component/Dashboard";

function App() {
  const cryptocurrencies = [
    {
      name: "Bitcoin",
      marketCap: "$1,012,345,678",
      percentChange: 3.14,
    },
    {
      name: "Ethereum",
      marketCap: "$765,432,109",
      percentChange: -1.23,
    },
    {
      name: "Binance Coin",
      marketCap: "$456,789,012",
      percentChange: 2.45,
    },
    {
      name: "Dogecoin",
      marketCap: "$123,456,789",
      percentChange: -4.56,
    },
  ];

  return (
    <>
      <div className="bg-gray-100 w-full h-screen flex justify-between p-4 overflow-hidden">
        <Dashboard />
        <Sidebar cryptocurrencies={cryptocurrencies} />
      </div>
    </>
  );
}

export default App;
