import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectIsCanUseHint } from "../../../../../../Store/slices/game/selectors/hints";
import { handleHints } from "../../../../../../Store/slices/game/thunks/hints";

function Hints() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isCanUse = useSelector(selectIsCanUseHint);
  console.log("Hints isCanUse", isCanUse);
  const ariaLabel = t("playingField.footer_hints");

  return (
    <Button
      variant="outline-dark"
      className="footer-btn"
      title={ariaLabel}
      aria-label={ariaLabel}
      onClick={() => dispatch(handleHints())}
      disabled={!isCanUse}
    >
      💡
    </Button>
  );
}

export default Hints;
