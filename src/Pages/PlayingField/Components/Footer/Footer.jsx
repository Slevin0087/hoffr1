import "./Footer.css";
import Undo from "./Components/Undo/Undo";
import Menu from "./Components/Menu/Menu";
import Hints from "./Components/Hints/Hints";
import GameRestart from "./Components/GameRestart/GameRestart";
import CollectCardsBtn from "./Components/CollectCardsBtn/CollectCardsBtn";
import ShuffleStock from "./Components/ShuffleStock/ShuffleStock";

function Footer() {
  return (
    <div className="field-footer">
      <GameRestart />
      <Undo />
      <Hints />
      <Menu />
      <CollectCardsBtn />
      <ShuffleStock />
    </div>
  );
}

export default Footer;
