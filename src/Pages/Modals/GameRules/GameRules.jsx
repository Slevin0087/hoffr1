import "./GameRules.css";
import { Trans, useTranslation } from "react-i18next";
import { Container, Card, Accordion, Badge, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { hidePFModalById } from "../../../Store/slices/ui/slice";
import { P_F_MODALS_IDS } from "../../../Configs/UIConfigs";

function GameRules() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const gameModes = [
    {
      name: "Классический",
      icon: "🏆",
      desc: "3 карты, 1 пересдача, 5 отмен, 3 подсказки",
      local: "game_modes_classic_name_desc",
    },
    {
      name: "На время",
      icon: "⏱️",
      desc: "3 минуты, 10 сек на ход, 2 отмены, 1 подсказка",
      local: "game_modes_timed_name_desc",
    },
    {
      name: "Расслабленный",
      icon: "😌",
      desc: "Безлимитно",
      local: "game_modes_relaxed_name_desc",
    },
  ];

  const handleClose = () =>
    dispatch(hidePFModalById({ id: P_F_MODALS_IDS.MENU }));

  return (
    <Container className="game-rules-wrapper">
      <Container fluid className="game-rules-container">
        <Card className="shadow">
          <Card.Body className="shadow-card-body">
            {/* Цель */}
            <Card className="mb-3 border-primary">
              <Card.Body>
                <h5 className="game-rules-common-goal-h5">🎯 {t("gameRules.common_goal")}</h5>
                <p className="mb-0 game-rules-common-goal-p">
                  <Trans
                    i18nKey="gameRules.common_goal_p_all"
                    components={[<strong />]}
                  />
                </p>
              </Card.Body>
            </Card>

            {/* Правила */}
            <Accordion>
              {/* Игровые зоны */}
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  🗺️ {t("gameRules.play_areas")}
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="mb-0">
                    <li>
                      <Trans
                        i18nKey="gameRules.play_areas_li1"
                        components={[<strong />]}
                      />
                    </li>
                    <li>
                      <Trans
                        i18nKey="gameRules.play_areas_li2"
                        components={[<strong />]}
                      />{" "}
                    </li>
                    <li>
                      <Trans
                        i18nKey="gameRules.play_areas_li3"
                        components={[<strong />, <strong />]}
                      />{" "}
                    </li>
                    {/* <li>
                      <strong>Джокер</strong> – заменяет любую карту
                    </li> */}
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              {/* Действия */}
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  🖱️ {t("gameRules.basic_steps")}
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="mb-0">
                    <li>{t("gameRules.basic_steps_li1")}</li>
                    <li>{t("gameRules.basic_steps_li2")}</li>
                    <li>{t("gameRules.basic_steps_li3")}</li>
                    <li>{t("gameRules.basic_steps_li4")}</li>
                    <li>{t("gameRules.basic_steps_li5")}</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              {/* Режимы */}
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  🎮 {t("gameRules.game_modes")}
                </Accordion.Header>
                <Accordion.Body>
                  {gameModes.map((mode, idx) => (
                    <div key={idx} className="mb-2 p-2 border rounded">
                      <Badge bg="primary" className="me-2">
                        {mode.icon}
                      </Badge>
                      <Trans
                        i18nKey={`gameRules.${mode.local}`}
                        components={[<strong />]}
                      />
                    </div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>

              {/* Очки и валюта */}
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  📊 {t("gameRules.points_system")}
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    <Trans
                      i18nKey="gameRules.points_system_accrual"
                      components={[<strong />]}
                    />
                  </p>
                  <p>
                    <Trans
                      i18nKey="gameRules.points_system_fines"
                      components={[<strong />]}
                    />
                  </p>
                  {/* <hr /> */}
                  {/* <p>
                    <strong>💰 Хусынки:</strong> за победу, идеальную игру, сбор
                    фундаментов, ежедневные бонусы
                  </p> */}
                </Accordion.Body>
              </Accordion.Item>

              {/* Советы */}
              <Accordion.Item eventKey="4">
                <Accordion.Header>
                  💡 {t("gameRules.strategic_advice")}
                </Accordion.Header>
                <Accordion.Body>
                  <ul className="mb-0">
                    <li>{t("gameRules.strategic_advice_li1")}</li>
                    <li>{t("gameRules.strategic_advice_li2")}</li>
                    {/* <li>Джокера используйте в конце</li> */}
                    <li>{t("gameRules.strategic_advice_li3")}</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            {/* Победа */}
            <Card className="mt-3 border-success">
              <Card.Body className="text-center">
                <h5 className="game-rules-victory-conditions-h5">🏆 {t("gameRules.victory_conditions")}</h5>
                <p className="mb-0 game-rules-victory-conditions-p">
                  {/* Все карты на фундаменте, джокер последним */}
                  {t("gameRules.victory_conditions_p1")}
                </p>
              </Card.Body>
            </Card>

            {/* Кнопка закрытия */}
          </Card.Body>
        </Card>
      </Container>
      <div className="game-rules-clear-btn-container">
        <Button
          variant="danger"
          size="lg"
          className="game-rules-clear-btn"
          onClick={handleClose}
        >
          {t("gameRules.clear_btn")}
        </Button>
      </div>
    </Container>
  );
}

export default GameRules;
