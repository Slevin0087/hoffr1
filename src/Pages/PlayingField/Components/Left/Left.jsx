import './Left.css'
import GameRestart from "../Footer/Components/GameRestart/GameRestart";
import Hints from "../Footer/Components/Hints/Hints";
import Undo from "../Footer/Components/Undo/Undo";

function Left() {
  return (
    <div className="field-left">
      <GameRestart />
      <Undo />
      <Hints />
    </div>
  );
}

export default Left;
