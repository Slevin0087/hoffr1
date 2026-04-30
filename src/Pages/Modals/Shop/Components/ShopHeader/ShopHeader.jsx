import "./ShopHeader.css";
import { Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectBalance } from "../../../../../Store/slices/pages/shop/selectors";
import BtnToMenu from "../../../../../Components/BtnToMenu/BtnToMenu";
import { shopBalanceIcon } from "../../../../../Configs/ShopConfigs";

function ShopHeader() {
  const balance = useSelector(selectBalance);
  const { t } = useTranslation();
  const ariaLabel = t("shop.shop_title");
  const ariaLabelBalance = t("shop.balance");
  return (
    <Row className="shop-header" title={ariaLabel} aria-label={ariaLabel}>
      <Col xs={2} className="text-start">
        <BtnToMenu />
      </Col>

      <Col xs={8} className="text-center">
        <h2 className="shop-title">{t("shop.shop_title")}</h2>
      </Col>

      <Col
        xs={2}
        className="text-end"
        title={ariaLabelBalance}
        aria-label={ariaLabelBalance}
      >
        <div className="balance">
          {shopBalanceIcon}
          <span id="coins" className="balance-amount">
            {balance} хусынок
          </span>
        </div>
      </Col>
    </Row>
  );
}

export default ShopHeader;
