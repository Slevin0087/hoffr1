import { COMBO_WINDOW } from "./ComboConfigs";

export const notifications_ids = {
  game_initing: "game_initing",
  game_is_ready: "game_is_ready",
  game_over: "game_over",
  combo_increment: "combo_increment",
  combo_bonus_time: "combo_bonus_time",
  cards_shuffled: "cards_shuffled",
  points_record: "points_record",
  best_points: "best_points",
};

export const notificationsMap = {
  [notifications_ids.game_initing]: {
    id: notifications_ids.game_initing,
    messageKey: "game_initing",
    type: "success",
    duration: null,
    icon: "",
  },
  [notifications_ids.game_is_ready]: {
    id: notifications_ids.game_is_ready,
    messageKey: "game_is_ready",
    type: "success",
    duration: null,
    icon: "✓",
  },
  [notifications_ids.game_over]: {
    id: notifications_ids.game_over,
    messageKey: "game_over",
    type: "success",
    duration: null,
    icon: "",
  },
  [notifications_ids.combo_increment]: {
    id: notifications_ids.combo_increment,
    messageKey: "combo",
    messageFormatter: (params) => ({ value: params.value }),
    type: "combo",
    duration: COMBO_WINDOW, // показывается постоянно, пока не заменено/сброшено
    icon: "⚡",
    priority: 10, // высокий приоритет
  },
  [notifications_ids.combo_bonus_time]: {
    id: notifications_ids.combo_bonus_time,
    messageKey: "combo_seconds",
    messageFormatter: (params) => ({ seconds: params.seconds }),
    type: "combo_bonus",
    duration: 1000,
    icon: "⏱️",
    priority: 5,
  },
  [notifications_ids.cards_shuffled]: {
    id: notifications_ids.cards_shuffled,
    messageKey: "cards_shuffled",
    type: "success",
    duration: 3000,
    icon: "✓",
  },
  [notifications_ids.best_points]: {
    id: notifications_ids.best_points,
    messageKey: "best_points",
    messageFormatter: (params) => ({ value: params.value }),
    type: "success",
    duration: null,
    icon: "",
  },
  save_success: {
    id: "save-success",
    message: "Изменения сохранены",
    type: "success",
    duration: 3000,
    icon: "✓",
  },
  error_500: {
    id: "error-500",
    message: "Ошибка сервера. Попробуйте позже",
    type: "error",
    duration: 5000,
    icon: "⚠",
  },
  loading_data: {
    id: "loading-data",
    message: "Загрузка данных...",
    type: "info",
    duration: null,
    icon: "⟳",
  },
  connection_lost: {
    id: "connection-lost",
    message: "Потеряно соединение",
    type: "warning",
    duration: 4000,
    icon: "📡",
  },
};
