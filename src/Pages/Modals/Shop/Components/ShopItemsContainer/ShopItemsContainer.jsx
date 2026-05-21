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
import {
  APPEARANCES_TYPES,
  appearancesObjArrs,
} from "../../../../../Configs/AppearancesConfigs";
import { useTranslation } from "react-i18next";

function ShopItemsContainer({ categoryId }) {
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
        className={`all-items-container ${categoryId}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
      >
        {items.map((item, index) => {
          return (
            <ShopItem
              key={item.id}
              index={index}
              item={item}
              categoryId={categoryId}
            />
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}

export default ShopItemsContainer;
