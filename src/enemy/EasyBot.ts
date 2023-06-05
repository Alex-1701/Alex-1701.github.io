import { ICoordinates } from "types";
import { Owner, GameClass } from "shared";

export function EasyBot(game: GameClass): ICoordinates {
  // TODO move this calculation into class.
  const allFreeNeighbors = game.findAllFreeNeighbors(Owner.playerTwo);
  const allFreeColors = game.selectColorsFromArray(allFreeNeighbors);
  const allAvailableColors = allFreeColors.filter(
    (c) => c !== game.playerOneColor
  );

  const allAvailableNeighbors = allFreeNeighbors.filter((neighbor) =>
    allAvailableColors.includes(game.matrix[neighbor.y][neighbor.x].color)
  );

  if (allAvailableColors.length === 0) {
    // Impossible to turn
    return { x: -1, y: -1 };
  }

  const index = GameClass.randomInt(0, allAvailableNeighbors.length - 1);
  return allAvailableNeighbors[index];
}
