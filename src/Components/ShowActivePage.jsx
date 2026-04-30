import { PAGES_IDS } from "../Configs/UIConfigs";
import InputPlayerName from "../Pages/InputPlayerName/InputPlayerName";
import PlayingField from "../Pages/PlayingField/PlayingField";

function ShowActivePage(props) {
  const { activePageId } = props;
  switch (activePageId) {
    case PAGES_IDS.I_P_N:
      return <InputPlayerName />;
    case PAGES_IDS.PLAYING_FIELD:
      return <PlayingField />;
    default:
      return <InputPlayerName />;
  }
}

export default ShowActivePage;
