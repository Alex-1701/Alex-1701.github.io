import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IGameDataForDisplay } from "types";
import { GameClass, mock_5x5 } from "shared";

export const requestGameData = createAsyncThunk(
  "game/requestGameData",
  async (_, thunkApi) => {
    try {
      return GameClass.gameDataConverter(mock_5x5);
    } catch {
      return thunkApi.rejectWithValue("something went wrong");
    }
  }
);

export const generateGameData = createAction("game/generateGameData");

export const updateState =
  createAction<IGameDataForDisplay>("game/updateState");
