import {
  FREE,
  ICoordinates,
  ITableField,
} from "../types";

export const checkCellOwner = (
  matrix: ITableField,
  x: number,
  y: number,
  target: number,
  type: "color" | "owner"
): boolean => {
  if (y >= 0 && y < matrix.length && x >= 0 && x < matrix[y].length) {
    return matrix[y][x][type] === target;
  }
  return false;
};

export const checkNeighbors = (
  matrix: ITableField,
  x: number,
  y: number,
  target: number,
  type: "color" | "owner"
): boolean =>
  checkCellOwner(matrix, x, y - 1, target, type) ||
  checkCellOwner(matrix, x, y + 1, target, type) ||
  checkCellOwner(matrix, x + 1, y, target, type) ||
  checkCellOwner(matrix, x - 1, y, target, type);

export const findAllFreeNeighbors = (
  matrix: ITableField,
  target: number
): ICoordinates[] => {
  const res: ICoordinates[] = [];

  for (let i = 0; i < matrix.length; i += 1) {
    for (let j = 0; j < matrix[i].length; j += 1) {
      if (
        checkNeighbors(matrix, j, i, target, "owner") &&
        matrix[i][j].owner === FREE
      )
        res.push({ x: j, y: i });
    }
  }

  return res;
};

export const selectColorsFromArray = (
  matrix: ITableField,
  array: ICoordinates[]
): number[] => {
  const colors: number[] = [];
  for (let i = 0; i < array.length; i += 1) {
    const { color } = matrix[array[i].y][array[i].x];
    if (!colors.includes(color)) {
      colors.push(color);
    }
  }
  return colors;
};

export const registerTurn = (
  matrix: ITableField,
  player: number,
  turn: ICoordinates
): ITableField => {
  if (matrix[turn.y][turn.x].owner === FREE) {
    const chosenColor = matrix[turn.y][turn.x].color;

    let freeNeighbors: ICoordinates[] = findAllFreeNeighbors(matrix, player);
    let freeNeighborsColors = selectColorsFromArray(matrix, freeNeighbors);

    do {
      for (let i = 0; i < freeNeighbors.length; i += 1) {
        if (
          matrix[freeNeighbors[i].y][freeNeighbors[i].x].color === chosenColor
        ) {
          matrix[freeNeighbors[i].y][freeNeighbors[i].x].owner = player;
        }
      }

      freeNeighbors = findAllFreeNeighbors(matrix, player);

      freeNeighborsColors = selectColorsFromArray(matrix, freeNeighbors);
    } while (freeNeighborsColors.includes(chosenColor));

    for (let i = 0; i < matrix.length; i += 1) {
      for (let j = 0; j < matrix[i].length; j += 1) {
        if (matrix[i][j].owner === player) matrix[i][j].color = chosenColor;
      }
    }
  } else {
    console.log("forbidden");
  }

  return matrix;
};
