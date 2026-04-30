import StatusBarBaseComponent from "./StatusBarBaseComponent";
import { useSelector } from "react-redux";
import { selectAchieventActiveId } from "../../../../../Store/slices/achievements/selectors";
import { getAchIconById } from "../../../../../utils/achievementsUtils";
import { useTranslation } from "react-i18next";

function Achievement() {
  const achievementLeftText = "🏆";
  const activeId = useSelector(selectAchieventActiveId);
  const activeIcon = getAchIconById(activeId);
  const achievementRightText = `: ${activeIcon}`;
  const { t } = useTranslation();
  const ariaLabel = t("playingField.status_bar_achievement");
  return (
    <StatusBarBaseComponent
      leftText={achievementLeftText}
      rightText={achievementRightText}
      ariaLabel={ariaLabel}
    />
  );
}

export default Achievement;
