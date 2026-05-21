import "./NeedByRedeals.css";
import { ButtonGroup, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectIsShowPFModalById } from "../../../Store/slices/ui/selectors";
import { P_F_MODALS_IDS } from "../../../Configs/UIConfigs";
import { span_text } from "../../../Configs/FieldComponentsConfigs";
import { useTranslation } from "react-i18next";
import {
  hidePFModalById,
  setIsNeedByRedealsShowing,
} from "../../../Store/slices/ui/slice";
import { decrementRedeals, endedGame } from "../../../Store/slices/game/slice";
import { GAME_STATUSES } from "../../../Configs/GameConfigs";
import { selectSettingsByType } from "../../../Store/slices/settings/selectors";
import { gameSettingsTypes } from "../../../Configs/SettingsConfigs";
import { AudioName, playSound } from "../../../Services/soundService";

function NeedByRedeals() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isNeedByRedealsModalShow = useSelector((state) =>
    selectIsShowPFModalById(state, P_F_MODALS_IDS.NEED_BY_REDEALS),
  );

  const isSoundsEnabled = useSelector((state) =>
    selectSettingsByType(state, gameSettingsTypes.soundsEffects),
  ).value;

  const onClickByRedeals = () => {
    dispatch(setIsNeedByRedealsShowing(false));
    dispatch(hidePFModalById({ id: P_F_MODALS_IDS.NEED_BY_REDEALS }));
    dispatch(decrementRedeals());
  };

  const onClickGameFinish = () => {
    console.log("ocClickGameFinish");
    dispatch(setIsNeedByRedealsShowing(false));
    dispatch(hidePFModalById({ id: P_F_MODALS_IDS.NEED_BY_REDEALS }));
    playSound(AudioName.GAME_OVER, isSoundsEnabled);
    dispatch(endedGame({ status: GAME_STATUSES.GAME_OVER }));
  };

  return (
    <Modal
      show={isNeedByRedealsModalShow}
      centered
      className="need-by-redeals-modal"
    >
      <Modal.Header>
        <Modal.Title>
          {t("needByRedeals.need_by_redeals_finish_game")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t("needByRedeals.need_by_redeals_body")}</p>
      </Modal.Body>
      <Modal.Footer>
        <ButtonGroup>
          <button
            className="need-by-redeals-modal-redeals-btn"
            onClick={onClickByRedeals}
          >
            {span_text.needByRedealsText}
          </button>
          <button
            className="need-by-redeals-modal-finish-btn"
            onClick={onClickGameFinish}
          >
            {t("needByRedeals.need_by_redeals_finish_btn")}
          </button>
        </ButtonGroup>
      </Modal.Footer>
    </Modal>
  );
}

export default NeedByRedeals;
