import "./Shop.css";
// components/Shop/Shop.jsx
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import ShopHeader from "./Components/ShopHeader/ShopHeader";
import CategoryTabs from "./Components/CategoryTabs/CategoryTabs";
import ItemsCarousel from "./Components/ItemsCarousel/ItemsCarousel";
import { useSelector } from "react-redux";
import { selectShopActiveCategoryId } from "../../Store/slices/pages/shop/selectors";

function Shop() {
  const activeCategoryId = useSelector(selectShopActiveCategoryId);
  console.log("Shop re-render activeCategoryId: ", activeCategoryId);
  return (
    <div className="shop-page">
      <ShopHeader />
      <CategoryTabs activeCategoryId={activeCategoryId} />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategoryId}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <ItemsCarousel categoryId={activeCategoryId} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Shop;
