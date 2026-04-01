import "./App.css";
import ShowActivePage from "../Components/ShowActivePage.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { PAGES_IDS } from "../Configs/UIConfigs.js";
import { GAME_STATUSES } from "../Configs/GameConfigs.js";
import { useFullscreen, useToggle } from "react-use";
import { setActivePageId, setReducedMotion } from "../Store/slices/ui/slice.js";

function App() {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [show, toggle] = useToggle(false);
  const isFullscreen = useFullscreen(ref, show, {
    onClose: () => toggle(false),
  });
  const gameStatus = useSelector((state) => state.game.status);
  const activePageId = useSelector((state) => state.ui.activePageId);
  const prefersReducedMotion = useReducedMotion();
  useEffect(() => {
    dispatch(setReducedMotion(prefersReducedMotion));
    if (gameStatus === GAME_STATUSES.INIT) {
      dispatch(setActivePageId(PAGES_IDS.PLAYING_FIELD));
    }
  }, [dispatch, gameStatus, prefersReducedMotion]);
  return (
    <div
      ref={ref}
      style={{ backgroundColor: "white", width: "100%", height: "100%" }}
    >
      <button
        style={{
          position: "absolute",
          top: "100px",
          right: "10px",
          width: "100px",
          height: "50px",
          backgroundColor: "red",
          margin: "10px",
          color: "black",
        }}
        onClick={() => toggle()}
      >
        {isFullscreen ? "__" : "[ ]"}
      </button>
      <ShowActivePage activePageId={activePageId} />
    </div>
  );
}

export default App;
