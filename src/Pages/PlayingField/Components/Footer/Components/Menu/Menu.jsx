import { Button } from "react-bootstrap";
import { P_F_MODALS_IDS, PAGES_IDS } from "../../../../../../Configs/UIConfigs";
import { useDispatch } from "react-redux";
import { GAME_STATUSES } from "../../../../../../Configs/GameConfigs";
import { showPFModalById } from "../../../../../../Store/slices/ui/slice";
import { useTranslation } from "react-i18next";

const modalId = P_F_MODALS_IDS.MENU;

function Menu() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onClickMenu = () => dispatch(showPFModalById({ id: modalId }));

  const ariaLabel = t("playingField.footer_menu");

  return (
    <Button
      variant="outline-warning"
      className="footer-btn"
      onClick={onClickMenu}
      title={ariaLabel}
      aria-label={ariaLabel}
    >
      ☰
    </Button>
  );
}

export default Menu;
