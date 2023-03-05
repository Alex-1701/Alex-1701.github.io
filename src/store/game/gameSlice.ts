import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGameDataForDisplay, ITableField } from "../../shared/types";
import { generateGameData, requestGameData, updateState } from "./gameActions";
import { IPlayer } from "../../shared/constants";
import { IWinner } from "../../shared/constants/winner";
import { GameClass } from "../../shared/GameClass";

interface GameState {
  gameField: ITableField;
  isRequestingGameData: boolean;
  PlayerTurn: IPlayer;
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
    [requestGameData.fulfilled.type]: (state) => {
      state.isRequestingGameData = false;
    },
    [requestGameData.rejected.type]: (state) => {
      state.isRequestingGameData = false;
    },

    [generateGameData.type]: (state) => {
      state.gameField = GameClass.generateMatrix(15, 15);
    },

    [updateState.type]: (state, action: PayloadAction<IGameDataForDisplay>) => {
      state.gameField = action.payload.gameField;
      state.PlayerTurn = action.payload.PlayerTurn;
      state.availableCellsCount = action.payload.availableCellsCount;
      state.PlayerOneCellsCount = action.payload.PlayerOneCellsCount;
      state.PlayerTwoCellsCount = action.payload.PlayerTwoCellsCount;
      state.winner = action.payload.winner;
    },
  },
});

export default gameSlice.reducer;
