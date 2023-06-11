import React, { useState } from "react";
import Sidebar from "./Component/Sidebar";
import Dashboard from "./Component/Dashboard";
import Loader from "./Component/Common/Loader";

function App() {
  const [sidebarState, setSidebarState] = useState(false);
  const [cryptoCurrencyOption, setCryptoCurrencyOption] = useState(null);
  const [loading] = useState(false);

  return (
    <>
      {loading && <Loader overlay={true} size="6" />}
      <div className="bg-gray-100 w-full min-h-screen flex justify-between p-4 m-0">
        <Dashboard
          sidebarState={setSidebarState}
          cryptoOption={cryptoCurrencyOption}
        />
        <Sidebar
          active={sidebarState}
          setState={setSidebarState}
          cryptoOption={setCryptoCurrencyOption}
        />
      </div>
    </>
  );
}

export default App;
