import { Button } from "react-bootstrap";
import { PAGES_IDS } from "../../../../../../Configs/UIConfigs";
import { useDispatch } from "react-redux";
import { setGameStatus } from "../../../../../../Store/slices/game/slice";
import { GAME_STATUSES } from "../../../../../../Configs/GameConfigs";
import { setActivePageId } from "../../../../../../Store/slices/ui/slice";
import { useTranslation } from "react-i18next";

function Menu() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const ariaLabel = t("playingField.footer_menu");
  const onClickMenu = () => {
    dispatch(setActivePageId(PAGES_IDS.MENU));
    dispatch(setGameStatus(GAME_STATUSES.PAUSED));
  };
  return (
    <div>
      <Button
        className="footer-btn"
        onClick={onClickMenu}
        title={ariaLabel}
        aria-label={ariaLabel}
      >
        ☰
      </Button>
    </div>
  );
}

export default Menu;
