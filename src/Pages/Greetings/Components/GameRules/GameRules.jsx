// function GameRules() {
//   return (
//     <>
//       {/* <!-- Game Rules контент: начало --> */}
//       <main className="game-rules-text-main">
//         {/* <!-- Общая цель --> */}
//         <section className="rules-section goal-section">
//           <div className="section-header">
//             <i className="fas fa-bullseye"></i>
//             <h2 className="game-rules-h2">Общая цель</h2>
//           </div>
//           <div className="section-content">
//             <p>
//               Переместить все карты (52 карты + джокер) из игрового поля на{" "}
//               <strong>фундамент</strong> (4 стопки в верхней части экрана),
//               собрав каждую масть по возрастанию от туза до короля.
//             </p>
//           </div>
//         </section>

//         {/* <!-- Игровые зоны --> */}
//         <section className="rules-section zones-section">
//           <div className="section-header">
//             <i className="fas fa-map"></i>
//             <h2 className="game-rules-h2">Игровые зоны</h2>
//           </div>
//           <div className="section-content">
//             <ul>
//               <li>
//                 <strong>Фундамент (4 стопки)</strong> – собираются карты одной
//                 масти по возрастанию (Туз, 2, 3, ..., Король, Джокер в конце).
//               </li>
//               <li>
//                 <strong>Игровое поле (7 столбцов)</strong> – основное поле, где
//                 происходят перемещения.
//               </li>
//               <li>
//                 <strong>Колода</strong> – оставшиеся карты для вытягивания.
//               </li>
//               <li>
//                 <strong>Отбой</strong> – карты, вытянутые из колоды.
//               </li>
//               <li>
//                 <strong>Джокер</strong> – особая карта, может заменить любую
//                 другую карту и помещается последней на фундамент.
//               </li>
//             </ul>
//           </div>
//         </section>

//         {/* <!-- Основные действия --> */}
//         <section className="rules-section actions-section">
//           <div className="section-header">
//             <i className="fas fa-mouse-pointer"></i>
//             <h2 className="game-rules-h2">Основные действия</h2>
//           </div>
//           <div className="section-content">
//             <ul>
//               <li>
//                 <strong>Перетаскивание карт</strong> между столбцами
//               </li>
//               <li>
//                 <strong>Автоперенос</strong> – двойной клик перемещает карту на
//                 фундамент (если возможно)
//               </li>
//               <li>
//                 <strong>Вытягивание карт</strong> из колоды
//               </li>
//               <li>
//                 <strong>Отмена хода (Undo)</strong> – возврат на шаг назад
//               </li>
//               <li>
//                 <strong>Подсказка (Hint)</strong> – подсветка возможного хода
//               </li>
//             </ul>
//           </div>
//         </section>

//         {/* <!-- Режимы игры --> */}
//         <section className="rules-section modes-section">
//           <div className="section-header">
//             <i className="fas fa-gamepad"></i>
//             <h2 className="game-rules-h2">Режимы игры</h2>
//           </div>
//           <div className="section-content section-game-modes-content">
//             {/* <!-- Классический режим --> */}
//             <div className="game-mode">
//               <div className="mode-header">
//                 <div className="mode-title">
//                   <span className="mode-icon">🏆</span>
//                   <span className="mode-title-name">1. Классический</span>
//                   <span className="mode-difficulty difficulty-easy">
//                     Стандарт
//                   </span>
//                 </div>
//               </div>
//               <p>Стандартные правила пасьянса</p>
//               <ul>
//                 <li>
//                   <span>
//                     Вытягивание по <strong>3 карты</strong> из колоды
//                   </span>
//                 </li>
//                 <li>
//                   <span>
//                     <strong>1 пересдача</strong> доступна
//                   </span>
//                 </li>
//                 <li>
//                   <span>
//                     <strong>5 отмен</strong> и<strong>3 подсказки</strong> за
//                     игру
//                   </span>
//                 </li>
//                 <li>
//                   <span>Автозавершение включено</span>
//                 </li>
//               </ul>
//               <p>
//                 <strong>Награда:</strong> +10 хусынков за победу, +25 за
//                 идеальную игру (без отмен/подсказок)
//               </p>
//             </div>

