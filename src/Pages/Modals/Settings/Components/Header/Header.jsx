import "./Header.css";
import BtnToMenu from "../../../../../Components/BtnToMenu/BtnToMenu";
import { useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation();
  const h2Header = t("settings.setting_title");
  return (
    <div className="settings-page-header">
      <BtnToMenu />
      <h2 className="settings-title" title={h2Header} aria-label={h2Header}>
        {h2Header}
      </h2>
    </div>
  );
}

export default Header;
