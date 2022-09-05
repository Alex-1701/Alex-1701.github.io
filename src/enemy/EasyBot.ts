import { ICoordinates, ITableField } from "../shared/types";
import { PLAYER_TWO } from "../shared/constants";
import {
  findAllFreeNeighbors,
  randomInt,
  selectColorsFromArray,
} from "../shared/GameFunctions";

export function EasyBot(
  matrix: ITableField,
  PlayerOneColor: number
): ICoordinates {
  const allFreeNeighbors = findAllFreeNeighbors(matrix, PLAYER_TWO);
  const allFreeColors = selectColorsFromArray(matrix, allFreeNeighbors);
  const allAvailableColors = allFreeColors.filter((c) => c !== PlayerOneColor);
  const allAvailableNeighbors = allFreeNeighbors.filter((neighbor) =>
    allAvailableColors.includes(matrix[neighbor.y][neighbor.x].color)
  );

  // console.log(allFreeNeighbors);
  // console.log(allFreeColors);
  // console.log(PlayerOneColor);
  // console.log(allAvailableColors);
  // console.log(allAvailableNeighbors);
  console.log(allAvailableNeighbors.length);

  if (allAvailableColors.length === 0) {
    // Impossible to act
    return { x: -1, y: -1 };
  }

  const index = randomInt(0, allAvailableNeighbors.length - 1);
  return allAvailableNeighbors[index];
}
