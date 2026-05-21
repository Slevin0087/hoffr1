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
  faceClassic: "faceClassic",
  faceClassicPro: "faceClassicPro",
};

export const shirtsAppearancesIds = {
  shirtClassic: "shirtClassic",
  shirtClassicPro: "shirtClassicPro",
  shirtClassicPro2: "shirtClassicPro2",
};

export const fonsAppearancesIds = {
  fonClassic: "fonClassic",
  fonSea: "fonSea",
  fonMahogany: "fonMahogany",
  fonIce: "fonIce",
};

const BASE_URL = import.meta.env.BASE_URL;

export const facesAppearancesObj = {
  [facesAppearancesIds.faceClassic]: {
    id: facesAppearancesIds.faceClassic,
    type: APPEARANCES_TYPES.FACES,
    img: {
      path: `${BASE_URL}/faces/faces_classic_mini.png`,
      joker: `${BASE_URL}/faces/faces_classic_joker_mini.png`,
      manyColumns: 13,
      manyLines: 4,
    },
    requiredPoints: 0,
    styles: "",
  },

  [facesAppearancesIds.faceClassicPro]: {
    id: facesAppearancesIds.faceClassicPro,
    type: APPEARANCES_TYPES.FACES,
    img: {
      path: `${BASE_URL}/faces/faces_classic_pro_mini.png`,
      joker: `${BASE_URL}/faces/faces_classic_pro_joker_mini.png`,
      manyColumns: 13,
      manyLines: 4,
    },
    requiredPoints: 500,
    styles: "",
  },
};

export const shirtsAppearancesObj = {
  [shirtsAppearancesIds.shirtClassic]: {
    id: shirtsAppearancesIds.shirtClassic,
    type: APPEARANCES_TYPES.SHIRTS,
    img: {
      path: `${BASE_URL}/shirts/shirts_classic_mini.png`,
      joker: `${BASE_URL}/shirts/shirts_classic_mini.png`,
      manyColumns: 1,
      manyLines: 4,
    },
    requiredPoints: 0,
    styles: "",
  },
  [shirtsAppearancesIds.shirtClassicPro]: {
    id: shirtsAppearancesIds.shirtClassicPro,
    type: APPEARANCES_TYPES.SHIRTS,
    img: {
      path: `${BASE_URL}/shirts/shirts_classic_pro_mini.png`,
      joker: `${BASE_URL}/shirts/shirts_classic_mini.png`,
      manyColumns: 1,
      manyLines: 4,
    },
    requiredPoints: 300,
    styles: "",
  },
  [shirtsAppearancesIds.shirtClassicPro2]: {
    id: shirtsAppearancesIds.shirtClassicPro2,
    type: APPEARANCES_TYPES.SHIRTS,
    img: {
      path: `${BASE_URL}/shirts/shirts_classic_pro2_mini.png`,
      joker: `${BASE_URL}/shirts/shirts_classic_mini.png`,
      manyColumns: 1,
      manyLines: 4,
    },
    requiredPoints: 800,
    styles: "",
  },
};

export const fonsAppearancesObj = {
  [fonsAppearancesIds.fonClassic]: {
    id: fonsAppearancesIds.fonClassic,
    type: APPEARANCES_TYPES.FONS,
    img: {
      path: `${BASE_URL}/fons/classic.png`,
    },
    requiredPoints: 0,
    styles: "",
  },
  [fonsAppearancesIds.fonSea]: {
    id: fonsAppearancesIds.fonSea,
    type: APPEARANCES_TYPES.FONS,
    img: {
      path: `${BASE_URL}/fons/sea.png`,
    },
    requiredPoints: 1000,
    styles: "",
  },
  [fonsAppearancesIds.fonMahogany]: {
    id: fonsAppearancesIds.fonMahogany,
    type: APPEARANCES_TYPES.FONS,
    img: {
      path: `${BASE_URL}/fons/mahogany.png`,
    },
    requiredPoints: 2500,
    styles: "",
  },
  [fonsAppearancesIds.fonIce]: {
    id: fonsAppearancesIds.fonIce,
    type: APPEARANCES_TYPES.FONS,
    img: {
      path: `${BASE_URL}/fons/ice.png`,
    },
    requiredPoints: 5000,
    styles: "",
  },
};

export const facesAppearancesArr = [
  facesAppearancesObj.faceClassic,
  facesAppearancesObj.faceClassicPro,
];

export const shirtsAppearancesArr = [
  shirtsAppearancesObj.shirtClassic,
  shirtsAppearancesObj.shirtClassicPro,
  shirtsAppearancesObj.shirtClassicPro2,
];

export const fonsAppearancesArr = [
  fonsAppearancesObj.fonClassic,
  fonsAppearancesObj.fonSea,
  fonsAppearancesObj.fonMahogany,
  fonsAppearancesObj.fonIce,
];

export const appearancesObjArrs = {
  [APPEARANCES_TYPES.FACES]: [...facesAppearancesArr],
  [APPEARANCES_TYPES.SHIRTS]: [...shirtsAppearancesArr],
  [APPEARANCES_TYPES.FONS]: [...fonsAppearancesArr],
};

export const appearancesObjs = {
  ...facesAppearancesObj,
  ...shirtsAppearancesObj,
  ...fonsAppearancesObj,
};

export const appearancesObj = {
  [APPEARANCES_TYPES.FACES]: facesAppearancesArr,
  [APPEARANCES_TYPES.SHIRTS]: shirtsAppearancesArr,
  [APPEARANCES_TYPES.FONS]: fonsAppearancesArr,
};

export const APPEARANCES_DEFAULT_STATE = {
  [APPEARANCES_TYPES.FACES]: {
    activeId: facesAppearancesIds.faceClassic,
    unlockedsIds: [facesAppearancesIds.faceClassic],
    lockedsIds: [facesAppearancesIds.faceClassicPro],
  },
  [APPEARANCES_TYPES.SHIRTS]: {
    activeId: shirtsAppearancesIds.shirtClassic,
    unlockedsIds: [shirtsAppearancesIds.shirtClassic],
    lockedsIds: [
      shirtsAppearancesIds.shirtClassicPro,
      shirtsAppearancesIds.shirtClassicPro2,
    ],
  },
  [APPEARANCES_TYPES.FONS]: {
    activeId: fonsAppearancesIds.fonClassic,
    unlockedsIds: [fonsAppearancesIds.fonClassic],
    lockedsIds: [
      fonsAppearancesIds.fonSea,
      fonsAppearancesIds.fonMahogany,
      fonsAppearancesIds.fonIce,
    ],
  },
};
