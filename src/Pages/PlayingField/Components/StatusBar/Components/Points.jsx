import { useSelector } from "react-redux";
import StatusBarBaseComponent from "./StatusBarBaseComponent";
import {
  selectLifetimeByType,
  selectSessionByType,
} from "../../../../../Store/slices/game/selectors";
import {
  gameLifetimeStateTypes,
  gameSessionStateTypes,
} from "../../../../../Configs/GameConfigs";
import { useTranslation } from "react-i18next";

function Points() {
  const pointsLeftText = "🌟";
  const dealingCardsCount = useSelector((state) =>
    selectLifetimeByType(state, gameLifetimeStateTypes.deallingCardsCount),
  );
  const pointsSession = useSelector((state) =>
    selectSessionByType(state, gameSessionStateTypes.points),
  );
  console.log("pointsSession: ", pointsSession);
  const pointsCenterText = `x${dealingCardsCount?.count || 1}`;
  const pointsRightText = `: ${pointsSession?.count || 0}`;
  const { t } = useTranslation();
  const ariaLabel = t("playingField.status_bar_points");
  return (
    <StatusBarBaseComponent
      leftText={pointsLeftText}
      centerText={pointsCenterText}
      rightText={pointsRightText}
      ariaLabel={ariaLabel}
      isAnimationComponent={true}
      operation={pointsSession.data.operation}
    />
  );
}

export default Points;
