import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import {ICoordinates, IGameDataForRedux, ITableField} from "../../shared/types";
import { mockGameData } from "../../shared/GameClass/mockGameData";

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

export const generateGameData = createAction("game/generateGameData");

export const updateState = createAction<IGameDataForRedux>("game/updateState");
