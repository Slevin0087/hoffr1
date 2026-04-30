import "./ShopItemsContainer.css";
import ShopItem from "../ShopItem/ShopItem";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";
import { Button } from "react-bootstrap";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDoubleLeft,
  ChevronDoubleRight,
} from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import {
  APPEARANCES_TYPES,
  appearancesObjArrs,
} from "../../../../../Configs/AppearancesConfigs";
import {
  selectAppearancesOwnedsIdsByType,
  selectAppearancesSelectedIdByType,
} from "../../../../../Store/slices/appearances/selectors";
import { useTranslation } from "react-i18next";

function ShopItemsContainer({ categoryId }) {
  const selectedId = useSelector((state) =>
    selectAppearancesSelectedIdByType(state, categoryId),
  );

  const ownedsItemsIds = useSelector((state) =>
    selectAppearancesOwnedsIdsByType(state, categoryId),
  );

  const items = appearancesObjArrs[categoryId];

  const { t } = useTranslation();
  if (!items || items.length === 0) {
    return (
      <div className="empty-items">
        <p>{t("shop.no_items_available")}</p>
      </div>
    );
  }
  return (
    <AnimatePresence>
      <motion.div
        className="all-items-container"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
      >
        {items.map((item, index) => {
          const isSelected = item.id === selectedId;
          const isOwned = ownedsItemsIds.includes(item.id);
          return (
            <motion.div
              key={item.id}
              className="item-container"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.01, duration: 0.1 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
            >
              <ShopItem
                item={item}
                categoryId={categoryId}
                isSelected={isSelected}
                isOwned={isOwned}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}

export default ShopItemsContainer;
