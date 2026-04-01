import { useDispatch } from "react-redux";
import { BUTTONS_IDS } from "../Configs/MenuConfigs";
import { PAGES_IDS } from "../Configs/UIConfigs";
import { useGame } from "./useGame";
import { setGameStatus } from "../Store/slices/game/slice";
import { GAME_STATUSES } from "../Configs/GameConfigs";
import { setActivePageId } from "../Store/slices/ui/slice";

export const useMenuBtns = () => {
  const dispatch = useDispatch();
  const { newGame } = useGame();
  const onClick = (id) => {
    switch (id) {
      case BUTTONS_IDS.NEW_GAME:
        dispatch(setActivePageId(PAGES_IDS.PLAYING_FIELD));
        newGame();
        return;
      case BUTTONS_IDS.CONTINUE_GAME:
        dispatch(setActivePageId(PAGES_IDS.PLAYING_FIELD));
        dispatch(setGameStatus(GAME_STATUSES.PLAYING));
        return;
      case BUTTONS_IDS.SETTINGS:
        dispatch(setActivePageId(PAGES_IDS.SETTINGS));
        return;
      case BUTTONS_IDS.SHOP:
        console.log("onClick id BUTTONS_IDS.SHOP: ", id, BUTTONS_IDS.SHOP);
        dispatch(setActivePageId(PAGES_IDS.SHOP));
        return;
      case BUTTONS_IDS.EXIT:
        console.log("onClick id BUTTONS_IDS.EXIT: ", id, BUTTONS_IDS.EXIT);
        return;
      default:
        console.log("onClick id default: ", id);
        break;
    }
  };
  return {
    onClick,
  };
};
