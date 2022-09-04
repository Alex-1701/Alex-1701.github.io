import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ICoordinates } from "../../shared/types";

const mockGameData = {
  matrixWidth: 6,
  matrixHeight: 5,
  // prettier-ignore
  matrix: [
    [[1, 1], [1, 1], [3, 3], [3, 3], [5, 3], [4, 3],],
    [[1, 1], [1, 1], [0, 0], [0, 0], [3, 3], [1, 3],],
    [[4, 3], [3, 3], [0, 0], [0, 0], [5, 3], [3, 3],],
    [[2, 3], [5, 3], [0, 0], [0, 0], [4, 2], [4, 2],],
    [[1, 3], [3, 3], [4, 3], [3, 3], [4, 2], [4, 2],],
  ],

  // Цвета должны быть адаптивными к входящему объекту.
  // Или нет XD
  // const COLORS = [
  //   "grey",
  //   "rgb(255, 0, 0)", // red
  //   "orange",
  //   "yellow",
  //   "blue",
  //   "green",
  //   "MediumVioletRed",
  // ];

  currentPlayerNumber: 1,
  enemyPlayerNumber: 2,
  playerTurn: 1,
};

export const requestGameData = createAsyncThunk(
  "game/requestGameData",
  async (_, thunkApi) => {
    try {
      return mockGameData;
    } catch {
      return thunkApi.rejectWithValue("something went wrong");
    }
  }
);

export const registerPlayerOneTurn = createAsyncThunk(
  "game/registerPlayerOneTurn",
  async (coords: ICoordinates, thunkApi) => {
    try {
      return coords;
    } catch {
      return thunkApi.rejectWithValue("something went wrong");
    }
  }
);

export const registerPlayerTwoTurn = createAsyncThunk(
  "game/registerPlayerTwoTurn",
  async (coords: ICoordinates, thunkApi) => {
    try {
      return coords;
    } catch {
      return thunkApi.rejectWithValue("something went wrong");
    }
  }
);

export const recalculate = createAction("game/recalculate");
