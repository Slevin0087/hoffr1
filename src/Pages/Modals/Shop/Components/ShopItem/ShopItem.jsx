import "./ShopItem.css";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Badge } from "react-bootstrap";
import { Check } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { setActiveIdAppearanceByType } from "../../../../../Store/slices/appearances/slice";
import { calculateFacesPosition } from "../../../../../utils/facesUtils";
import {
  PLAYING_CARD_SUITS,
  PLAYING_CARD_VALUES,
} from "../../../../../Configs/PlayingCardsConfigs/PlayingCardsConfigs";
import { useTranslation } from "react-i18next";
import { APPEARANCES_TYPES } from "../../../../../Configs/AppearancesConfigs";
import {
  selectAppearancesActiveIdByType,
  selectAppearancesUnlockedsIdsByType,
} from "../../../../../Store/slices/appearances/selectors";
import { selectlifetimePoints } from "../../../../../Store/slices/game/selectors/points";

function ShopItem({ index, item, categoryId }) {
  const { id, img, requiredPoints } = item;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const activeId = useSelector((state) =>
    selectAppearancesActiveIdByType(state, categoryId),
  );

  const unlockedsItemsIds = useSelector((state) =>
    selectAppearancesUnlockedsIdsByType(state, categoryId),
  );

  const lifetimePoints = useSelector(selectlifetimePoints);

  const isActive = item.id === activeId;
  const isUnlocked = unlockedsItemsIds.includes(item.id);

  const getBackgroundStyles = () => {
    const result = {
      backgroundImage: "",
      backgroundPosition: "0% 0%",
      backgroundSize: "100% 100%",
    };
    if (!img || !img.path) return result;
    result.backgroundImage = `url(${img.path})`;
    switch (categoryId) {
      case APPEARANCES_TYPES.FACES: {
        const facePosition = calculateFacesPosition(
          PLAYING_CARD_SUITS.HEARTS,
          PLAYING_CARD_VALUES[12],
          img.manyColumns,
          img.manyLines,
        );
        const faceBackgroundSize = `calc(100% * ${img.manyColumns}) calc(100% * ${img.manyLines})`;
        result.backgroundPosition = `${facePosition.x}% ${facePosition.y}%`;
        result.backgroundSize = faceBackgroundSize;
        return result;
      }
      case APPEARANCES_TYPES.SHIRTS: {
        return result;
      }
      case APPEARANCES_TYPES.FONS: {
        result.backgroundSize = "cover";
        return result;
      }
      default:
        return result;
    }
  };

  const handleSetActive = () => {
    dispatch(setActiveIdAppearanceByType({ type: categoryId, id }));
  };

  const backgroundStyles = getBackgroundStyles();

  const handleClick = () => {
    if (isUnlocked) handleSetActive();
    return;
  };

  const ariaLabelSelected = t("shop.selected");
  const ariaLabelInStock = t("shop.owned_badge_in_stock");
  const ariaLabelIsSelected = isActive ? ariaLabelSelected : ariaLabelInStock;
  const ariaLabelSelectedAndInStock = `${isUnlocked ? ariaLabelIsSelected : `${requiredPoints} очков`}`;

  const pointsProgress =
    requiredPoints > 0
      ? Math.min((lifetimePoints / requiredPoints) * 100, 100)
      : 100;

  return (
    <motion.div
      className={`shop-item-container ${item.type}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ delay: index * 0.01, duration: 0.1 }}
      style={{ pointerEvents: isUnlocked ? "auto" : "none" }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyUp={(e) => {
        console.log("onKeyUp e.key: ", e.key);
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
      title={ariaLabelSelectedAndInStock}
      aria-label={`${id} - ${ariaLabelSelectedAndInStock}`}
    >
      <div
        className={`shop-item ${isActive ? "selected" : ""} ${item.type}`}
        style={{
          ...backgroundStyles,
        }}
      >
        {isActive && (
          <motion.div
            className="shop-item-selected-indicator"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Check size={20} />
          </motion.div>
        )}
      </div>
      {!isUnlocked && (
        <div className="points-progress-container">
          <div className="points-progress-bar">
            <motion.div
              className="points-progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${pointsProgress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <span className="points-progress-text">
            {`🌟 ${lifetimePoints} / ${requiredPoints}`}
          </span>
        </div>
      )}
    </motion.div>
  );
}

export default ShopItem;
