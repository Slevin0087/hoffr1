import "./ShopItem.css";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Badge } from "react-bootstrap";
import { Check, Cart } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import {
  addAppearanceIdToOwnedsIds,
  setSelectedIdAppearanceByType,
} from "../../../../Store/slices/appearances/slice";
import { calculateFacesPosition } from "../../../../utils/facesUtils";
import {
  PLAYING_CARD_SUITS,
  PLAYING_CARD_VALUES,
} from "../../../../Configs/PlayingCardsConfigs/PlayingCardsConfigs";
import { useTranslation } from "react-i18next";
import { APPEARANCES_TYPES } from "../../../../Configs/AppearancesConfigs";

function ShopItem({ item, categoryId, isSelected, isOwned }) {
  const { id, img, price } = item;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // Определяем позиции для спрайта (если используется спрайт)
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

  const handleSelectItem = () => {
    dispatch(setSelectedIdAppearanceByType({ type: categoryId, id }));
  };

  const handleBuyItem = () => {
    dispatch(addAppearanceIdToOwnedsIds({ type: categoryId, id }));
  };

  const backgroundStyles = getBackgroundStyles();

  const handleClick = () => {
    if (isOwned) {
      handleSelectItem();
    } else {
      handleBuyItem();
    }
  };

  const ariaLabelSelected = t("shop.selected");
  const ariaLabelInStock = t("shop.owned_badge_in_stock");
  const ariaLabelIsSelected = isSelected ? ariaLabelSelected : ariaLabelInStock;
  const ariaLabelSelectedAndInStock = `${isOwned ? ariaLabelIsSelected : `${price} монет`}`;
  return (
    <motion.div
      className={`shop-item ${isOwned ? "owned" : ""} ${isSelected ? "selected" : ""}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="shop-item-container"
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
        {/* Карточка */}
        <div className="shop-item-card">
          <div
            className="shop-item-card-bg"
            style={{
              ...backgroundStyles,
              borderRadius: "0.5vw",
              padding: 0,
            }}
          />
        </div>

        {/* Информация о цене/выборе */}
        <div className="shop-item-info">
          {!isOwned ? (
            <Badge bg="warning" className="price-badge">
              <Cart size={12} /> {price}
            </Badge>
          ) : isSelected ? (
            <motion.div
              className="selected-indicator"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Check size={20} />
            </motion.div>
          ) : (
            <Badge bg="success" className="owned-badge">
              {ariaLabelInStock}
            </Badge>
          )}
        </div>
      </div>

      {/* Чекмарк для выбранного */}
      {/* {isSelected && (
        <motion.div
          className="checkmark-circle"
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="checkmark"></div>
        </motion.div>
      )} */}
    </motion.div>
  );
}

export default ShopItem;
