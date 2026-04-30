import { useDispatch } from "react-redux";
import { BUTTONS_IDS } from "../Configs/MenuConfigs";
import { P_F_MODALS_IDS, PAGES_IDS } from "../Configs/UIConfigs";
import { setGameStatus } from "../Store/slices/game/slice";
import { GAME_STATUSES } from "../Configs/GameConfigs";
import {
  hidePFModalById,
  resetActivePFModalId,
  setActivePFModalId,
} from "../Store/slices/ui/slice";
import { handleGameInit } from "../Store/slices/game/thunks";

export const useMenuBtns = () => {
  const dispatch = useDispatch();
  const onClick = (id) => {
    switch (id) {
      case BUTTONS_IDS.NEW_GAME: {
        dispatch(hidePFModalById({ id: P_F_MODALS_IDS.MENU }));
        dispatch(handleGameInit());
        return;
      }
      case BUTTONS_IDS.CONTINUE_GAME: {
        dispatch(resetActivePFModalId());
        dispatch(setGameStatus(GAME_STATUSES.READY));
        return;
      }
      case BUTTONS_IDS.SETTINGS: {
        const modalId = P_F_MODALS_IDS.SETTINGS;
        dispatch(setActivePFModalId(modalId));
        return;
      }
      case BUTTONS_IDS.PLAYER_STATS: {
        const modalId = P_F_MODALS_IDS.PLAYER_STATS;
        dispatch(setActivePFModalId(modalId));
        return;
      }
      case BUTTONS_IDS.SHOP: {
        const modalId = P_F_MODALS_IDS.SHOP;
        dispatch(setActivePFModalId(modalId));
        return;
      }
      case BUTTONS_IDS.GAME_RULES: {
        const modalId = P_F_MODALS_IDS.GAME_RULES;
        dispatch(setActivePFModalId(modalId));
        return;
      }
      default:
        console.log("onClick id default: ", id);
        break;
    }
  };
  return {
    onClick,
  };
};
