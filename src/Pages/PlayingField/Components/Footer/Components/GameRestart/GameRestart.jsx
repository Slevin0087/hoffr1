import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { showPFModalById } from "../../../../../../Store/slices/ui/slice";
import { P_F_MODALS_IDS } from "../../../../../../Configs/UIConfigs";
import FooterBtn from "../FooterBtn";

const modalId = P_F_MODALS_IDS.RESTART;

function GameRestart() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onClickGamePlay = () => dispatch(showPFModalById({ id: modalId }));

  const ariaLabel = t("playingField.footer_gameRestart");

  return (
    <FooterBtn
      variant="success"
      btnClassName="game-restart"
      onClick={onClickGamePlay}
      aria-label={ariaLabel}
    >
      ↻
    </FooterBtn>
  );
}

export default GameRestart;
