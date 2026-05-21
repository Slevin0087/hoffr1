import "./App.css";
import storage from "../utils/Storage.js";
import ShowActivePage from "../Components/ShowActivePage.jsx";
import { store } from "../Store/index.js";
import { PAGES_IDS } from "../Configs/UIConfigs.js";
import { setGameStatus } from "../Store/slices/game/slice.js";
import { useReducedMotion } from "motion/react";
import { selectGameStatus } from "../Store/slices/game/selectors.js";
import { selectActivePageId } from "../Store/slices/ui/selectors.js";
import { useSelector, useDispatch } from "react-redux";
import { useFullscreen, useToggle } from "react-use";
import { useCallback, useEffect, useRef } from "react";
import { GAME_STATUSES, GAME_STORAGE_KEYS } from "../Configs/GameConfigs.js";
import { setActivePageId, setReducedMotion } from "../Store/slices/ui/slice.js";

const saveAllStoreOnExit = () => {
  const state = store.getState();
  storage.setFullState(state);
};

const disableContextMenu = (e) => e.preventDefault();

const preventTouchMove = (e) => {
  const scrollTop = window.scrollY;
  if (scrollTop === 0 && e.touches.clientY > e.touches[0].clientY) {
    e.preventDefault();
  }
};

function App() {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [show, toggle] = useToggle(false);
  const isFullscreen = useFullscreen(ref, show, {
    onClose: () => toggle(false),
  });
  const gameStatus = useSelector(selectGameStatus);
  const activePageId = useSelector(selectActivePageId);
  const prefersReducedMotion = useReducedMotion();

  const saveGame = useCallback(() => {
      dispatch(setGameStatus(GAME_STATUSES.PAUSED));
    saveAllStoreOnExit();
  }, [dispatch]);

  useEffect(() => {
    dispatch(setReducedMotion(prefersReducedMotion));
    if (gameStatus === GAME_STATUSES.INIT) {
      dispatch(setActivePageId(PAGES_IDS.PLAYING_FIELD));
    }
  }, [dispatch, gameStatus, prefersReducedMotion]);

  useEffect(() => {
    // Отключаем контекстное меню
    document.addEventListener("contextmenu", disableContextMenu);

    // Отключаем pull-to-refresh

    document.addEventListener("touchmove", preventTouchMove, {
      passive: false,
    });

    // Закрытие вкладки/браузера
    window.addEventListener("beforeunload", saveGame);

    // Сворачивание/переключение вкладок (браузер может заморозить вкладку)
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        saveGame();
      }
    });

    // pagehide — для мобильных браузеров и Safari
    window.addEventListener("pagehide", saveGame);

    // online/offline — для дисконнекта
    window.addEventListener("offline", saveGame);

    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
      document.removeEventListener("touchmove", preventTouchMove);

      window.removeEventListener("beforeunload", saveGame);
      document.removeEventListener("visibilitychange", saveGame);
      window.removeEventListener("pagehide", saveGame);
      window.removeEventListener("offline", saveGame);
    };
  }, [saveGame]);

  return (
    <div className="app-page" ref={ref}>
      <button className="fullscreen-btn" onClick={() => toggle()}>
        {isFullscreen ? "__" : "[ ]"}
      </button>
      <ShowActivePage activePageId={activePageId} />
    </div>
  );
}

export default App;
