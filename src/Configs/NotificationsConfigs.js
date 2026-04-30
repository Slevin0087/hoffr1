export const notifications_ids = {
  game_is_ready: "game_is_ready",
  game_over: "game_over",
  combo: "combo",
  combo_seconds: "combo_seconds",
  cards_shuffled: "cards_shuffled",
  points_record: "points_record",
};

export const notificationsMap = {
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
  [notifications_ids.combo]: {
    id: notifications_ids.combo,
    messageKey: "combo",
    messageFormatter: (value) => ({ value }), // параметры для интерполяции
    type: "success",
    duration: 2000,
    icon: "",
  },
  [notifications_ids.combo_seconds]: {
    id: notifications_ids.combo_seconds,
    messageKey: "combo_seconds",
    messageFormatter: (seconds) => ({ seconds }),
    type: "success",
    duration: 1500,
    icon: "",
  },
  [notifications_ids.cards_shuffled]: {
    id: notifications_ids.cards_shuffled,
    messageKey: "cards_shuffled",
    type: "success",
    duration: 3000,
    icon: "✓",
  },
  [notifications_ids.points_record]: {
    id: notifications_ids.points_record,
    messageKey: "points_record",
    messageFormatter: (points) => ({ points }),
    type: "success",
    duration: 3000,
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
    duration: null, // бесконечное, пока не закроют
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
