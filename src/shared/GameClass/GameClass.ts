// import * as _ from "lodash";
import {
  ICoordinates,
  IGameData,
  IGameDataForDisplay,
  ITableField,
  ITableFieldEmoji,
  ITableFieldNumeric,
  ITableLine,
  ITableLineEmoji,
} from "../types";
import {mockGameData} from "./mockGameData";
import {emojiCells, Owner} from "../constants";
import {IWinner, Winner} from "../constants/winner";

export class GameClass {
  private gameField: ITableField = [];
  private PlayerTurn = 0;
  private PlayerOneColor = 0;
  private PlayerTwoColor = 0;
  private availableCellsCount = 0;
  private PlayerOneCellsCount = 0;
  private PlayerTwoCellsCount = 0;
  private PlayerOneAvailableColors: number[] | null = null;
  private PlayerTwoAvailableColors: number[] | null = null;
  /**
   * 0 - draw
   * 1 - player one win
   * 2 - player two win
   * null - not finished yet
   * @private
   */
  private winner: IWinner = null;
  private readonly MatrixHeight: number;
  private readonly MatrixWidth: number;

  public constructor(gameData?: IGameData) {
    const {matrix, playerTurn} = gameData || mockGameData;

    // Matrix should be rectangle!!!

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
        if (cell.owner === Owner.playerOne) {
          this.PlayerOneColor = cell.color;
        }
        if (cell.owner === Owner.playerTwo) {
          this.PlayerTwoColor = cell.color;
        }
      }
    }

    this.recalculate();
  }

  public clone(): GameClass {
    return new GameClass({
      matrix: this.matrixNumbers,
      currentPlayerNumber: 1,
      enemyPlayerNumber: 2,
      playerTurn: this.PlayerTurn,
    });
  }

  public get matrix(): ITableField {
    return this.gameField;
  }

  public get matrixNumbers(): ITableFieldNumeric {
    const resMatrix: ITableFieldNumeric = [];
    for (let i = 0; i < this.matrixHeight; i += 1) {
      const newLine: number[][] = [];
      for (let j = 0; j < this.matrixWidth; j += 1) {
        const {color, owner} = this.matrix[i][j];
        newLine.push([color, owner]);
      }
      resMatrix.push(newLine);
    }
    return resMatrix;
  }

  public get gameWinner(): IWinner {
    return this.winner;
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

  public returnMainData(): IGameDataForDisplay {
    return {
      gameField: this.matrix,
      availableCellsCount: this.availableCellsCount,
      PlayerOneCellsCount: this.PlayerOneCellsCount,
      PlayerTwoCellsCount: this.PlayerTwoCellsCount,
      PlayerTurn: this.PlayerTurn,
      winner: this.winner,
    };
  }

  // public notifyRedux(): void {
  //   const data: IGameDataForDisplay = {
  //     gameField: this.matrix,
  //     availableCellsCount: this.availableCellsCount,
  //     PlayerOneCellsCount: this.PlayerOneCellsCount,
  //     PlayerTwoCellsCount: this.PlayerTwoCellsCount,
  //     PlayerTurn: this.PlayerTurn,
  //     winner: this.winner,
  //   };
  //   // Aaaand this is solution of binding to redux. But not the case I will use.
  //   const clone: IGameDataForDisplay = _.cloneDeep(data);
  //
  //   store.dispatch(updateState(clone));
  // }

  public color(x: number, y: number): number {
    return this.gameField[y][x].color;
  }

  public owner(x: number, y: number): number {
    return this.gameField[y][x].owner;
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
          this.gameField[i][j].owner === Owner.free
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

  /**
   * calculate new count after turn.
   * @returns {Array} playableCells, playerOneCells, playerTwoCells
   */
  public recalculate = (): number[] => {
    let availableCellsCount = 0;
    let PlayerOneCellsCount = 0;
    let PlayerTwoCellsCount = 0;
    for (const line of this.matrix) {
      for (const cell of line) {
        if (cell.owner !== Owner.unavailable) {
          availableCellsCount += 1;
        }

        if (cell.owner === Owner.playerOne) {
          PlayerOneCellsCount += 1;
        }

        if (cell.owner === Owner.playerTwo) {
          PlayerTwoCellsCount += 1;
        }
      }
    }
    return [availableCellsCount, PlayerOneCellsCount, PlayerTwoCellsCount];
  };

  public static emojiToMatrixConverter(
    emojiMatrix: ITableFieldEmoji
  ): ITableFieldNumeric {
    const resMatrix: ITableFieldNumeric = [];
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

  public static matrixToEmojiConverter(
    matrix: ITableFieldNumeric
  ): ITableFieldEmoji {
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

  /**
   * @return is turn successful
   * @param turn
   * @param player
   */
  public registerTurn(
    turn: ICoordinates,
    player: Owner.playerOne | Owner.playerTwo
  ): void {
    const {x, y} = turn;

    if (x >= 0 && x < this.matrixWidth && y >= 0 && y < this.matrixHeight) {
      const chosenColor = this.color(x, y);

      let freeNeighbors: ICoordinates[] = this.findAllFreeNeighbors(player);
      let freeNeighborsColors = this.selectColorsFromArray(freeNeighbors);

      // If this is P1 turn and cell is Owner.free.
      if (
        this.PlayerTurn === player &&
        this.gameField[y][x].owner === Owner.free &&
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

          freeNeighbors = this.findAllFreeNeighbors(player);

          freeNeighborsColors = this.selectColorsFromArray(freeNeighbors);
        } while (freeNeighborsColors.includes(chosenColor));

        for (let i = 0; i < this.gameField.length; i += 1) {
          for (let j = 0; j < this.gameField[i].length; j += 1) {
            if (this.gameField[i][j].owner === player)
              this.gameField[i][j].color = chosenColor;
          }
        }

        // This is for initiate next turn.
        this.PlayerTurn =
          player === Owner.playerOne ? Owner.playerTwo : Owner.playerOne;
        this.PlayerOneColor = chosenColor;
        [
          this.availableCellsCount,
          this.PlayerOneCellsCount,
          this.PlayerTwoCellsCount,
        ] = this.recalculate();

        if (
          this.availableCellsCount ===
          this.PlayerOneCellsCount + this.PlayerTwoCellsCount
        ) {
          if (this.PlayerOneCellsCount === this.PlayerTwoCellsCount) {
            this.winner = Winner.draw;
          } else {
            this.winner =
              this.PlayerOneCellsCount > this.PlayerTwoCellsCount
                ? Owner.playerOne
                : Owner.playerTwo;
          }
        }
      } else if (freeNeighborsColors.length === 0) {
        this.winner =
          player === Owner.playerOne ? Owner.playerTwo : Owner.playerOne;
      }

      // return <IGameDataForRedux>
    } else {
      console.log("Error: out of matrix");
    }
  }
}
