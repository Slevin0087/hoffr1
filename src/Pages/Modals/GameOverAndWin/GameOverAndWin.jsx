import "./GameOverAndWin.css";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { GAME_STATUSES } from "../../../Configs/GameConfigs";
import { P_F_MODALS_IDS } from "../../../Configs/UIConfigs";
import { selectIsShowPFModalById } from "../../../Store/slices/ui/selectors";
import {
  hidePFModalById,
  showPFModalById,
} from "../../../Store/slices/ui/slice";
import { handleGameInit } from "../../../Store/slices/game/thunks";
import { selectCurrentPoints } from "../../../Store/slices/game/selectors/points";
import { selectCurrentMoves } from "../../../Store/slices/game/selectors/moves";
import { selectCurrentTime } from "../../../Store/slices/game/selectors/time";
import { getResultTime } from "../../../utils/gameSliceUtils";
import { selectGameStatus } from "../../../Store/slices/game/selectors";

function GameOverAndWin() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const isShow = useSelector((state) =>
    selectIsShowPFModalById(state, P_F_MODALS_IDS.GAME_OVER_AND_WIN),
  );

  const gameStatus = useSelector(selectGameStatus);
  const isGameOver = gameStatus === GAME_STATUSES.GAME_OVER;
  const isGameWin = gameStatus === GAME_STATUSES.WON;

  const currentPoints = useSelector(selectCurrentPoints);
  const currentMoves = useSelector(selectCurrentMoves);
  const currentTime = useSelector(selectCurrentTime);
  const resultTime = getResultTime(currentTime);

  const onHide = () => {
    dispatch(hidePFModalById({ id: P_F_MODALS_IDS.GAME_OVER_AND_WIN }));
  };

  const handleNewGame = () => {
    dispatch(hidePFModalById({ id: P_F_MODALS_IDS.GAME_OVER_AND_WIN }));
    dispatch(handleGameInit());
  };

  const handleMainMenu = () => {
    dispatch(hidePFModalById({ id: P_F_MODALS_IDS.GAME_OVER_AND_WIN }));
    dispatch(showPFModalById({ id: P_F_MODALS_IDS.MENU }));
  };

  return (
    <Modal
      show={isShow}
      centered
      className="game-over-and-win-modal"
      onHide={onHide}
      size="md"
    >
      <Modal.Header closeButton>
        <Modal.Title
          className={isGameOver ? "game-over" : isGameWin ? "game-win" : ""}
        >
          {t(
            `gameOverAndWin.${isGameOver ? "modal_title_game_over" : isGameWin ? "modal_title_win" : ""}`,
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="game-over-and-win-modal-body-state">
          <div className="game-over-and-win-modal-body-state-row">
            <span className="game-over-and-win-modal-body-state-row-key">
              📊 {t("gameOverAndWin.points_state")}
            </span>
            <span className="game-over-and-win-modal-body-state-row-value">
              {currentPoints}
            </span>
          </div>
          <div className="game-over-and-win-modal-body-state-row">
            <span className="game-over-and-win-modal-body-state-row-key">
              👣 {t("gameOverAndWin.time_state")}
            </span>
            <span className="game-over-and-win-modal-body-state-row-value">
              {currentMoves}
            </span>
          </div>
          <div className="game-over-and-win-modal-body-state-row">
            <span className="game-over-and-win-modal-body-state-row-key">
              ⏱️ {t("gameOverAndWin.moves_state")}
            </span>
            <span className="game-over-and-win-modal-body-state-row-value">
              {resultTime}
            </span>
          </div>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>{t("menu.menu_page_h1")}</Modal.Footer> */}
      <Modal.Footer>
        {/* Кнопки */}
        <div className="game-over-and-win-modal-footer-btns-container">
          <Button
            variant="outline-success"
            className="game-over-and-win-modal-footer-btn"
            onClick={handleNewGame}
          >
            {/* 🎮 {t("gameOverAndWin.new_game_btn")} */}↻
          </Button>
          <Button
            variant="outline-warning"
            className="game-over-and-win-modal-footer-btn"
            onClick={handleMainMenu}
          >
            {/* 🏠 {t("gameOverAndWin.to_menu_btn")} */}☰
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default GameOverAndWin;
