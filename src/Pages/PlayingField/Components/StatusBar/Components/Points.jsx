import StatusBarBaseComponent from "./StatusBarBaseComponent";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  selectCurrentPoints,
  selectPrevCurrentPoints,
} from "../../../../../Store/slices/game/selectors/points";
import { selectGameCurrentDealing } from "../../../../../Store/slices/game/selectors";
import { scoreOperations } from "../../../../../Configs/GameConfigs";

function Points() {
  console.log('Points render');
  const { t } = useTranslation();
  const pointsSession = useSelector(selectCurrentPoints);
  const prevPointsSession = useSelector(selectPrevCurrentPoints);
  const dealingCardsCount = useSelector(selectGameCurrentDealing);

  const operation =
    pointsSession > prevPointsSession
      ? scoreOperations.increment
      : scoreOperations.decrement;

  const pointsLeftText = "🌟";
  const pointsCenterText = `x${dealingCardsCount || 1}`;
  const pointsRightText = `: ${pointsSession || 0}`;

  const ariaLabel = t("playingField.status_bar_points");

  return (
    <StatusBarBaseComponent
      leftText={pointsLeftText}
      centerText={pointsCenterText}
      rightText={pointsRightText}
      ariaLabel={ariaLabel}
      isAnimationComponent={true}
      operation={operation}
    />
  );
}

export default Points;
