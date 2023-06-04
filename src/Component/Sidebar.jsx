function Sidebar({ cryptocurrencies, active = false, setState }) {
  // Sort cryptocurrencies by market cap in descending order
  const sortedCrypto = cryptocurrencies.sort(
    (a, b) => b.marketCap - a.marketCap
  );

  return (
    <>
      {/* OVERLAY */}
      <div
        className={`${
          active ? "block" : "hidden"
        } absolute top-0 left-0 lg:hidden w-full h-full z-10 bg-black opacity-50`}
        onClick={() => setState((prev) => !prev)}
      ></div>
      <div
        className={`${
          active ? "block" : "hidden"
        } absolute top-0 right-0 lg:relative rounded-l-md bg-white w-full sm:w-96 lg:w-1/4 lg:block lg:rounded-lg p-8 min-h-full overflow-y-auto overflow-x-hidden z-20`}
      >
        <div
          className="block absolute top-3 right-4 lg:hidden hover:scale-110 cursor-pointer"
          onClick={() => setState((prev) => !prev)}
        >
          <i className="fas fa-close mb-4"></i>
        </div>
        <h3 className="font-semibold text-lg mb-4">
          Cryptocurrency by Market Cap
        </h3>
        {sortedCrypto.map((crypto) => (
          <div
            key={crypto.name}
            className="flex justify-between items-center border-b p-4"
          >
            <div className="mr-4">
              <strong className=" text-base font-semibold">
                {crypto.name}
              </strong>
              <p className="text-xs text-gray-500 font-semibold">
                Mkt Cap: {crypto.marketCap}
              </p>
            </div>
            <div className="flex items-center">
              <i
                className={`${
                  crypto.percentChange >= 0
                    ? "text-green-500 border-green-500"
                    : "text-red-500 border-red-500"
                } rounded-full px-2 py-1 mr-1`}
              >
                {crypto.percentChange >= 0 ? "▲" : "▼"}
              </i>
              <p
                className={`text-sm ${
                  crypto.percentChange >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {Math.abs(crypto.percentChange)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Sidebar;
