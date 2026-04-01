import "./ToggleSetting.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectSettingsByType } from "../../../../../Store/slices/settings/selectors";
import { updateSettingByType } from "../../../../../Store/slices/settings/slice";

function ToggleSetting({ id, label, settingType, description = "" }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const settingData = useSelector((state) =>
    selectSettingsByType(state, settingType),
  );
  const handleToggle = (value) => {
    dispatch(updateSettingByType({ type: settingType, changes: { value } }));
  };
  const isChecked = settingData.value;
  const labetText = t(`settings.${label}`);
  const descriptionText = description ? t(`settings.${description}`) : "";
  const ariaLabel = `${labetText} ${descriptionText}`;
  return (
    <div
      className="container-setting-item"
      title={ariaLabel}
      aria-label={ariaLabel}
    >
      <div className="setting-item-description-div">
        <span className="setting-item-description-label">{labetText}</span>
        {description && (
          <p className="setting-item-description-p">{descriptionText}</p>
        )}
      </div>
      <label className="setting-toggle-label">
        <input
          type="checkbox"
          id={id}
          className="setting-toggle-checkbox"
          checked={isChecked}
          onChange={(e) => handleToggle(e.target.checked)}
        />

        {/* Трек (фон) */}
        <div className="setting-toggle-track" />
        {/* Ползунок */}
        <span className="setting-toggle-slider" />
      </label>
    </div>
  );
}

export default ToggleSetting;
