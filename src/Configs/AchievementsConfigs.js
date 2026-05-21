import { GAME_MODES_IDS } from "./GameModes.js";

export const ACHIEVEMENTS_SLICE_NAME = "achievements";

export const ACHIEVEMENTS_STORAGE_KEYS = {
  ACHIEVEMENTS: "achievements",
};

export const achievements_start_ids = {
  newbie: "newbie",
};

export const achStateTypes = {
  game: "game",
  deck: "deck",
  lifetime: "lifetime",
  session: "session",
  all: "all",
  mode: "mode",
};

export const currency = {
  SCORE: "score",
  COINS: "coins",
  NONE: "none",
};

export const achievementsTypes = {
  start: "start",
  session: "session",
  win: "win",
  restart_and_win: "restart_and_win",
};

export const achievements_lifes = {
  one: "one",
  many: "many",
};

export const achievements_rarities = {
  common: "common",
  uncommon: "uncommon",
  rare: "rare",
  epic: "epic",
  legendary: "legendary",
};

export const achCheckName = {
  CARDS_TO_FOUNDATION: "cardsToFoundation",
  CARDS_FLIPPED: "cardsFlipped",
};

export const achievements_session_ids = {
  // score_breaker_test: "score_breaker_test",
  // card_flipper_test: "card_flipper_test",
  // foundation_master: "foundation_master",
  score_breaker: "score_breaker",
  // vegas_score_breaker: "vegas_score_breaker",
  // card_flipper: "card_flipper",
  // tableau_cleaner: "tableau_cleaner",
  // foundation_perfect: "foundation_perfect",
  // card_counter: "card_counter",
  // ace_finder: "ace_finder",
  // tableau_tamer: "tableau_tamer",
  // foundation_chain: "foundation_chain",
  //   foundation_master_test: "foundation_master_test",
  //   cards_to_foundation_test: "cards_to_foundation_test",
};

export const achievements_win_ids = {
  first_win: "first_win",
  fast_win: "fast_win",
  // perfect_game: "perfect_game",
  hint_saver: "hint_saver",
  // win_streak: "win_streak",
  undo_avoider: "undo_avoider",
  king_of_cards: "king_of_cards",
  timed_master: "timed_master",
  // expert_challenge: "expert_challenge",
  relaxed_collector: "relaxed_collector",
  // vegas_king: "vegas_king",
  classic_legend: "classic_legend",
  mode_master: "mode_master",
  quick_thinking: "quick_thinking",
  // no_hint_expert: "no_hint_expert",
  // streak_master: "streak_master",
  // early_bird: "early_bird",
  // midnight_gamer: "midnight_gamer",
  hintless_streak: "hintless_streak",
  // perfect_vegas: "perfect_vegas",
};

export const achievements_restart_and_win_ids = {
  persistent_player: "persistent_player",
  veteran_player: "veteran_player",
  // weekend_warrior: "weekend_warrior",
};

export const all_achs_ids_arr = [
  ...Object.values(achievements_start_ids),
  ...Object.values(achievements_session_ids),
  ...Object.values(achievements_win_ids),
  ...Object.values(achievements_restart_and_win_ids),
];

export const default_locked_achs_ids_arr = [
  ...Object.values(achievements_session_ids),
  ...Object.values(achievements_win_ids),
  ...Object.values(achievements_restart_and_win_ids),
];

export const ACHIEVEMENTS_DEFAULT_STATE = {
  activeId: "newbie",
  unlockedIds: [achievements_start_ids.newbie],
  lockedIds: default_locked_achs_ids_arr,
};

export const achievements_start = {
  [achievements_start_ids.newbie]: {
    id: achievements_start_ids.newbie,
    type: "start",
    life: achievements_lifes.one,
    title: "Новичок",
    description: "Сыграть первую игру",
    icon: "👶",
    reward: 0,
    currency: currency.NONE,
    condition: (state) => state.played >= 1,
    rarity: "common",
    hidden: false,
    getProgress: (state) => ({
      current: state.played,
      target: 1,
    }),
  },
};

