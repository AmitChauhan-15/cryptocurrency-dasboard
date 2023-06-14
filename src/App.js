import React, { useState } from "react";
import Sidebar from "./Component/Sidebar";
import Dashboard from "./Component/Dashboard";

function App() {
  const [sidebarState, setSidebarState] = useState(false);
  const [cryptoCurrencyOption, setCryptoCurrencyOption] = useState(null);

  return (
    <>
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
