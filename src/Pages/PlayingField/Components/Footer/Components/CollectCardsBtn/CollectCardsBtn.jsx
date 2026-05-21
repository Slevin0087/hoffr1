import "./CollectCardsBtn.css";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { handleCollectCards } from "../../../../../../Store/slices/game/thunks";
import { selectAnimationsEnabled } from "../../../../../../Store/slices/settings/selectors";
import { useDispatch, useSelector } from "react-redux";
import { setIsCollectCardsBtnVisible } from "../../../../../../Store/slices/ui/slice";
import { selectIsCollectCardsBtnVisible } from "../../../../../../Store/slices/ui/selectors";
import FooterBtn from "../FooterBtn";

function CollectCardsBtn() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isAnimationsEnabled = useSelector(selectAnimationsEnabled);
  const isCollectCardsBtnVisible = useSelector(selectIsCollectCardsBtnVisible);

  if (!isCollectCardsBtnVisible) return null;

  const onClick = () => {
    dispatch(handleCollectCards());
    dispatch(setIsCollectCardsBtnVisible(false));
  };

  return (
    <FooterBtn
      variant="dark"
      btnClassName="collect-cards-btn"
      onClick={onClick}
    >
      {isAnimationsEnabled ? (
        <motion.span
          className="collect-cards-btn-span"
          animate={{ scale: [1, 1.8, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {/* 📦 */}
          {t("playingField.footer_collect_cards_btn")}
        </motion.span>
      ) : (
        t("playingField.footer_collect_cards_btn")
      )}
    </FooterBtn>
  );
}

export default CollectCardsBtn;
