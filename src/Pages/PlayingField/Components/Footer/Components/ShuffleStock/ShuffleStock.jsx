import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { handleShuffle } from "../../../../../../Store/slices/game/thunks";
import {
  selectIsPileEmpty,
  selectStockId,
  selectWasteId,
} from "../../../../../../Store/slices/decks/selectors";
import { useTranslation } from "react-i18next";
import { dealingCounts } from "../../../../../../Configs/GameConfigs";
import { selectGameCurrentDealing } from "../../../../../../Store/slices/game/selectors";

function ShuffleStock() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const stockId = useSelector(selectStockId);
  const wasteId = useSelector(selectWasteId);
  const currentDealing = useSelector(selectGameCurrentDealing);
  const isStockEmpty = useSelector((state) =>
    selectIsPileEmpty(state, stockId),
  );
  const isWasteEmpty = useSelector((state) =>
    selectIsPileEmpty(state, wasteId),
  );

  const ariaLabel = t("playingField.footer_shuffle");

  if (currentDealing !== dealingCounts.three) return null;

  return (
    <Button
      variant="outline-dark"
      className="footer-btn"
      onClick={() => dispatch(handleShuffle({ stockId }))}
      title={ariaLabel}
      aria-label={ariaLabel}
      disabled={
        (isStockEmpty && !isWasteEmpty) ||
        (!isStockEmpty && !isWasteEmpty) ||
        (isStockEmpty && isWasteEmpty)
      }
    >
      🔀
    </Button>
  );
}

export default ShuffleStock;
