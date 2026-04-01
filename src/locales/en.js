import inputPlayerNameEn from "./InputPlayerName/en.js";
import greetingsEn from "./Greetings/en.js";
import gameRulesEn from "./GameRules/en.js";
import gameModesEn from "./GameModes/en.js";
import settingsEn from "./Settings/en.js";
import menuEn from "./Menu/en.js";
import shopEn from "./Shop/en.js";
import playingFieldEn from "./PlayingField/en";
import btnToMenuEn from "./BtnToMenu/en.js";

export default {
  translation: {
    inputPlayerName: { ...inputPlayerNameEn },
    greetings: { ...greetingsEn },
    gameRules: { ...gameRulesEn },
    gameModes: { ...gameModesEn },
    settings: { ...settingsEn },
    menu: { ...menuEn },
    shop: { ...shopEn },
    playingField: { ...playingFieldEn },
    btnToMenu: { ...btnToMenuEn },
  },
};
