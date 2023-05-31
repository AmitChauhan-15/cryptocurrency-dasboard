import React, { useState } from "react";
// import Input from "./Component/Common/Input";
// import Button from "./Component/Common/Button";
import Sidebar from "./Component/Sidebar";
import Dropdown from "./Component/Common/Dropdown";
// import Chart from "./Component/Common/Chart";

function App() {
  // const [select, setSelect] = useState([]);

  const options = ["Option 1", "Option 2", "Option 3"];

  const [selectedValue, setSelectedValue] = useState();

  console.log(selectedValue);

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

  // const chartData = {
  //   labels: ["Label 1", "Label 2", "Label 3"],
  //   datasets: [
  //     {
  //       label: "Dataset 1",
  //       data: [10, 20, 30],
  //       backgroundColor: ["rgba(255, 99, 132, 0.2)"],
  //       borderColor: ["rgba(255, 99, 132, 1)"],
  //       borderWidth: 1,
  //       fill: false,
  //     },
  //     {
  //       label: "Dataset 2",
  //       data: [20, 30, 40],
  //       backgroundColor: ["rgba(54, 162, 235, 0.2)"],
  //       borderColor: ["rgba(54, 162, 235, 1)"],
  //       borderWidth: 1,
  //       fill: false,
  //     },
  //   ],
  // };

  return (
    <>
      <div className="bg-gray-200 w-full h-screen flex justify-between p-4">
        {/* <Input
          label={"Enter Value"}
          placeholder={""}
          max={200}
          type={"number"}
        />
        <Button child={"Exchange"} />
        <Input placeholder={"Search by coin"} variant="search" /> */}
        <div className=" w-8/12">
          {/* <Chart data={chartData} type="line" labelY="USD" /> */}
          <Dropdown
            type="multiselect"
            placeholder="Select an option"
            label="Default"
            color="default"
            options={options}
            setState={setSelectedValue}
          />
        </div>
        <Sidebar cryptocurrencies={cryptocurrencies} />
      </div>
    </>
  );
}

export default App;
