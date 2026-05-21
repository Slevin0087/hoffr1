import "./MenuBtnsContainer.css";
import MenuBtn from "./MenuBtn";
import { BUTTONS_ARR } from "../../../../Configs/MenuConfigs";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { GAME_STATUSES } from "../../../../Configs/GameConfigs";
import { selectGameStatus } from "../../../../Store/slices/game/selectors";

const btns = BUTTONS_ARR;

function MenuBtnsContainer() {
  const gameStatus = useSelector(selectGameStatus)
  const isGameReady = gameStatus === GAME_STATUSES.READY;
  return (
    <Container fluid className="menu-btns-container">
      {btns.map((btn) => (
        <MenuBtn key={btn.id} btn={btn} isGameReady={isGameReady} />
      ))}
    </Container>
  );
}

export default MenuBtnsContainer;
