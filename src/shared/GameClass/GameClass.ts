import { ICoordinates, ITableField, ITableLine } from "../types";
import { mockGameData } from "./mockGameData";
import { FREE, PLAYER_ONE, PLAYER_TWO } from "../constants";
import { store } from "../../store";
import { updateState } from "../../store/game/gameActions";
import {
  findAllFreeNeighbors,
  recalculate,
  selectColorsFromArray,
} from "../GameFunctions";

export class GameClass {
  /* eslint-disable no-use-before-define */
  private static instance: GameClass;

  private static gameField: ITableField = [];
  private static isRequestingGameData: boolean;
  private static PlayerTurn: number;
  private static PlayerOneColor: number;
  private static PlayerTwoColor: number;
  private static availableCellsCount: number;
  private static PlayerOneCellsCount: number;
  private static PlayerTwoCellsCount: number;
  private static PlayerOneAvailableColors: number[];
  private static PlayerTwoAvailableColors: number[];
  private static winner: 0 | 1 | 2;

  // eslint-disable-next-line no-useless-constructor,@typescript-eslint/no-empty-function
  private constructor() {}

  public static get Instance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public static initGame(): void {
    const { matrix, playerTurn } = mockGameData;

    for (let i = 0; i < matrix.length; i += 1) {
      const newLine: ITableLine = [];
      for (let j = 0; j < matrix[i].length; j += 1) {
        newLine.push({
          color: matrix[i][j][0],
          owner: matrix[i][j][1],
        });
      }
      this.gameField.push(newLine);
    }

    this.PlayerTurn = playerTurn;

    // Now we know color of each player.
    for (const line of this.gameField) {
      for (const cell of line) {
        if (cell.owner === PLAYER_ONE) {
          this.PlayerOneColor = cell.color;
        }
        if (cell.owner === PLAYER_TWO) {
          this.PlayerTwoColor = cell.color;
        }
      }
    }

    console.log("Game class started");
    this.notifyRedux();
  }

  public static get matrix(): ITableField {
    return this.gameField;
  }

  private static notifyRedux(): void {
    store.dispatch(updateState());
  }

  public static registerPlayerOneTurn(turn: ICoordinates): void {
    const { x, y } = turn;
    const chosenColor = this.gameField[y][x].color; // get color is easy to move in method.

    console.log(x, y);

    let freeNeighbors: ICoordinates[] = findAllFreeNeighbors(
      this.gameField,
      PLAYER_ONE
    );
    let freeNeighborsColors = selectColorsFromArray(
      this.gameField,
      freeNeighbors
    );

    // If this is P1 turn and cell is free.
    if (
      this.PlayerTurn === PLAYER_ONE &&
      this.gameField[y][x].owner === FREE &&
      freeNeighborsColors.includes(chosenColor)
    ) {
      do {
        for (let i = 0; i < freeNeighbors.length; i += 1) {
          if (
            this.gameField[freeNeighbors[i].y][freeNeighbors[i].x].color ===
            chosenColor
          ) {
            console.log(
              this.gameField[freeNeighbors[i].y][freeNeighbors[i].x].owner
            );
            this.gameField[freeNeighbors[i].y][freeNeighbors[i].x].owner =
              this.PlayerTurn;
            this.gameField[freeNeighbors[i].y][freeNeighbors[i].x].color =
              this.PlayerOneColor;
          }
        }

        freeNeighbors = findAllFreeNeighbors(this.gameField, PLAYER_ONE);

        freeNeighborsColors = selectColorsFromArray(
          this.gameField,
          freeNeighbors
        );
      } while (freeNeighborsColors.includes(chosenColor));

      for (let i = 0; i < this.gameField.length; i += 1) {
        for (let j = 0; j < this.gameField[i].length; j += 1) {
          if (this.gameField[i][j].owner === PLAYER_ONE)
            this.gameField[i][j].color = chosenColor;
        }
      }

      // This is for initiate next turn.
      this.PlayerTurn = PLAYER_TWO;
      this.PlayerOneColor = chosenColor;
      [
        this.availableCellsCount,
        this.PlayerOneCellsCount,
        this.PlayerTwoCellsCount,
      ] = recalculate(this.gameField);
    } else {
      console.log("forbidden", freeNeighborsColors.length);

      if (freeNeighborsColors.length === 0) {
        this.winner = 2;
      }

      console.log(this.winner);
    }

    console.log("P1 turn");
    this.notifyRedux();
  }

  private static executeTurn(player: number, newColor: number): void {
    console.log("turn");
  }
}
