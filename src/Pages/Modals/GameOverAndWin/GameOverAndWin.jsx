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
import { getResultTime } from "../../../utils/gameSliceUtils";
import {
  selectGameCurrentMode,
  selectGameStatus,
} from "../../../Store/slices/game/selectors";
import { gameModesLocals } from "../../../Configs/GameModes";

function GameOverAndWin() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const isShow = useSelector((state) =>
    selectIsShowPFModalById(state, P_F_MODALS_IDS.GAME_OVER_AND_WIN),
  );

  const gameStatus = useSelector(selectGameStatus);
  const currentGameMode = useSelector(selectGameCurrentMode);
  const currentDealing = currentGameMode?.currentDealing;
  const currentTime = currentGameMode[currentDealing].time;
  const isGameOver = gameStatus === GAME_STATUSES.GAME_OVER;
  const isGameWin = gameStatus === GAME_STATUSES.WON;

  const currentPoints = useSelector(selectCurrentPoints);
  const currentMoves = useSelector(selectCurrentMoves);
  const resultTime = getResultTime(currentTime.current);

  // const onHide = () => {
  //   dispatch(hidePFModalById({ id: P_F_MODALS_IDS.GAME_OVER_AND_WIN }));
  // };

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
      // onHide={onHide}
      size="md"
      fullscreen="md-down"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title
          className={isGameOver ? "game-over" : isGameWin ? "game-win" : ""}
        >
          {isGameOver
            ? t("gameOverAndWin.modal_title_game_over")
            : isGameWin
              ? t("gameOverAndWin.modal_title_win")
              : ""}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="game-over-and-win-body-header">
          <div className="game-over-and-win-text">
            <div className="game-over-and-win-text-left">
              {t("gameOverAndWin.game_over_and_win_text_left")}
            </div>
            <div className="game-over-and-win-text-right">
              {t(`gameOverAndWin.${gameModesLocals[currentGameMode.id]}`)}
            </div>
          </div>
          <div className="game-over-and-win-dealing-counter-container">
            <div className="game-over-and-win-dealing-counter-left-text">
              {t("gameOverAndWin.dealing_cards_count")}
            </div>
            <div className="game-over-and-win-dealing-counter-right-text">
              {currentDealing}
            </div>
          </div>
        </div>
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
              👣 {t("gameOverAndWin.moves_state")}
            </span>
            <span className="game-over-and-win-modal-body-state-row-value">
              {currentMoves}
            </span>
          </div>
          <div className="game-over-and-win-modal-body-state-row">
            <span className="game-over-and-win-modal-body-state-row-key">
              ⏱️ {t("gameOverAndWin.time_state")}
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
