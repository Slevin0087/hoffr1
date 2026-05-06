export const APPEARANCES_SLICE_NAME = "appearances";

export const APPEARANCES_STORAGE_KEYS = {
  APPEARANCES: "appearances",
};

export const APPEARANCES_TYPES = {
  FACES: "faces",
  SHIRTS: "shirts",
  FONS: "fons",
};

export const APPEARANCES_STORAGE_KEYS_BY_TYPE = {
  [APPEARANCES_TYPES.FACES]: "facesAppearances",
  [APPEARANCES_TYPES.SHIRTS]: "shirtsAppearances",
  [APPEARANCES_TYPES.FONS]: "fonsAppearances",
};

export const facesAppearancesIds = {
  classic: "classic",
  classicPro: "classicPro",
};

export const shirtsAppearancesIds = {
  classic: "classic",
  classicPro: "classicPro",
  classicPro2: "classicPro2",
};

export const fonsAppearancesIds = {
  classic: "classic",
  sea: "sea",
  mahogany: "mahogany",
  ice: "ice",
};

const BASE_URL = import.meta.env.BASE_URL;

export const facesAppearancesObj = {
  [facesAppearancesIds.classic]: {
    id: facesAppearancesIds.classic,
    img: {
      path: `${BASE_URL}/faces/faces_classic_mini.png`,
      joker: `${BASE_URL}/faces/faces_classic_joker_mini.png`,
      manyColumns: 13,
      manyLines: 4,
    },
    price: 0,
    styles: "",
  },

  [facesAppearancesIds.classicPro]: {
    id: facesAppearancesIds.classicPro,
    img: {
      path: `${BASE_URL}/faces/faces_classic_pro_mini.png`,
      joker: `${BASE_URL}/faces/faces_classic_pro_joker_mini.png`,
      manyColumns: 13,
      manyLines: 4,
    },
    price: 0,
    styles: "",
  },
};

export const shirtsAppearancesObj = {
  [shirtsAppearancesIds.classic]: {
    id: shirtsAppearancesIds.classic,
    img: {
      path: `${BASE_URL}/shirts/shirts_classic_mini.png`,
      joker: `${BASE_URL}/shirts/shirts_classic_mini.png`,
      manyColumns: 1,
      manyLines: 4,
    },
    price: 0,
    styles: "",
  },
  [shirtsAppearancesIds.classicPro]: {
    id: shirtsAppearancesIds.classicPro,
    img: {
      path: `${BASE_URL}/shirts/shirts_classic_pro_mini.png`,
      joker: `${BASE_URL}/shirts/shirts_classic_mini.png`,
      manyColumns: 1,
      manyLines: 4,
    },
    price: 0,
    styles: "",
  },
  [shirtsAppearancesIds.classicPro2]: {
    id: shirtsAppearancesIds.classicPro2,
    img: {
      path: `${BASE_URL}/shirts/shirts_classic_pro2_mini.png`,
      joker: `${BASE_URL}/shirts/shirts_classic_mini.png`,
      manyColumns: 1,
      manyLines: 4,
    },
    price: 0,
    styles: "",
  },
};

export const fonsAppearancesObj = {
  [fonsAppearancesIds.classic]: {
    id: fonsAppearancesIds.classic,
    img: {
      path: `${BASE_URL}/fons/classic.png`,
    },
    price: 0,
    styles: "",
  },
  [fonsAppearancesIds.sea]: {
    id: fonsAppearancesIds.sea,
    img: {
      path: `${BASE_URL}/fons/sea.png`,
    },
    price: 100,
    styles: "",
  },
  [fonsAppearancesIds.mahogany]: {
    id: fonsAppearancesIds.mahogany,
    img: {
      path: `${BASE_URL}/fons/mahogany.png`,
    },
    price: 100,
    styles: "",
  },
  [fonsAppearancesIds.ice]: {
    id: fonsAppearancesIds.ice,
    img: {
      path: `${BASE_URL}/fons/ice.png`,
    },
    price: 100,
    styles: "",
  },
};

export const facesAppearancesArr = [
  facesAppearancesObj.classic,
  facesAppearancesObj.classicPro,
];

export const shirtsAppearancesArr = [
  shirtsAppearancesObj.classic,
  shirtsAppearancesObj.classicPro,
  shirtsAppearancesObj.classicPro2,
];

export const fonsAppearancesArr = [
  fonsAppearancesObj.classic,
  fonsAppearancesObj.sea,
  fonsAppearancesObj.mahogany,
  fonsAppearancesObj.ice,
];

export const appearancesObjArrs = {
  [APPEARANCES_TYPES.FACES]: [...facesAppearancesArr],
  [APPEARANCES_TYPES.SHIRTS]: [...shirtsAppearancesArr],
  [APPEARANCES_TYPES.FONS]: [...fonsAppearancesArr],
};

export const APPEARANCES_DEFAULT_STATE = {
  [APPEARANCES_TYPES.FACES]: {
    selectedId: facesAppearancesIds.classic,
    ownedsIds: [facesAppearancesIds.classic],
  },
  [APPEARANCES_TYPES.SHIRTS]: {
    selectedId: shirtsAppearancesIds.classic,
    ownedsIds: [shirtsAppearancesIds.classic],
  },
  [APPEARANCES_TYPES.FONS]: {
    selectedId: fonsAppearancesIds.classic,
    ownedsIds: [fonsAppearancesIds.classic],
  },
};
