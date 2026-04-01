import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setActivePageId } from "../../../../Store/slices/ui/slice";
import { PAGES_IDS } from "../../../../Configs/UIConfigs";

function InfoBtns(props) {
  const { handleGameRules } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleOverSettings = () => {
    dispatch(setActivePageId(PAGES_IDS.SETTINGS));
  };
  return (
    <>
      {/* Информационные блоки */}
      <div className="greetings-game-p-containers mt-4">
        <div className="game-rules-text-p mb-3">
          <Button
            variant="link"
            className="text-decoration-none p-0 btns-links"
            onClick={handleGameRules}
          >
            📚 {t("greetings.game_rules_btn")}
          </Button>
        </div>

        <div className="greetings-game-mode-choice-p">
          <Button
            variant="link"
            className="text-decoration-none p-0 btns-links"
            onClick={handleOverSettings}
          >
            ⚙️ {t("greetings.other_settings_btn")}
          </Button>
        </div>
      </div>
    </>
  );
}

export default InfoBtns;
