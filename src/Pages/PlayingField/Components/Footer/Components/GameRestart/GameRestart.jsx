import { Button } from "react-bootstrap";
import { useGame } from "../../../../../../hooks/useGame";
import { useSelector } from "react-redux";
import { GAME_STATUSES } from "../../../../../../Configs/GameConfigs";
import { selectGameStatus } from "../../../../../../Store/slices/game/selectors";
import { useTranslation } from "react-i18next";

function GameRestart() {
  const { newGame } = useGame();
  const { t } = useTranslation();
  const ariaLabel = t("playingField.footer_gameRestart");
  const gameStatus = useSelector(selectGameStatus);
  const onClickGamePlay = () => {
    const isInitStatus = gameStatus === GAME_STATUSES.INIT;
    const isPlayingStatus = gameStatus === GAME_STATUSES.PLAYING;
    if (!isInitStatus && !isPlayingStatus) return;
    newGame();
  };
  return (
    <Button
      className="footer-btn"
      onClick={onClickGamePlay}
      title={ariaLabel}
      aria-label={ariaLabel}
    >
      ↻
    </Button>
  );
}

export default GameRestart;
