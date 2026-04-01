import "./ItemsContainer.css";
import VolumeControl from "./Components/VolumeControl";
import ToggleSetting from "./Components/ToggleSetting";
import DealingCardsButtons from "./Components/DealingCardsButtons";
import SelectSetting from "./Components/SelectSetting";
import { GAME_MODES_IDS } from "../../../../Configs/GameModes";
import { LANGUAGES } from "../../../../Configs/TranslationConfigs";
import { gameSettingsTypes } from "../../../../Configs/SettingsConfigs";
import { useTranslation } from "react-i18next";

// Данные для выпадающих списков
const languageOptions = [
  { value: LANGUAGES.RU, label: "setting_lg_ru" },
  { value: LANGUAGES.EN, label: "setting_lg_en" },
  { value: LANGUAGES.TR, label: "setting_lg_tr" },
  { value: LANGUAGES.ABAZA, label: "setting_lg_ab" },
];

const gameModeOptions = [
  { value: GAME_MODES_IDS.CLASSIC, label: "modes_classic_btn" },
  { value: GAME_MODES_IDS.VEGAS, label: "modes_vegas_btn" },
  { value: GAME_MODES_IDS.TIMED, label: "modes_timed_btn" },
  { value: GAME_MODES_IDS.EXPERT, label: "modes_expert_btn" },
  { value: GAME_MODES_IDS.RELAXED, label: "modes_relax_btn" },
];

console.log("gameSettingsTypes: ", gameSettingsTypes);

function ItemsContainer() {
  const { t } = useTranslation();
  const ariaLabel = t("settings.settings_items_container");
  return (
    <div className="setting-items" title={ariaLabel} aria-label={ariaLabel}>
      <div className="setting-item">
        {/* Контрол громкости */}
        <VolumeControl settingType={gameSettingsTypes.volume} />

        {/* Переключатели */}
        <ToggleSetting
          id="settings-animations-toggle"
          label="span_animations_off_in"
          settingType={gameSettingsTypes.animations}
        />
        <ToggleSetting
          id="settings-music-toggle"
          label="span_music_off_in"
          settingType={gameSettingsTypes.music}
        />

        <ToggleSetting
          id="settings-sound-toggle"
          label="span_sound_off_in"
          settingType={gameSettingsTypes.soundEffects}
        />

        {/* Кнопки раздачи карт */}
        <DealingCardsButtons settingType={gameSettingsTypes.dealingCards} />

        {/* Переключатель с описанием */}
        <ToggleSetting
          id="assistance-in-collection"
          label="assistance_in_collection"
          settingType={gameSettingsTypes.assistanceInCollection}
          description="assistance_in_collection_p"
        />

        {/* Еще один переключатель с описанием */}
        <ToggleSetting
          id="assistance-in-card-click"
          label="assistance_in_card_click"
          settingType={gameSettingsTypes.assistanceInCardClick}
          description="assistance_in_card_click_p"
        />

        {/* Выпадающие списки */}
        <SelectSetting
          id="language-selected"
          label="ln_setting_item"
          settingType={gameSettingsTypes.language}
          options={languageOptions}
        />

        <SelectSetting
          id="modes-selected"
          label="modes_setting_item"
          settingType={gameSettingsTypes.gameMode}
          options={gameModeOptions}
        />
      </div>
    </div>
  );
}

export default ItemsContainer;
