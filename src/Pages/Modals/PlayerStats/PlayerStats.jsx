import "./PlayerStats.css";
import AllAchievements from "./Components/AllAchievements";
import StatRow from "./Components/StatRow";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Modal, Container, Table, Button } from "react-bootstrap";
import {
  selectGameCoins,
  selectGameCurrentDealing,
  selectGameCurrentModeId,
  selectGamesPlayed,
  selectPlayerName,
} from "../../../Store/slices/game/selectors";
import { getResultTime } from "../../../utils/gameSliceUtils";
import { selectAchieventActiveId } from "../../../Store/slices/achievements/selectors";
import { getAchIconById } from "../../../utils/achievementsUtils";
import { useState } from "react";
import { selectlifetimePoints } from "../../../Store/slices/game/selectors/points";
import {
  selectCurrentMoves,
  selectlifetimeMoves,
} from "../../../Store/slices/game/selectors/moves";
import {
  selectBestTime,
  selectlifetimeTime,
} from "../../../Store/slices/game/selectors/time";
import { GAME_MODES_IDS } from "../../../Configs/GameModes";

const gameModesLocals = {
  [GAME_MODES_IDS.CLASSIC]: "modes_classic",
  [GAME_MODES_IDS.TIMED]: "modes_timed",
  [GAME_MODES_IDS.RELAXED]: "modes_relax",
};

const PlayerStats = () => {
  const { t } = useTranslation();
  const [showAllAchs, setShowAllAchs] = useState(false);
  const coins = useSelector(selectGameCoins);
  const playerName = useSelector(selectPlayerName);
  const gamesPlayed = useSelector(selectGamesPlayed);
  const sessionMoves = useSelector(selectCurrentMoves);
  const lifetimeTime = useSelector(selectlifetimeTime);
  const lifetimeBestTime = useSelector(selectBestTime);
  const lifetimeMoves = useSelector(selectlifetimeMoves);
  const lifetimePoints = useSelector(selectlifetimePoints);
  const currentGameModeId = useSelector(selectGameCurrentModeId);
  const activeDealing = useSelector(selectGameCurrentDealing);
  const activeAchId = useSelector(selectAchieventActiveId);
  const activeAchIcon = getAchIconById(activeAchId);

  const onClickAllAchs = () => {
    setShowAllAchs(!showAllAchs);
  };

  const onClickClose = () => {
    setShowAllAchs(false);
  };

  return (
    <>
      {!showAllAchs ? (
        <Container fluid className="player-stats-container">
          <Table borderless className="player-stats-table">
            <tbody>
              <StatRow label="playerStats.name" value={playerName} />
              <StatRow label="playerStats.coins" value={coins} />
              <StatRow label="playerStats.games_played" value={gamesPlayed} />
              <StatRow label="playerStats.all_points" value={lifetimePoints} />
              <StatRow label="playerStats.moves" value={sessionMoves} />
              <StatRow label="playerStats.all_moves" value={lifetimeMoves} />
              <StatRow
                label="playerStats.total_time"
                value={getResultTime(lifetimeTime)}
              />
              <StatRow
                label="playerStats.best_time"
                value={getResultTime(lifetimeBestTime)}
              />
              <StatRow
                label="playerStats.game_mode"
                value={t(`playerStats.${gameModesLocals[currentGameModeId]}`)}
              />
              <StatRow
                label="playerStats.dealing_cards_count"
                value={activeDealing}
              />
              <StatRow label="playerStats.achievement" value={activeAchIcon} />
            </tbody>
          </Table>
        </Container>
      ) : (
        <AllAchievements onClickClose={onClickClose} />
      )}
      <div className="player-stats-achievement-section">
        <Button
          variant="warning"
          className="achievement-btn"
          onClick={onClickAllAchs}
        >
          {t("playerStats.all_achs")}
        </Button>
      </div>
    </>
  );
};

export default PlayerStats;
