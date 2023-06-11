import React, { useState, useEffect } from "react";
import Dropdown from "./Common/Dropdown";
import Input from "./Common/Input";
import Button from "./Common/Button";
import Chart from "./Common/Chart";
import Loader from "./Common/Loader";
import moment from "moment/moment";
import Modal from "./Common/Modal";

function Dashboard({ sidebarState, cryptoOption }) {
  // eslint-disable-next-line
  const [currency, setCurrency] = useState("usd");
  const [cryptocurrency, setCryptocurrency] = useState([]);
  const [chartType, setChartType] = useState("");
  const [chartPrice, setChartPrice] = useState([]);
  const [chartLabel, setChartLabel] = useState([]);
  const [timeFrame, setTimeFrame] = useState("1D");
  const [portfolio, setPortfolio] = useState([
    { currency: "Bitcoin", volume: "0.02" },
    { currency: "Tether", volume: "330.05" },
    { currency: "Dogecoin", volume: "1980" },
  ]);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [modal, setModal] = useState(false);
  // date range in UNIX and initial range is 1 day from now
  const [dateRangeUNIX, setDateRangeUNIX] = useState([
    Math.round((new Date().getTime() - 1000 * 60 * 60 * 24) / 1000),
    Math.round(new Date().getTime() / 1000),
  ]);
  const [loading, setLoading] = useState(false);

  // FUNCTION
  const handleTimeFrameChange = (timeFrame) => {
    setTimeFrame(timeFrame);

    let unixTimestemp;
    if (timeFrame === "1D") unixTimestemp = dateRangeUNIX[1] - 24 * 60 * 60;
    if (timeFrame === "1W") unixTimestemp = dateRangeUNIX[1] - 7 * 24 * 60 * 60;
    if (timeFrame === "1M")
      unixTimestemp = dateRangeUNIX[1] - 30 * 24 * 60 * 60;
    if (timeFrame === "6M")
      unixTimestemp = dateRangeUNIX[1] - 6 * 30 * 24 * 60 * 60;
    if (timeFrame === "1Y")
      unixTimestemp = dateRangeUNIX[1] - 365 * 24 * 60 * 60;

    const array = [...dateRangeUNIX];
    array[0] = unixTimestemp;
    setDateRangeUNIX(array);
  };

  const searchByCoin = async (searchString) => {
    const query = searchString.split(" ").join("-");
    const url = `https://api.coingecko.com/api/v3/search?query=${query}`;
    console.log("QUERY ", query);

    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      console.log("searchData", data);
      setSearchData(data?.coins);
      setModal(true);
    } catch (err) {
      console.log("ERROR", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    const getChartData = async (urls) => {
      let label = [];
      let price = [];
      setLoading(true);

      for (const url of urls) {
        try {
          const response = await fetch(url);
          const data = await response.json();

          let dateFormat = "";
          let dateLimit = 0;

          if (timeFrame === "1D") {
            dateFormat = "HH:mm";
            dateLimit = 12;
          }
          if (timeFrame === "1W") {
            dateFormat = "HH:mm DD MMM";
            dateLimit = 7;
          }
          if (timeFrame === "1M") {
            dateFormat = "DD MMM";
            dateLimit = 24;
          }
          if (timeFrame === "6M") {
            dateFormat = "DD MMM YY";
            dateLimit = 15;
          }
          if (timeFrame === "1Y") {
            dateFormat = "MMM YYYY";
            dateLimit = 30;
          }

          label = data?.prices
            ?.map((arr) => moment(arr[0]).format(dateFormat))
            ?.filter((_, i) => i % dateLimit === 0);

          price.push(
            data?.prices
              ?.map((arr) => arr[1])
              ?.filter((_, i) => i % dateLimit === 0)
          );
        } catch (error) {
          console.log("ERROR", error);
        }
      }

      setLoading(false);
      console.log("label", label);

      label.length > 0 && setChartLabel(label);
      price.length > 0 && setChartPrice(price);
    };

    if (cryptoOption && cryptocurrency.length > 0) {
      const addPriceToPortfolio = portfolio.map((obj) => {
        let currentPrice = cryptoOption[`${obj.currency}Price`] * obj.volume;
        obj.price = currentPrice;

        return obj;
      });

      setPortfolio(addPriceToPortfolio);

      const urls = cryptocurrency.map(
        (cc) =>
          `https://api.coingecko.com/api/v3/coins/${cryptoOption[cc]}/market_chart/range?vs_currency=${currency}&from=${dateRangeUNIX[0]}&to=${dateRangeUNIX[1]}`
      );

      getChartData(urls);
    }

    //eslint-disable-next-line
  }, [cryptoOption, dateRangeUNIX, currency, cryptocurrency]);

  return (
    <>
      {loading && <Loader overlay={true} size="6" />}
      <div className="h-full w-full min-h-full xl:w-3/4 xl:pr-4 pb custom-scrollbar overflow-hidden">
        <div className="flex items-start">
          <Dropdown
            custClass="w-20 text-xs h-12 sm:text-base sm:w-36 sm:h-14"
            options={["USD", "INR", "EUR", "JPY"]}
            defaultValue="USD"
            handleChange={(curr) => setCurrency(curr.toLowerCase())}
          />
          <Input
            placeholder={"Search by coin"}
            variant="search"
            custClass="ml-4 mr-4 xl:mr-0"
            state={search}
            setState={setSearch}
            search={searchByCoin}
          />
          <div
            className="flex sm:w-16 justify-center items-center px-3 py-4 sm:py-5 rounded-md bg-white xl:hidden cursor-pointer"
            onClick={() => sidebarState((prev) => !prev)}
          >
            <i className="fas fa-bars"></i>
          </div>
        </div>
        <div className="w-full min-h-fit py-3 px-4 bg-white rounded-md mt-4">
          <div className="flex justify-end">
            <div className="hidden lg:flex mr-0 xl:mr-6">
              {["1D", "1W", "1M", "6M", "1Y"].map((el) => (
                <Button
                  variant="white"
                  child={el}
                  custClass="lg:m-1"
                  active={timeFrame}
                  handleClick={() => handleTimeFrameChange(el)}
                />
              ))}
            </div>
            <div className="flex items-center lg:hidden">
              <Dropdown
                placeholder="1D"
                options={["1D", "1W", "1M", "6M", "1Y"]}
                color="dark"
                custClass="w-46 mr-4 border-0"
                handleChange={handleTimeFrameChange}
              />
            </div>
            <div className="flex ml-1 sm:ml-6">
              <Dropdown
                type="multiselect"
                placeholder="Cryptocurrency"
                options={cryptoOption ? Object.keys(cryptoOption) : []}
                defaultValue="Bitcoin"
                color="dark"
                maxSelection={2}
                custClass="min-w-28 max-w-28 sm:min-w-48 sm:max-w-48 mr-4"
                handleChange={setCryptocurrency}
              />
              <Dropdown
                type="default"
                placeholder="Chart type"
                options={["Line", "Bar"]}
                color="dark"
                custClass="min-w-20 max-w-20 sm:min-w-32 sm:max-w-32 mr-2"
                defaultValue="Line"
                handleChange={setChartType}
              />
            </div>
          </div>
          <div className="flex w-full h-72 justify-center mt-4">
            {chartPrice.length > 0 ? (
              <Chart
                label={chartLabel}
                chartData={chartPrice}
                legend={cryptocurrency}
                type={chartType.toLowerCase()}
              />
            ) : (
              <>
                {!loading && (
                  <div className="w-full h-full flex justify-center items-center">
                    <div className="min-h-fit mr-4">
                      <i className="fa fa-triangle-exclamation fa-4x"></i>
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-sm md:text-lg font-semibold">
                        Error: Failed to retrieve chart data.
                      </h2>
                      <p className="text-xs md:text-base">Data not found!</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="w-full min-h-fit flex flex-col sm:flex-row justify-between mt-4">
          <div className="w-full sm:w-1/2 sm:mb-0 min-h-fit h-72 bg-white py-3 px-4 mr-2 mb-3 rounded-md">
            <div className="flex justify-between mb-3">
              <h1 className="text-base sm:text-lg font-semibold">Portfolio</h1>
              <div className="flex items-center">
                <p className="text-xs sm:text-sm text-gray-400">Total Value</p>
                <h2 className="text-sm sm:text-base font-semibold ml-2">
                  {`$ ${
                    portfolio[0].price
                      ? portfolio
                          .reduce((sum, item) => sum + item.price, 0)
                          .toFixed(2)
                      : 0
                  }`}
                </h2>
              </div>
            </div>
            <div className="flex lg:w-5/6 justify-end h-4/5 p-1">
              <Chart
                type="pie"
                chartData={
                  portfolio[0].price
                    ? [portfolio.map((obj) => obj.price)]
                    : [[300, 500, 200]]
                }
                label={portfolio.map(
                  (obj) => `${obj.currency} (${obj.volume})`
                )}
              />
            </div>
          </div>
          <div className="w-full sm:w-1/2 min-h-fit h-72 bg-white py-3 px-4 sm:ml-2 rounded-md">
            <div className="flex justify-between">
              <h1 className="text-base sm:text-lg font-semibold">
                Exchange Coins
              </h1>
            </div>
            <div className="flex py-4 px-2 items-end">
              <div className="">
                <Dropdown
                  placeholder="Currency"
                  options={portfolio.map((obj) => obj.currency)}
                  label="Sell"
                  labelClass="text-red-500"
                  color="dark"
                  custClass="min-w-28 max-w-28 "
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
                  options={
                    cryptoOption &&
                    Object.keys(cryptoOption).filter(
                      (key) => !key.includes("Price")
                    )
                  }
                  label="Buy"
                  labelClass="text-green-500"
                  color="dark"
                  optionPosition="top"
                  custClass="min-w-28 max-w-28 "
                />
              </div>
              <div className="ml-6">
                <p className="text-sm sm:text-base text-green-500 font-semibold">
                  2300 Eth
                </p>
              </div>
            </div>
            <div className="flex w-full justify-center my-4">
              <Button child="Exchange" custClass="h-12 mb-5" />
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <Modal onClose={() => setModal(false)} header="Result">
          <div className="flex flex-col">
            {searchData.length > 0 ? (
              searchData.map((obj, index) => (
                <div className="flex items-center px-4 py-2 border-b-2 border-gray-300">
                  <div className="flex-grow ml-4">
                    <h2 className="text-lg font-medium">{obj.name}</h2>
                  </div>
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <img
                      src={obj.large}
                      alt="Profile"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full flex flex-col justify-center items-center py-32">
                <div className="min-h-fit mb-4">
                  <i className="fa fa-triangle-exclamation fa-4x"></i>
                </div>
                <p className="text-lg font-semibold">No Coin is found!</p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}

export default Dashboard;
