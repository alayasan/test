import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import { ChassisConfiguration } from "@tf-front-end/frontendchassis";

// function configureChassis() {
//   const config = new ChassisConfiguration();

//   config.set("LOGIN_ENDPOINT", "http://192.168.10.203:5020/v1/auth/login"); // for testing only
//   console.info("config set");
// }
// console.info("configuring chassis");
// configureChassis();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
