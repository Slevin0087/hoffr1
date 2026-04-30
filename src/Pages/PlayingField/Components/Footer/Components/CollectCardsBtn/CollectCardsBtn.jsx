import "./CollectCardsBtn.css";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { handleCollectCards } from "../../../../../../Store/slices/game/thunks";
import {
  selectAnimationsEnabled,
  selectSettingsByType,
} from "../../../../../../Store/slices/settings/selectors";
import { useDispatch, useSelector } from "react-redux";
import { setIsCollectCardsBtnVisible } from "../../../../../../Store/slices/ui/slice";
import { selectIsCollectCardsBtnVisible } from "../../../../../../Store/slices/ui/selectors";
import { gameSettingsTypes } from "../../../../../../Configs/SettingsConfigs";

function CollectCardsBtn() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const settingType = gameSettingsTypes.assistanceInCollection;
  const isAnimationsEnabled = useSelector(selectAnimationsEnabled);
  const isCollectCardsBtnVisible = useSelector(selectIsCollectCardsBtnVisible);
  const isAssistanceInCollection = useSelector((state) =>
    selectSettingsByType(state, settingType),
  );
  console.log('isCollectCardsBtnVisible isAssistanceInCollection?.value: ', isCollectCardsBtnVisible, isAssistanceInCollection?.value);
  if (!isCollectCardsBtnVisible || isAssistanceInCollection?.value) return null;
  const onClick = () => {
    dispatch(handleCollectCards());
    dispatch(setIsCollectCardsBtnVisible(false));
  };
  
  return (
    <Button className="collect-cards-btn footer-btn" onClick={onClick}>
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
    </Button>
  );
}

export default CollectCardsBtn;
