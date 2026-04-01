import "./Footer.css";
import Undo from "./Components/Undo/Undo";
import Menu from "./Components/Menu/Menu";
import Hints from "./Components/Hints/Hints";
import GameRestart from "./Components/GameRestart/GameRestart";

function Footer() {
  return (
    <div className="field-footer">
      <GameRestart />
      <Undo />
      <Hints />
      <Menu />
    </div>
  );
}

export default Footer;