export const achievements_session = {
  [achievements_session_ids.score_breaker_test]: {
    id: achievements_session_ids.score_breaker_test,
    type: achievementsTypes.session,
    life: achievements_lifes.many,
    title: "Рекордсмен",
    description: "Набрать 30 очков в одной игре",
    icon: "💯",
    reward: 30,
    currency: currency.SCORE,
    condition: (stats) => stats.score >= 2,
    modes: [
      GAME_MODES_IDS.CLASSIC,
      GAME_MODES_IDS.TIMED,
      GAME_MODES_IDS.RELAXED,
      GAME_MODES_IDS.EXPERT,
    ],
    rarity: "rare",
    hidden: false,
  },
  [achievements_session_ids.card_flipper_test]: {
    id: achievements_session_ids.card_flipper_test,
    type: achievementsTypes.session,
    life: achievements_lifes.one,
    title: "Переворачиватель",
    description: "Перевернуть 5 карт",
    icon: "🔄",
    reward: 50,
    currency: currency.SCORE,
    condition: (stats) => stats.cardsFlipped >= 1,
    modes: [
      GAME_MODES_IDS.CLASSIC,
      GAME_MODES_IDS.TIMED,
      GAME_MODES_IDS.RELAXED,
      GAME_MODES_IDS.EXPERT,
    ],
    rarity: "common",
    hidden: false,
    getProgress: (stats) => ({
      current: stats.cardsFlipped,
      target: 100,
    }),
  },

  [achievements_session_ids.foundation_master]: {
    id: achievements_session_ids.foundation_master,
    type: achievementsTypes.session,
    life: achievements_lifes.one,
    title: "Мастер фундаментов",
    description: "Переместить 50 карт в фундаменты",
    icon: "🔼",
    reward: 500,
    currency: currency.SCORE,
    condition: (stats) => stats.cardsToFoundation >= 50,
    modes: [
      GAME_MODES_IDS.CLASSIC,
      GAME_MODES_IDS.TIMED,
      GAME_MODES_IDS.RELAXED,
      GAME_MODES_IDS.EXPERT,
    ],
    rarity: "uncommon",
    hidden: false,
    getProgress: (stats) => ({
      current: stats.cardsToFoundation,
      target: 50,
    }),
  },
  [achievements_session_ids.score_breaker]: {
    id: achievements_session_ids.score_breaker,
    stateType: achStateTypes.session,
    type: achievementsTypes.session,
    life: achievements_lifes.one,
    title: "Рекордсмен",
    description: "Набрать 1000 очков в одной игре",
    icon: "💯",
    reward: 300,
    currency: currency.SCORE,
    condition: (state) => {
      const currentModeId = state.modes[state.currentModeId];
      const currentDealing = currentModeId.currentDealing;
      return currentModeId[currentDealing].points.current >= 1000;
    },
    modes: [
      GAME_MODES_IDS.CLASSIC,
      GAME_MODES_IDS.TIMED,
      GAME_MODES_IDS.EXPERT,
    ],
    rarity: "rare",
    hidden: false,
    getProgress: (state) => {
      const currentMode = state.modes[state.currentModeId];
      const currentDealing = currentMode.currentDealing;
      const current = currentMode[currentDealing].points.current;
      return Math.floor((current / 1000) * 100);
    },
  },
  [achievements_session_ids.vegas_score_breaker]: {
    id: achievements_session_ids.vegas_score_breaker,
    type: achievementsTypes.session,
    life: achievements_lifes.many,
    title: "Вегасский миллионер",
    description: "Набрать 5000 очков в Вегасском режиме",
    icon: "💰",
    reward: 500,
    currency: currency.SCORE,
    condition: (stats) => stats.score >= 5000,
    modes: [GAME_MODES_IDS.VEGAS],
    rarity: "epic",
    hidden: false,
  },
  [achievements_session_ids.card_flipper]: {
    id: achievements_session_ids.card_flipper,
    type: achievementsTypes.session,
    life: achievements_lifes.one,
    title: "Переворачиватель",
    description: "Перевернуть 100 карт",
    icon: "🔄",
    reward: 150,
    currency: currency.SCORE,
    condition: (stats) => stats.cardsFlipped >= 100,
    modes: [
      GAME_MODES_IDS.CLASSIC,
      GAME_MODES_IDS.TIMED,
      GAME_MODES_IDS.RELAXED,
      GAME_MODES_IDS.EXPERT,
    ],
    rarity: "common",
    hidden: false,
    getProgress: (stats) => ({
      current: stats.cardsFlipped,
      target: 100,
    }),
  },
  [achievements_session_ids.tableau_cleaner]: {
    id: achievements_session_ids.tableau_cleaner,
    type: achievementsTypes.session,
    life: achievements_lifes.one,
    title: "Мастер таблоу",
    description: "Переместить 50 карт в таблоу",
    icon: "🔼",
    reward: 500,
    currency: currency.SCORE,
    condition: (stats) => stats.cardsToTableau >= 50,
    modes: [
      GAME_MODES_IDS.CLASSIC,
      GAME_MODES_IDS.TIMED,
      GAME_MODES_IDS.RELAXED,
      GAME_MODES_IDS.EXPERT,
    ],
    rarity: "uncommon",
    hidden: false,
    getProgress: (stats) => ({
      current: stats.cardsToTableau,
      target: 50,
    }),
  },
  [achievements_session_ids.foundation_perfect]: {
    id: achievements_session_ids.foundation_perfect,
    type: achievementsTypes.session,
    life: achievements_lifes.many,
    title: "Безупречный фундамент",
    description: "Переместить все карты в фундаменты за минимальное время",
    icon: "⭐",
    reward: 200,
    currency: currency.SCORE,
    condition: (stats) => stats.perfectFoundationTime <= 600,
    modes: [
      GAME_MODES_IDS.CLASSIC,
      GAME_MODES_IDS.TIMED,
      GAME_MODES_IDS.EXPERT,
    ],
    rarity: "rare",
    hidden: true,
  },
  [achievements_session_ids.card_counter]: {
    id: achievements_session_ids.card_counter,
    type: achievementsTypes.session,
    life: achievements_lifes.one,
    title: "Счетчик карт",
    description: "Переместить 200 карт между таблицами",
    icon: "🔢",
    reward: 250,
    currency: currency.SCORE,
    condition: (stats) => stats.cardsMovedBetweenTableaus >= 200,
    modes: [
      GAME_MODES_IDS.CLASSIC,
      GAME_MODES_IDS.TIMED,
      GAME_MODES_IDS.RELAXED,
      GAME_MODES_IDS.EXPERT,
    ],
    rarity: "uncommon",
    hidden: false,
    getProgress: (stats) => ({
      current: stats.cardsMovedBetweenTableaus || 0,
      target: 200,
    }),
  },
  [achievements_session_ids.ace_finder]: {
    id: achievements_session_ids.ace_finder,
    type: achievementsTypes.session,
    life: achievements_lifes.many,
    title: "Искатель тузов",
    description: "Найти все 4 туза в первые 10 ходов",
    icon: "🃏",
    reward: 100,
    currency: currency.SCORE,
    condition: (stats) => stats.acesFoundEarly >= 1,
    modes: [
      GAME_MODES_IDS.CLASSIC,
      GAME_MODES_IDS.TIMED,
      GAME_MODES_IDS.EXPERT,
    ],
    rarity: "uncommon",
    hidden: true,
    getProgress: (stats) => ({
      current: stats.acesFoundEarly || 0,
      target: 4,
    }),
  },
  [achievements_session_ids.tableau_tamer]: {
    id: achievements_session_ids.tableau_tamer,
    type: achievementsTypes.session,
    life: achievements_lifes.one,
    title: "Укротитель таблиц",
    description: "Очистить все 7 таблиц в одной игре",
    icon: "🎪",
    reward: 300,
    currency: currency.SCORE,
    condition: (stats) => stats.allTableausCleared >= 1,
    modes: [
      GAME_MODES_IDS.CLASSIC,
      GAME_MODES_IDS.TIMED,
      GAME_MODES_IDS.EXPERT,
    ],
    rarity: "epic",
    hidden: false,
  },
  [achievements_session_ids.foundation_chain]: {
    id: achievements_session_ids.foundation_chain,
    stateType: achStateTypes.deck,
    type: achievementsTypes.session,
    life: achievements_lifes.many,
    title: "Цепочка фундаментов",
    description: "Построить полный фундамент (от туза до короля) за 30 секунд",
    icon: "⛓️",
    reward: 150,
    currency: currency.SCORE,
    condition: (stats) => stats.fastFoundationChain >= 1,
    modes: [
      GAME_MODES_IDS.CLASSIC,
      GAME_MODES_IDS.TIMED,
      GAME_MODES_IDS.EXPERT,
    ],
    rarity: "rare",
    hidden: true,
    getProgress: (stats) => ({
      current: stats.fastFoundationChain || 0,
      target: 1,
    }),
  },
};

