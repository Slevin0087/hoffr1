import "./NeedByShuffle.css";
import { ButtonGroup, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { P_F_MODALS_IDS } from "../../../Configs/UIConfigs";
import { selectIsShowPFModalById } from "../../../Store/slices/ui/selectors";
import { selectStockId } from "../../../Store/slices/decks/selectors";
import { handleShuffle } from "../../../Store/slices/game/thunks";
import { hidePFModalById } from "../../../Store/slices/ui/slice";
import { decrementShuffle, endedGame } from "../../../Store/slices/game/slice";
import { GAME_STATUSES } from "../../../Configs/GameConfigs";
import { gameSettingsTypes } from "../../../Configs/SettingsConfigs";
import { selectSettingsByType } from "../../../Store/slices/settings/selectors";
import { AudioName, playSound } from "../../../Services/soundService";

function NeedByShuffle() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const stockId = useSelector(selectStockId);
  const isNeedByShuffleModalShow = useSelector((state) =>
    selectIsShowPFModalById(state, P_F_MODALS_IDS.NEED_BY_SHUFFLE),
  );
  const isSoundsEnabled = useSelector((state) =>
    selectSettingsByType(state, gameSettingsTypes.soundsEffects),
  ).value;

  const onClickShuffle = () => {
    dispatch(handleShuffle({ stockId }));
    dispatch(hidePFModalById({ id: P_F_MODALS_IDS.NEED_BY_SHUFFLE }));
    dispatch(decrementShuffle());
  };

  const onClickGameFinish = () => {
    console.log("ocClickGameFinish");
    dispatch(hidePFModalById({ id: P_F_MODALS_IDS.NEED_BY_SHUFFLE }));
    playSound(AudioName.GAME_OVER, isSoundsEnabled);
    dispatch(endedGame({ status: GAME_STATUSES.GAME_OVER }));
  };

  return (
    <Modal
      show={isNeedByShuffleModalShow}
      centered
      className="need-by-shuffle-modal"
    >
      <Modal.Header>
        <Modal.Title>
          {t("needByShuffle.need_by_shuffle_finish_game")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="need-by-shuffle-modal-body-p">
          {t("needByShuffle.need_by_shuffle_body")}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <ButtonGroup>
          <button
            className="need-by-shuffle-modal-shuffle-btn"
            onClick={onClickShuffle}
          >
            🔀
          </button>
          <button
            className="need-by-shuffle-modal-finish-btn"
            onClick={onClickGameFinish}
          >
            {t("needByShuffle.need_by_shuffle_finish_btn")}
          </button>
        </ButtonGroup>
      </Modal.Footer>
    </Modal>
  );
}

export default NeedByShuffle;
