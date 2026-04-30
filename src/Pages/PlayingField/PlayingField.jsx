import "./PlayingField.css";
import StatusBar from "./Components/StatusBar/StatusBar";
import Field from "./Components/Field/Field";
import Footer from "./Components/Footer/Footer";
import { isMobile } from "react-device-detect";
import { useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { CustomDragLayer } from "../../Components/CustomDragLayer";
import { selectAppearancesSelectedIdByType } from "../../Store/slices/appearances/selectors";
import {
  APPEARANCES_TYPES,
  fonsAppearancesObj,
} from "../../Configs/AppearancesConfigs";
import ModalsComponent from "./Components/ModalsComponent";
import GameOverAndWin from "../Modals/GameOverAndWin/GameOverAndWin";
import RestartGameModal from "../Modals/RestartGame/RestartGameModal";

const backend = isMobile ? TouchBackend : HTML5Backend;
const options = isMobile
  ? {
      enableMouseEvents: true,
      delay: 200,
      delayTouchStart: 200,
      touchSlop: 5,
      ignoreContextMenu: true,
    }
  : undefined;

function PlayingField() {
  const activeFonId = useSelector((state) =>
    selectAppearancesSelectedIdByType(state, APPEARANCES_TYPES.FONS),
  );
  const activeFonAppearance = fonsAppearancesObj[activeFonId];
  return (
    <div
      className="playing-field"
      style={{ backgroundImage: `url(${activeFonAppearance.img.path})` }}
    >
      <StatusBar />
      <DndProvider debugMode={true} backend={backend} options={options}>
        <CustomDragLayer height={window.innerHeight} />
        <Field />
      </DndProvider>
      <Footer />
      <ModalsComponent />
      <GameOverAndWin />
      <RestartGameModal />
    </div>
  );
}

export default PlayingField;