export const achievements_win = {
  [achievements_win_ids.first_win]: {
    id: achievements_win_ids.first_win,
    stateType: achStateTypes.lifetime,
    type: achievementsTypes.win,
    life: achievements_lifes.one,
    title: "Первая победа",
    description: "Одержать первую победу в игре",
    icon: "🏆",
    reward: 250,
    currency: currency.SCORE,
    condition: (state) => state.wins >= 1,
    modes: [
      GAME_MODES_IDS.CLASSIC,
      GAME_MODES_IDS.VEGAS,
      GAME_MODES_IDS.TIMED,
      GAME_MODES_IDS.EXPERT,
      GAME_MODES_IDS.RELAXED,
    ],
    rarity: "common",
    hidden: false,
    getProgress: (state) => (state.wins >= 1 ? 100 : 0),
  },
  [achievements_win_ids.fast_win]: {
    id: achievements_win_ids.fast_win,
    stateType: achStateTypes.session,
    type: achievementsTypes.win,
    life: achievements_lifes.one,
    title: "Скоростная игра",
    description: "Победить менее чем за 5 минут",
    icon: "⏱️",
    reward: 350,
    currency: currency.SCORE,
    condition: (state) => {
      const currentModeId = state.modes[state.currentModeId];
      const currentDealing = currentModeId.currentDealing;
      const time = currentModeId[currentDealing].time;
      const wins = currentModeId[currentDealing].wins;
      if (wins.total < 1 || wins.time === 0) return false;
      if (time.limit === null) return wins.time <= 300;
      if (time.limit) return time.limit - wins.time <= 300;
    },
    modes: [
      GAME_MODES_IDS.CLASSIC,
      GAME_MODES_IDS.TIMED,
      GAME_MODES_IDS.EXPERT,
      GAME_MODES_IDS.RELAXED,
    ],
    rarity: "uncommon",
    hidden: false,
    getProgress: (state) => {
      const currentModeId = state.modes[state.currentModeId];
      const currentDealing = currentModeId.currentDealing;
      const time = currentModeId[currentDealing].time;
      const wins = currentModeId[currentDealing].wins;
      if (wins.total < 1 || wins.time === 0) return 0;
      if (time.limit === null) return Math.floor((wins.time / 300) * 100);
      if (time.limit) return Math.floor(((time.limit - wins.time) / 300) * 100);
    },
  },
  [achievements_win_ids.perfect_game]: {
    id: achievements_win_ids.perfect_game,
    type: achievementsTypes.win,
    life: achievements_lifes.many,
    title: "Идеальная игра",
    description: "Победить за минимальное количество ходов",
    icon: "✨",
    reward: 5,
    currency: currency.COINS,
    condition: (stats) => stats.moves === stats.minPossibleMoves,
    modes: [
      GAME_MODES_IDS.CLASSIC,
      GAME_MODES_IDS.VEGAS,
      GAME_MODES_IDS.TIMED,
      GAME_MODES_IDS.EXPERT,
      GAME_MODES_IDS.RELAXED,
    ],
    rarity: "rare",
    hidden: true,
    getProgress: (stats) => ({
      current: stats.moves || 0,
      target: stats.minPossibleMoves || 0,
    }),
  },
  [achievements_win_ids.hint_saver]: {
    id: achievements_win_ids.hint_saver,
    stateType: achStateTypes.session,
    type: achievementsTypes.win,
    life: achievements_lifes.one,
    title: "Экономный",
    description: "Победить, не используя подсказки",
    icon: "💡",
    reward: 180,
    currency: currency.SCORE,
    condition: (state) => {
      const currentMode = state.modes[state.currentModeId];
      const currentDealing = currentMode.currentDealing;
      const wins = currentMode[currentDealing].wins;
      return wins.no_hints >= 1;
    },
    modes: [
      GAME_MODES_IDS.CLASSIC,
      GAME_MODES_IDS.TIMED,
      GAME_MODES_IDS.EXPERT,
    ],
    rarity: "rare",
    hidden: true,
    getProgress: (state) => {
      const currentMode = state.modes[state.currentModeId];
      const currentDealing = currentMode.currentDealing;
      const wins = currentMode[currentDealing].wins;
      return wins.no_hints >= 1 ? 100 : 0;
    },
  },
  [achievements_win_ids.win_streak]: {
    id: achievements_win_ids.win_streak,
    stateType: achStateTypes.lifetime,
    type: achievementsTypes.win,
    life: achievements_lifes.one,
    title: "Серия побед",
    description: "Одержать 3 победы подряд",
    icon: "🔥",
    reward: 10,
    currency: currency.COINS,
    condition: (state) => state.wins >= 3,
    modes: [
      GAME_MODES_IDS.CLASSIC,
      GAME_MODES_IDS.VEGAS,
      GAME_MODES_IDS.TIMED,
      GAME_MODES_IDS.EXPERT,
      GAME_MODES_IDS.RELAXED,
    ],
    rarity: "rare",
    hidden: true,
    getProgress: (state) => ({
      current: state.wins || 0,
      target: 3,
    }),
  },
  [achievements_win_ids.undo_avoider]: {
    id: achievements_win_ids.undo_avoider,
    stateType: achStateTypes.session,
    type: achievementsTypes.win,
    life: achievements_lifes.many,
    title: "Решительный",
    description: "Победить, не используя отмену хода",
    icon: "⏮️",
    reward: 200,
    currency: currency.SCORE,
    condition: (state) => {
      const currentMode = state.modes[state.currentModeId];
      const currentDealing = currentMode.currentDealing;
      const wins = currentMode[currentDealing].wins;
      return wins.no_undo >= 1;
    },
    modes: [
      GAME_MODES_IDS.CLASSIC,
      GAME_MODES_IDS.TIMED,
      GAME_MODES_IDS.EXPERT,
    ],
    rarity: "uncommon",
    hidden: true,
    getProgress: (state) => {
      const currentMode = state.modes[state.currentModeId];
      const currentDealing = currentMode.currentDealing;
      const wins = currentMode[currentDealing].wins;
      return wins.no_undo >= 1 ? 100 : 0;
    },
  },
  [achievements_win_ids.king_of_cards]: {
    id: achievements_win_ids.king_of_cards,
    stateType: achStateTypes.lifetime,
    type: achievementsTypes.win,
    life: achievements_lifes.one,
    title: "Король карт",
    description: "Одержать 50 побед",
    icon: "👑",
    reward: 1000,
    currency: currency.SCORE,
    condition: (state) => state.wins >= 50,
    modes: [
      GAME_MODES_IDS.CLASSIC,
      GAME_MODES_IDS.VEGAS,
      GAME_MODES_IDS.TIMED,
      GAME_MODES_IDS.EXPERT,
      GAME_MODES_IDS.RELAXED,
    ],
    rarity: "epic",
    hidden: false,
    getProgress: (state) => Math.floor((state.wins / 50) * 100),
  },
  [achievements_win_ids.timed_master]: {
    id: achievements_win_ids.timed_master,
    stateType: achStateTypes.mode,
    type: achievementsTypes.win,
    life: achievements_lifes.one,
    title: "Мастер времени",
    description: "Одержать 10 побед в режиме на время",
    icon: "⏰",
    reward: 300,
    currency: currency.SCORE,
    condition: (state) => {
      if (state.currentModeId !== GAME_MODES_IDS.TIMED) return false;
      return state.modes[state.currentModeId].wins >= 10;
    },
    modes: [GAME_MODES_IDS.TIMED],
    rarity: "rare",
    hidden: false,
    getProgress: (state) => {
      if (state.currentModeId !== GAME_MODES_IDS.TIMED) return 0;
      const wins = state.modes[state.currentModeId].wins;
      return wins >= 10 ? 100 : Math.floor((wins / 10) * 100);
    },
  },
  [achievements_win_ids.expert_challenge]: {
    id: achievements_win_ids.expert_challenge,
    type: achievementsTypes.win,
    life: achievements_lifes.one,
    title: "Эксперт",
    description: "Одержать победу в экспертом режиме",
    icon: "🧠",
    reward: 25,
    currency: currency.COINS,
    condition: (stats) => stats.expertWins >= 1,
    modes: [GAME_MODES_IDS.EXPERT],
    rarity: "rare",
    hidden: false,
  },
  [achievements_win_ids.relaxed_collector]: {
    id: achievements_win_ids.relaxed_collector,
    stateType: achStateTypes.mode,
    type: achievementsTypes.win,
    life: achievements_lifes.one,
    title: "Коллекционер релакса",
    description: "Одержать 10 побед в расслабленном режиме",
    icon: "😌",
    reward: 150,
    currency: currency.SCORE,
    condition: (state) => {
      if (state.currentModeId !== GAME_MODES_IDS.RELAXED) return false;
      return state.modes[state.currentModeId].wins >= 10;
    },
    modes: [GAME_MODES_IDS.RELAXED],
    rarity: "uncommon",
    hidden: false,
    getProgress: (state) => {
      if (state.currentModeId !== GAME_MODES_IDS.RELAXED) return 0;
      return Math.floor((state.modes[state.currentModeId].wins / 10) * 100);
    },
  },
  [achievements_win_ids.vegas_king]: {
    id: achievements_win_ids.vegas_king,
    type: achievementsTypes.win,
    life: achievements_lifes.one,
    title: "Король Вегаса",
    description: "Одержать 20 побед в Вегасском режиме",
    icon: "🎰",
    reward: 40,
    currency: currency.COINS,
    condition: (stats) => stats.vegasWins >= 20,
    modes: [GAME_MODES_IDS.VEGAS],
    rarity: "epic",
    hidden: false,
    getProgress: (stats) => ({
      current: stats.vegasWins || 0,
      target: 20,
    }),
  },
  [achievements_win_ids.classic_legend]: {
    id: achievements_win_ids.classic_legend,
    stateType: achStateTypes.mode,
    type: achievementsTypes.win,
    life: achievements_lifes.one,
    title: "Легенда классики",
    description: "Одержать 30 побед в классическом режиме",
    icon: "♠️",
    reward: 350,
    currency: currency.SCORE,
    condition: (state) => {
      if (state.currentModeId !== GAME_MODES_IDS.CLASSIC) return false;
      return state.modes[state.currentModeId].wins >= 30;
    },
    modes: [GAME_MODES_IDS.CLASSIC],
    rarity: "epic",
    hidden: false,
    getProgress: (state) => {
      if (state.currentModeId !== GAME_MODES_IDS.CLASSIC) return 0;
      return Math.floor((state.modes[state.currentModeId].wins / 30) * 100);
    },
  },
  [achievements_win_ids.mode_master]: {
    id: achievements_win_ids.mode_master,
    stateType: achStateTypes.mode,
    type: achievementsTypes.win,
    life: achievements_lifes.one,
    title: "Мастер всех режимов",
    description: "Одержать 5 побед в каждом режиме",
    icon: "🌟",
    reward: 1000,
    currency: currency.SCORE,
    condition: (state) => {
      const requiredWins = 5;
      const modes = [
        GAME_MODES_IDS.CLASSIC,
        GAME_MODES_IDS.TIMED,
        GAME_MODES_IDS.RELAXED,
      ];
      return modes.every((mode) => {
        const wins = state.modes[mode].wins || 0;
        return wins >= requiredWins;
      });
    },
    modes: [
      GAME_MODES_IDS.CLASSIC,
      GAME_MODES_IDS.TIMED,
      GAME_MODES_IDS.RELAXED,
    ],
    rarity: "legendary",
    hidden: true,
    getProgress: (state) => {
      let current = 0;
      const requiredWins = 5;
      const modes = [
        GAME_MODES_IDS.CLASSIC,
        GAME_MODES_IDS.TIMED,
        GAME_MODES_IDS.RELAXED,
      ];
      for (const mode of modes) {
        const hasRequiredWins = state.modes[mode].wins >= requiredWins;
        current += hasRequiredWins ? requiredWins : state.modes[mode].wins || 0;
      }
      return Math.floor((current / 15) * 100);
    },
  },
  [achievements_win_ids.quick_thinking]: {
    id: achievements_win_ids.quick_thinking,
    stateType: achStateTypes.mode,
    type: achievementsTypes.win,
    life: achievements_lifes.many,
    title: "Быстрое мышление",
    description: "Победить в режиме на время менее чем за 2 минуты",
    icon: "⚡",
    reward: 400,
    currency: currency.SCORE,
    condition: (state) => {
      if (state.currentModeId !== GAME_MODES_IDS.TIMED) return false;
      const currentMode = state.modes[state.currentModeId];
      const currentDealing = currentMode.currentDealing;
      const time = currentMode[currentDealing].time;
      const wins = currentMode[currentDealing].wins;
      if (wins.total < 1 && wins.time === 0) return false;
      return time.limit - wins.time <= 120;
    },
    modes: [GAME_MODES_IDS.TIMED],
    rarity: "epic",
    hidden: true,
    getProgress: (state) => {
      if (state.currentModeId !== GAME_MODES_IDS.TIMED) return 0;
      const currentMode = state.modes[state.currentModeId];
      const currentDealing = currentMode.currentDealing;
      const time = currentMode[currentDealing].time;
      const wins = currentMode[currentDealing].wins;
      if (wins.total < 1 && wins.time === 0) return 0;
      const resultTime = time.limit - wins.time;
      return Math.floor((resultTime / 120) * 100);
    },
  },
  [achievements_win_ids.no_hint_expert]: {
    id: achievements_win_ids.no_hint_expert,
    type: achievementsTypes.win,
    life: achievements_lifes.many,
    title: "Самодостаточный эксперт",
    description: "Победить в экспертом режиме без подсказок",
    icon: "🎯",
    reward: 60,
    currency: currency.COINS,
    condition: (stats) => stats.expertWinsWithoutHints >= 1,
    modes: [GAME_MODES_IDS.EXPERT],
    rarity: "legendary",
    hidden: true,
  },
  [achievements_win_ids.streak_master]: {
    id: achievements_win_ids.streak_master,
    stateType: achStateTypes.lifetime,
    type: achievementsTypes.win,
    life: achievements_lifes.one,
    title: "Мастер серий",
    description: "Одержать 10 побед подряд",
    icon: "🔥🔥",
    reward: 75,
    currency: currency.COINS,
    condition: (state) => state.wins >= 10,
    modes: [
      GAME_MODES_IDS.CLASSIC,
      GAME_MODES_IDS.VEGAS,
      GAME_MODES_IDS.TIMED,
      GAME_MODES_IDS.EXPERT,
      GAME_MODES_IDS.RELAXED,
    ],
    rarity: "legendary",
    hidden: true,
    getProgress: (state) => ({
      current: state.wins || 0,
      target: 10,
    }),
  },
  [achievements_win_ids.early_bird]: {
    id: achievements_win_ids.early_bird,
    stateType: achStateTypes.lifetime,
    type: achievementsTypes.win,
    life: achievements_lifes.many,
    title: "Ранняя пташка",
    description: "Победить до 8 утра",
    icon: "🐦",
    reward: 25,
    currency: currency.COINS,
    condition: (state) => state.time >= 1,
    modes: [
      GAME_MODES_IDS.CLASSIC,
      GAME_MODES_IDS.VEGAS,
      GAME_MODES_IDS.TIMED,
      GAME_MODES_IDS.EXPERT,
      GAME_MODES_IDS.RELAXED,
    ],
    rarity: "uncommon",
    hidden: true,
    getProgress: (state) => ({
      current: state.time || 0,
      target: 1,
    }),
  },
  [achievements_win_ids.midnight_gamer]: {
    id: achievements_win_ids.midnight_gamer,
    stateType: achStateTypes.lifetime,
    type: achievementsTypes.win,
    life: achievements_lifes.many,
    title: "Полуночный игрок",
    description: "Победить после полуночи",
    icon: "🌙",
    reward: 30,
    currency: currency.COINS,
    condition: (state) => state.wins >= 1,
    modes: [
      GAME_MODES_IDS.CLASSIC,
      GAME_MODES_IDS.VEGAS,
      GAME_MODES_IDS.TIMED,
      GAME_MODES_IDS.EXPERT,
      GAME_MODES_IDS.RELAXED,
    ],
    rarity: "uncommon",
    hidden: true,
    getProgress: (state) => ({
      current: state.wins || 0,
      target: 1,
    }),
  },
  [achievements_win_ids.hintless_streak]: {
    id: achievements_win_ids.hintless_streak,
    stateType: achStateTypes.lifetime,
    type: achievementsTypes.win,
    life: achievements_lifes.one,
    title: "Серия без подсказок",
    description: "Одержать 5 побед подряд без подсказок",
    icon: "🚫💡",
    reward: 320,
    currency: currency.SCORE,
    condition: (state) => {
      const currentMode = state.modes[state.currentModeId];
      const currentDealing = currentMode.currentDealing;
      const wins = currentMode[currentDealing].wins;
      return wins.no_hints >= 5;
    },
    modes: [
      GAME_MODES_IDS.CLASSIC,
      GAME_MODES_IDS.TIMED,
      GAME_MODES_IDS.EXPERT,
    ],
    rarity: "epic",
    hidden: true,
    getProgress: (state) => {
      const currentMode = state.modes[state.currentModeId];
      const currentDealing = currentMode.currentDealing;
      const wins = currentMode[currentDealing].wins;
      return Math.floor((wins.no_hints / 5) * 100);
    },
  },
  [achievements_win_ids.perfect_vegas]: {
    id: achievements_win_ids.perfect_vegas,
    type: achievementsTypes.win,
    life: achievements_lifes.many,
    title: "Идеальный Вегас",
    description: "Победить в Вегасском режиме с положительным балансом",
    icon: "💎",
    reward: 45,
    currency: currency.COINS,
    condition: (stats) => stats.vegasPositiveWins >= 1,
    modes: [GAME_MODES_IDS.VEGAS],
    rarity: "uncommon",
    hidden: false,
  },
};

