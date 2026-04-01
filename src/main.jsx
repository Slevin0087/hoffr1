import "./index.css";
import "./utils/i18next.js";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App/App.jsx";
import { store } from "./Store/index.js";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { TouchBackend } from "react-dnd-touch-backend";
// import { isMobile } from "react-device-detect";

// const backend = isMobile ? TouchBackend : HTML5Backend;
// const options = isMobile
//   ? {
//       enableMouseEvents: true,
//       delay: 200,
//       delayTouchStart: 200,
//       touchSlop: 5,
//       ignoreContextMenu: true,
//     }
//   : undefined;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <DndProvider backend={backend} options={options}> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </DndProvider> */}
  </StrictMode>,
);
