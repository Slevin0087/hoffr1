import { createSelector } from "@reduxjs/toolkit";

export const selectActivePageId = (state) => state.ui.activePageId;

export const selectReducedMotion = (state) => state.ui.reducedMotion;

export const selectUpPoints = (state) => state.ui.upPoints;

export const selectActivePFModalId = (state) => state.ui.activePFModalId;

export const selectPFModalsIds = (state) => state.ui.p_f_modalsIds;

export const selectNotificationsState = (state) => state.ui.notifications;

export const selectIsShowPFModalById = createSelector(
  [(state) => selectPFModalsIds(state), (_, modalId) => modalId],
  (modals, modalId) => modals?.[modalId],
);
export const selectIsCollectCardsBtnVisible = (state) =>
  state.ui.isCollectCardsBtnVisible;

export const selectCurrentUpPointsByCardId = createSelector(
  [(state) => selectUpPoints(state), (_, cardId) => cardId],
  (upPoints, cardId) => {
    const cardUpPoints = upPoints?.[cardId];
    if (!cardUpPoints) return { count: 0, operation: null };
    return {
      count: cardUpPoints.count,
      operation: cardUpPoints.operation,
    };
  },
);

export const selectActiveNotification = createSelector(
  [(state) => selectNotificationsState(state)],
  (notifications) => notifications?.active,
);

export const selectNotificationsQueue = createSelector(
  [(state) => selectNotificationsState(state)],
  (notifications) => notifications?.queue,
);
