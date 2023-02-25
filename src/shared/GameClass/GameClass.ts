import {
  ICoordinates,
  IGameData,
  ITableField,
  ITableFieldEmoji,
  ITableLine,
} from "../types";
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
    // console.log(matrix);

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

    if (x >= 0 && x < this.matrixWidth && y >= 0 && y < this.matrixHeight) {
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

  public registerPlayerTwoTurn(turn: ICoordinates): void {
    const { x, y } = turn;

    if (x >= 0 && x < this.matrixWidth && y >= 0 && y < this.matrixHeight) {
      const chosenColor = this.color(x, y);

      let freeNeighbors: ICoordinates[] = findAllFreeNeighbors(
        this.gameField,
        PLAYER_TWO
      );
      let freeNeighborsColors = selectColorsFromArray(
        this.gameField,
        freeNeighbors
      );

      // If this is P1 turn and cell is free.
      if (
        this.PlayerTurn === PLAYER_TWO &&
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

          freeNeighbors = findAllFreeNeighbors(this.gameField, PLAYER_TWO);

          freeNeighborsColors = selectColorsFromArray(
            this.gameField,
            freeNeighbors
          );
        } while (freeNeighborsColors.includes(chosenColor));

        for (let i = 0; i < this.gameField.length; i += 1) {
          for (let j = 0; j < this.gameField[i].length; j += 1) {
            if (this.gameField[i][j].owner === PLAYER_TWO)
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

  public checkCell = (
    x: number,
    y: number,
    target: number,
    type: "color" | "owner"
  ): boolean => {
    if (
      y >= 0 &&
      y < this.gameField.length &&
      x >= 0 &&
      x < this.gameField[y].length
    ) {
      return this.gameField[y][x][type] === target;
    }
    return false;
  };

  public checkCellNeighbors = (
    x: number,
    y: number,
    target: number,
    type: "color" | "owner"
  ): boolean =>
    this.checkCell(x, y - 1, target, type) ||
    this.checkCell(x, y + 1, target, type) ||
    this.checkCell(x + 1, y, target, type) ||
    this.checkCell(x - 1, y, target, type);

  public findAllFreeNeighbors = (target: number): ICoordinates[] => {
    const res: ICoordinates[] = [];

    for (let i = 0; i < this.MatrixHeight; i += 1) {
      for (let j = 0; j < this.MatrixWidth; j += 1) {
        if (
          this.checkCellNeighbors(j, i, target, "owner") &&
          this.gameField[i][j].owner === FREE
        )
          res.push({ x: j, y: i });
      }
    }

    return res;
  };

  public static emojiConverter(emojiMatrix: ITableFieldEmoji): number[][][] {
    const resMatrix: number[][][] = [];
    for (let i = 0; i < emojiMatrix[0].length; i += 1) {
      const newLine: number[][] = [];
      for (let j = 0; j < emojiMatrix[0][0].length; j += 1) {
        let newCell: number[];

        switch (emojiMatrix[i][j]) {
          case "♥":
            // newCell = {color: 1, owner: 1}
            newCell = [1, 1];
            break;
          case "🟥":
            // newCell = {color: 1, owner: 2}
            newCell = [1, 2];
            break;
          case "🔴":
            // newCell = {color: 1, owner: 3}
            newCell = [1, 3];
            break;

          case "🧡":
            // newCell = {color: 2, owner: 1}
            newCell = [2, 1];
            break;
          case "🟧":
            // newCell = {color: 2, owner: 2}
            newCell = [2, 2];
            break;
          case "🟠":
            // newCell = {color: 2, owner: 3}
            newCell = [2, 3];
            break;

          case "💛":
            // newCell = {color: 3, owner: 1}
            newCell = [3, 1];
            break;
          case "🟨":
            // newCell = {color: 3, owner: 2}
            newCell = [3, 2];
            break;
          case "🟡":
            // newCell = {color: 3, owner: 3}
            newCell = [3, 3];
            break;

          case "💙":
            // newCell = {color: 4, owner: 1}
            newCell = [4, 1];
            break;
          case "🟦":
            // newCell = {color: 4, owner: 2}
            newCell = [4, 2];
            break;
          case "🔵":
            // newCell = {color: 4, owner: 3}
            newCell = [4, 3];
            break;

          case "💚":
            // newCell = {color: 5, owner: 1}
            newCell = [5, 1];
            break;
          case "🟩":
            // newCell = {color: 5, owner: 2}
            newCell = [5, 2];
            break;
          case "🟢":
            // newCell = {color: 5, owner: 3}
            newCell = [5, 3];
            break;

          case "💜":
            // newCell = {color: 6, owner: 1}
            newCell = [6, 1];
            break;
          case "🟪":
            // newCell = {color: 6, owner: 2}
            newCell = [6, 2];
            break;
          case "🟣":
            // newCell = {color: 6, owner: 3}
            newCell = [6, 3];
            break;

          default:
            // newCell = {color: 1, owner: 3}
            newCell = [1, 1];
            break;
        }
        newLine.push(newCell);
      }
      resMatrix.push(newLine);
    }

    return resMatrix;
  }

  private static executeTurn(player: number, newColor: number): void {
    console.log("turn");
  }
}
