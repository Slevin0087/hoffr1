import "./ItemsContainer.css";
import VolumeControl from "./Components/VolumeControl";
import ToggleSetting from "./Components/ToggleSetting";
import DealingCardsButtons from "./Components/DealingCardsButtons";
import SelectSetting from "./Components/SelectSetting";
import { GAME_MODES_IDS } from "../../../../../Configs/GameModes";
import { LANGUAGES } from "../../../../../Configs/TranslationConfigs";
import { gameSettingsTypes } from "../../../../../Configs/SettingsConfigs";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import { useState } from "react";

// Данные для выпадающих списков
const languageOptions = [
  { value: LANGUAGES.RU, label: "setting_lg_ru" },
  { value: LANGUAGES.EN, label: "setting_lg_en" },
  { value: LANGUAGES.TR, label: "setting_lg_tr" },
  { value: LANGUAGES.ABAZA, label: "setting_lg_ab" },
];

const gameModeOptions = [
  { value: GAME_MODES_IDS.CLASSIC, label: "modes_classic_btn" },
  // { value: GAME_MODES_IDS.VEGAS, label: "modes_vegas_btn" },
  { value: GAME_MODES_IDS.TIMED, label: "modes_timed_btn" },
  // { value: GAME_MODES_IDS.EXPERT, label: "modes_expert_btn" },
  { value: GAME_MODES_IDS.RELAXED, label: "modes_relax_btn" },
];

console.log("gameSettingsTypes: ", gameSettingsTypes);

function ItemsContainer() {
  const { t } = useTranslation();
  const [infoShow, setInfoShow] = useState(false);

  const openInfoModal = () => setInfoShow(true);

  const closeInfoModal = () => setInfoShow(false);

  const ariaLabel = t("settings.settings_items_container");

  return (
    <>
      <div className="setting-items" title={ariaLabel} aria-label={ariaLabel}>
        {/* Контрол громкости */}
        {/* <VolumeControl settingType={gameSettingsTypes.volume} /> */}

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
          settingType={gameSettingsTypes.soundsEffects}
        />

        {/* Кнопки раздачи карт */}
        <DealingCardsButtons
          settingType={gameSettingsTypes.dealingCards}
          openInfoModal={openInfoModal}
        />

        {/* Переключатель с описанием */}
        <ToggleSetting
          id="assistance-in-collection"
          label="assistance_in_collection"
          settingType={gameSettingsTypes.fastGame}
          description="assistance_in_collection_p"
        />

        {/* Еще один переключатель с описанием */}
        <ToggleSetting
          id="assistance-in-card-click"
          label="assistance_in_card_click"
          settingType={gameSettingsTypes.canCardClick}
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
          openInfoModal={openInfoModal}
        />
      </div>
      {infoShow && (
        <div className="setting-info-modal-small">
          <div className="setting-info-modal-small-content">
            <p className="setting-info-modal-small-p">
              {t("settings.info_modal_small_p")}
            </p>
            <Button variant="secondary" onClick={closeInfoModal}>
              {t("settings.info_modal_small_btn")}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default ItemsContainer;
