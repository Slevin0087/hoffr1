import { scoreOperations } from "../Configs/GameModes";
import { pointsMap } from "../Configs/PlayingCardsConfigs/PlayingCardsConfigs";

export const incrementMoves = (state) => {
  const currentGame = state.entities[state.currentId];
  currentGame.sessionState.moves.count += 1;
  currentGame.lifetimeState.moves.count += 1;
};

export const updatePoints = (state, data) => {
  const { operation, count } = data;
  const currentGame = state.entities[state.currentId];
  switch (operation) {
    case scoreOperations.increment:
      currentGame.sessionState.points.count += count;
      currentGame.lifetimeState.points.count += count;
      break;
    case scoreOperations.decrement:
      currentGame.sessionState.points.count -= count;
      currentGame.lifetimeState.points.count -= count;
      break;
    default:
      break;
  }
};

export const calculatePoints = (gameModePoints, cardValue) => {
  const points = pointsMap[cardValue];
  const result = gameModePoints + points;
  return result ? result : 0;
};
