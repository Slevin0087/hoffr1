import CollectCardsBtn from "../Footer/Components/CollectCardsBtn/CollectCardsBtn";
import Menu from "../Footer/Components/Menu/Menu";
import ShuffleStock from "../Footer/Components/ShuffleStock/ShuffleStock";
import "./Right.css";

function Right() {
  return (
    <div className="field-right">
      <Menu />
      <CollectCardsBtn />
      <ShuffleStock />
    </div>
  );
}

export default Right;