export const achievements_restart_and_win = {
  [achievements_restart_and_win_ids.persistent_player]: {
    id: achievements_restart_and_win_ids.persistent_player,
    stateType: achStateTypes.lifetime,
    type: achievementsTypes.restart_and_win,
    life: achievements_lifes.one,
    title: "Упорный игрок",
    description: "Сыграть 20 игр",
    icon: "🎮",
    reward: 2000,
    currency: currency.SCORE,
    condition: (state) => state.played >= 20,
    modes: [
      GAME_MODES_IDS.CLASSIC,
      GAME_MODES_IDS.VEGAS,
      GAME_MODES_IDS.TIMED,
      GAME_MODES_IDS.EXPERT,
      GAME_MODES_IDS.RELAXED,
    ],
    rarity: "uncommon",
    hidden: false,
    getProgress: (state) => Math.floor((state.played / 20) * 100),
  },
  [achievements_restart_and_win_ids.veteran_player]: {
    id: achievements_restart_and_win_ids.veteran_player,
    stateType: achStateTypes.lifetime,
    type: achievementsTypes.restart_and_win,
    life: achievements_lifes.one,
    title: "Ветеран",
    description: "Сыграть 100 игр",
    icon: "👴",
    reward: 5000,
    currency: currency.SCORE,
    condition: (state) => state.played >= 100,
    modes: [
      GAME_MODES_IDS.CLASSIC,
      GAME_MODES_IDS.VEGAS,
      GAME_MODES_IDS.TIMED,
      GAME_MODES_IDS.EXPERT,
      GAME_MODES_IDS.RELAXED,
    ],
    rarity: "epic",
    hidden: false,
    getProgress: (state) => Math.floor((state.played / 100) * 100),
  },
  [achievements_restart_and_win_ids.weekend_warrior]: {
    id: achievements_restart_and_win_ids.weekend_warrior,
    stateType: achStateTypes.lifetime,
    type: achievementsTypes.restart_and_win,
    life: achievements_lifes.one,
    title: "Воин выходного дня",
    // description: "Сыграть 7 дней подряд",
    description: "Сыграть 5 игр в выходные",
    icon: "📅",
    reward: 35,
    currency: currency.COINS,
    condition: (state) => state.played >= 7,
    modes: [
      GAME_MODES_IDS.CLASSIC,
      GAME_MODES_IDS.VEGAS,
      GAME_MODES_IDS.TIMED,
      GAME_MODES_IDS.EXPERT,
      GAME_MODES_IDS.RELAXED,
    ],
    rarity: "rare",
    hidden: true,
    getProgress: (state) => ({
      current: state.played || 0,
      target: 7,
    }),
  },
};

