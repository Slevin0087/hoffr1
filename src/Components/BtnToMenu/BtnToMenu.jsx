import "./BtnToMenu.css";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setActivePageId } from "../../Store/slices/ui/slice";
import { PAGES_IDS } from "../../Configs/UIConfigs";
import { GAME_STATUSES } from "../../Configs/GameConfigs";
import { setGameStatus } from "../../Store/slices/game/slice";
import { useTranslation } from "react-i18next";

function BtnToMenu() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const ariaLable = t("btnToMenu.aria_label");
  const onClickMenu = () => {
    dispatch(setActivePageId(PAGES_IDS.MENU));
    dispatch(setGameStatus(GAME_STATUSES.PAUSED));
  };
  return (
    <Button
      className="btn-to-menu"
      onClick={onClickMenu}
      title={ariaLable}
      aria-label={ariaLable}
    >
      ☰
    </Button>
  );
}

export default BtnToMenu;
