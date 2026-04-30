import { scoreOperations } from "../Configs/GameConfigs";

export const getUndoPointsData = (data) => {
  const count = data.count;
  console.log("getUndoPointsData data: ", data);
  const prevOperation = data.operation;
  const operation =
    prevOperation === scoreOperations.increment
      ? scoreOperations.decrement
      : scoreOperations.increment;
  const cardId = data.cardId;
  return { count, operation, cardId };
};

export const addUndoUtil = (state, payload) => {
  const id = `undo-${state.stack.length}`;
  const { type, data } = payload;
  const undo = { id, type, data };
  state.stack.push(undo);
  state.canUndo = state.stack.length > 0;
};

// export const undoClickStockWithRedeal = async (dispatch, payload) => {
//   const { dealeds, flippeds, fromPileId } = payload;
//   for (let i = dealeds.length - 1; i >= 0; i--) {
//     const dealsData = dealeds[i];
//     const isDealUndone = await undoDealCards(dispatch, dealsData);
//     if (!isDealUndone) return false;
//   }
//   if (flippeds?.length) {
//     for (let i = flippeds.length - 1; i >= 0; i--) {
//       const flipsData = flippeds[i];
//       await undoFlipsCards(dispatch, flipsData, fromPileId);
//     }
//   }
//   return true;
// };

// export const undoClickStockNormal = async (dispatch, payload) => {
//   const { dealsData, flipsData, fromPileId } = payload;
//   const isDealUndone = await undoDealCards(dispatch, dealsData);
//   if (!isDealUndone) return false;
//   if (flipsData?.isFlipped) {
//     await undoFlipsCards(dispatch, flipsData, fromPileId);
//   }
//   return true;
// };