//             {/* <!-- Вегасский режим --> */}
//             <div className="game-mode">
//               <div className="mode-header">
//                 <div className="mode-title">
//                   <span className="mode-icon">💰</span>
//                   <span className="mode-title-name">2. Вегасский</span>
//                   <span className="mode-difficulty difficulty-medium">
//                     Накопительный
//                   </span>
//                 </div>
//               </div>
//               <p>Режим с накопительным счетом и ставками</p>
//               <ul>
//                 <li>
//                   <span>
//                     Вытягивание по <strong>1 карте</strong>
//                   </span>
//                 </li>
//                 <li>
//                   <span>
//                     <strong>Без пересдач</strong>
//                   </span>
//                 </li>
//                 <li>
//                   <span>
//                     Только <strong>2 отмены</strong>, подсказки отсутствуют
//                   </span>
//                 </li>
//                 <li>
//                   <span>Накопительный счет между играми</span>
//                 </li>
//               </ul>
//               <p>
//                 <strong>Экономика:</strong> Входная плата 15 хусынков, возможен
//                 выигрыш до 100 хусынков
//               </p>
//             </div>

//             {/* <!-- На время --> */}
//             <div className="game-mode">
//               <div className="mode-header">
//                 <div className="mode-title">
//                   <span className="mode-icon">⏱️</span>
//                   <span className="mode-title-name">3. На время</span>
//                   <span className="mode-difficulty difficulty-hard">Гонка</span>
//                 </div>
//               </div>
//               <p>Гонка против времени</p>
//               <ul>
//                 <li>
//                   <span>
//                     Лимит: <strong>3 минуты</strong> на игру
//                   </span>
//                 </li>
//                 <li>
//                   <span>
//                     Дополнительный лимит:
//                     <strong>10 секунд на ход</strong>
//                   </span>
//                 </li>
//                 <li>
//                   <span>
//                     <strong>2 отмены</strong> и<strong>1 подсказка</strong>
//                   </span>
//                 </li>
//                 <li>
//                   <span>Бонусы за скорость и оставшееся время</span>
//                 </li>
//               </ul>
//               <p>
//                 <strong>Награда:</strong> до 40 хусынков за быструю победу
//               </p>
//             </div>

//             {/* <!-- Эксперт --> */}
//             <div className="game-mode">
//               <div className="mode-header">
//                 <div className="mode-title">
//                   <span className="mode-icon">🧠</span>
//                   <span className="mode-title-name">4. Эксперт</span>
//                   <span className="mode-difficulty difficulty-expert">
//                     Сложный
//                   </span>
//                 </div>
//               </div>
//               <p>Максимальная сложность для профессионалов</p>
//               <ul>
//                 <li>
//                   <span>
//                     Лимит: <strong>200 ходов</strong> на игру
//                   </span>
//                 </li>
//                 <li>
//                   <span>
//                     <strong>3 отмены</strong> и<strong>2 подсказки</strong>
//                   </span>
//                 </li>
//                 <li>
//                   <span>Штраф за ходы из отбоя на игровое поле</span>
//                 </li>
//                 <li>
//                   <span>Запрещены пустые перемещения между столбцами</span>
//                 </li>
//               </ul>
//               <p>
//                 <strong>Награда:</strong> до 55 хусынков за победу с бонусами
//               </p>
//             </div>

//             {/* <!-- Расслабленный --> */}
//             <div className="game-mode">
//               <div className="mode-header">
//                 <div className="mode-title">
//                   <span className="mode-icon">😌</span>
//                   <span className="mode-title-name">5. Расслабленный</span>
//                   <span className="mode-difficulty difficulty-easy">
//                     Обучение
//                   </span>
//                 </div>
//               </div>
//               <p>Для обучения и отдыха</p>
//               <ul>
//                 <li>
//                   <span>
//                     <strong>Безлимитные</strong> пересдачи, отмены и подсказки
//                   </span>
//                 </li>
//                 <li>
//                   <span>Автоподсказки и автозавершение</span>
//                 </li>
//                 <li>
//                   <span>Режим обучения включен</span>
//                 </li>
//                 <li>
//                   <span>Ежедневная награда за игру</span>
//                 </li>
//               </ul>
//               <p>
//                 <strong>Награда:</strong> бонусы за первую победу и ежедневную
//                 игру
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* <!-- Система очков --> */}
//         <section className="rules-section scoring-section">
//           <div className="section-header">
//             <i className="fas fa-chart-bar"></i>
//             <h2 className="game-rules-h2">Система очков</h2>
//           </div>
//           <div className="section-content">
//             <p>Очки начисляются за:</p>
//             <ul>
//               <li>
//                 Перемещение карты на фундамент:
//                 <span className="positive-score">5-15 очков</span>
//               </li>
//               <li>
//                 Переворот карты на поле:
//                 <span className="positive-score">2-10 очков</span>
//               </li>
//               <li>
//                 Сбор фундамента:
//                 <span className="positive-score">25-150 очков</span>
//               </li>
//               <li>
//                 Завершение игры:
//                 <span className="positive-score">бонусные очки</span>
//               </li>
//             </ul>

