import { field_components_type_ids } from "./FieldComponentsConfigs";

export const ANIMATIONS_SLICE_NAME = "animations";

export const ANIMATIONS_STORAGE_KEYS = {
  ANIMATIONS: "animations",
};

export const ANIMATIONS_DEFAULT_STATE = {
  on: true,
  entities: {
    cards: {
      isAnimating: false,
      animationsTypes: [],
    },
    piles: {
      [field_components_type_ids.stocks[0]]: {
        isAnimating: false,
        animationsTypes: [],
      },
    },
  },
};
