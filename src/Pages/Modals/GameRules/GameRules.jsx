import "./GameRules.css";
import { useTranslation } from "react-i18next";
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
    },
    {
      name: "Вегасский",
      icon: "💰",
      desc: "1 карта, без пересдач, 2 отмены, без подсказок",
    },
    {
      name: "На время",
      icon: "⏱️",
      desc: "3 минуты, 10 сек на ход, 2 отмены, 1 подсказка",
    },
    {
      name: "Эксперт",
      icon: "🧠",
      desc: "200 ходов, 3 отмены, 2 подсказки, штрафы",
    },
    {
      name: "Расслабленный",
      icon: "😌",
      desc: "Безлимитно, автоподсказки, обучение",
    },
  ];

  const handleClose = () =>
    dispatch(hidePFModalById({ id: P_F_MODALS_IDS.MENU }));

  return (
    <Container className="game-rules-container">
      <Card className="shadow">
        <Card.Body>
          {/* Цель */}
          <Card className="mb-3 border-primary">
            <Card.Body>
              <h5>🎯 {t("gameRules.common_goal")}</h5>
              <p className="mb-0">
                {t("gameRules.common_goal_p1")}{" "}
                <strong>{t("gameRules.common_goal_p2")}</strong>{" "}
                {t("gameRules.common_goal_p3")}
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
                    <strong>Фундамент</strong> – сбор масти от туза до короля
                  </li>
                  <li>
                    <strong>Игровое поле</strong> – 7 столбцов для перемещения
                  </li>
                  <li>
                    <strong>Колода и отбой</strong> – вытягивание карт
                  </li>
                  <li>
                    <strong>Джокер</strong> – заменяет любую карту
                  </li>
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
                  <li>Перетаскивание карт</li>
                  <li>Автоперенос (двойной клик)</li>
                  <li>Вытягивание из колоды</li>
                  <li>Отмена хода (Undo)</li>
                  <li>Подсказка (Hint)</li>
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
                    <strong>{mode.name}</strong> – {mode.desc}
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
                  <strong>Начисление:</strong> за перемещение на фундамент
                  (5-15), переворот карты (2-10), завершение игры
                </p>
                <p>
                  <strong>Штрафы:</strong> за отмену (0-20), подсказку (0-10),
                  время (-2/сек)
                </p>
                <hr />
                <p>
                  <strong>💰 Хусынки:</strong> за победу, идеальную игру, сбор
                  фундаментов, ежедневные бонусы
                </p>
              </Accordion.Body>
            </Accordion.Item>

            {/* Советы */}
            <Accordion.Item eventKey="4">
              <Accordion.Header>
                💡 {t("gameRules.strategic_advice")}
              </Accordion.Header>
              <Accordion.Body>
                <ul className="mb-0">
                  <li>Открывайте закрытые карты</li>
                  <li>Сначала собирайте тузы</li>
                  <li>Джокера используйте в конце</li>
                  <li>Планируйте ходы в лимитных режимах</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {/* Победа */}
          <Card className="mt-3 border-success">
            <Card.Body className="text-center">
              <h5>🏆 {t("gameRules.victory_conditions")}</h5>
              <p className="mb-0">Все карты на фундаменте, джокер последним</p>
            </Card.Body>
          </Card>

          {/* Кнопка закрытия */}
          <div className="text-center mt-4">
            <Button
              variant="primary"
              size="lg"
              className="px-5"
              onClick={handleClose}
            >
              {t("gameRules.clear_btn")}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default GameRules;