//             <p>Штрафы применяются за:</p>
//             <ul>
//               <li>
//                 Использование отмены:
//                 <span className="negative-score">0-20 очков</span>
//               </li>
//               <li>
//                 Использование подсказки:
//                 <span className="negative-score">0-10 очков</span>
//               </li>
//               <li>
//                 Время (в режиме "На время"):
//                 <span className="negative-score">-2 очка/секунда</span>
//               </li>
//             </ul>
//           </div>
//         </section>

//         {/* <!-- Хусынки --> */}
//         <section className="rules-section currency-section">
//           <div className="section-header">
//             <i className="fas fa-coins"></i>
//             <h2 className="game-rules-h2">Хусынки (игровая валюта)</h2>
//           </div>
//           <div className="section-content">
//             <p>Хусынки начисляются за:</p>
//             <ul>
//               <li>
//                 <strong>Победу в игре</strong> (5-50 хусынков)
//               </li>
//               <li>
//                 <strong>Идеальную победу</strong> (без отмен/подсказок)
//               </li>
//               <li>
//                 <strong>Сбор фундаментов</strong>
//               </li>
//               <li>
//                 <strong>Ежедневную игру</strong>
//               </li>
//               <li>
//                 <strong>Серии побед</strong> (в Вегасском режиме)
//               </li>
//             </ul>
//           </div>
//         </section>

//         {/* <!-- Стратегические советы --> */}
//         <section className="rules-section tips-section">
//           <div className="section-header">
//             <i className="fas fa-lightbulb"></i>
//             <h2 className="game-rules-h2">Стратегические советы</h2>
//           </div>
//           <div className="section-content">
//             <div className="tips-grid">
//               <div className="tip-card">
//                 <h4>
//                   <i className="fas fa-eye"></i> Открывайте карты
//                 </h4>
//                 <p>
//                   Старайтесь открывать закрытые карты на игровом поле - это ключ
//                   к победе.
//                 </p>
//               </div>
//               <div className="tip-card">
//                 <h4>
//                   <i className="fas fa-sort-amount-up"></i> Начинайте с малого
//                 </h4>
//                 <p>
//                   Сначала собирайте тузы и двойки на фундамент - они открывают
//                   возможности для других карт.
//                 </p>
//               </div>
//               <div className="tip-card">
//                 <h4>
//                   <i className="fas fa-joker"></i> Используйте джокера
//                 </h4>
//                 <p>
//                   Джокера используйте в конце для завершения стопок - он может
//                   заменить любую карту.
//                 </p>
//               </div>
//               <div className="tip-card">
//                 <h4>
//                   <i className="fas fa-chess-board"></i> Планируйте ходы
//                 </h4>
//                 <p>В режиме с лимитом ходов планируйте перемещения заранее.</p>
//               </div>
//               <div className="tip-card">
//                 <h4>
//                   <i className="fas fa-calculator"></i> Считайте стоимость
//                 </h4>
//                 <p>
//                   В Вегасском режиме считайте стоимость каждого действия для
//                   максимальной прибыли.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* <!-- Условия победы --> */}
//         <section className="rules-section win-section">
//           <div className="section-header">
//             <i className="fas fa-flag-checkered"></i>
//             <h2 className="game-rules-h2">Условия победы</h2>
//           </div>
//           <div className="section-content">
//             <ul>
//               <li>Все карты перемещены на фундамент</li>
//               <li>Джокер помещен последним на любой фундамент</li>
//               <li>Игра считается завершенной успешно</li>
//             </ul>
//           </div>
//         </section>
//         <div className="footer-game-rules">
//           <div className="luck-message">
//             <i className="fas fa-club"></i>
//             Удачи в игре!
//             <i className="fas fa-spade"></i>
//           </div>
//           <p className="footer-note">
//             Косынка с джокером • 5 режимов сложности • Динамические правила
//           </p>
//         </div>
//         <div className="game-rules-btns-container">
//           <button id="game-rules-clear-btn" className="game-rules-clear-btn">
//             Понятно!
//           </button>
//         </div>
//       </main>

