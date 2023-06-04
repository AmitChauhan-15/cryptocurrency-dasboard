function Sidebar({ cryptocurrencies }) {
  // Sort cryptocurrencies by market cap in descending order
  const sortedCrypto = cryptocurrencies.sort(
    (a, b) => b.marketCap - a.marketCap
  );

  return (
    <div className=" bg-white w-1/4 hidden lg:block rounded-lg p-8 min-h-full overflow-y-auto overflow-x-hidden">
      <h3 className="font-semibold text-lg mb-4">
        Cryptocurrency by Market Cap
      </h3>
      {sortedCrypto.map((crypto) => (
        <div
          key={crypto.name}
          className="flex justify-between items-center border-b p-4"
        >
          <div className="mr-4">
            <strong className=" text-base font-semibold">{crypto.name}</strong>
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
  );
}

export default Sidebar;
