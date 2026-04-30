// import "./Shop.css";
// components/Shop/Shop.jsx
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import ShopHeader from "./Components/ShopHeader/ShopHeader";
import CategoryTabs from "./Components/CategoryTabs/CategoryTabs";
import ShopItemsContainer from "./Components/ShopItemsContainer/ShopItemsContainer";
import { useDispatch, useSelector } from "react-redux";
import { selectShopActiveCategoryId } from "../../../Store/slices/pages/shop/selectors";
import { Modal, Button } from "react-bootstrap";
import {
  hidePFModalById,
  showPFModalById,
} from "../../../Store/slices/ui/slice";
import { useTranslation } from "react-i18next";
import { P_F_MODALS_IDS } from "../../../Configs/UIConfigs";
import { selectIsShowPFModalById } from "../../../Store/slices/ui/selectors";

function Shop() {
  const modalId = P_F_MODALS_IDS.SHOP;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const activeCategoryId = useSelector(selectShopActiveCategoryId);
  const isShow = useSelector((state) =>
    selectIsShowPFModalById(state, modalId),
  );

  const handleClose = () => {
    dispatch(hidePFModalById({ id: modalId }));
  };
  const handleBackToMenu = () => {
    const menuModalId = P_F_MODALS_IDS.MENU;
    dispatch(showPFModalById({ id: menuModalId }));
  };
  console.log("Shop re-render activeCategoryId: ", activeCategoryId);
  return (
    <Modal
      show={isShow}
      centered
      className="shop-modal"
      size="lg"
      onHide={handleClose}
    >
      <Modal.Header>
        <Button variant="primary" onClick={handleBackToMenu}>
          ←
        </Button>
        <Modal.Title>{t("shop.shop_title")}</Modal.Title>
        <Button variant="secondary" onClick={handleClose}>
          &times;
        </Button>
      </Modal.Header>
      {/* <ShopHeader /> */}
      <Modal.Body className="shop-body">
        <CategoryTabs activeCategoryId={activeCategoryId} />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategoryId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <ShopItemsContainer categoryId={activeCategoryId} />
          </motion.div>
        </AnimatePresence>
      </Modal.Body>
    </Modal>
  );
}

export default Shop;
