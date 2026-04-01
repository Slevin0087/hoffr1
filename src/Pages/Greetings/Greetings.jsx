import "./Greetings.css";
import Button from "react-bootstrap/Button";
import Welcome from "./Components/Greetings/Welcome.jsx";
import InfoBtns from "./Components/Greetings/InfoBtns.jsx";
import GameModes from "./Components/Greetings/GameModes.jsx";
import GameRules from "./Components/GameRules/GameRules.jsx";
import { useGame } from "../../hooks/useGame.js";
import { useState } from "react";
import { PAGES_IDS } from "../../Configs/UIConfigs.js";
import { setShowed } from "../../Store/slices/pages/greetings.js";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setActivePageId } from "../../Store/slices/ui/slice.js";

function Greetings() {
  console.log("в Greetings");
  const { newGame } = useGame();
  const dispatch = useDispatch();
  const [gameRulesShow, setGameRulesShow] = useState(false);
  const currentGameId = useSelector((state) => state.game.currentId);
  const gameStatus = useSelector(
    (state) => state.game.entities[currentGameId].status,
  );
  console.log("gameStatus: ", gameStatus);

  const { t } = useTranslation();

  const handleGameRulesShow = () => {
    setGameRulesShow(true);
  };

  const onClickGamePlay = () => {
    dispatch(setShowed(true));
    dispatch(setActivePageId(PAGES_IDS.PLAYING_FIELD));
    if (gameStatus === "idle" || gameStatus === "new") {
      newGame();
    }
  };

  return (
    <div className="greetings-page">
      {gameRulesShow ? (
        <GameRules onClose={() => setGameRulesShow(false)} />
      ) : (
        <div xs={12} md={10} lg={8} className="greetings-page-content p-4">
          <Welcome />
          <GameModes />
          <InfoBtns handleGameRules={handleGameRulesShow} />
        </div>
      )}
      {/* Кнопки */}
      <div className="d-grid gap-2 mt-1">
        <Button
          className="pages-btn greetings-play-btn"
          variant="primary"
          size="lg"
          onClick={onClickGamePlay}
        >
          {t("greetings.game_play")}
        </Button>

        <Button
          className="pages-btn"
          variant="outline-secondary"
          onClick={() => console.log("Пропустить")}
        >
          Продолжить без изменений
        </Button>
      </div>
    </div>
  );
}

export default Greetings;
