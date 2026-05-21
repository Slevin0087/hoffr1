import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { handleShuffle } from "../../../../../../Store/slices/game/thunks";
import {
  selectHasStockMoreOneCardId,
  selectHasWasteMoreOneCardId,
} from "../../../../../../Store/slices/decks/selectors";
import { useTranslation } from "react-i18next";
import { dealingCounts } from "../../../../../../Configs/GameConfigs";
import {
  selectGameCurrentDealing,
  selectIsCanRedeals,
} from "../../../../../../Store/slices/game/selectors";
import FooterBtn from "../FooterBtn";

function ShuffleStock() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentDealing = useSelector(selectGameCurrentDealing);
  const isCanRedeals = useSelector(selectIsCanRedeals);

  const hasStockMoreOneCardId = useSelector(selectHasStockMoreOneCardId);
  const hasWasteMoreOneCardId = useSelector(selectHasWasteMoreOneCardId);

  const ariaLabel = t("playingField.footer_shuffle");

  const onClickShuffle = () => dispatch(handleShuffle());

  if (currentDealing !== dealingCounts.three) return null;

  return (
    <FooterBtn
      variant="dark"
      btnClassName="shuffle-stock"
      onClick={onClickShuffle}
      aria-label={ariaLabel}
      disabled={
        !isCanRedeals || (!hasStockMoreOneCardId && !hasWasteMoreOneCardId)
      }
    >
      🔀
    </FooterBtn>
  );
}

export default ShuffleStock;
