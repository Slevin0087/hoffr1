import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
// import { useGameHints } from "../../../../../../hooks/useGameHints";
// import { useDispatch } from "react-redux";
// import { setGameStatus } from "../../../../../../Store/slices/gameSlice";

function Hints() {
  // const { findPossibleMoves } = useGameHints();
  // const dispatch = useDispatch();

  // const handleHint = () => {
  //   const move = findPossibleMoves();
  //   if (move) {
  //     console.log("Possible move:", move);
  //     // We could also highlight the card and the destination
  //   } else {
  //     dispatch(setGameStatus('lost'));
  //   }
  // };

  // return <Button className="footer-btn" onClick={handleHint}>💡</Button>;
  const { t } = useTranslation();
  const ariaLabel = t("playingField.footer_hints");
  return (
    <Button className="footer-btn" title={ariaLabel} aria-label={ariaLabel}>
      💡
    </Button>
  );
}

export default Hints;
