export const FACES_SLICE_NAME = "faces";

export const FACES_IDS = {
  CLASSIC: "CLASSIC",
  CLASSIC_PRO: "CLASSIC_PRO",
};

export const FACES_STORAGE_KEYS = {
  FACES: "faces",
};

export const FACES_DEFAULT_STATE = {
  activeId: FACES_IDS.CLASSIC_PRO,
};

export const FACES_ITEMS = {
  CLASSIC: {
    id: "CLASSIC",
    img: {
      path: "./src/assets/faces/fackes_classic_mini.png",
      joker: "./src/assets/faces/faces_classic_joker_mini.png",
      manyColumns: 13,
      manyLines: 4,
    },
    styles: "",
  },
  CLASSIC_PRO: {
    id: "CLASSIC_PRO",
    img: {
      path: "./src/assets/faces/faces_classic_pro_mini.png",
      joker: "./src/assets/faces/faces_classic_pro_joker_mini.png",
      manyColumns: 13,
      manyLines: 4,
    },
    styles: "",
  },
};
