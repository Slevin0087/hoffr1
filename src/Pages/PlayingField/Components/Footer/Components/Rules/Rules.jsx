import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { openGameRulesModal } from "../../../../../../Store/slices/ui/slice";
import { useTranslation } from "react-i18next";

function Rules() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const ariaLabel = t("playingField.game_rules_btn");

  return (
    <Button
      variant="outline-info"
      className="footer-btn"
      onClick={() => dispatch(openGameRulesModal())}
      title={ariaLabel}
      aria-label={ariaLabel}
    >
      📚
    </Button>
  );
}

export default Rules;
