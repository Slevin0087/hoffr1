import StatusBarBaseComponent from "./StatusBarBaseComponent";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getResultTime } from "../../../../../utils/gameSliceUtils";
import { selectCurrentTime } from "../../../../../Store/slices/game/selectors/time";

function Time() {
  const { t } = useTranslation();
  const sessionTime = useSelector(selectCurrentTime);
  const resultTime = getResultTime(sessionTime);

  const timeLeftText = "🕰️";
  const ariaLabel = t("playingField.status_bar_time");

  return (
    <StatusBarBaseComponent
      leftText={timeLeftText}
      rightText={resultTime}
      ariaLabel={ariaLabel}
    />
  );
}

export default Time;
