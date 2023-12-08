import { Turn } from "@types";
import { GameClass, Owner } from "@shared";

export const easyBot = (game: GameClass): Turn => {
  // TODO move this calculation into class.
  const allEnemyNeighbors = game.findAllEnemyNeighbors(Owner.playerTwo);
  const allFreeNeighbors = game.findAllFreeNeighbors(Owner.playerTwo);

  const allEnemyNeighborsColors = game.selectColorsFromArray(allEnemyNeighbors);
  const allFreeNeighborsColors = game.selectColorsFromArray(allFreeNeighbors);

  const allAvailableColors = allFreeNeighborsColors.filter(
    (color) => !allEnemyNeighborsColors.includes(color)
  );

  if (allAvailableColors.length === 0) {
    // Impossible to turn
    return null;
  }

  const allAvailableNeighbors = allFreeNeighbors.filter((neighbor) =>
    allAvailableColors.includes(game.matrix[neighbor.y][neighbor.x].color)
  );

  const index = GameClass.randomInt(0, allAvailableNeighbors.length - 1);
  return allAvailableNeighbors[index];
};
