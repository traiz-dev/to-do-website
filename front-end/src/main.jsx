import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Navbar from "../components/navbar/Navbar.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Navbar />
    <App />
  </React.StrictMode>
);
