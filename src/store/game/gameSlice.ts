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
  requestGameData, updateState,
} from "./gameActions";
import {
  findAllFreeNeighbors, findIsolatedAreas,
  generateMatrix,
  recalculate,
  registerTurn,
  selectColorsFromArray,
} from "../../shared/GameFunctions";
import {
  Owner
} from "../../shared/constants";
import {GameClass} from "../../shared/GameClass";

interface GameState {
  gameField: ITableField;
  isRequestingGameData: boolean;
  PlayerTurn: number;
  PlayerOneColor: number;
  PlayerTwoColor: number;
  availableCellsCount: number;
  PlayerOneCellsCount: number;
  PlayerTwoCellsCount: number;
  PlayerOneAvailableColors: number[];
  PlayerTwoAvailableColors: number[];
  winner: 0 | 1 | 2;
}

const initialState: GameState = {
  gameField: [],
  isRequestingGameData: false,
  PlayerTurn: 0,
  PlayerOneColor: 0,
  PlayerTwoColor: 0,
  availableCellsCount: 0,
  PlayerOneCellsCount: 0,
  PlayerTwoCellsCount: 0,
  PlayerOneAvailableColors: [],
  PlayerTwoAvailableColors: [],
  winner: 0,
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
          if (cell.owner === Owner.playerOne) {
            state.PlayerOneColor = cell.color;
          }
          if (cell.owner === Owner.playerTwo) {
            state.PlayerTwoColor = cell.color;
          }
        }
      }

      [
        state.availableCellsCount,
        state.PlayerOneCellsCount,
        state.PlayerTwoCellsCount,
      ] = recalculate(state.gameField);

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

      let freeNeighbors: ICoordinates[] = findAllFreeNeighbors(
        state.gameField,
        Owner.playerOne
      );
      let freeNeighborsColors = selectColorsFromArray(
        state.gameField,
        freeNeighbors
      );

      // If this is P1 turn and cell is Owner.free.
      if (
        state.PlayerTurn === Owner.playerOne &&
        state.gameField[y][x].owner === Owner.free &&
        freeNeighborsColors.includes(chosenColor)
      ) {
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

          freeNeighbors = findAllFreeNeighbors(state.gameField, Owner.playerOne);

          freeNeighborsColors = selectColorsFromArray(
            state.gameField,
            freeNeighbors
          );
        } while (freeNeighborsColors.includes(chosenColor));

        for (let i = 0; i < state.gameField.length; i += 1) {
          for (let j = 0; j < state.gameField[i].length; j += 1) {
            if (state.gameField[i][j].owner === Owner.playerOne)
              state.gameField[i][j].color = chosenColor;
          }
        }

        // This is for initiate next turn.
        state.PlayerTurn = Owner.playerTwo;
        state.PlayerOneColor = chosenColor;
        [
          state.availableCellsCount,
          state.PlayerOneCellsCount,
          state.PlayerTwoCellsCount,
        ] = recalculate(state.gameField);
      } else {
        console.log("forbidden", freeNeighborsColors.length);

        if (freeNeighborsColors.length === 0) {
          state.winner = 2;

        }

        console.log(state.winner);
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
        findIsolatedAreas(state.gameField);
        state.winner = 1;

      } else {
        state.gameField = registerTurn(state.gameField, Owner.playerTwo, { x, y });
        [
          state.availableCellsCount,
          state.PlayerOneCellsCount,
          state.PlayerTwoCellsCount,
        ] = recalculate(state.gameField);
        [
          state.availableCellsCount,
          state.PlayerOneCellsCount,
          state.PlayerTwoCellsCount,
        ] = recalculate(state.gameField);
        state.PlayerTurn = Owner.playerOne;
      }
    },
    [registerPlayerTwoTurn.rejected.type]: (state) => {
      // console.log("rejected");
    },

    [generateGameData.type]: (state) => {
      state.gameField = generateMatrix(15, 15);
    },

    [updateState.type]: (state) => {
      state.gameField = GameClass.matrix;
    }
  },
});

export default gameSlice.reducer;
