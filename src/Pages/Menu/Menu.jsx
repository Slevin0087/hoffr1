import "./Menu.css";
import MenuBtnsContainer from "./Components/MenuBtnsContainer";
import { useTranslation } from "react-i18next";

function Menu() {
  const { t } = useTranslation();
  const h1Text = t("menu.menu_page_h1");
  const ariaLabel = t("menu.game_name");
  return (
    <div className="menu-page">
      <h1 className="menu-page-h1" title={ariaLabel} aria-label={ariaLabel}>
        {h1Text}
      </h1>
      <MenuBtnsContainer />
    </div>
  );
}

export default Menu;
