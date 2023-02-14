import { ICoordinates, IGameData, ITableField, ITableLine } from "../types";
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
  private gameField: ITableField = [];
  // private isRequestingGameData: boolean;
  private PlayerTurn = 0;
  private PlayerOneColor = 0;
  private PlayerTwoColor = 0;
  private availableCellsCount = 0;
  private PlayerOneCellsCount = 0;
  private PlayerTwoCellsCount = 0;
  private PlayerOneAvailableColors: number[] | null = null;
  private PlayerTwoAvailableColors: number[] | null = null;
  private winner: 0 | 1 | 2 | null = null;
  private MatrixHeight = 0;
  private MatrixWidth = 0;

  public constructor(gameData?: IGameData) {
    this.initGame(gameData);
  }

  public initGame(gameData?: IGameData): void {
    const { matrix, playerTurn } = gameData || mockGameData;

    // Matrix should be rectangle!!!
    console.log(matrix);

    this.MatrixHeight = matrix.length;
    this.MatrixWidth = matrix[0].length;



    for (let i = 0; i < this.MatrixHeight; i += 1) {
      const newLine: ITableLine = [];
      for (let j = 0; j < this.MatrixWidth; j += 1) {
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

    this.notifyRedux();
  }

  public get matrix(): ITableField {
    return this.gameField;
  }

  public get playerTurn(): number {
    return this.PlayerTurn;
  }

  public get playerOneColor(): number {
    return this.PlayerOneColor;
  }

  public get playerTwoColor(): number {
    return this.PlayerTwoColor;
  }

  public get matrixHeight(): number {
    return this.MatrixHeight;
  }

  public get matrixWidth(): number {
    return this.MatrixWidth;
  }

  // eslint-disable-next-line class-methods-use-this
  private notifyRedux(): void {
    store.dispatch(updateState());
  }

  public color(x: number, y: number): number {
    return this.gameField[y][x].color;
  }

  public owner(x: number, y: number): number {
    return this.gameField[y][x].owner;
  }

  public registerPlayerOneTurn(turn: ICoordinates): void {
    const { x, y } = turn;

    if (
      x >= 0 &&
      x < this.matrixWidth &&
      y >= 0 &&
      y < this.matrixHeight
    ) {
      // const chosenColor = this.gameField[y][x].color; // get color is easy to move in method.
      const chosenColor = this.color(x, y); // get color is easy to move in method.

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
              this.color(freeNeighbors[i].x, freeNeighbors[i].y) === chosenColor
            ) {
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
    } else {
      console.log("Error: out of matrix");
    }
  }

  private static executeTurn(player: number, newColor: number): void {
    console.log("turn");
  }
}
