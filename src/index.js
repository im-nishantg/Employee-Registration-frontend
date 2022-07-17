import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import App from "./components/App";
import "bootstrap-icons/font/bootstrap-icons.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
