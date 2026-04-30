import { Modal, Button } from "react-bootstrap";
import ItemsContainer from "./Components/ItemsContainer/ItemsContainer";
// import "./Settings.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  hidePFModalById,
  showPFModalById,
} from "../../../Store/slices/ui/slice";
import { P_F_MODALS_IDS } from "../../../Configs/UIConfigs";
import { selectIsShowPFModalById } from "../../../Store/slices/ui/selectors";

function Settings() {
  const modalId = P_F_MODALS_IDS.SETTINGS;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const h2Header = t("settings.setting_title");
  const isShow = useSelector((state) =>
    selectIsShowPFModalById(state, modalId),
  );

  const onHide = () => {
    dispatch(hidePFModalById({ id: modalId }));
  };
  const handleBackToMenu = () => {
    const menuModalId = P_F_MODALS_IDS.MENU;
    dispatch(showPFModalById({ id: menuModalId }));
  };
  return (
    <Modal
      show={isShow}
      centered
      className="settings-modal"
      onHide={onHide}
      size="lg"
    >
      <Modal.Header>
        <Button variant="primary" onClick={handleBackToMenu}>
          ←
        </Button>
        <Modal.Title>{h2Header}</Modal.Title>
        <Button variant="secondary" onClick={onHide}>
          &times;
        </Button>
      </Modal.Header>
      <Modal.Body>
        <ItemsContainer />
      </Modal.Body>
    </Modal>
  );
}

export default Settings;
