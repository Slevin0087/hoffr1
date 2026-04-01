import "./ItemsCarousel.css";
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
import { useScrollButtons } from "../../../../hooks/useScrollButtons";
import { useSelector } from "react-redux";
import {
  APPEARANCES_TYPES,
  appearancesObjArrs,
} from "../../../../Configs/AppearancesConfigs";
import {
  selectAppearancesOwnedsIdsByType,
  selectAppearancesSelectedIdByType,
} from "../../../../Store/slices/appearances/selectors";
import { useTranslation } from "react-i18next";

function ItemsCarousel({ categoryId }) {
  const {
    containerRef,
    canScrollLeft,
    canScrollRight,
    scroll,
    scrollToStart,
    scrollToEnd,
  } = useScrollButtons(150);

  const selectedId = useSelector((state) =>
    selectAppearancesSelectedIdByType(state, categoryId),
  );

  const ownedsItemsIds = useSelector((state) =>
    selectAppearancesOwnedsIdsByType(state, categoryId),
  );

  const items = appearancesObjArrs[categoryId];

  const { t } = useTranslation();
  const ariaLabelScrollToStart = t("shop.scroll_to_start");
  const ariaLabelScrollToEnd = t("shop.scroll_to_end");
  const ariaLabelScrollLeft = t("shop.scroll_to_left");
  const ariaLabelScrollRight = t("shop.scroll_to_right");
  // Если нет предметов, показываем сообщение
  if (!items || items.length === 0) {
    return (
      <div className="empty-items">
        <p>{t("shop.no_items_available")}</p>
      </div>
    );
  }
  return (
    <div className="shop-navigation">
      {/* Контейнер с предметами */}
      <motion.div
        className="all-items-container"
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <AnimatePresence>
          {items.map((item, index) => {
            const isSelected = item.id === selectedId;
            const isOwned = ownedsItemsIds.includes(item.id);
            const isFonItem = categoryId === APPEARANCES_TYPES.FONS;
            return (
              <motion.div
                key={item.id}
                className={`${isFonItem ? "fons-item-container" : "item-container"}`}
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
        </AnimatePresence>
      </motion.div>

      {/* Кнопки навигации */}
      <div className="scroll-btns-container">
        <div className="scroll-buttons-group">
          {/* Кнопка скролла в начало */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="secondary"
              className="scroll-btn scroll-to-start"
              onClick={scrollToStart}
              disabled={!canScrollLeft}
              title={ariaLabelScrollToStart}
              aria-label={ariaLabelScrollToStart}
            >
              <ChevronDoubleLeft size={20} />
            </Button>
          </motion.div>

          {/* Кнопка скролла влево */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="secondary"
              className="scroll-btn scroll-left"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              title={ariaLabelScrollLeft}
              aria-label={ariaLabelScrollLeft}
            >
              <ChevronLeft size={24} />
            </Button>
          </motion.div>

          {/* Кнопка скролла вправо */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="secondary"
              className="scroll-btn scroll-right"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              title={ariaLabelScrollRight}
              aria-label={ariaLabelScrollRight}
            >
              <ChevronRight size={24} />
            </Button>
          </motion.div>

          {/* Кнопка скролла в конец */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="secondary"
              className="scroll-btn scroll-to-end"
              onClick={scrollToEnd}
              disabled={!canScrollRight}
              title={ariaLabelScrollToEnd}
              aria-label={ariaLabelScrollToEnd}
            >
              <ChevronDoubleRight size={20} />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Индикатор прокрутки */}
      <div className="scroll-indicator">
        <div className="scroll-indicator-bar">
          <motion.div
            className="scroll-indicator-progress"
            animate={{
              width: containerRef.current
                ? `${(containerRef.current.scrollLeft / (containerRef.current.scrollWidth - containerRef.current.clientWidth)) * 100}%`
                : "0%",
            }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>
    </div>
  );
}

export default ItemsCarousel;
