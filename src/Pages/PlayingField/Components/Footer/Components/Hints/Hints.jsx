import "./Hints.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRemainingHints,
  selectIsCanUseHint,
  selectHintsLimit,
} from "../../../../../../Store/slices/game/selectors/hints";
import { handleHints } from "../../../../../../Store/slices/game/thunks/hints";
import FooterBtn from "../FooterBtn";
import { resetHintsUsed } from "../../../../../../Store/slices/game/slice";

function Hints() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const hintsLimit = useSelector(selectHintsLimit);
  const remainingHints = useSelector(selectRemainingHints);
  const isCanUse = useSelector(selectIsCanUseHint);
  console.log("Hints isCanUse", isCanUse);
  const ariaLabel = t("playingField.footer_hints");

  const onClick = () => {
    if (remainingHints === 0) {
      dispatch(resetHintsUsed());
      return;
    }
    console.log("Hints onClick: ", remainingHints, hintsLimit);
    dispatch(handleHints());
  };

  return (
    <FooterBtn
      variant="dark"
      btnClassName="hints"
      ariaLabel={ariaLabel}
      onClick={onClick}
      disabled={!isCanUse && remainingHints > 0}
    >
      <span className="hints-btn-span">
        {hintsLimit === null
          ? "∞"
          : remainingHints > 0
            ? remainingHints
            : `+${hintsLimit}`}
        {/* ♾️ */}
      </span>
      💡
    </FooterBtn>
  );
}

export default Hints;
