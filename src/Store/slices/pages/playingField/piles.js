import { createSlice } from "@reduxjs/toolkit";
import { field_components_type_ids } from "../../../../Configs/FieldComponentsConfigs";
// Генерируем начальное состояние, чтобы в нем были все ID стопок
const initialPilesState = {};
Object.values(field_components_type_ids)
  .flat()
  .forEach((pileId) => {
    initialPilesState[pileId] = { pileTop: 0, pileLeft: 0 };
  });

const initialState = {
  coordinates: initialPilesState,
};

const pilesCoordinatesSlice = createSlice({
  name: "pilesCoordinates",
  initialState,
  reducers: {
    // Экшен для обновления координат всех или части стопок
    setPilesCoordinates(state, action) {
      // Объединяем старые координаты с новыми, которые пришли в payload
      state.coordinates = { ...state.coordinates, ...action.payload };
    },
  },
});

export const { setPilesCoordinates } = pilesCoordinatesSlice.actions;
export default pilesCoordinatesSlice.reducer;
