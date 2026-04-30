import { useTranslation } from "react-i18next";
import { P_F_MODALS_IDS } from "../Configs/UIConfigs";
import { Button, Modal } from "react-bootstrap";

export const usePFModalsTitles = (id) => {
  const { t } = useTranslation();
  switch (id) {
    case P_F_MODALS_IDS.MENU:
      return t("menu.modal_title");
    case P_F_MODALS_IDS.SETTINGS:
      return t("settings.setting_title");
    case P_F_MODALS_IDS.PLAYER_STATS:
      return t("playerStats.title");
    case P_F_MODALS_IDS.SHOP:
      return t("shop.shop_title");
    case P_F_MODALS_IDS.GAME_OVER_AND_WIN:
      return t("gameOverAndWin.modal_title_game_over");
    case P_F_MODALS_IDS.GAME_RULES:
      return t("gameRules.game_rules");
    default:
      return "";
  }
};