//       {/* <!-- Game Rules контент: конец --> */}
//     </>
//   );
// }

// export default GameRules;

import {
  Container,
  Card,
  Accordion,
  ListGroup,
  Badge,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import "./GameRules.css";
import { useTranslation } from "react-i18next";

function GameRules({ onClose }) {
  const { t } = useTranslation();

  const gameModes = [
    {
      id: 1,
      title: "Классический",
      icon: "🏆",
      difficulty: "Стандарт",
      description: "Стандартные правила пасьянса",
      features: [
        "Вытягивание по 3 карты из колоды",
        "1 пересдача доступна",
        "5 отмен и 3 подсказки за игру",
        "Автозавершение включено",
      ],
      reward: "+10 хусынков за победу, +25 за идеальную игру",
    },
    {
      id: 2,
      title: "Вегасский",
      icon: "💰",
      difficulty: "Накопительный",
      description: "Режим с накопительным счетом и ставками",
      features: [
        "Вытягивание по 1 карте",
        "Без пересдач",
        "Только 2 отмены, подсказки отсутствуют",
        "Накопительный счет между играми",
      ],
      reward: "Входная плата 15 хусынков, возможен выигрыш до 100",
    },
    {
      id: 3,
      title: "На время",
      icon: "⏱️",
      difficulty: "Гонка",
      description: "Гонка против времени",
      features: [
        "Лимит: 3 минуты на игру",
        "Дополнительный лимит: 10 секунд на ход",
        "2 отмены и 1 подсказка",
        "Бонусы за скорость и оставшееся время",
      ],
      reward: "До 40 хусынков за быструю победу",
    },
    {
      id: 4,
      title: "Эксперт",
      icon: "🧠",
      difficulty: "Сложный",
      description: "Максимальная сложность для профессионалов",
      features: [
        "Лимит: 200 ходов на игру",
        "3 отмены и 2 подсказки",
        "Штраф за ходы из отбоя на игровое поле",
        "Запрещены пустые перемещения между столбцами",
      ],
      reward: "До 55 хусынков за победу с бонусами",
    },
    {
      id: 5,
      title: "Расслабленный",
      icon: "😌",
      difficulty: "Обучение",
      description: "Для обучения и отдыха",
      features: [
        "Безлимитные пересдачи, отмены и подсказки",
        "Автоподсказки и автозавершение",
        "Режим обучения включен",
        "Ежедневная награда за игру",
      ],
      reward: "Бонусы за первую победу и ежедневную игру",
    },
  ];

  const scoringPoints = [
    {
      action: "Перемещение карты на фундамент",
      points: "5-15 очков",
      type: "positive",
    },
    {
      action: "Переворот карты на поле",
      points: "2-10 очков",
      type: "positive",
    },
    { action: "Сбор фундамента", points: "25-150 очков", type: "positive" },
    { action: "Завершение игры", points: "бонусные очки", type: "positive" },
    { action: "Использование отмены", points: "0-20 очков", type: "negative" },
    {
      action: "Использование подсказки",
      points: "0-10 очков",
      type: "negative",
    },
    {
      action: "Время (в режиме 'На время')",
      points: "-2 очка/секунда",
      type: "negative",
    },
  ];

  const husynkiPoints = [
    "Победу в игре (5-50 хусынков)",
    "Идеальную победу (без отмен/подсказок)",
    "Сбор фундаментов",
    "Ежедневную игру",
    "Серии побед (в Вегасском режиме)",
  ];

  const tips = [
    {
      icon: "👁️",
      title: "Открывайте карты",
      text: "Старайтесь открывать закрытые карты на игровом поле - это ключ к победе.",
    },
    {
      icon: "📈",
      title: "Начинайте с малого",
      text: "Сначала собирайте тузы и двойки на фундамент - они открывают возможности для других карт.",
    },
    {
      icon: "🃏",
      title: "Используйте джокера",
      text: "Джокера используйте в конце для завершения стопок - он может заменить любую карту.",
    },
    {
      icon: "♟️",
      title: "Планируйте ходы",
      text: "В режиме с лимитом ходов планируйте перемещения заранее.",
    },
    {
      icon: "🧮",
      title: "Считайте стоимость",
      text: "В Вегасском режиме считайте стоимость каждого действия для максимальной прибыли.",
    },
  ];

  return (
    <Container className="py-4 game-rules-container">
      <Card className="border-0 shadow-lg">
        <Card.Header className="bg-primary text-white py-3">
          <Card.Title as="h1" className="text-center mb-0">
            <span className="me-2" role="img" aria-label="cards">
              🎴
            </span>
            {t("gameRules.game_rules")}
          </Card.Title>
        </Card.Header>

        <Card.Body className="p-4">
          {/* Общая цель */}
          <Card className="mb-4 border-primary">
            <Card.Header className="bg-light d-flex align-items-center">
              <span className="me-3 fs-4" role="img" aria-label="target">
                🎯
              </span>
              <Card.Title as="h3" className="mb-0">
                {t("gameRules.common_goal")}
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <p className="lead mb-0">
                {t("gameRules.common_goal_p1")}{" "}
                <strong className="text-primary">
                  {t("gameRules.common_goal_p2")}
                </strong>{" "}
                {t("gameRules.common_goal_p3")}
              </p>
            </Card.Body>
          </Card>

          <Accordion defaultActiveKey="0" className="mb-4">
            {/* Игровые зоны */}
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <div className="d-flex align-items-center">
                  <span className="me-3 fs-4" role="img" aria-label="map">
                    🗺️
                  </span>
                  <h4 className="mb-0">{t("gameRules.play_areas")}</h4>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Badge bg="info" className="me-2">
                      {t("gameRules.foundation")}
                    </Badge>
                    <strong>{t("gameRules.foundation_rules1")}</strong> –{" "}
                    {t("gameRules.foundation_rules2")}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Badge bg="success" className="me-2">
                      {t("gameRules.playing_field")}
                    </Badge>
                    <strong>{t("gameRules.playing_field1")}</strong> –{" "}
                    {t("gameRules.playing_field2")}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Badge bg="warning" className="me-2">
                      {t("gameRules.deck")}
                    </Badge>
                    {t("gameRules.remaining_cards_to_draw")}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Badge bg="secondary" className="me-2">
                      {t("gameRules.lights_out")}
                    </Badge>
                    {t("gameRules.cards_drawn_deck")}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Badge bg="danger" className="me-2">
                      {t("gameRules.joker")}
                    </Badge>
                    {t("gameRules.joker_discription")}
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>

            {/* Основные действия */}
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <div className="d-flex align-items-center">
                  <span className="me-3 fs-4" role="img" aria-label="mouse">
                    🖱️
                  </span>
                  <h4 className="mb-0">{t("gameRules.basic_steps")}</h4>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <ListGroup as="ol" numbered>
                  <ListGroup.Item as="li">
                    <strong>{t("gameRules.basic_steps1")}</strong>{" "}
                    {t("gameRules.basic_steps2")}
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    <strong>{t("gameRules.basic_steps3")}</strong> –{" "}
                    {t("gameRules.basic_steps4")}
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    <strong>{t("gameRules.basic_steps5")}</strong>{" "}
                    {t("gameRules.basic_steps6")}
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    <strong>{t("gameRules.basic_steps7")}</strong> –{" "}
                    {t("gameRules.basic_steps8")}
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    <strong>{t("gameRules.basic_steps9")}</strong> –{" "}
                    {t("gameRules.basic_steps10")}
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>

            {/* Режимы игры */}
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <div className="d-flex align-items-center">
                  <span className="me-3 fs-4" role="img" aria-label="gamepad">
                    🎮
                  </span>
                  <h4 className="mb-0">{t("gameRules.game_modes")}</h4>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <Row className="g-4">
                  {gameModes.map((mode) => (
                    <Col key={mode.id} xs={12}>
                      <Card className="h-100 border-0 shadow-sm">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <span className="me-2 fs-4">{mode.icon}</span>
                            <Card.Title as="h5" className="mb-0">
                              {mode.title}
                            </Card.Title>
                          </div>
                          <Badge
                            bg={
                              mode.difficulty === "Стандарт"
                                ? "success"
                                : mode.difficulty === "Накопительный"
                                ? "warning"
                                : mode.difficulty === "Гонка"
                                ? "danger"
                                : mode.difficulty === "Сложный"
                                ? "dark"
                                : "info"
                            }
                          >
                            {mode.difficulty}
                          </Badge>
                        </Card.Header>
                        <Card.Body>
                          <p className="text-muted mb-3">{mode.description}</p>
                          <ListGroup variant="flush">
                            {mode.features.map((feature, idx) => (
                              <ListGroup.Item key={idx}>
                                {feature}
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                          <Card.Footer className="bg-light border-0 px-0">
                            <small className="text-success">
                              <strong>Награда:</strong> {mode.reward}
                            </small>
                          </Card.Footer>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            {/* Система очков */}
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <div className="d-flex align-items-center">
                  <span className="me-3 fs-4" role="img" aria-label="chart">
                    📊
                  </span>
                  <h4 className="mb-0">{t("gameRules.points_system")}</h4>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col md={6}>
                    <Card className="border-success mb-3">
                      <Card.Header className="bg-success text-white">
                        <strong>Начисления</strong>
                      </Card.Header>
                      <Card.Body>
                        {scoringPoints
                          .filter((point) => point.type === "positive")
                          .map((point, idx) => (
                            <div
                              key={idx}
                              className="d-flex justify-content-between mb-2"
                            >
                              <span>{point.action}</span>
                              <Badge bg="success">{point.points}</Badge>
                            </div>
                          ))}
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="border-danger">
                      <Card.Header className="bg-danger text-white">
                        <strong>Штрафы</strong>
                      </Card.Header>
                      <Card.Body>
                        {scoringPoints
                          .filter((point) => point.type === "negative")
                          .map((point, idx) => (
                            <div
                              key={idx}
                              className="d-flex justify-content-between mb-2"
                            >
                              <span>{point.action}</span>
                              <Badge bg="danger">{point.points}</Badge>
                            </div>
                          ))}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            {/* Хусынки */}
            <Accordion.Item eventKey="4">
              <Accordion.Header>
                <div className="d-flex align-items-center">
                  <span className="me-3 fs-4" role="img" aria-label="coins">
                    🪙
                  </span>
                  <h4 className="mb-0">{t("gameRules.khusynki")}</h4>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <Card className="border-warning">
                  <Card.Header className="bg-warning">
                    <strong>Начисляются за:</strong>
                  </Card.Header>
                  <Card.Body>
                    <ListGroup as="ol" numbered>
                      {husynkiPoints.map((point, idx) => (
                        <ListGroup.Item as="li" key={idx}>
                          {point}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Accordion.Body>
            </Accordion.Item>

            {/* Советы */}
            <Accordion.Item eventKey="5">
              <Accordion.Header>
                <div className="d-flex align-items-center">
                  <span className="me-3 fs-4" role="img" aria-label="lightbulb">
                    💡
                  </span>
                  <h4 className="mb-0">{t("gameRules.strategic_advice")}</h4>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <Row className="g-3">
                  {tips.map((tip, idx) => (
                    <Col key={idx} xs={12} md={6} lg={4}>
                      <Card className="h-100 border-info">
                        <Card.Header className="bg-info bg-opacity-10">
                          <div className="d-flex align-items-center">
                            <span className="fs-4 me-2">{tip.icon}</span>
                            <Card.Title as="h6" className="mb-0">
                              {tip.title}
                            </Card.Title>
                          </div>
                        </Card.Header>
                        <Card.Body>
                          <p className="mb-0">{tip.text}</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            {/* Условия победы */}
            <Accordion.Item eventKey="6">
              <Accordion.Header>
                <div className="d-flex align-items-center">
                  <span className="me-3 fs-4" role="img" aria-label="flag">
                    🏁
                  </span>
                  <h4 className="mb-0">{t("gameRules.victory_conditions")}</h4>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <div className="alert alert-success">
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      ✅ {t("gameRules.all_cards_to_foundation")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      ✅ {t("gameRules.joker_last_on_foundation")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      ✅ {t("gameRules.game_is_successfully")}
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {/* Футер */}
          <Card className="border-0 bg-light mt-4">
            <Card.Body className="text-center">
              <div className="luck-message fs-4 mb-3">
                <span className="me-3">♣</span>
                {t("gameRules.good_luck_in_game")}
                <span className="ms-3">♠</span>
              </div>
              <p className="text-muted mb-0">
                {t("gameRules.description_game")}
              </p>
            </Card.Body>
          </Card>

          {/* Кнопка закрытия */}
          <div className="text-center mt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={onClose}
              className="px-5 pages-btn"
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
