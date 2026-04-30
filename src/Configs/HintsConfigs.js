import { joinPath } from "../utils/helpers";
import { GAME_MODE_CLASSIC } from "./GameModes";

export const HINTS_SLICE_NAME = "hints";

export const HINTS_STORAGE_KEYS = {
  HINTS: HINTS_SLICE_NAME,
};

export const HINTS_DEFAULT_STATE = {
  usedCounter: 0,
};

export const HINTS_THUNKS = {
  USE: joinPath([HINTS_SLICE_NAME, "use"]),
  SHOW: joinPath([HINTS_SLICE_NAME, "show"]),
};
