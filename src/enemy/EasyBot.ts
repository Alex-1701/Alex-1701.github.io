import { ICoordinates } from "../shared/types";
import { Owner } from "../shared/constants";
import { randomInt } from "../shared/GameFunctions";
import { GameClass } from "../shared/GameClass";

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

  // console.log(allFreeNeighbors);
  // console.log(allFreeColors);
  // console.log(PlayerOneColor);
  // console.log(allAvailableColors);
  // console.log(allAvailableNeighbors);
  // console.log(allAvailableNeighbors.length);

  if (allAvailableColors.length === 0) {
    // Impossible to act
    return { x: -1, y: -1 };
  }

  const index = randomInt(0, allAvailableNeighbors.length - 1);
  return allAvailableNeighbors[index];
}
