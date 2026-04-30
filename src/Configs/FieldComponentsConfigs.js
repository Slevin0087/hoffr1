import { orientations } from "./UIConfigs";

const wastePortraitConfig = {
  x: 20,
  y: -11.5,
  maxVisibleCards: 3,
};

const wasteLandscapeConfig = {
  x: 20,
  y: -11.5,
  maxVisibleCards: 3,
};

const offsetForWasteCards = {
  [orientations.portrait]: {
    x: wastePortraitConfig.x,
    y: wastePortraitConfig.y,
    maxVisibleCards: wastePortraitConfig.maxVisibleCards,
    maxOverlapCardsX:
      (wastePortraitConfig.maxVisibleCards - 1) * wastePortraitConfig.x,
    maxOverlapCardsY:
      (wastePortraitConfig.maxVisibleCards - 1) * wastePortraitConfig.y,
  },
  [orientations.landscape]: {
    x: wasteLandscapeConfig.x,
    y: wasteLandscapeConfig.y,
    maxVisibleCards: wasteLandscapeConfig.maxVisibleCards,
    maxOverlapCardsX:
      (wasteLandscapeConfig.maxVisibleCards - 1) * wasteLandscapeConfig.x,
    maxOverlapCardsY:
      (wasteLandscapeConfig.maxVisibleCards - 1) * wasteLandscapeConfig.y,
  },
};

export const field_components_names = {
  stock: "stock",
  waste: "waste",
  foundation: "foundation",
  tableau: "tableau",
};

export const field_components_types = {
  stocks: "stocks",
  wastes: "wastes",
  foundations: "foundations",
  tableaus: "tableaus",
};

export const field_components_slice_names = {
  stocks: "stocks",
  wastes: "wastes",
  foundations: "foundations",
  tableaus: "tableaus",
};

export const field_components_type_ids = {
  [field_components_types.stocks]: [`${field_components_names.stock}-0`],
  [field_components_types.wastes]: [`${field_components_names.waste}-0`],
  [field_components_types.foundations]: [
    `${field_components_names.foundation}-0`,
    `${field_components_names.foundation}-1`,
    `${field_components_names.foundation}-2`,
    `${field_components_names.foundation}-3`,
  ],
  [field_components_types.tableaus]: [
    `${field_components_names.tableau}-0`,
    `${field_components_names.tableau}-1`,
    `${field_components_names.tableau}-2`,
    `${field_components_names.tableau}-3`,
    `${field_components_names.tableau}-4`,
    `${field_components_names.tableau}-5`,
    `${field_components_names.tableau}-6`,
  ],
};

export const field_components_keys = {
  STOCKS: "stocks",
  WASTES: "wastes",
  TABLEAUS: "tableaus",
  FOUNDATIONS: "foundations",
};

export const FIELD_COMPONENTS_TYPES = {
  STOCKS: "STOCKS",
  STOCK: "stock",
  WASTES: "WASTES",
  WASTE: "waste",
  FOUNDATIONS: "FOUNDATIONS",
  TABLEAUS: "TABLEAUS",
};

export const span_text = {
  stock: "↺",
  waste: "W",
  foundation: "A",
  tableau: "K",
};

