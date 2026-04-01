import StatusBarBaseComponent from "./StatusBarBaseComponent";
import { useSelector } from "react-redux";
import { selectSessionByType } from "../../../../../Store/slices/game/selectors";
import { gameSessionStateTypes } from "../../../../../Configs/GameConfigs";
import { useTranslation } from "react-i18next";

function Time() {
  const timeLeftText = "🕰️";
  const sessionTime = useSelector((state) =>
    selectSessionByType(state, gameSessionStateTypes.time),
  );
  const timeRightText = `${sessionTime?.count || "00:00"}`;
  const { t } = useTranslation();
  const ariaLabel = t("playingField.status_bar_time");
  return (
    <StatusBarBaseComponent
      leftText={timeLeftText}
      rightText={timeRightText}
      ariaLabel={ariaLabel}
    />
  );
}

export default Time;
