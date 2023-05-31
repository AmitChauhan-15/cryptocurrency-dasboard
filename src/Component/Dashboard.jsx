import React, { useState } from "react";
import Dropdown from "./Common/Dropdown";
import Input from "./Common/Input";
import Button from "./Common/Button";

function Dashboard() {
  // eslint-disable-next-line
  const [currencyOption, setCurrencyOption] = useState("");

  return (
    <div className="h-screen w-full lg:w-3/4 pr-6 pb">
      <div className="flex items-start">
        <Dropdown
          custClass="w-36 h-14"
          options={["USD", "INR", "EUR"]}
          setState={setCurrencyOption}
        />
        <Input placeholder={"Search by coin"} variant="search" />
      </div>
      <div className="w-full h-3/6 py-3 px-4 bg-white rounded-md mt-4">
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
      <div className="w-full h-fit py-3 px-4 bg-white rounded-md mt-4"></div>
    </div>
  );
}

export default Dashboard;
