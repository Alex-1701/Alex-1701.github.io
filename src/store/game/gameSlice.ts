import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FREE,
  ICoordinates,
  IMockGameData,
  ITableField,
  ITableLine,
  PLAYER_ONE,
  UNAVAILABLE,
} from "../../shared/types";
import {
  recalculate,
  registerPlayerOneTurn,
  requestGameData,
} from "./gameActions";

interface GameState {
  isRequestingGameData: boolean;
  gameField: ITableField;
  PlayerTurn: number;
  currentPlayerNumber: number;
  enemyPlayerNumber: number;
  PlayerOneColor: number;
  PlayerTwoColor: number;
  availableCellsCount: number;
  PlayerOneCellsCount: number;
  PlayerTwoCellsCount: number;
  PlayerOneAvailableColors: number[];
  PlayerTwoAvailableColors: number[];
}

const checkCellOwner = (
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

const checkNeighbors = (
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

const findAllFreeNeighbors = (
  matrix: ITableField,
  target: number
): ICoordinates[] => {
  const res: ICoordinates[] = [];

  for (let i = 0; i < matrix.length; i += 1) {
    for (let j = 0; j < matrix[i].length; j += 1) {
      // console.log(i, j, checkNeighbors(matrix, j, i, target, "owner"));

      if (
        checkNeighbors(matrix, j, i, target, "owner") &&
        matrix[i][j].owner === FREE
      )
        res.push({ x: j, y: i });
    }
  }

  return res;
};

const selectColorsFromArray = (
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

const initialState: GameState = {
  isRequestingGameData: false,
  gameField: [],
  PlayerTurn: 0,
  currentPlayerNumber: 0,
  enemyPlayerNumber: 0,
  PlayerOneColor: 0,
  PlayerTwoColor: 0,
  availableCellsCount: 0,
  PlayerOneCellsCount: 0,
  PlayerTwoCellsCount: 0,
  PlayerOneAvailableColors: [],
  PlayerTwoAvailableColors: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
  extraReducers: {
    [requestGameData.pending.type]: (state) => {
      state.isRequestingGameData = true;
    },
    [requestGameData.fulfilled.type]: (
      state,
      action: PayloadAction<IMockGameData>
    ) => {
      const { matrix } = action.payload;

      for (let i = 0; i < matrix.length; i += 1) {
        const newLine: ITableLine = [];
        for (let j = 0; j < matrix[i].length; j += 1) {
          newLine.push({
            color: matrix[i][j][0],
            owner: matrix[i][j][1],
          });
        }
        state.gameField.push(newLine);
      }

      state.PlayerTurn = action.payload.playerTurn;
      state.currentPlayerNumber = action.payload.currentPlayerNumber;
      state.enemyPlayerNumber = action.payload.enemyPlayerNumber;

      // Now we know color of each player.
      for (const line of state.gameField) {
        for (const cell of line) {
          if (cell.owner === state.currentPlayerNumber) {
            state.PlayerOneColor = cell.color;
          }
          if (cell.owner === state.enemyPlayerNumber) {
            state.PlayerTwoColor = cell.color;
          }
        }
      }

      state.isRequestingGameData = false;
    },
    [requestGameData.rejected.type]: (state) => {
      state.isRequestingGameData = false;
    },

    // ---
    [registerPlayerOneTurn.pending.type]: (state) => {
      // console.log("pending");
    },
    [registerPlayerOneTurn.fulfilled.type]: (
      state,
      action: PayloadAction<ICoordinates>
    ) => {
      const { x, y } = action.payload;
      const chosenColor = state.gameField[y][x].color;

      // If this is P1 turn and cell is free.
      if (
        state.currentPlayerNumber === PLAYER_ONE &&
        state.gameField[y][x].owner === FREE
      ) {






        const freeNeighbors: ICoordinates[] = findAllFreeNeighbors(
          state.gameField,
          PLAYER_ONE
        );
        console.log(freeNeighbors);

        // Collect all available colors.
        const freeNeighborsColors = selectColorsFromArray(
          state.gameField,
          freeNeighbors
        );
        console.log(freeNeighborsColors);

        // If chosen color exist in neighbors.
        if (freeNeighborsColors.includes(chosenColor)) {
          console.log("color allowed");

          // Initiate recolor...

          let hasAvailableCells = true;
          while (hasAvailableCells) {
            const newFreeNeighbors: ICoordinates[] = findAllFreeNeighbors(
              state.gameField,
              PLAYER_ONE
            );
            console.log(newFreeNeighbors);

            for (let i = 0; i < newFreeNeighbors.length; i += 1) {
              if (
                state.gameField[newFreeNeighbors[i].y][newFreeNeighbors[i].x]
                  .color === chosenColor
              ) {
                console.log(
                  "x: ",
                  newFreeNeighbors[i].x,
                  " ; y: ",
                  newFreeNeighbors[i].y
                );
                state.gameField[newFreeNeighbors[i].y][
                  newFreeNeighbors[i].x
                ].owner = state.currentPlayerNumber;
                state.gameField[newFreeNeighbors[i].y][
                  newFreeNeighbors[i].x
                ].color = state.PlayerOneColor;
              }
            }

            const againFreeNeighbors: ICoordinates[] = findAllFreeNeighbors(
              state.gameField,
              PLAYER_ONE
            );
            const againFreeColors = selectColorsFromArray(
              state.gameField,
              againFreeNeighbors
            );
            console.log(againFreeNeighbors);
            console.log(againFreeColors);

            if (againFreeColors.includes(chosenColor)) {
              hasAvailableCells = true;
            } else {
              hasAvailableCells = false;
            }
          }
        } else {
          console.log("color NOT allowed");
        }

        // state.gameField[y][x].owner = PLAYER_ONE;
        // state.gameField[y][x].color = state.PlayerOneColor;

        // This is for next turn.
        // state.currentPlayerNumber = PLAYER_TWO;
      } else {
        console.log("forbidden");
      }
    },
    [registerPlayerOneTurn.rejected.type]: (state) => {
      // console.log("rejected");
    },
    // ---

    [recalculate.type]: (state) => {
      // Get new count. Should be called after every turn.
      let tempAvailableCellsCount = 0;
      let tempPlayerOneCellsCount = 0;
      let tempPlayerTwoCellsCount = 0;
      for (const line of state.gameField) {
        for (const cell of line) {
          if (cell.owner !== UNAVAILABLE) {
            tempAvailableCellsCount += 1;
          }

          if (cell.owner === state.currentPlayerNumber) {
            tempPlayerOneCellsCount += 1;
          }

          if (cell.owner === state.enemyPlayerNumber) {
            tempPlayerTwoCellsCount += 1;
          }
        }
      }
      state.availableCellsCount = tempAvailableCellsCount;
      state.PlayerOneCellsCount = tempPlayerOneCellsCount;
      state.PlayerTwoCellsCount = tempPlayerTwoCellsCount;
    },
  },
});

export default gameSlice.reducer;