export const field_components_default_state = {
  [field_components_type_ids.stocks[0]]: {
    id: field_components_type_ids.stocks[0],
    overlap: {
      [orientations.portrait]: { x: -0.2, y: -0.2 },
      [orientations.landscape]: { x: -0.2, y: -0.2 },
    },
    type: field_components_types.stocks,
    divisionСoefficient: {
      x: 100,
      y: 100,
    },
  },

  [field_components_type_ids.wastes[0]]: {
    id: field_components_type_ids.wastes[0],
    overlap: {
      [orientations.portrait]: {
        ...offsetForWasteCards.portrait,
      },
      [orientations.landscape]: {
        ...offsetForWasteCards.landscape,
      },
    },
    type: field_components_types.wastes,
    divisionСoefficient: {
      x: 80,
      y: 80,
    },
  },

  [field_components_type_ids.foundations[0]]: {
    id: field_components_type_ids.foundations[0],
    overlap: {
      [orientations.portrait]: {
        x: -1,
        y: -1,
      },
      [orientations.landscape]: {
        x: -0.5,
        y: 0,
      },
    },
    type: field_components_types.foundations,
    divisionСoefficient: { x: null, y: 100 },
  },
  [field_components_type_ids.foundations[1]]: {
    id: field_components_type_ids.foundations[1],
    overlap: {
      [orientations.portrait]: {
        x: -0.25,
        y: -1,
      },
      [orientations.landscape]: {
        x: -0.5,
        y: 0,
      },
    },
    type: field_components_types.foundations,
    divisionСoefficient: { x: null, y: 100 },
  },
  [field_components_type_ids.foundations[2]]: {
    id: field_components_type_ids.foundations[2],
    overlap: {
      [orientations.portrait]: {
        x: 0.25,
        y: -1,
      },
      [orientations.landscape]: {
        x: -0.5,
        y: 0,
      },
    },
    type: field_components_types.foundations,
    divisionСoefficient: { x: null, y: 100 },
  },
  [field_components_type_ids.foundations[3]]: {
    id: field_components_type_ids.foundations[3],
    overlap: {
      [orientations.portrait]: {
        x: 1,
        y: -1,
      },
      [orientations.landscape]: {
        x: -0.5,
        y: 0,
      },
    },
    type: field_components_types.foundations,
    divisionСoefficient: { x: null, y: 100 },
  },
  [field_components_type_ids.tableaus[0]]: {
    id: field_components_type_ids.tableaus[0],
    overlap: {
      [orientations.portrait]: {
        x: -0.5,
        shirtY: 25,
        faceY: 30,
      },
      [orientations.landscape]: {
        x: -0.5,
        shirtY: 15,
        faceY: 20,
      },
    },
    type: field_components_types.tableaus,
    divisionСoefficient: {
      x: null,
      y: 50,
    },
  },
  [field_components_type_ids.tableaus[1]]: {
    id: field_components_type_ids.tableaus[1],
    overlap: {
      [orientations.portrait]: {
        x: -0.25,
        shirtY: 25,
        faceY: 30,
      },
      [orientations.landscape]: {
        x: -0.25,
        shirtY: 15,
        faceY: 20,
      },
    },
    type: field_components_types.tableaus,
    divisionСoefficient: {
      x: null,
      y: 50,
    },
  },
  [field_components_type_ids.tableaus[2]]: {
    id: field_components_type_ids.tableaus[2],
    overlap: {
      [orientations.portrait]: {
        x: -0.1,
        shirtY: 25,
        faceY: 30,
      },
      [orientations.landscape]: {
        x: -0.1,
        shirtY: 15,
        faceY: 20,
      },
    },
    type: field_components_types.tableaus,
    divisionСoefficient: {
      x: null,
      y: 50,
    },
  },
  [field_components_type_ids.tableaus[3]]: {
    id: field_components_type_ids.tableaus[3],
    overlap: {
      [orientations.portrait]: {
        x: 0,
        shirtY: 25,
        faceY: 30,
      },
      [orientations.landscape]: {
        x: 0,
        shirtY: 15,
        faceY: 20,
      },
    },
    type: field_components_types.tableaus,
    divisionСoefficient: {
      x: null,
      y: 50,
    },
  },
  [field_components_type_ids.tableaus[4]]: {
    id: field_components_type_ids.tableaus[4],
    overlap: {
      [orientations.portrait]: {
        x: 0.1,
        shirtY: 25,
        faceY: 30,
      },
      [orientations.landscape]: {
        x: 0.1,
        shirtY: 15,
        faceY: 20,
      },
    },
    type: field_components_types.tableaus,
    divisionСoefficient: {
      x: null,
      y: 50,
    },
  },
  [field_components_type_ids.tableaus[5]]: {
    id: field_components_type_ids.tableaus[5],
    overlap: {
      [orientations.portrait]: {
        x: 0.25,
        shirtY: 25,
        faceY: 30,
      },
      [orientations.landscape]: {
        x: 0.25,
        shirtY: 15,
        faceY: 20,
      },
    },
    type: field_components_types.tableaus,
    divisionСoefficient: {
      x: null,
      y: 50,
    },
  },
  [field_components_type_ids.tableaus[6]]: {
    id: field_components_type_ids.tableaus[6],
    overlap: {
      [orientations.portrait]: {
        x: 0.5,
        shirtY: 25,
        faceY: 30,
      },
      [orientations.landscape]: {
        x: 0.5,
        shirtY: 15,
        faceY: 20,
      },
    },
    type: field_components_types.tableaus,
    divisionСoefficient: {
      x: null,
      y: 50,
    },
  },
};

