import "./PlayerStats.css";
import AllAchievements from "./Components/AllAchievements";
import StatRow from "./Components/StatRow";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Modal, Container, Table, Button, ButtonGroup } from "react-bootstrap";
import {
  selectGameCoins,
  // selectGameCurrentDealing,
  selectGameCurrentMode,
  // selectGameCurrentModeId,
  // selectGamesPlayed,
  selectPlayerName,
} from "../../../Store/slices/game/selectors";
import { getResultTime } from "../../../utils/gameSliceUtils";
import { selectAchieventActiveId } from "../../../Store/slices/achievements/selectors";
import { getAchIconById } from "../../../utils/achievementsUtils";
import { useState } from "react";
// import { selectlifetimePoints } from "../../../Store/slices/game/selectors/points";
// import {
//   selectCurrentMoves,
//   selectlifetimeMoves,
// } from "../../../Store/slices/game/selectors/moves";
// import {
//   selectBestTime,
//   selectlifetimeTime,
// } from "../../../Store/slices/game/selectors/time";
import { GAME_MODES_IDS, gameModesLocals } from "../../../Configs/GameModes";
import { dealingCounts } from "../../../Configs/GameConfigs";

const dealingCards = [
  { id: dealingCounts.one, label: dealingCounts.one },
  { id: dealingCounts.three, label: dealingCounts.three },
];

const PlayerStats = () => {
  const { t } = useTranslation();
  const [showAllAchs, setShowAllAchs] = useState(false);
  const coins = useSelector(selectGameCoins);
  const playerName = useSelector(selectPlayerName);
  // const gamesPlayed = useSelector(selectGamesPlayed);
  // const sessionMoves = useSelector(selectCurrentMoves);
  // const lifetimeTime = useSelector(selectlifetimeTime);
  // const lifetimeBestTime = useSelector(selectBestTime);
  // const lifetimeMoves = useSelector(selectlifetimeMoves);
  // const lifetimePoints = useSelector(selectlifetimePoints);
  // const currentGameModeId = useSelector(selectGameCurrentModeId);
  const currentGameMode = useSelector(selectGameCurrentMode);
  const [showingDealingId, setShowingDealingId] = useState(
    currentGameMode.currentDealing,
  );
  console.log("currentGameMode.id: ", currentGameMode.id);
  const wins = currentGameMode[showingDealingId].wins;
  const losses = currentGameMode[showingDealingId].losses;
  const time = currentGameMode[showingDealingId].time;
  // const activeDealing = useSelector(selectGameCurrentDealing);
  const activeAchId = useSelector(selectAchieventActiveId);
  const activeAchIcon = getAchIconById(activeAchId);

  const isWinsAndLosses = wins.total > 0 || losses > 0;

  const winsStatePercent = isWinsAndLosses
    ? (wins.total / (wins.total + losses)) * 100
    : 0;
  const lossesStatePercent = isWinsAndLosses
    ? (losses / (wins.total + losses)) * 100
    : 0;

  const onClickAllAchs = () => {
    setShowAllAchs(!showAllAchs);
  };

  const onClickClose = () => {
    setShowAllAchs(false);
  };

  const onClickShowingDealingId = (id) => {
    setShowingDealingId(id);
  };

  return !showAllAchs ? (
    <div className="player-stats-page">
      <div className="player-stats-page-container">
        <div className="player-stats-header">
          <div className="player-stats-mode-text">
            <div className="player-stats-mode-text-left">
              {t("playerStats.game_mode_text_left")}
            </div>
            <div className="player-stats-mode-text-right">
              {t(`playerStats.${gameModesLocals[currentGameMode.id]}`)}
            </div>
          </div>
          <div className="player-stats-dealing-counter-container">
            <div className="player-stats-dealing-counter-text">
              {t("playerStats.dealing_cards_count")}
            </div>
            <ButtonGroup className="player-stats-category-buttons">
              {dealingCards.map((card) => (
                <Button
                  key={card.id}
                  className="player-stats-category-button"
                  variant={
                    card.id === showingDealingId ? "primary" : "outline-primary"
                  }
                  onClick={() => onClickShowingDealingId(card.id)}
                  title={card.label}
                  aria-label={card.label}
                  disabled={card.id === showingDealingId}
                >
                  {card.label}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        </div>
        <div className="player-stats-wins-and-losses-container">
          <div className="player-stats-wins-and-losses-state">
            <span className="player-stats-wins-text">{`${t("playerStats.wins_text")} ${wins.total}`}</span>
            <span className="player-stats-losses-text">{`${t("playerStats.losses_text")} ${losses}`}</span>
          </div>
          <div
            className="player-stats-wins-and-losses-track"
            style={
              winsStatePercent === 0 && lossesStatePercent === 0
                ? {}
                : {
                    "--wins-track-percent": `${winsStatePercent}%`,
                    "--losses-track-percent": `${lossesStatePercent}%`,
                  }
            }
          ></div>
          <div className="player-stats-wins-and-losses-state-percents">
            <span className="player-stats-wins-percent">{`${winsStatePercent}%`}</span>
            <span className="player-stats-losses-percent">{`${lossesStatePercent}%`}</span>
          </div>
        </div>
        <Container fluid className="player-stats-container">
          <Table borderless className="player-stats-table">
            <tbody>
              <StatRow label="playerStats.name" value={playerName} />
              <StatRow label="playerStats.coins" value={coins} />
              {/* <StatRow label="playerStats.games_played" value={gamesPlayed} /> */}
              {/* <StatRow
                  label="playerStats.all_points"
                  value={lifetimePoints}
                /> */}
              {/* <StatRow label="playerStats.moves" value={sessionMoves} /> */}
              {/* <StatRow label="playerStats.all_moves" value={lifetimeMoves} /> */}
              <StatRow
                label="playerStats.total_time"
                value={getResultTime(time.total || 0)}
              />
              <StatRow
                label="playerStats.best_time"
                value={getResultTime(time.best || 0)}
              />
              {/* <StatRow
                  label="playerStats.game_mode"
                  value={t(
                    `playerStats.${gameModesLocals[currentGameMode.id]}`,
                    )}
                    /> */}
              {/* <StatRow
                  label="playerStats.dealing_cards_count"
                  value={showingDealingId}
                /> */}
              <StatRow label="playerStats.achievement" value={activeAchIcon} />
            </tbody>
          </Table>
        </Container>
      </div>
      <div className="player-stats-achievement-section">
        <Button
          variant="warning"
          className="achievement-btn"
          onClick={onClickAllAchs}
        >
          {t("playerStats.all_achs")}
        </Button>
      </div>
    </div>
  ) : (
    <AllAchievements onClickClose={onClickClose} />
  );
};

export default PlayerStats;
