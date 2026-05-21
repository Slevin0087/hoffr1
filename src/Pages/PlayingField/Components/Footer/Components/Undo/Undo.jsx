import "./Undo.css";
import FooterBtn from "../FooterBtn";
import { useDispatch, useSelector } from "react-redux";
import { handleUndo } from "../../../../../../Store/slices/game/thunks/undo";
import { useTranslation } from "react-i18next";
import {
  selectIsCanUseUndo,
  selectUndoLimit,
} from "../../../../../../Store/slices/game/selectors/undo";
import { selectRemainingUndo } from "../../../../../../Store/slices/game/selectors/undo";
import { resetUndoUsed } from "../../../../../../Store/slices/game/slice";
function Undo() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const undoLimit = useSelector(selectUndoLimit);
  const remainingUndo = useSelector(selectRemainingUndo);
  const isCanUse = useSelector(selectIsCanUseUndo);

  const onClick = () => {
    console.log("Undo onClick");
    if (remainingUndo === 0) {
      dispatch(resetUndoUsed());
      return;
    }
    dispatch(handleUndo());
  };

  const ariaLabel = t("playingField.footer_undo");

  return (
      <FooterBtn
        variant="info"
        btnClassName="undo"
        ariaLabel={ariaLabel}
        onClick={onClick}
        disabled={!isCanUse && remainingUndo > 0}
      >
      <span className="undo-btn-span">
        {undoLimit === null
          ? "∞"
          : remainingUndo > 0
            ? remainingUndo
            : `+${undoLimit}`}
        {/* ♾️ */}
      </span>
        ↩
      </FooterBtn>
  );
}

export default Undo;
