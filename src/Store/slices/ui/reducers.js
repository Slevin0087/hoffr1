import { ANIMATIONS_ON } from "../../../Configs/UIConfigs";

export const setActivePageId = (state, action) => {
  state.activePageId = action.payload;
};
export const setReducedMotion = (state, action) => {
  state.reducedMotion = action.payload;
};

export const addUpPointsByCardId = (state, action) => {
  const { cardId, data } = action.payload;
  state.upPoints[cardId] = data;
};

export const removeUpPointsByCardId = (state, action) => {
  const { cardId } = action.payload;
  delete state.upPoints[cardId];
};

export const openRestartModal = (state) => {
  state.isRestartModalOpen = true;
};
export const closeRestartModal = (state) => {
  state.isRestartModalOpen = false;
};

export const openGameRulesModal = (state) => {
  state.isGameRulesModalOpen = true;
};
export const closeGameRulesModal = (state) => {
  state.isGameRulesModalOpen = false;
};

export const setIsCollectCardsBtnVisible = (state, action) => {
  state.isCollectCardsBtnVisible = action.payload;
};

export const setActivePFModalId = (state, action) => {
  state.activePFModalId = action.payload;
};

export const resetActivePFModalId = (state) => {
  state.activePFModalId = null;
};

export const showPFModalById = (state, action) => {
  const { id } = action.payload;
  state.p_f_modalsIds[id] = true;
};

export const hidePFModalById = (state, action) => {
  const { id } = action.payload;
  state.p_f_modalsIds[id] = false;
};

export const setActiveNotification = (state, action) => {
  console.log('setActiveNotification: ', action.payload);
  const { id, params } = action.payload;
  state.notifications.active = { id, params, createdAt: Date.now() };
};

export const clearCurrentNotification = (state) => {
  state.notifications.active = null;
};

export const updateActiveNotification = (state, action) => {
  const { id, params } = action.payload;
  const active = state.notifications.active;
  if (active && active.id === id) {
    active.params = params;
  }
};

export const setIsNeedByRedealsShowing = (state, action) => {
  state.isNeedByRedealsShowing = action.payload;
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
  clearCurrentNotification,
  updateActiveNotification,
  setActiveNotification,
  setIsNeedByRedealsShowing,
};
