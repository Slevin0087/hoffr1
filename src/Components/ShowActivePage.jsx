import { PAGES_IDS } from "../Configs/UIConfigs";
import InputPlayerName from "../Pages/InputPlayerName/InputPlayerName";
import PlayingField from "../Pages/PlayingField/PlayingField";
import Greetings from "../Pages/Greetings/Greetings";
import Menu from "../Pages/Menu/Menu";
import Settings from "../Pages/Settings/Settings";
import Shop from "../Pages/Shop/Shop";

function ShowActivePage(props) {
  const { activePageId } = props;
  switch (activePageId) {
    case PAGES_IDS.I_P_N:
      return <InputPlayerName />;
    case PAGES_IDS.GREETINGS:
      return <Greetings />;
    case PAGES_IDS.PLAYING_FIELD:
      return <PlayingField />;
    case PAGES_IDS.MENU:
      return <Menu />;
    case PAGES_IDS.SETTINGS:
      return <Settings />;
    case PAGES_IDS.SHOP:
      return <Shop />;
    default:
      return <InputPlayerName />;
  }
}

export default ShowActivePage;
