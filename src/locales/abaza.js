import inputPlayerNameAbaza from "./InputPlayerName/abaza.js";
import greetingsAbaza from "./Greetings/abaza.js";
import gameRulesAbaza from "./GameRules/abaza.js";
import gameModesAbaza from "./GameModes/abaza.js";
import settingsAbaza from "./Settings/abaza.js";
import menuAbaza from "./Menu/abaza.js";
import shopAbaza from "./Shop/abaza.js";
import playingFieldAbaza from "./PlayingField/abaza.js";
import btnToMenuAbaza from "./BtnToMenu/abaza.js";

export default {
  translation: {
    inputPlayerName: { ...inputPlayerNameAbaza },
    greetings: { ...greetingsAbaza },
    gameRules: { ...gameRulesAbaza },
    gameModes: { ...gameModesAbaza },
    settings: { ...settingsAbaza },
    menu: { ...menuAbaza },
    shop: { ...shopAbaza },
    playingField: { ...playingFieldAbaza },
    btnToMenu: { ...btnToMenuAbaza },
  },
};
