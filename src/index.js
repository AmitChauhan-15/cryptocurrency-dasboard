import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Alert configuration
const options = {
  position: "top center",
  timeout: 5000,
  offset: "30px",
  transition: "fade",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </React.StrictMode>
);
