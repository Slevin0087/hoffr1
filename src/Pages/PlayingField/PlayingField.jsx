import "./PlayingField.css";
import StatusBar from "./Components/StatusBar/StatusBar";
import Field from "./Components/Field/Field";
import Footer from "./Components/Footer/Footer";
import { useSelector } from "react-redux";
import { FONS_ITEMS } from "../../Configs/FonsConfigs";
import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";
import { CustomDragLayer } from "../../Components/CustomDragLayer";
import { selectAppearancesSelectedIdByType } from "../../Store/slices/appearances/selectors";
import {
  APPEARANCES_TYPES,
  fonsAppearancesObj,
} from "../../Configs/AppearancesConfigs";

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
  useEffect(() => {
    console.log("Field MOUNTED");
    return () => {
      console.log("Field UNMOUNTED");
    };
  }, []);
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
    </div>
  );
}

export default PlayingField;
