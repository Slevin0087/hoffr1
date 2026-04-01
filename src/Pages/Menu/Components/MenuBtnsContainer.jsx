import "./MenuBtnsContainer.css";
import MenuBtn from "./MenuBtn";
import { BUTTONS_ARR } from "../../../Configs/MenuConfigs";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const btns = BUTTONS_ARR;

function MenuBtnsContainer() {
  const isGameInit = useSelector((state) => state.game.init);
  return (
    <Container fluid className="menu-btns-container">
      {btns.map((btn) => (
        <MenuBtn key={btn.id} btn={btn} isGameInit={isGameInit} />
      ))}
    </Container>
  );
}

export default MenuBtnsContainer;