export const achievements_ids_by_rarity = {
  common: {
    ...achievements_session_ids,
    ...achievements_win_ids,
  },
  rare: {
    ...achievements_restart_and_win_ids,
  },
  epic: {
    ...achievements_restart_and_win_ids,
  },
  legendary: {
    ...achievements_restart_and_win_ids,
  },
  unique: {
    ...achievements_restart_and_win_ids,
  },
  special: {
    ...achievements_restart_and_win_ids,
  },
  hidden: {
    ...achievements_restart_and_win_ids,
  },
  new: {
    ...achievements_restart_and_win_ids,
  },
  old: {
    ...achievements_restart_and_win_ids,
  },
  classic: {
    ...achievements_restart_and_win_ids,
  },
  vegas: {
    ...achievements_restart_and_win_ids,
  },
  timed: {
    ...achievements_restart_and_win_ids,
  },
  expert: {
    ...achievements_restart_and_win_ids,
  },
  relaxed: {
    ...achievements_restart_and_win_ids,
  },
  win: {
    ...achievements_restart_and_win_ids,
  },
  session: {
    ...achievements_restart_and_win_ids,
  },
  restart: {
    ...achievements_restart_and_win_ids,
  },
  restart_and_win: {
    ...achievements_restart_and_win_ids,
  },
  win_and_restart: {
    ...achievements_restart_and_win_ids,
  },
  win_and_session: {
    ...achievements_restart_and_win_ids,
  },
  session_and_restart: {
    ...achievements_restart_and_win_ids,
  },
  win_and_session_and_restart: {
    ...achievements_restart_and_win_ids,
  },
  session_and_restart_and_win: {
    ...achievements_restart_and_win_ids,
  },
  restart_and_win_and_session: {
    ...achievements_restart_and_win_ids,
  },
};

export const achievements_ids_by_mode = {
  [GAME_MODES_IDS.CLASSIC]: {
    ...achievements_session_ids,
    ...achievements_win_ids,
  },
  [GAME_MODES_IDS.TIMED]: {
    ...achievements_session_ids,
    ...achievements_win_ids,
  },
  [GAME_MODES_IDS.EXPERT]: {
    ...achievements_session_ids,
    ...achievements_win_ids,
  },
  [GAME_MODES_IDS.RELAXED]: {
    ...achievements_session_ids,
    ...achievements_win_ids,
  },
  [GAME_MODES_IDS.VEGAS]: {
    ...achievements_session_ids,
    ...achievements_win_ids,
  },
};

export const achievements_ids_by_life = {
  one: {
    ...achievements_session_ids,
    ...achievements_win_ids,
  },
  many: {
    ...achievements_restart_and_win_ids,
  },
};

export const achievements_ids_by_type = {
  [achievementsTypes.session]: achievements_session_ids,
  [achievementsTypes.win]: achievements_win_ids,
  [achievementsTypes.restart_and_win]: achievements_restart_and_win_ids,
};

export const achievements_ids = {
  ...achievements_session_ids,
  ...achievements_win_ids,
  ...achievements_restart_and_win_ids,
};

export const achievements = {
  ...achievements_start,
  ...achievements_session,
  ...achievements_win,
  ...achievements_restart_and_win,
};

console.log("achievements: ", achievements);

