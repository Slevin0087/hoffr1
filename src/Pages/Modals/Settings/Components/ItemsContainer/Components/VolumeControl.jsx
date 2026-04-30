import "./VolumeControl.css";
import { useTranslation } from "react-i18next";
import { selectSettingsByType } from "../../../../../../Store/slices/settings/selectors";
import { useDispatch, useSelector } from "react-redux";
import { updateSettingByType } from "../../../../../../Store/slices/settings/slice";

function VolumeControl(props) {
  const { settingType } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const settingData = useSelector((state) =>
    selectSettingsByType(state, settingType),
  );
  const handleVolumeChange = (value) => {
    dispatch(updateSettingByType({ type: settingType, changes: { value } }));
  };
  const volume = settingData.value;
  const labetText = t("settings.globally_volume");
  const ariaLabal = `${labetText} ${t("settings.selected_value")} ${volume}`;
  return (
    <div
      className="volume-control container-setting-item"
      title={ariaLabal}
      aria-label={ariaLabal}
    >
      <span className="span-volume-change setting-item-description-label">
        {labetText}
      </span>
      <input
        type="range"
        id="music-volume"
        className="globally-volume"
        min="0"
        max="100"
        step="20"
        value={volume}
        onChange={(e) => handleVolumeChange(e.target.value)}
        style={{ "--fill-percent": `${volume}%` }}
      />
    </div>
  );
}

export default VolumeControl;
