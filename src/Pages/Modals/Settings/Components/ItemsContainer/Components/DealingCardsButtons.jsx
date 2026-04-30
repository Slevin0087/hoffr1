import "./DealingCardsButtons.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectSettingsByType } from "../../../../../../Store/slices/settings/selectors";
import { updateSettingByType } from "../../../../../../Store/slices/settings/slice";
import { dealingCounts } from "../../../../../../Configs/GameConfigs";

function DealingCardsButtons(props) {
  const { settingType } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const settingData = useSelector((state) =>
    selectSettingsByType(state, settingType),
  );
  const handleButtonClick = (value) => {
    dispatch(updateSettingByType({ type: settingType, changes: { value } }));
  };
  const activeOption = settingData.value;
  const isDealingCardsCountsOne = activeOption === dealingCounts.one;
  const isDealingCardsCountsThree = activeOption === dealingCounts.three;
  const labelText = t("settings.dealing_cards");
  const ariaLabel = `${labelText} ${t("settings.selected_value")} ${activeOption}`;
  return (
    <div
      className="container-setting-item"
      title={ariaLabel}
      aria-label={ariaLabel}
    >
      <span className="setting-item-description-label">{labelText}</span>
      <div className="dealing-cards-btns">
        <button
          type="button"
          onClick={() => handleButtonClick(dealingCounts.one)}
          className={isDealingCardsCountsOne ? "active-dealing-cards-btn" : ""}
          disabled={isDealingCardsCountsOne}
        >
          {dealingCounts.one}
        </button>
        <button
          type="button"
          onClick={() => handleButtonClick(dealingCounts.three)}
          className={
            isDealingCardsCountsThree ? "active-dealing-cards-btn" : ""
          }
          disabled={isDealingCardsCountsThree}
        >
          {dealingCounts.three}
        </button>
      </div>
    </div>
  );
}

export default DealingCardsButtons;
