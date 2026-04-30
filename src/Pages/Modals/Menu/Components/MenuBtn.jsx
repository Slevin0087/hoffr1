import "./MenuBtn.css";
import { Button } from "react-bootstrap";
import { useMenuBtns } from "../../../../hooks/useMenuBtns";
import { BUTTONS_IDS } from "../../../../Configs/MenuConfigs";
import { useTranslation } from "react-i18next";

function MenuBtn(props) {
  const { btn, isGameInit } = props;
  const { t } = useTranslation();
  const { onClick } = useMenuBtns();
  const btnText = t(`menu.${btn.text}`);
  return (
    <>
      {btn.id === BUTTONS_IDS.CONTINUE_GAME && !isGameInit ? null : (
        <Button
          id={btn.id}
          variant="secondary"
          className="menu_btn"
          onClick={() => onClick(btn.id)}
          title={t(btnText)}
          aria-label={t(btnText)}
        >
          {t(btnText)}
        </Button>
      )}
    </>
  );
}

export default MenuBtn;
