import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IGameDataForDisplay } from "../../shared/types";
import { mockGameData } from "../../shared/GameClass/mockGameData";
import { GameClass } from "../../shared/GameClass";

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
