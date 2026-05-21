import "./CategoryTabs.css";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { ButtonGroup, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { SHOP_CATEGORY } from "../../../../../Configs/ShopConfigs";
import { setActiveCategoryId } from "../../../../../Store/slices/shop/slice";

const categories = [
  { id: SHOP_CATEGORY.FACES, label: "shop.btn_card_face" },
  { id: SHOP_CATEGORY.SHIRTS, label: "shop.btn_card_shirt" },
  { id: SHOP_CATEGORY.FONS, label: "shop.btn_card_fon" },
];

function CategoryTabs(props) {
  const { activeCategoryId } = props;
  const dispatch = useDispatch();
  const onCategoryChange = (categoryId) => {
    dispatch(setActiveCategoryId(categoryId));
  };
  const { t } = useTranslation();
  return (
    <ButtonGroup className="category-buttons" aria-label="Shop categories">
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          className="category-button-container"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 * index }}
        >
          <Button
            variant={
              activeCategoryId === category.id ? "primary" : "outline-primary"
            }
            // className={`${activeCategoryId === category.id ? "active-shop-btn" : ""}`}
            onClick={() => onCategoryChange(category.id)}
            title={t(category.label)}
            aria-label={t(category.label)}
            disabled={activeCategoryId === category.id}
          >
            {t(category.label)}
          </Button>
        </motion.div>
      ))}
    </ButtonGroup>
  );
}

export default CategoryTabs;
