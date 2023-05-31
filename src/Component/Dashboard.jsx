import React, { useState } from "react";
import Dropdown from "./Common/Dropdown";
import Input from "./Common/Input";

function Dashboard() {
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
    </div>
  );
}

export default Dashboard;
