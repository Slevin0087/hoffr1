import { Howl } from "howler";

const BASE_URL = import.meta.env.BASE_URL;

export const AudioName = {
  BACKGROUND: "background",
  CARD_FLIP: "card-flip",
  CARD_MOVE: "card-move",
  CLICK: "click",
  INFO: "info",
  WIN: "win",
  UP_SCORE: "up-score",
  SHOCK: "shock",
  SHUFFLE: "shuffle",
};

// Предзагрузка всех звуков
export const sounds = {
  [AudioName.CLICK]: new Howl({
    src: [`${BASE_URL}/sounds/click.mp3`],
    volume: 0.5,
  }),
  [AudioName.CARD_FLIP]: new Howl({
    src: [`${BASE_URL}/sounds/card-flip.mp3`],
    volume: 0.5,
  }),
  [AudioName.CARD_MOVE]: new Howl({
    src: [`${BASE_URL}/sounds/card-move.mp3`],
    volume: 0.5,
  }),
  [AudioName.WIN]: new Howl({
    src: [`${BASE_URL}/sounds/win.mp3`],
    volume: 0.7,
  }),
  [AudioName.UP_SCORE]: new Howl({
    src: [`${BASE_URL}/sounds/up-score.mp3`],
    volume: 0.5,
  }),
  [AudioName.SHUFFLE]: new Howl({
    src: [`${BASE_URL}/sounds/shuffle.mp3`],
    volume: 0.5,
  }),
  [AudioName.BACKGROUND]: new Howl({
    src: [`${BASE_URL}/sounds/background.mp3`],
    loop: true,
    volume: 0.5,
  }),
};

export const playSound = (soundName) => {
  try {
    sounds[soundName]?.play();
  } catch (error) {
    console.error(`Failed to play sound: ${soundName}`, error);
  }
};

// Для отладки
export const setVolume = (soundName, volume) => {
  sounds[soundName]?.volume(volume);
};

export const setAllVolume = (volume) => {
  Object.values(sounds).forEach((sound) => sound?.volume(volume));
};