export const highlightDuration = 3000;

// export const field_components_default_state = {
//   [field_components_types.stocks]: {
//     ids: [field_components_type_ids.stocks],
//     entities: {
//       [field_components_type_ids.stocks]: {
//         id: field_components_type_ids.stocks,
//         overlap: { x: -0.2, y: -0.2 },
//       },
//     },
//   },
//   [field_components_types.wastes]: {
//     ids: [field_components_type_ids.wastes],
//     entities: {
//       [field_components_type_ids.wastes]: {
//         id: field_components_type_ids.wastes,
//         overlap: {
//           ...offsetForWasteCards,
//           maxOverlapCardsX:
//             (offsetForWasteCards.maxVisibleCards - 1) * offsetForWasteCards.x,
//           maxOverlapCardsY:
//             (offsetForWasteCards.maxVisibleCards - 1) * offsetForWasteCards.y,
//         },
//       },
//     },
//   },
//   [field_components_types.foundations]: {
//     ids: field_components_type_ids.foundations,
//     entities: {
//       [field_components_type_ids.foundations[0]]: {
//         id: field_components_type_ids.foundations[0],
//         overlap: { x: 0.2, y: 0.2 },
//       },
//       [field_components_type_ids.foundations[1]]: {
//         id: field_components_type_ids.foundations[1],
//         overlap: { x: 0.2, y: 0.2 },
//       },
//       [field_components_type_ids.foundations[2]]: {
//         id: field_components_type_ids.foundations[2],
//         overlap: { x: 0.2, y: 0.2 },
//       },
//       [field_components_type_ids.foundations[3]]: {
//         id: field_components_type_ids.foundations[3],
//         overlap: { x: 0.2, y: 0.2 },
//       },
//     },
//   },
//   [field_components_types.tableaus]: {
//     ids: field_components_type_ids.tableaus,
//     entities: {
//       [field_components_type_ids.tableaus[0]]: {
//         id: field_components_type_ids.tableaus[0],
//         overlap: { x: 0, y: 25 },
//       },
//       [field_components_type_ids.tableaus[1]]: {
//         id: field_components_type_ids.tableaus[1],
//         overlap: { x: 0, y: 25 },
//       },
//       [field_components_type_ids.tableaus[2]]: {
//         id: field_components_type_ids.tableaus[2],
//         overlap: { x: 0, y: 25 },
//       },
//       [field_components_type_ids.tableaus[3]]: {
//         id: field_components_type_ids.tableaus[3],
//         overlap: { x: 0, y: 25 },
//       },
//       [field_components_type_ids.tableaus[4]]: {
//         id: field_components_type_ids.tableaus[4],
//         overlap: { x: 0, y: 25 },
//       },
//       [field_components_type_ids.tableaus[5]]: {
//         id: field_components_type_ids.tableaus[5],
//         overlap: { x: 0, y: 25 },
//       },
//       [field_components_type_ids.tableaus[6]]: {
//         id: field_components_type_ids.tableaus[6],
//         overlap: { x: 0, y: 25 },
//       },
//     },
//   },
// };
