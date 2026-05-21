import { useSelector } from "react-redux";
import { P_F_MODALS_IDS } from "../../../Configs/UIConfigs";
import MenuBtnsContainer from "../../Modals/Menu/Components/MenuBtnsContainer";
import PlayerStats from "../../Modals/PlayerStats/PlayerStats";
import ItemsContainer from "../../Modals/Settings/Components/ItemsContainer/ItemsContainer";
import { selectShopActiveCategoryId } from "../../../Store/slices/shop/selectors";
import CategoryTabs from "../../Modals/Shop/Components/CategoryTabs/CategoryTabs";
import ShopItemsContainer from "../../Modals/Shop/Components/ShopItemsContainer/ShopItemsContainer";
import GameRules from "../../Modals/GameRules/GameRules";

function ModalsComponentBody(props) {
  const { activeModalId } = props;
  const activeCategoryId = useSelector(selectShopActiveCategoryId);
  switch (activeModalId) {
    case P_F_MODALS_IDS.PLAYER_STATS:
      return <PlayerStats />;
    case P_F_MODALS_IDS.MENU:
      return <MenuBtnsContainer />;
    case P_F_MODALS_IDS.SETTINGS:
      return <ItemsContainer />;
    case P_F_MODALS_IDS.SHOP:
      return (
        <>
          <CategoryTabs activeCategoryId={activeCategoryId} />
          <ShopItemsContainer categoryId={activeCategoryId} />
        </>
      );
    case P_F_MODALS_IDS.GAME_RULES:
      return <GameRules />;
    default:
      return null;
  }
}

export default ModalsComponentBody;
