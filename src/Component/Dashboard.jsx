import React, { useState } from "react";
import Dropdown from "./Common/Dropdown";
import Input from "./Common/Input";
import Button from "./Common/Button";

function Dashboard() {
  // eslint-disable-next-line
  const [currencyOption, setCurrencyOption] = useState("");

  return (
    <div className="h-full min-h-fit w-full lg:w-3/4 lg:pr-6 pb overflow-auto">
      <div className="flex items-start">
        <Dropdown
          custClass="w-36 h-14"
          options={["USD", "INR", "EUR"]}
          setState={setCurrencyOption}
        />
        <Input
          placeholder={"Search by coin"}
          variant="search"
          custClass="ml-4"
        />
      </div>
      <div className="w-full min-h-fit py-3 px-4 bg-white rounded-md mt-4">
        <div className="flex justify-end">
          <div className="flex mr-6">
            <Button variant="white" child="1D" />
            <Button variant="white" child="1W" />
            <Button variant="white" child="1M" />
            <Button variant="white" child="6M" />
            <Button variant="white" child="1Y" />
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
        <div className="flex w-full justify-center mt-4">
          <div className="w-full h-72 bg-slate-200"></div>
        </div>
      </div>
      <div className="w-full h-fit flex justify-between mt-4">
        <div className="w-1/2 h-hull bg-white py-3 px-4 mr-2 rounded-md">
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold">Portfolio</h1>
            <div className="flex items-center">
              <p className="text-sm text-gray-400">Total Value</p>
              <h2 className="font-semibold ml-2">$1000</h2>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-hull bg-white py-3 px-4 ml-2 rounded-md">
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold">Exchange Coins</h1>
          </div>
          <div className="grid grid-cols-12 gap-y-3 py-4 px-2 items-end">
            <div className="col-span-5">
              <Dropdown
                placeholder="Currency"
                options={["Bitcoin", "Luna", "Etherum"]}
                label="Sell"
                labelClass="text-red-500"
                color="dark"
              />
            </div>
            <div className="col-start-6 col-span-4 ml-6 ">
              <Input label="Enter value" max={4} />
            </div>
            <div className="col-span-5">
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
            <div className="col-start-6 col-span-4 flex justify-center">
              <p className="text-green-500 font-semibold">2300 Eth</p>
            </div>
          </div>
          <div className="flex w-full justify-center">
            <Button child="Exchange" custClass="h-12 mb-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
