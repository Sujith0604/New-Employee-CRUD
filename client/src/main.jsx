import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Details from "./context/DetailContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Details>
      {" "}
      <App />
    </Details>
  </StrictMode>
);
