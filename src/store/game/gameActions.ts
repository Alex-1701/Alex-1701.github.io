import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IGameDataForDisplay } from "types";
import { GameClass, mockGameData } from "shared";

export const requestGameData = createAsyncThunk(
  "game/requestGameData",
  async (_, thunkApi) => {
    try {
      return GameClass.gameDataConverter(mockGameData);
    } catch {
      return thunkApi.rejectWithValue("something went wrong");
    }
  }
);

export const generateGameData = createAction("game/generateGameData");

export const updateState =
  createAction<IGameDataForDisplay>("game/updateState");
