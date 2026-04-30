import "./index.css";
import "./utils/i18next.js";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App/App.jsx";
import { store } from "./Store/index.js";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
