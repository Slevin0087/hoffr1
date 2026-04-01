import { Form } from "react-bootstrap";
import { setGameModeActiveId } from "../../../../Store/slices/gameModes/slice";
import { GAME_MODES_IDS } from "../../../../Configs/GameModes";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectGameModeActiveId } from "../../../../Store/slices/gameModes/selectors";

function GameModes() {
  const dispatch = useDispatch();
  const activeId = useSelector(selectGameModeActiveId);

  const { t } = useTranslation();

  const CLASSIK_ID = GAME_MODES_IDS.CLASSIC;
  const VEGAS_ID = GAME_MODES_IDS.VEGAS;
  const TIMED_ID = GAME_MODES_IDS.TIMED;
  const EXPERT_ID = GAME_MODES_IDS.EXPERT;
  const RELAXED_ID = GAME_MODES_IDS.RELAXED;
  const CLASSIC_NAME = t("gameModes.classic_name");
  const VEGAS_NAME = t("gameModes.vegas_name");
  const TIMED_NAME = t("gameModes.timed_name");
  const EXPERT_NAME = t("gameModes.expert_name");
  const RELAXED_NAME = t("gameModes.relaxed_name");

  const gameModes = [
    { value: CLASSIK_ID, label: CLASSIC_NAME },
    { value: VEGAS_ID, label: VEGAS_NAME },
    { value: TIMED_ID, label: TIMED_NAME },
    { value: EXPERT_ID, label: EXPERT_NAME },
    { value: RELAXED_ID, label: RELAXED_NAME },
  ];

  return (
    <>
      <h4 className="greetings-game-mode-choice-h4 text-center mb-4 text-muted">
        {t("greetings.game_mode_choice_h4")}
      </h4>

      {/* Desktop версия - Radio buttons */}
      <div className="game-mode-select desktop-version d-none d-md-block mb-4">
        <Form>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {gameModes.map((mode) => (
              <Form.Check
                key={mode.value}
                type="radio"
                id={`mode-${mode.value}`}
                name="game-mode"
                label={mode.label}
                value={mode.value}
                checked={activeId === mode.value}
                onChange={(e) => dispatch(setGameModeActiveId(e.target.value))}
                className="game-mode-option"
              />
            ))}
          </div>
        </Form>
      </div>

      {/* Mobile версия - Select */}
      <div className="mobile-version d-md-none mb-4">
        <Form.Select
          value={activeId}
          onChange={(e) => dispatch(setGameModeActiveId(e.target.value))}
          size="lg"
          className="game-mode-select-mobile"
        >
          {gameModes.map((mode) => (
            <option key={mode.value} value={mode.value}>
              {mode.label}
            </option>
          ))}
        </Form.Select>
      </div>
    </>
  );
}

export default GameModes;
