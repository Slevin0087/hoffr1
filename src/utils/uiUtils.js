import { P_F_MODALS_IDS } from "../Configs/UIConfigs";

export const getPFModalTitleById = (id) => {
    switch (id) {
        case P_F_MODALS_IDS.RESTART:
            return "Restart";
        case "game-rules-modal":
            return "Game rules";
        case "menu-modal":
            return "Menu";
        case "settings-modal":
            return "Settings";
        case "player-stats":
            return "Player stats";
        case "shop-modal":
            return "Shop";
        case "game-over-and-win-modal":
            return "Game over";
        default:
            return "";
    }
};