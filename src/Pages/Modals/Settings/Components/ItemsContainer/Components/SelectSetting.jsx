import "./SelectSetting.css";
import { useTranslation } from "react-i18next";
import { updateSettingByType } from "../../../../../../Store/slices/settings/slice";
import { selectSettingsByType } from "../../../../../../Store/slices/settings/selectors";
import { useDispatch, useSelector } from "react-redux";

function SelectSetting({ id, label, settingType, options }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const settingData = useSelector((state) =>
    selectSettingsByType(state, settingType),
  );
  const handleChange = (value) => {
    dispatch(updateSettingByType({ type: settingType, changes: { value } }));
  };
  const labelText = t(`settings.${label}`);
  const currentValueTranslation = options.find(
    (option) => option.value === settingData?.value,
  )?.label;
  const atiaLabel = `${labelText} ${t("settings.selected_value")} ${t(`settings.${currentValueTranslation}`)}`;
  return (
    <div
      className="container-setting-item"
      title={atiaLabel}
      aria-label={atiaLabel}
    >
      <span className="setting-item-description-label">{labelText}</span>
      <select
        id={id}
        className="setting-select-item"
        defaultValue={settingData?.value}
        onChange={(e) => handleChange(e.target.value)}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="setting-select-item-option"
          >
            {t(`settings.${option.label}`)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectSetting;
