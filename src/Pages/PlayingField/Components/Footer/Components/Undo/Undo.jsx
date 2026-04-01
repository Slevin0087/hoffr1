import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { undoUse } from "../../../../../../Store/slices/undo/thunks";
import { useTranslation } from "react-i18next";

function Undo() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const ariaLabel = t("playingField.footer_undo");
  const undoClick = () => {
    console.log("undoClick");

    dispatch(undoUse());
  };
  return (
    <Button
      className="footer-btn"
      onClick={undoClick}
      title={ariaLabel}
      aria-label={ariaLabel}
    >
      ↩
    </Button>
  );
}

export default Undo;
