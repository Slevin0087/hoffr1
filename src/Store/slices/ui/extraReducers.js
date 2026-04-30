import { updatePoints } from "../game/slice";

export const extraReducers = (builder) => {
  builder.addCase(updatePoints, (state, action) => {
    console.log("extraReducers updatePoints action: ", action);
    const { cardId, count, operation } = action.payload;
    state.upPoints[cardId] = { count, operation };
  });
};
