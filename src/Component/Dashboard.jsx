import React, { useState } from "react";
import Dropdown from "./Common/Dropdown";
import Input from "./Common/Input";
import Button from "./Common/Button";
import Chart from "./Common/Chart";

function Dashboard({ sidebarState }) {
  // eslint-disable-next-line
  const [currencyOption, setCurrencyOption] = useState("");

  return (
    <div className="h-full w-full min-h-full lg:w-3/4 lg:pr-4 pb overflow-auto">
      <div className="flex items-start">
        <Dropdown
          custClass="w-20 text-xs h-12 sm:text-base sm:w-36 sm:h-14"
          options={["USD", "INR", "EUR"]}
          setState={setCurrencyOption}
        />
        <Input
          placeholder={"Search by coin"}
          variant="search"
          custClass="ml-4 mr-4 lg:mr-0"
        />
        <div
          className="flex sm:w-16 justify-center items-center px-3 py-4 sm:py-5 rounded-md bg-white lg:hidden cursor-pointer"
          onClick={() => sidebarState((prev) => !prev)}
        >
          <i className="fas fa-bars"></i>
        </div>
      </div>
      <div className="w-full min-h-fit py-3 px-4 bg-white rounded-md mt-4">
        <div className="flex justify-end">
          <div className="hidden lg:flex mr-0 xl:mr-6">
            <Button variant="white" child="1D" custClass="lg:m-1" />
            <Button variant="white" child="1W" custClass="lg:m-1" />
            <Button variant="white" child="1M" custClass="lg:m-1" />
            <Button variant="white" child="6M" custClass="lg:m-1" />
            <Button variant="white" child="1Y" custClass="lg:m-1" />
            <Button
              variant="white"
              child={<i className="far fa-calendar"></i>}
              custClass="lg:m-1"
            />
          </div>
          <div className="flex items-center lg:hidden">
            <Dropdown
              placeholder="1D"
              options={["1D", "1W", "1M", "6M"]}
              color="dark"
              custClass="w-46 mr-4 border-0"
            />
            <Button
              variant="white"
              child={<i className="far fa-calendar"></i>}
            />
          </div>
          <div className="flex ml-6">
            <Dropdown
              type="multiselect"
              placeholder="Cryptocurrency"
              options={["Ethereum", "Bitcoin", "Dogecoin", "Binance Coin"]}
              color="dark"
              custClass="w-46 mr-4"
            />
            <Dropdown
              type="multiselect"
              placeholder="Chart type"
              options={["Line", "Bar", "Horizontal", "Vertical"]}
              color="dark"
              custClass="w-46 mr-2"
            />
          </div>
        </div>
        <div className="flex w-full h-72 justify-center mt-4">
          {/* <div className="w-full h-72 bg-slate-200"></div> */}
          <Chart
            lable={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
            chartData={[65, 59, 80, 81, 56, 55, 40]}
            legend="Bitcoin"
            type="line"
          />
        </div>
      </div>
      <div className="w-full min-h-fit flex flex-col sm:flex-row justify-between mt-4">
        <div className="w-full sm:w-1/2 sm:mb-0 h-hull bg-white py-3 px-4 mr-2 mb-3 rounded-md">
          <div className="flex justify-between mb-3">
            <h1 className="text-base sm:text-lg font-semibold">Portfolio</h1>
            <div className="flex items-center">
              <p className="text-xs sm:text-sm text-gray-400">Total Value</p>
              <h2 className="text-sm sm:text-base font-semibold ml-2">$1000</h2>
            </div>
          </div>
          <div className="flex lg:w-5/6 justify-start h-60 p-1">
            <Chart
              type="pie"
              chartData={[300, 500, 200]}
              lable={["Bitcoin", "Etherum", "Dogecoin"]}
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2 h-hull bg-white py-3 px-4 sm:ml-2 rounded-md">
          <div className="flex justify-between">
            <h1 className="text-base sm:text-lg font-semibold">
              Exchange Coins
            </h1>
          </div>
          <div className="flex py-4 px-2 items-end">
            <div className="">
              <Dropdown
                placeholder="Currency"
                options={["Bitcoin", "Luna", "Etherum"]}
                label="Sell"
                labelClass="text-red-500"
                color="dark"
              />
            </div>
            <div className="ml-6 ">
              <Input label="Enter value" max={4} />
            </div>
          </div>
          <div className="flex py-4 px-2 items-center">
            <div className="">
              <Dropdown
                placeholder="Currency"
                options={["Bitcoin", "Luna", "Etherum"]}
                label="Buy"
                labelClass="text-green-500"
                color="dark"
                optionPosition="top"
                custClass="w-46"
              />
            </div>
            <div className="ml-6">
              <p className="text-sm sm:text-base text-green-500 font-semibold">
                2300 Eth
              </p>
            </div>
          </div>
          <div className="flex w-full justify-center ">
            <Button child="Exchange" custClass="h-12 mb-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
