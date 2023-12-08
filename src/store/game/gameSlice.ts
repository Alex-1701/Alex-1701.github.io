import { createSlice } from "@reduxjs/toolkit";
import { ITableField } from "@types";
import { GameClass, IWinner, Player } from "@shared";
import { generateGameData, requestGameData, updateState } from "./gameActions";

interface GameState {
  gameField: ITableField;
  isRequestingGameData: boolean;
  PlayerTurn: Player;
  PlayerOneColor: number;
  PlayerTwoColor: number;
  availableCellsCount: number;
  PlayerOneCellsCount: number;
  PlayerTwoCellsCount: number;
  PlayerOneAvailableColors: number[];
  PlayerTwoAvailableColors: number[];
  winner: IWinner;
}

const initialState: GameState = {
  gameField: [],
  isRequestingGameData: false,
  PlayerTurn: 1,
  PlayerOneColor: 0,
  PlayerTwoColor: 0,
  availableCellsCount: 0,
  PlayerOneCellsCount: 0,
  PlayerTwoCellsCount: 0,
  PlayerOneAvailableColors: [],
  PlayerTwoAvailableColors: [],
  winner: null,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(requestGameData.pending, (state) => {
      state.isRequestingGameData = true;
    });

    builder.addCase(requestGameData.fulfilled, (state) => {
      state.isRequestingGameData = false;
    });

    builder.addCase(requestGameData.rejected, (state) => {
      state.isRequestingGameData = false;
    });

    builder.addCase(generateGameData, (state) => {
      state.gameField = GameClass.generateMatrix(15, 15);
    });

    builder.addCase(updateState, (state, { payload }) => {
      state.gameField = payload.gameField;
      state.PlayerTurn = payload.PlayerTurn;
      state.availableCellsCount = payload.availableCellsCount;
      state.PlayerOneCellsCount = payload.PlayerOneCellsCount;
      state.PlayerTwoCellsCount = payload.PlayerTwoCellsCount;
      state.winner = payload.winner;
    });
  },
});

export default gameSlice.reducer;