// export const AchievementsConfig = [
//   ////////////////////////// для теста, потом убрать
//   {
//     id: "score_breaker_test",
//     type: achievementsTypes.session,
//     life: "many",
//     title: "Рекордсмен",
//     description: "Набрать 30 очков в одной игре",
//     icon: "💯",
//     reward: 30,
//     currency: currency.SCORE,
//     condition: (stats) => stats.score >= 2,
//     modes: [
//       GAME_MODES_IDS.CLASSIC,
//       GAME_MODES_IDS.TIMED,
//       GAME_MODES_IDS.RELAXED,
//       GAME_MODES_IDS.EXPERT,
//     ],
//     rarity: "rare",
//     hidden: false,
//   },
//   {
//     id: "card_flipper_test",
//     type: achievementsTypes.session,
//     life: "one",
//     title: "Переворачиватель",
//     description: "Перевернуть 5 карт",
//     icon: "🔄",
//     reward: 50,
//     currency: currency.SCORE,
//     condition: (stats) => stats.cardsFlipped >= 1,
//     modes: [
//       GAME_MODES_IDS.CLASSIC,
//       GAME_MODES_IDS.TIMED,
//       GAME_MODES_IDS.RELAXED,
//       GAME_MODES_IDS.EXPERT,
//     ],
//     rarity: "common",
//     hidden: false,
//     getProgress: (stats) => ({
//       current: stats.cardsFlipped,
//       target: 100,
//     }),
//   },
//   {
//     id: "foundation_master_test",
//     type: achievementsTypes.session,
//     life: "one",
//     title: "Мастер фундаментов",
//     description: "Переместить 4 карт в фундаменты",
//     icon: "🔼",
//     reward: 40,
//     currency: currency.SCORE,
//     condition: (stats) => stats.cardsToFoundation >= 1,
//     modes: [
//       GAME_MODES_IDS.CLASSIC,
//       GAME_MODES_IDS.TIMED,
//       GAME_MODES_IDS.RELAXED,
//       GAME_MODES_IDS.EXPERT,
//     ],
//     rarity: "uncommon",
//     hidden: false,
//     getProgress: (stats) => ({
//       current: stats.cardsToFoundation,
//       target: 50,
//     }),
//   },
//   ////////////////////
//   {
//     ...defaultAchievements,
//     modes: [
//       GAME_MODES_IDS.CLASSIC,
//       GAME_MODES_IDS.VEGAS,
//       GAME_MODES_IDS.TIMED,
//       GAME_MODES_IDS.EXPERT,
//       GAME_MODES_IDS.RELAXED,
//     ],
//   },
//   {
//     id: "first_win",
//     type: achievementsTypes.win,
//     life: "one",
//     title: "Первая победа",
//     description: "Одержать первую победу в игре",
//     icon: "🏆",
//     reward: 5,
//     currency: currency.COINS,
//     condition: (stats) => stats.wins >= 1,
//     modes: [
//       GAME_MODES_IDS.CLASSIC,
//       GAME_MODES_IDS.VEGAS,
//       GAME_MODES_IDS.TIMED,
//       GAME_MODES_IDS.EXPERT,
//       GAME_MODES_IDS.RELAXED,
//     ],
//     rarity: "common",
//     hidden: false,
//   },
//   {
//     id: "fast_win",
//     type: achievementsTypes.win,
//     life: "many",
//     title: "Скоростная игра",
//     description: "Победить менее чем за 5 минут",
//     icon: "⏱️",
//     reward: 5,
//     currency: currency.COINS,
//     condition: (stats) => stats.fastestWin <= 300,
//     modes: [
//       GAME_MODES_IDS.CLASSIC,
//       GAME_MODES_IDS.TIMED,
//       GAME_MODES_IDS.EXPERT,
//       GAME_MODES_IDS.RELAXED,
//     ],
//     rarity: "uncommon",
//     hidden: false,
//   },
//   {
//     id: "perfect_game",
//     type: achievementsTypes.win,
//     life: "many",
//     title: "Идеальная игра",
//     description: "Победить за минимальное количество ходов",
//     icon: "✨",
//     reward: 5,
//     currency: currency.COINS,
//     condition: (stats) => stats.moves === stats.minPossibleMoves,
//     modes: [
//       GAME_MODES_IDS.CLASSIC,
//       GAME_MODES_IDS.VEGAS,
//       GAME_MODES_IDS.TIMED,
//       GAME_MODES_IDS.EXPERT,
//       GAME_MODES_IDS.RELAXED,
//     ],
//     rarity: "rare",
//     hidden: true,
//   },
//   {
//     id: "foundation_master",
//     type: achievementsTypes.session,
//     life: "one",
//     title: "Мастер фундаментов",
//     description: "Переместить 50 карт в фундаменты",
//     icon: "🔼",
//     reward: 500,
//     currency: currency.SCORE,
//     condition: (stats) => stats.cardsToFoundation >= 50,
//     modes: [
//       GAME_MODES_IDS.CLASSIC,
//       GAME_MODES_IDS.TIMED,
//       GAME_MODES_IDS.RELAXED,
//       GAME_MODES_IDS.EXPERT,
//     ],
//     rarity: "uncommon",
//     hidden: false,
//     getProgress: (stats) => ({
//       current: stats.cardsToFoundation,
//       target: 50,
//     }),
//   },
//   {
//     id: "score_breaker",
//     type: achievementsTypes.session,
//     life: "many",
//     title: "Рекордсмен",
//     description: "Набрать 1000 очков в одной игре",
//     icon: "💯",
//     reward: 300,
//     currency: currency.SCORE,
//     condition: (stats) => stats.score >= 1000,
//     modes: [
//       GAME_MODES_IDS.CLASSIC,
//       GAME_MODES_IDS.TIMED,
//       GAME_MODES_IDS.EXPERT,
//     ],
//     rarity: "rare",
//     hidden: false,
//   },
//   {
//     id: "vegas_score_breaker",
//     type: achievementsTypes.session,
//     life: "many",
//     title: "Вегасский миллионер",
//     description: "Набрать 5000 очков в Вегасском режиме",
//     icon: "💰",
//     reward: 500,
//     currency: currency.SCORE,
//     condition: (stats) => stats.score >= 5000,
//     modes: [GAME_MODES_IDS.VEGAS],
//     rarity: "epic",
//     hidden: false,
//   },
//   {
//     id: "card_flipper",
//     type: achievementsTypes.session,
//     life: "one",
//     title: "Переворачиватель",
//     description: "Перевернуть 100 карт",
//     icon: "🔄",
//     reward: 150,
//     currency: currency.SCORE,
//     condition: (stats) => stats.cardsFlipped >= 100,
//     modes: [
//       GAME_MODES_IDS.CLASSIC,
//       GAME_MODES_IDS.TIMED,
//       GAME_MODES_IDS.RELAXED,
//       GAME_MODES_IDS.EXPERT,
//     ],
//     rarity: "common",
//     hidden: false,
//     getProgress: (stats) => ({
//       current: stats.cardsFlipped,
//       target: 100,
//     }),
//   },
//   {
//     id: "persistent_player",
//     type: achievementsTypes.restart_and_win,
//     life: "one",
//     title: "Упорный игрок",
//     description: "Сыграть 20 игр",
//     icon: "🎮",
//     reward: 20,
//     currency: currency.COINS,
//     condition: (stats) => stats.gamesPlayed >= 20,
//     modes: [
//       GAME_MODES_IDS.CLASSIC,
//       GAME_MODES_IDS.VEGAS,
//       GAME_MODES_IDS.TIMED,
//       GAME_MODES_IDS.EXPERT,
//       GAME_MODES_IDS.RELAXED,
//     ],
//     rarity: "uncommon",
//     hidden: false,
//     getProgress: (stats) => ({
//       current: stats.gamesPlayed,
//       target: 20,
//     }),
//   },
//   {
//     id: "hint_saver",
//     type: achievementsTypes.win,
//     life: "many",
//     title: "Экономный",
//     description: "Победить, не используя подсказки",
//     icon: "💡",
//     reward: 180,
//     currency: currency.SCORE,
//     condition: (stats) => stats.winsWithoutHints >= 1,
//     modes: [
//       GAME_MODES_IDS.CLASSIC,
//       GAME_MODES_IDS.TIMED,
//       GAME_MODES_IDS.EXPERT,
//     ],
//     rarity: "rare",
//     hidden: true,
//   },
//   {
//     id: "win_streak",
//     type: achievementsTypes.win,
//     life: "one",
//     title: "Серия побед",
//     description: "Одержать 3 победы подряд",
//     icon: "🔥",
//     reward: 10,
//     currency: currency.COINS,
//     condition: (stats) => stats.currentWinStreak >= 3,
//     modes: [
//       GAME_MODES_IDS.CLASSIC,
//       GAME_MODES_IDS.VEGAS,
//       GAME_MODES_IDS.TIMED,
//       GAME_MODES_IDS.EXPERT,
//       GAME_MODES_IDS.RELAXED,
//     ],
//     rarity: "rare",
//     hidden: true,
//     getProgress: (stats) => ({
//       current: stats.currentWinStreak,
//       target: 3,
//     }),
//   },
//   {
//     id: "tableau_cleaner",
//     type: achievementsTypes.session,
//     life: "one",
//     title: "Чистильщик таблиц",
//     description: "Очистить одну из таблиц полностью",
//     icon: "🧹",
//     reward: 150,
//     currency: currency.SCORE,
//     condition: (stats) => stats.tableausCleared >= 1,
//     modes: [
//       GAME_MODES_IDS.CLASSIC,
//       GAME_MODES_IDS.TIMED,
//       GAME_MODES_IDS.RELAXED,
//       GAME_MODES_IDS.EXPERT,
//     ],
//     rarity: "uncommon",
//     hidden: false,
//   },
//   {
//     id: "undo_avoider",
//     type: achievementsTypes.win,
//     life: "many",
//     title: "Решительный",
//     description: "Победить, не используя отмену хода",
//     icon: "⏮️",
//     reward: 200,
//     currency: currency.SCORE,
//     condition: (stats) => stats.winsWithoutUndo >= 1,
//     modes: [
//       GAME_MODES_IDS.CLASSIC,
//       GAME_MODES_IDS.TIMED,
//       GAME_MODES_IDS.EXPERT,
//     ],
//     rarity: "uncommon",
//     hidden: true,
//   },
//   {
//     id: "veteran_player",
//     type: achievementsTypes.restart_and_win,
//     life: "one",
//     title: "Ветеран",
//     description: "Сыграть 100 игр",
//     icon: "👴",
//     reward: 50,
//     currency: currency.COINS,
//     condition: (stats) => stats.gamesPlayed >= 100,
//     modes: [
//       GAME_MODES_IDS.CLASSIC,
//       GAME_MODES_IDS.VEGAS,
//       GAME_MODES_IDS.TIMED,
//       GAME_MODES_IDS.EXPERT,
//       GAME_MODES_IDS.RELAXED,
//     ],
//     rarity: "epic",
//     hidden: false,
//     getProgress: (stats) => ({
//       current: stats.gamesPlayed,
//       target: 100,
//     }),
//   },
//   {
//     id: "king_of_cards",
//     type: achievementsTypes.win,
//     life: "one",
//     title: "Король карт",
//     description: "Одержать 50 побед",
//     icon: "👑",
//     reward: 100,
//     currency: currency.COINS,
//     condition: (stats) => stats.wins >= 50,
//     modes: [
//       GAME_MODES_IDS.CLASSIC,
//       GAME_MODES_IDS.VEGAS,
//       GAME_MODES_IDS.TIMED,
//       GAME_MODES_IDS.EXPERT,
//       GAME_MODES_IDS.RELAXED,
//     ],
//     rarity: "epic",
//     hidden: false,
//     getProgress: (stats) => ({
//       current: stats.wins,
//       target: 50,
//     }),
//   },
//   {
//     id: "timed_master",
//     type: achievementsTypes.win,
//     life: "one",
//     title: "Мастер времени",
//     description: "Одержать 10 побед в режиме на время",
//     icon: "⏰",
//     reward: 30,
//     currency: currency.COINS,
//     condition: (stats) => stats.timedWins >= 10,
//     modes: [GAME_MODES_IDS.TIMED],
//     rarity: "rare",
//     hidden: false,
//     getProgress: (stats) => ({
//       current: stats.timedWins || 0,
//       target: 10,
//     }),
//   },
//   {
//     id: "expert_challenge",
//     type: achievementsTypes.win,
//     life: "one",
//     title: "Эксперт",
//     description: "Одержать победу в экспертом режиме",
//     icon: "🧠",
//     reward: 25,
//     currency: currency.COINS,
//     condition: (stats) => stats.expertWins >= 1,
//     modes: [GAME_MODES_IDS.EXPERT],
//     rarity: "rare",
//     hidden: false,
//   },
//   {
//     id: "relaxed_collector",
//     type: achievementsTypes.win,
//     life: "one",
//     title: "Коллекционер релакса",
//     description: "Одержать 5 побед в расслабленном режиме",
//     icon: "😌",
//     reward: 15,
//     currency: currency.COINS,
//     condition: (stats) => stats.relaxedWins >= 5,
//     modes: [GAME_MODES_IDS.RELAXED],
//     rarity: "uncommon",
//     hidden: false,
//     getProgress: (stats) => ({
//       current: stats.relaxedWins || 0,
//       target: 5,
//     }),
//   },
//   {
//     id: "vegas_king",
//     type: achievementsTypes.win,
//     life: "one",
//     title: "Король Вегаса",
//     description: "Одержать 20 побед в Вегасском режиме",
//     icon: "🎰",
//     reward: 40,
//     currency: currency.COINS,
//     condition: (stats) => stats.vegasWins >= 20,
//     modes: [GAME_MODES_IDS.VEGAS],
//     rarity: "epic",
//     hidden: false,
//     getProgress: (stats) => ({
//       current: stats.vegasWins || 0,
//       target: 20,
//     }),
//   },
//   {
//     id: "classic_legend",
//     type: achievementsTypes.win,
//     life: "one",
//     title: "Легенда классики",
//     description: "Одержать 30 побед в классическом режиме",
//     icon: "♠️",
//     reward: 35,
//     currency: currency.COINS,
//     condition: (stats) => stats.classicWins >= 30,
//     modes: [GAME_MODES_IDS.CLASSIC],
//     rarity: "epic",
//     hidden: false,
//     getProgress: (stats) => ({
//       current: stats.classicWins || 0,
//       target: 30,
//     }),
//   },
//   {
//     id: "mode_master",
//     type: achievementsTypes.win,
//     life: "one",
//     title: "Мастер всех режимов",
//     description: "Одержать по 5 побед в каждом режиме",
//     icon: "🌟",
//     reward: 100,
//     currency: currency.COINS,
//     condition: (stats) => {
//       const requiredWins = 5;
//       const modes = [
//         GAME_MODES_IDS.CLASSIC,
//         GAME_MODES_IDS.VEGAS,
//         GAME_MODES_IDS.TIMED,
//         GAME_MODES_IDS.EXPERT,
//         GAME_MODES_IDS.RELAXED,
//       ];
//       return modes.every((mode) => {
//         const wins = stats[`${mode.toLowerCase()}Wins`] || 0;
//         return wins >= requiredWins;
//       });
//     },
//     modes: [
//       GAME_MODES_IDS.CLASSIC,
//       GAME_MODES_IDS.VEGAS,
//       GAME_MODES_IDS.TIMED,
//       GAME_MODES_IDS.EXPERT,
//       GAME_MODES_IDS.RELAXED,
//     ],
//     rarity: "legendary",
//     hidden: true,
//   },
//   // Новые достижения
//   {
//     id: "quick_thinking",
//     type: achievementsTypes.win,
//     life: "many",
//     title: "Быстрое мышление",
//     description: "Победить в режиме на время менее чем за 2 минуты",
//     icon: "⚡",
//     reward: 40,
//     currency: currency.COINS,
//     condition: (stats) => stats.fastestTimedWin <= 120,
//     modes: [GAME_MODES_IDS.TIMED],
//     rarity: "epic",
//     hidden: true,
//   },
//   {
//     id: "no_hint_expert",
//     type: achievementsTypes.win,
//     life: "many",
//     title: "Самодостаточный эксперт",
//     description: "Победить в экспертом режиме без подсказок",
//     icon: "🎯",
//     reward: 60,
//     currency: currency.COINS,
//     condition: (stats) => stats.expertWinsWithoutHints >= 1,
//     modes: [GAME_MODES_IDS.EXPERT],
//     rarity: "legendary",
//     hidden: true,
//   },
//   {
//     id: "foundation_perfect",
//     type: achievementsTypes.session,
//     life: "many",
//     title: "Безупречный фундамент",
//     description: "Переместить все карты в фундаменты за минимальное время",
//     icon: "⭐",
//     reward: 200,
//     currency: currency.SCORE,
//     condition: (stats) => stats.perfectFoundationTime <= 600,
//     modes: [
//       GAME_MODES_IDS.CLASSIC,
//       GAME_MODES_IDS.TIMED,
//       GAME_MODES_IDS.EXPERT,
//     ],
//     rarity: "rare",
//     hidden: true,
//   },
//   {
//     id: "card_counter",
//     type: achievementsTypes.session,
//     life: "one",
//     title: "Счетчик карт",
//     description: "Переместить 200 карт между таблицами",
//     icon: "🔢",
//     reward: 250,
//     currency: currency.SCORE,
//     condition: (stats) => stats.cardsMovedBetweenTableaus >= 200,
//     modes: [
//       GAME_MODES_IDS.CLASSIC,
//       GAME_MODES_IDS.TIMED,
//       GAME_MODES_IDS.RELAXED,
//       GAME_MODES_IDS.EXPERT,
//     ],
//     rarity: "uncommon",
//     hidden: false,
//     getProgress: (stats) => ({
//       current: stats.cardsMovedBetweenTableaus || 0,
//       target: 200,
//     }),
//   },
//   {
//     id: "weekend_warrior",
//     type: achievementsTypes.restart_and_win,
//     life: "one",
//     title: "Воин выходного дня",
//     description: "Сыграть 7 дней подряд",
//     icon: "📅",
//     reward: 35,
//     currency: currency.COINS,
//     condition: (stats) => stats.consecutiveDaysPlayed >= 7,
//     modes: [
//       GAME_MODES_IDS.CLASSIC,
//       GAME_MODES_IDS.VEGAS,
//       GAME_MODES_IDS.TIMED,
//       GAME_MODES_IDS.EXPERT,
//       GAME_MODES_IDS.RELAXED,
//     ],
//     rarity: "rare",
//     hidden: true,
//     getProgress: (stats) => ({
//       current: stats.consecutiveDaysPlayed || 0,
//       target: 7,
//     }),
//   },
//   {
//     id: "ace_finder",
//     type: achievementsTypes.session,
//     life: "many",
//     title: "Искатель тузов",
//     description: "Найти все 4 туза в первые 10 ходов",
//     icon: "🃏",
//     reward: 100,
//     currency: currency.SCORE,
//     condition: (stats) => stats.acesFoundEarly >= 1,
//     modes: [
//       GAME_MODES_IDS.CLASSIC,
//       GAME_MODES_IDS.TIMED,
//       GAME_MODES_IDS.EXPERT,
//     ],
//     rarity: "uncommon",
//     hidden: true,
//   },
//   {
//     id: "tableau_tamer",
//     type: achievementsTypes.session,
//     life: "one",
//     title: "Укротитель таблиц",
//     description: "Очистить все 7 таблиц в одной игре",
//     icon: "🎪",
//     reward: 300,
//     currency: currency.SCORE,
//     condition: (stats) => stats.allTableausCleared >= 1,
//     modes: [
//       GAME_MODES_IDS.CLASSIC,
//       GAME_MODES_IDS.TIMED,
//       GAME_MODES_IDS.EXPERT,
//     ],
//     rarity: "epic",
//     hidden: false,
//   },
//   {
//     id: "streak_master",
//     type: achievementsTypes.win,
//     life: "one",
//     title: "Мастер серий",
//     description: "Одержать 10 побед подряд",
//     icon: "🔥🔥",
//     reward: 75,
//     currency: currency.COINS,
//     condition: (stats) => stats.currentWinStreak >= 10,
//     modes: [
//       GAME_MODES_IDS.CLASSIC,
//       GAME_MODES_IDS.VEGAS,
//       GAME_MODES_IDS.TIMED,
//       GAME_MODES_IDS.EXPERT,
//       GAME_MODES_IDS.RELAXED,
//     ],
//     rarity: "legendary",
//     hidden: true,
//     getProgress: (stats) => ({
//       current: stats.currentWinStreak,
//       target: 10,
//     }),
//   },
//   {
//     id: "early_bird",
//     type: achievementsTypes.win,
//     life: "many",
//     title: "Ранняя пташка",
//     description: "Победить до 8 утра",
//     icon: "🐦",
//     reward: 25,
//     currency: currency.COINS,
//     condition: (stats) => stats.morningWins >= 1,
//     modes: [
//       GAME_MODES_IDS.CLASSIC,
//       GAME_MODES_IDS.VEGAS,
//       GAME_MODES_IDS.TIMED,
//       GAME_MODES_IDS.EXPERT,
//       GAME_MODES_IDS.RELAXED,
//     ],
//     rarity: "uncommon",
//     hidden: true,
//   },
//   {
//     id: "midnight_gamer",
//     type: achievementsTypes.win,
//     life: "many",
//     title: "Полуночный игрок",
//     description: "Победить после полуночи",
//     icon: "🌙",
//     reward: 30,
//     currency: currency.COINS,
//     condition: (stats) => stats.nightWins >= 1,
//     modes: [
//       GAME_MODES_IDS.CLASSIC,
//       GAME_MODES_IDS.VEGAS,
//       GAME_MODES_IDS.TIMED,
//       GAME_MODES_IDS.EXPERT,
//       GAME_MODES_IDS.RELAXED,
//     ],
//     rarity: "uncommon",
//     hidden: true,
//   },
//   {
//     id: "hintless_streak",
//     type: achievementsTypes.win,
//     life: "one",
//     title: "Серия без подсказок",
//     description: "Одержать 5 побед подряд без подсказок",
//     icon: "🚫💡",
//     reward: 120,
//     currency: currency.SCORE,
//     condition: (stats) => stats.hintlessWinStreak >= 5,
//     modes: [
//       GAME_MODES_IDS.CLASSIC,
//       GAME_MODES_IDS.TIMED,
//       GAME_MODES_IDS.EXPERT,
//     ],
//     rarity: "epic",
//     hidden: true,
//     getProgress: (stats) => ({
//       current: stats.hintlessWinStreak || 0,
//       target: 5,
//     }),
//   },
//   {
//     id: "foundation_chain",
//     type: achievementsTypes.session,
//     life: "many",
//     title: "Цепочка фундаментов",
//     description: "Построить полный фундамент (от туза до короля) за 30 секунд",
//     icon: "⛓️",
//     reward: 150,
//     currency: currency.SCORE,
//     condition: (stats) => stats.fastFoundationChain >= 1,
//     modes: [
//       GAME_MODES_IDS.CLASSIC,
//       GAME_MODES_IDS.TIMED,
//       GAME_MODES_IDS.EXPERT,
//     ],
//     rarity: "rare",
//     hidden: true,
//   },
//   {
//     id: "perfect_vegas",
//     type: achievementsTypes.win,
//     life: "many",
//     title: "Идеальный Вегас",
//     description: "Победить в Вегасском режиме с положительным балансом",
//     icon: "💎",
//     reward: 45,
//     currency: currency.COINS,
//     condition: (stats) => stats.vegasPositiveWins >= 1,
//     modes: [GAME_MODES_IDS.VEGAS],
//     rarity: "uncommon",
//     hidden: false,
//   },
// ];

export const AchievementsRarities = {
  common: {
    name: "Обычное",
    color: "#95a5a6",
    chance: 0.6,
  },
  uncommon: {
    name: "Необычное",
    color: "#2ecc71",
    chance: 0.25,
  },
  rare: {
    name: "Редкое",
    color: "#3498db",
    chance: 0.1,
  },
  epic: {
    name: "Эпическое",
    color: "#9b59b6",
    chance: 0.04,
  },
  legendary: {
    name: "Легендарное",
    color: "#f1c40f",
    chance: 0.01,
  },
};

export const AudioAchievements = {
  UP_ACH: "up-achievements",
};
