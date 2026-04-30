import MenuBtnsContainer from "./Components/MenuBtnsContainer";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hidePFModalById } from "../../../Store/slices/ui/slice";
import { P_F_MODALS_IDS } from "../../../Configs/UIConfigs";
import { selectIsShowPFModalById } from "../../../Store/slices/ui/selectors";

function Menu() {
  const modalId = P_F_MODALS_IDS.MENU;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isShow = useSelector((state) =>
    selectIsShowPFModalById(state, modalId),
  );
  // const h1Text = t("menu.menu_page_h1");
  // const ariaLabel = t("menu.game_name");
  const onHide = () => {
    dispatch(hidePFModalById({ id: modalId }));
  };
  return (
    <Modal
      show={isShow}
      centered
      className="menu-modal"
      onHide={onHide}
      fullscreen="md-down"
      size="xl"
      dialogClassName="modal-h80"
    >
      <Modal.Header closeButton>
        <Modal.Title>{t("menu.modal_title")}</Modal.Title>
      </Modal.Header>
      {/* <h1 className="menu-page-h1" title={ariaLabel} aria-label={ariaLabel}>
        {h1Text}
      </h1> */}
      <Modal.Body>
        <MenuBtnsContainer />
      </Modal.Body>
    </Modal>
  );
}

export default Menu;
