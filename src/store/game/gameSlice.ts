import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICoordinates,
  IMockGameData,
  ITableField,
  ITableLine,
} from "../../shared/types";
import {
  generateGameData,
  registerPlayerOneTurn,
  registerPlayerTwoTurn,
  requestGameData,
} from "./gameActions";
import {
  findAllFreeNeighbors,
  generateMatrix, recalculate,
  registerTurn,
  selectColorsFromArray,
} from "../../shared/GameFunctions";
import {
  FREE,
  PLAYER_ONE,
  PLAYER_TWO,
  UNAVAILABLE,
} from "../../shared/constants";

interface GameState {
  isRequestingGameData: boolean;
  gameField: ITableField;
  PlayerTurn: number;
  PlayerOneColor: number;
  PlayerTwoColor: number;
  availableCellsCount: number;
  PlayerOneCellsCount: number;
  PlayerTwoCellsCount: number;
  PlayerOneAvailableColors: number[];
  PlayerTwoAvailableColors: number[];
}

const initialState: GameState = {
  isRequestingGameData: false,
  gameField: [],
  PlayerTurn: 0,
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

      // Now we know color of each player.
      for (const line of state.gameField) {
        for (const cell of line) {
          if (cell.owner === PLAYER_ONE) {
            state.PlayerOneColor = cell.color;
          }
          if (cell.owner === PLAYER_TWO) {
            state.PlayerTwoColor = cell.color;
          }
        }
      }

      [state.availableCellsCount, state.PlayerOneCellsCount, state.PlayerTwoCellsCount] = recalculate(state.gameField);

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
        state.PlayerTurn === PLAYER_ONE &&
        state.gameField[y][x].owner === FREE
      ) {
        let freeNeighbors: ICoordinates[] = findAllFreeNeighbors(
          state.gameField,
          PLAYER_ONE
        );
        let freeNeighborsColors = selectColorsFromArray(
          state.gameField,
          freeNeighbors
        );

        do {
          for (let i = 0; i < freeNeighbors.length; i += 1) {
            if (
              state.gameField[freeNeighbors[i].y][freeNeighbors[i].x].color ===
              chosenColor
            ) {
              state.gameField[freeNeighbors[i].y][freeNeighbors[i].x].owner =
                state.PlayerTurn;
              state.gameField[freeNeighbors[i].y][freeNeighbors[i].x].color =
                state.PlayerOneColor;
            }
          }

          freeNeighbors = findAllFreeNeighbors(state.gameField, PLAYER_ONE);

          freeNeighborsColors = selectColorsFromArray(
            state.gameField,
            freeNeighbors
          );
        } while (freeNeighborsColors.includes(chosenColor));

        for (let i = 0; i < state.gameField.length; i += 1) {
          for (let j = 0; j < state.gameField[i].length; j += 1) {
            if (state.gameField[i][j].owner === PLAYER_ONE)
              state.gameField[i][j].color = chosenColor;
          }
        }

        // This is for initiate next turn.
        state.PlayerTurn = PLAYER_TWO;
        state.PlayerOneColor = chosenColor;
        [state.availableCellsCount, state.PlayerOneCellsCount, state.PlayerTwoCellsCount] = recalculate(state.gameField);
      } else {
        console.log("forbidden");
      }
    },
    [registerPlayerOneTurn.rejected.type]: (state) => {
      // console.log("rejected");
    },
    // ---

    [registerPlayerTwoTurn.pending.type]: (state) => {
      // console.log("pending");
    },
    [registerPlayerTwoTurn.fulfilled.type]: (
      state,
      action: PayloadAction<ICoordinates>
    ) => {
      const { x, y } = action.payload;
      if (x === -1 && y === -1) {
        // P2 lose
        console.log("P2 LOSE");
      } else {
        state.gameField = registerTurn(state.gameField, PLAYER_TWO, { x, y });
        [state.availableCellsCount, state.PlayerOneCellsCount, state.PlayerTwoCellsCount] = recalculate(state.gameField);
        [state.availableCellsCount, state.PlayerOneCellsCount, state.PlayerTwoCellsCount] = recalculate(state.gameField);
        state.PlayerTurn = PLAYER_ONE;
      }
    },
    [registerPlayerTwoTurn.rejected.type]: (state) => {
      // console.log("rejected");
    },



    [generateGameData.type]: (state) => {
      state.gameField = generateMatrix(15, 15);
    },
  },
});

export default gameSlice.reducer;
