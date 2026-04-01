import inputPlayerNameRu from "./InputPlayerName/ru.js";
import greetingsRu from "./Greetings/ru.js";
import gameRulesRu from "./GameRules/ru.js";
import gameModesRu from "./GameModes/ru.js";
import settingsRu from "./Settings/ru.js";
import menuRu from "./Menu/ru.js";
import shopRu from "./Shop/ru.js";
import playingFieldRu from "./PlayingField/ru.js";
import btnToMenuRu from "./BtnToMenu/ru.js";

export default {
  translation: {
    inputPlayerName: { ...inputPlayerNameRu },
    greetings: { ...greetingsRu },
    gameRules: { ...gameRulesRu },
    gameModes: { ...gameModesRu },
    settings: { ...settingsRu },
    menu: { ...menuRu },
    shop: { ...shopRu },
    playingField: { ...playingFieldRu },
    btnToMenu: { ...btnToMenuRu },
  },
};
