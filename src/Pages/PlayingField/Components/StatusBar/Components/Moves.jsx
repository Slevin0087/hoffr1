import StatusBarBaseComponent from "./StatusBarBaseComponent";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { selectCurrentMoves } from "../../../../../Store/slices/game/selectors/moves";

function Moves() {
  const { t } = useTranslation();
  const sessionMoves = useSelector(selectCurrentMoves);
  console.log('Moves sessionMoves', sessionMoves);
  const movesLeftText = "👣";
  const movesRightText = `: ${sessionMoves || 0}`;

  const ariaLabel = t("playingField.status_bar_moves");

  return (
    <StatusBarBaseComponent
      leftText={movesLeftText}
      rightText={movesRightText}
      ariaLabel={ariaLabel}
      isAnimationComponent={true}
    />
  );
}

export default Moves;
