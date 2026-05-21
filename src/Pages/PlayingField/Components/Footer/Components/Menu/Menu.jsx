import { Button } from "react-bootstrap";
import { P_F_MODALS_IDS, PAGES_IDS } from "../../../../../../Configs/UIConfigs";
import { useDispatch } from "react-redux";
import { GAME_STATUSES } from "../../../../../../Configs/GameConfigs";
import { showPFModalById } from "../../../../../../Store/slices/ui/slice";
import { useTranslation } from "react-i18next";
import FooterBtn from "../FooterBtn";
import { setGameStatus } from "../../../../../../Store/slices/game/slice";

function Menu() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const onClickMenu = () => {
    dispatch(setGameStatus(GAME_STATUSES.PAUSED));
    dispatch(showPFModalById({ id: P_F_MODALS_IDS.MENU }));
  };

  const ariaLabel = t("playingField.footer_menu");

  return (
    <FooterBtn
      variant="warning"
      btnClassName="menu"
      onClick={onClickMenu}
      ariaLabel={ariaLabel}
    >
      ☰
    </FooterBtn>
  );
}

export default Menu;
