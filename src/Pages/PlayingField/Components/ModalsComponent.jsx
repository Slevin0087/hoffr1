import "./ModalsComponent.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import {
  selectActivePFModalId,
  selectIsShowPFModalById,
} from "../../../Store/slices/ui/selectors";
import { usePFModalsTitles } from "../../../hooks/usePFModalsTitles";
import {
  hidePFModalById,
  setActivePFModalId,
} from "../../../Store/slices/ui/slice";
import { P_F_MODALS_IDS } from "../../../Configs/UIConfigs";
import ModalsComponentBody from "./ModalsComponentBody";
import { useTranslation } from "react-i18next";
import { setGameStatus } from "../../../Store/slices/game/slice";
import { GAME_STATUSES } from "../../../Configs/GameConfigs";

function ModalsComponent() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isShow = useSelector((state) =>
    selectIsShowPFModalById(state, P_F_MODALS_IDS.MENU),
  );
  const activePFModalId = useSelector(selectActivePFModalId);
  const isMenuModalId = activePFModalId === P_F_MODALS_IDS.MENU;
  const isShopModalId = activePFModalId === P_F_MODALS_IDS.SHOP;
  const modalTitle = usePFModalsTitles(activePFModalId);
  const handleBackToMenu = () => {
    const modalMenu = P_F_MODALS_IDS.MENU;
    dispatch(setActivePFModalId(modalMenu));
  };
  const handleClose = () => {
    console.log("handleClose");
      dispatch(setGameStatus(GAME_STATUSES.READY));
    
    dispatch(hidePFModalById({ id: P_F_MODALS_IDS.MENU }));
  };

  return (
    <Modal show={isShow} centered className="modals-component2">
      <Modal.Header>
        {!isMenuModalId && (
          <Button variant="primary" onClick={handleBackToMenu}>
            ←
          </Button>
        )}
        <Modal.Title>{modalTitle}</Modal.Title>
        <Button variant="secondary" onClick={handleClose}>
          &times;
        </Button>
      </Modal.Header>
      <Modal.Body className={isShopModalId && "body-jc-start"}>
        <ModalsComponentBody activeModalId={activePFModalId} />
      </Modal.Body>
      <Modal.Footer>
        <p className="modals-component2-footer-p">{t("menu.menu_page_h1")}</p>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalsComponent;
