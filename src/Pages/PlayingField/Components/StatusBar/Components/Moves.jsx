import StatusBarBaseComponent from "./StatusBarBaseComponent";
import { useSelector } from "react-redux";
import { selectSessionByType } from "../../../../../Store/slices/game/selectors";
import { gameSessionStateTypes } from "../../../../../Configs/GameConfigs";
import { useTranslation } from "react-i18next";

function Moves() {
  const movesLeftText = "👣";
  const sessionMoves = useSelector((state) =>
    selectSessionByType(state, gameSessionStateTypes.moves),
  );
  console.log('Session Moves:', sessionMoves?.count);
  const movesRightText = `: ${sessionMoves?.count || 0}`;
  const { t } = useTranslation();
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
