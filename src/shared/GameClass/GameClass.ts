import {
  ICoordinates,
  IGameData,
  ITableField,
  ITableFieldEmoji,
  ITableLine,
  ITableLineEmoji,
} from "../types";
import {mockGameData} from "./mockGameData";
import {emojiCells, FREE, PLAYER_ONE, PLAYER_TWO, UNAVAILABLE} from "../constants";
import {store} from "../../store";
import {updateState} from "../../store/game/gameActions";

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
    const {matrix, playerTurn} = gameData || mockGameData;

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
    const {x, y} = turn;

    if (x >= 0 && x < this.matrixWidth && y >= 0 && y < this.matrixHeight) {
      // const chosenColor = this.gameField[y][x].color; // get color is easy to move in method.
      const chosenColor = this.color(x, y); // get color is easy to move in method.

      let freeNeighbors: ICoordinates[] = this.findAllFreeNeighbors(PLAYER_ONE);
      let freeNeighborsColors = this.selectColorsFromArray(freeNeighbors);

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

          freeNeighbors = this.findAllFreeNeighbors(PLAYER_ONE);

          freeNeighborsColors = this.selectColorsFromArray(freeNeighbors);
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
        ] = this.recalculate();
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
    const {x, y} = turn;

    if (x >= 0 && x < this.matrixWidth && y >= 0 && y < this.matrixHeight) {
      const chosenColor = this.color(x, y);

      let freeNeighbors: ICoordinates[] = this.findAllFreeNeighbors(PLAYER_TWO);
      let freeNeighborsColors = this.selectColorsFromArray(freeNeighbors);

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

          freeNeighbors = this.findAllFreeNeighbors(PLAYER_TWO);

          freeNeighborsColors = this.selectColorsFromArray(freeNeighbors);
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
        ] = this.recalculate();
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
          res.push({x: j, y: i});
      }
    }

    return res;
  };

  public selectColorsFromArray = (array: ICoordinates[]): number[] => {
    const colors: number[] = [];
    for (let i = 0; i < array.length; i += 1) {
      const {color} = this.matrix[array[i].y][array[i].x];
      if (!colors.includes(color)) {
        colors.push(color);
      }
    }
    return colors;
  };

  public recalculate = (): number[] => {
    let availableCellsCount = 0;
    let PlayerOneCellsCount = 0;
    let PlayerTwoCellsCount = 0;
    for (const line of this.matrix) {
      for (const cell of line) {
        if (cell.owner !== UNAVAILABLE) {
          availableCellsCount += 1;
        }

        if (cell.owner === PLAYER_ONE) {
          PlayerOneCellsCount += 1;
        }

        if (cell.owner === PLAYER_TWO) {
          PlayerTwoCellsCount += 1;
        }
      }
    }
    return [availableCellsCount, PlayerOneCellsCount, PlayerTwoCellsCount];
  };

  public static emojiToMatrixConverter(
    emojiMatrix: ITableFieldEmoji
  ): number[][][] {
    const resMatrix: number[][][] = [];
    for (let i = 0; i < emojiMatrix.length; i += 1) {
      const newLine: number[][] = [];
      for (let j = 0; j < emojiMatrix[0].length; j += 1) {
        const emojiCell = emojiCells.find(
          (cell) => cell.emoji === emojiMatrix[i][j]
        );
        const newCell: number[] = emojiCell
          ? emojiCell.cell
          : emojiCells[0].cell;
        newLine.push(newCell);
      }
      resMatrix.push(newLine);
    }
    return resMatrix;
  }

  public static matrixToEmojiConverter(matrix: number[][][]): ITableFieldEmoji {
    const resEmojiMatrix: ITableFieldEmoji = [];
    for (let i = 0; i < matrix.length; i += 1) {
      const newEmojiLine: ITableLineEmoji = [];
      for (let j = 0; j < matrix[0].length; j += 1) {
        const emojiCell = emojiCells.find(
          (cell) =>
            cell.cell[0] === matrix[i][j][0] && cell.cell[1] === matrix[i][j][1]
        );
        const newCell: string = emojiCell
          ? emojiCell.emoji
          : emojiCells[0].emoji;
        newEmojiLine.push(newCell);
      }
      resEmojiMatrix.push(newEmojiLine);
    }
    return resEmojiMatrix;
  }

  private static executeTurn(player: number, newColor: number): void {
    console.log("turn");
  }
}
