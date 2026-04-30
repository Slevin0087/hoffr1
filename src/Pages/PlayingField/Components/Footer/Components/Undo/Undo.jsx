import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { handleUndo } from "../../../../../../Store/slices/game/thunks/undo";
import { useTranslation } from "react-i18next";
import { selectIsCanUseUndo } from "../../../../../../Store/slices/game/selectors/undo";

function Undo() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isCanUse = useSelector(selectIsCanUseUndo);

  const ariaLabel = t("playingField.footer_undo");

  return (
    <Button
      variant="info"
      className="footer-btn"
      onClick={() => dispatch(handleUndo())}
      title={ariaLabel}
      aria-label={ariaLabel}
      disabled={!isCanUse}
    >
      ↩
    </Button>
  );
}

export default Undo;
