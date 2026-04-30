import "./RestartGameModal.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { GAME_STATUSES } from "../../../Configs/GameConfigs";
import { hidePFModalById } from "../../../Store/slices/ui/slice";
import { Button, Modal } from "react-bootstrap";
import { selectIsShowPFModalById } from "../../../Store/slices/ui/selectors";
import { P_F_MODALS_IDS } from "../../../Configs/UIConfigs";
import { handleGameInit } from "../../../Store/slices/game/thunks";

function RestartGameModal() {
  const id = P_F_MODALS_IDS.RESTART;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isShow = useSelector((state) => selectIsShowPFModalById(state, id));
  const handleRestartConfirm = () => {
    dispatch(hidePFModalById({ id }));
    dispatch(handleGameInit());
  };
  const onHide = () => {
    dispatch(hidePFModalById({ id }));
  };
  return (
    <Modal
      show={isShow}
      centered
      className="game-restart-modal"
      onHide={onHide}
      // size="sm"
    >
      <Modal.Header>
        <Modal.Title>{t("playingField.game_restart_modal_title")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="game-restart-modal-content">
          {t("playingField.game_restart_modal_cancel_content")}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="game-restart-modal-footer-button confirm"
          onClick={handleRestartConfirm}
        >
          {t("playingField.btn_game_restart_modal_again")}
        </Button>
        <Button
          className="game-restart-modal-footer-button cancel"
          onClick={onHide}
        >
          {t("playingField.btn_game_restart_modal_cancel")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RestartGameModal;
