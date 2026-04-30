import { ANIMATIONS_ON, UI_STORE_KEYS } from "../../../Configs/UIConfigs";
import storage from "../../../utils/Storage";

export const setActivePageId = (state, action) => {
  state.activePageId = action.payload;
  storage.setItem(UI_STORE_KEYS.UI, state);
};
export const setReducedMotion = (state, action) => {
  state.reducedMotion = action.payload;
  storage.setItem(UI_STORE_KEYS.UI, state);
};

export const addUpPointsByCardId = (state, action) => {
  const { cardId, data } = action.payload;
  state.upPoints[cardId] = data;
  storage.setItem(UI_STORE_KEYS.UI, state);
};

export const removeUpPointsByCardId = (state, action) => {
  const { cardId } = action.payload;
  delete state.upPoints[cardId];
  storage.setItem(UI_STORE_KEYS.UI, state);
};

export const openRestartModal = (state) => {
  state.isRestartModalOpen = true;
  storage.setItem(UI_STORE_KEYS.UI, state);
};
export const closeRestartModal = (state) => {
  state.isRestartModalOpen = false;
  storage.setItem(UI_STORE_KEYS.UI, state);
};

export const openGameRulesModal = (state) => {
  state.isGameRulesModalOpen = true;
  storage.setItem(UI_STORE_KEYS.UI, state);
};
export const closeGameRulesModal = (state) => {
  state.isGameRulesModalOpen = false;
  storage.setItem(UI_STORE_KEYS.UI, state);
};

export const setIsCollectCardsBtnVisible = (state, action) => {
  state.isCollectCardsBtnVisible = action.payload;
  storage.setItem(UI_STORE_KEYS.UI, state);
};

export const setActivePFModalId = (state, action) => {
  state.activePFModalId = action.payload;
  storage.setItem(UI_STORE_KEYS.UI, state);
};

export const resetActivePFModalId = (state) => {
  state.activePFModalId = null;
  storage.setItem(UI_STORE_KEYS.UI, state);
};

export const showPFModalById = (state, action) => {
  const { id } = action.payload;
  state.p_f_modalsIds[id] = true;
  storage.setItem(UI_STORE_KEYS.UI, state);
};

export const hidePFModalById = (state, action) => {
  const { id } = action.payload;
  state.p_f_modalsIds[id] = false;
  storage.setItem(UI_STORE_KEYS.UI, state);
};

export const addNotification = (state, action) => {
  const { id, params } = action.payload;
  state.notifications.queue.push({ id, params, createdAt: Date.now() });
  storage.setItem(UI_STORE_KEYS.UI, state);
};
export const showNextNotification = (state) => {
  if (state.notifications.queue.length > 0) {
    state.notifications.active = state.notifications.queue.shift();
  } else {
    state.notifications.active = null;
  }
  storage.setItem(UI_STORE_KEYS.UI, state);
};
export const clearCurrentNotification = (state) => {
  state.notifications.active = null;
  storage.setItem(UI_STORE_KEYS.UI, state);
};

export const clearNotificationsQueue = (state) => {
  state.notifications.queue = [];
  storage.setItem(UI_STORE_KEYS.UI, state);
};

export const updateActiveNotification = (state, action) => {
  const { id, params } = action.payload;
  const active = state.notifications.active;
  if (active && active.id === id) {
    active.params = params;
  }
  storage.setItem(UI_STORE_KEYS.UI, state);
};

export const reducers = {
  setActivePageId,
  setReducedMotion,
  addUpPointsByCardId,
  removeUpPointsByCardId,
  openRestartModal,
  closeRestartModal,
  openGameRulesModal,
  closeGameRulesModal,
  setActivePFModalId,
  resetActivePFModalId,
  showPFModalById,
  hidePFModalById,
  setIsCollectCardsBtnVisible,
  addNotification,
  showNextNotification,
  clearCurrentNotification,
  clearNotificationsQueue,
};
