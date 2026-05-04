// Время (мс), в течение которого следующий ход считается комбо
export const COMBO_WINDOW = 1500;
// Максимальное значение счётчика комбо
export const COMBO_MAX_COUNT = 10;
// Сколько секунд времени добавлять за каждый уровень комбо

export const COMBO_LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const COMBO_BONUS_TIMES = {
  [COMBO_LEVELS[0]]: 3,
  [COMBO_LEVELS[1]]: 5,
  [COMBO_LEVELS[2]]: 8,
  [COMBO_LEVELS[3]]: 10,
  [COMBO_LEVELS[4]]: 12,
  [COMBO_LEVELS[5]]: 15,
  [COMBO_LEVELS[6]]: 18,
  [COMBO_LEVELS[7]]: 21,
  [COMBO_LEVELS[8]]: 25,
  [COMBO_LEVELS[9]]: 30,
};

export const COMBO_BONUS_COLORS = {
  [COMBO_LEVELS[0]]: "#ff0000",
  [COMBO_LEVELS[1]]: "#ffaa00",
  [COMBO_LEVELS[2]]: "#ffff00",
  [COMBO_LEVELS[3]]: "#00ff00",
  [COMBO_LEVELS[4]]: "#00ffff",
  [COMBO_LEVELS[5]]: "#0000ff",
  [COMBO_LEVELS[6]]: "#ff00ff",
  [COMBO_LEVELS[7]]: "#ff00ff",
  [COMBO_LEVELS[8]]: "#ff00ff",
  [COMBO_LEVELS[9]]: "#ff00ff",
};
