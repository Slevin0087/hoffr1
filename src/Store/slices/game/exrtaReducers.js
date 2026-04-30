import storage from "../../../utils/Storage";
import { GAME_STATUSES, GAME_STORAGE_KEYS } from "../../../Configs/GameConfigs";
import { hidePFModalById, showPFModalById } from "../ui/slice";
import { P_F_MODALS_IDS } from "../../../Configs/UIConfigs";

export const extraReducers = (builder) => {
  builder.addCase(showPFModalById, (state, action) => {
    if (action.payload.id !== P_F_MODALS_IDS.MENU) return;
    state.status = GAME_STATUSES.PAUSED;
    state.isTimeStarted = false;
    state.isFirstCardsEvent = false;
    storage.setItem(GAME_STORAGE_KEYS.GAME, state);
  });
  builder.addCase(hidePFModalById, (state, action) => {
    if (action.payload.id !== P_F_MODALS_IDS.MENU) return;
    state.status = GAME_STATUSES.READY;
    storage.setItem(GAME_STORAGE_KEYS.GAME, state);
  });
};
