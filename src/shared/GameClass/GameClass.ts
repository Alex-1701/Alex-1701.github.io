import {
  ICoordinates,
  IGameDataEmoji,
  IGameDataForDisplay,
  IGameDataNumeric,
  ITableField,
  ITableFieldEmoji,
  ITableFieldNumeric,
  ITableLine,
  ITableLineEmoji,
  ITableLineNumeric,
} from "types";
import { mock_labyrinth } from "./mockGameData";
import {
  Color,
  emojiCells,
  IPlayer,
  IWinner,
  Owner,
  Winner,
} from "../constants";

export class GameClass {
  private gameField: ITableField = [];
  private PlayerTurn: IPlayer = 1;
  private PlayerOneColor: Color = 0;
  private PlayerTwoColor: Color = 0;
  private availableCellsCount = 0;
  private PlayerOneCellsCount = 0;
  private PlayerTwoCellsCount = 0;
  private PlayerOneAvailableColors: number[] | null = null;
  private PlayerTwoAvailableColors: number[] | null = null;
  private winner: IWinner = null;
  private readonly MatrixHeight: number;
  private readonly MatrixWidth: number;

  public constructor(gameData?: IGameDataNumeric) {
    const { matrix, playerTurn } =
      gameData || GameClass.gameDataConverter(mock_labyrinth);

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

    if (this.PlayerOneColor === 0 || this.PlayerTwoColor === 0)
      throw new Error();
  }

  public static generateMatrix = (
    width: number,
    height: number
  ): ITableField => {
    const matrix: ITableField = [];
    const pureMatrix: ITableFieldNumeric = [];

    for (let i = 0; i < height; i += 1) {
      const newLine: ITableLine = [];
      const pureLine: number[][] = [];
      for (let j = 0; j < width; j += 1) {
        const color = GameClass.randomInt(1, 6);
        const owner = Owner.free;

        newLine.push({
          color,
          owner,
        });

        pureLine.push([color, owner]);
      }
      matrix.push(newLine);
      pureMatrix.push(pureLine);
    }
    return matrix;
  };

  public static randomInt = (min: number, max: number): number =>
    Math.round(Math.random() * (max - min) + min);

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
        const { color, owner } = this.matrix[i][j];
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

  public color(x: number, y: number): Color {
    return this.gameField[y][x].color;
  }

  public owner(x: number, y: number): Owner {
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

  /**
   * get coordinates of all matrix cells
   */
  public getAllCells = (): ICoordinates[] => {
    const coords: ICoordinates[] = [];

    for (let i = 0; i < this.MatrixHeight; i += 1) {
      for (let j = 0; j < this.MatrixWidth; j += 1) {
        coords.push({ x: j, y: i });
      }
    }

    return coords;
  };

  /**
   * get all cells of targeted owner
   * @param owner
   */
  public findAllOwnerCells = (owner: Owner): ICoordinates[] => {
    const res: ICoordinates[] = [];

    this.getAllCells().forEach((cell) => {
      if (this.gameField[cell.y][cell.x].owner === owner)
        res.push({ x: cell.x, y: cell.y });
    });

    return res;
  };

  public findAllFreeCells = (): ICoordinates[] => {
    return this.findAllOwnerCells(Owner.free);
  };

  public findAllPlayerCells = (player: IPlayer): ICoordinates[] => {
    return this.findAllOwnerCells(player);
  };

  /**
   * Gets all cells that are neighbors with target.
   * @param player
   */
  public findAllNeighbors = (player: IPlayer): ICoordinates[] => {
    const allCells = this.getAllCells().filter((cell) =>
      this.checkCellNeighbors(cell.x, cell.y, player, "owner")
    );

    return allCells.filter(
      (cell) => this.gameField[cell.y][cell.x].owner !== player
    );
  };

  /**
   * Gets all cells that are neighbors and enemy with target .
   * @param player
   */
  public findAllEnemyNeighbors = (player: IPlayer): ICoordinates[] => {
    const allNeighbors = this.findAllNeighbors(player);

    const enemy =
      player === Owner.playerOne ? Owner.playerTwo : Owner.playerOne;

    return allNeighbors.filter(
      (cell) => this.gameField[cell.y][cell.x].owner === enemy
    );
  };

  public findAllFreeNeighbors = (target: IPlayer): ICoordinates[] => {
    return this.findAllFreeCells().filter((cell) =>
      this.checkCellNeighbors(cell.x, cell.y, target, "owner")
    );
  };

  public selectColorsFromArray = (array: ICoordinates[]): Color[] => {
    const colors: number[] = [];
    for (let i = 0; i < array.length; i += 1) {
      const { color } = this.matrix[array[i].y][array[i].x];
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

    this.availableCellsCount = availableCellsCount;
    this.PlayerOneCellsCount = PlayerOneCellsCount;
    this.PlayerTwoCellsCount = PlayerTwoCellsCount;

    return [availableCellsCount, PlayerOneCellsCount, PlayerTwoCellsCount];
  };

  public static emojiToMatrixConverter(
    emojiMatrix: ITableFieldEmoji
  ): ITableFieldNumeric {
    const resMatrix: ITableFieldNumeric = [];
    for (let i = 0; i < emojiMatrix.length; i += 1) {
      const newLine: ITableLineNumeric = [];
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

  public static gameDataConverter(gameData: IGameDataEmoji): IGameDataNumeric {
    return {
      currentPlayerNumber: gameData.currentPlayerNumber,
      enemyPlayerNumber: gameData.enemyPlayerNumber,
      playerTurn: gameData.playerTurn,
      matrix: GameClass.emojiToMatrixConverter(gameData.matrix),
    };
  }

  public joinAllIsolatedAreas() {
    this.joinIsolatedAreas(Owner.playerOne);
    this.joinIsolatedAreas(Owner.playerTwo);

    // [this.availableCellsCount, this.PlayerOneCellsCount, this.PlayerTwoCellsCount] =
    this.recalculate();
  }

  public joinIsolatedAreas(player: IPlayer) {
    let freeNeighbors: ICoordinates[] = this.findAllFreeNeighbors(player);

    do {
      for (let i = 0; i < freeNeighbors.length; i += 1) {
        this.gameField[freeNeighbors[i].y][freeNeighbors[i].x].owner = player;
        this.gameField[freeNeighbors[i].y][freeNeighbors[i].x].color =
          player === Owner.playerOne
            ? this.PlayerOneColor
            : this.PlayerTwoColor;
      }

      freeNeighbors = this.findAllFreeNeighbors(player);
    } while (freeNeighbors.length);
  }

  /**
   * Repaint all cells for chosen player in chosen color
   * @param player
   * @param newColor
   */
  public repaintForPlayer(player: IPlayer, newColor: Color) {
    this.getAllCells().forEach((cell) => {
      if (this.gameField[cell.y][cell.x].owner === player)
        this.gameField[cell.y][cell.x].color = newColor;
    });
  }

  /**
   * @return is turn successful
   * @param turn
   * @param player
   */
  public registerTurn(turn: ICoordinates | null, player: IPlayer): boolean {
    if (turn === null) {
      const freeNeighborsOne = this.findAllFreeNeighbors(Owner.playerOne);
      const freeNeighborsTwo = this.findAllFreeNeighbors(Owner.playerTwo);

      if (freeNeighborsOne.length === 0 || freeNeighborsTwo.length === 0) {
        this.joinAllIsolatedAreas();
        // this.repaintForPlayer(player, chosenColor);
        if (this.PlayerOneCellsCount === this.PlayerTwoCellsCount) {
          this.winner = Winner.draw;
        } else {
          this.winner =
            this.PlayerOneCellsCount > this.PlayerTwoCellsCount
              ? Owner.playerOne
              : Owner.playerTwo;
        }

        return true;
      }
      return true;
    }
    const { x, y } = turn;
    if (x < 0 || x >= this.MatrixWidth || y < 0 || y >= this.MatrixHeight) {
      return false;
    }

    const chosenColor: Color = this.color(x, y);
    if (!Color[chosenColor]) {
      return false;
    }

    let freeNeighbors: ICoordinates[] = this.findAllFreeNeighbors(player);
    let freeNeighborsColors = this.selectColorsFromArray(freeNeighbors);

    // if (freeNeighbors.length === 0) {
    //   // impossible to make turn
    //   this.joinAllIsolatedAreas();
    //   return true;
    // }

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
          }
        }

        freeNeighbors = this.findAllFreeNeighbors(player);

        freeNeighborsColors = this.selectColorsFromArray(freeNeighbors);
      } while (freeNeighborsColors.includes(chosenColor));

      // Перекраска в новый цвет.
      this.repaintForPlayer(player, chosenColor);

      // This is for initiate next turn.
      this.PlayerTurn =
        player === Owner.playerOne ? Owner.playerTwo : Owner.playerOne;

      if (player === Owner.playerOne) {
        this.PlayerOneColor = chosenColor;
      } else {
        this.PlayerTwoColor = chosenColor;
      }

      // [this.availableCellsCount, this.PlayerOneCellsCount, this.PlayerTwoCellsCount] =
      this.recalculate();

      const freeNeighborsOne = this.findAllFreeNeighbors(Owner.playerOne);
      const freeNeighborsTwo = this.findAllFreeNeighbors(Owner.playerTwo);

      if (freeNeighborsOne.length === 0 || freeNeighborsTwo.length === 0) {
        this.joinAllIsolatedAreas();
        this.repaintForPlayer(player, chosenColor);
        if (this.PlayerOneCellsCount === this.PlayerTwoCellsCount) {
          this.winner = Winner.draw;
        } else {
          this.winner =
            this.PlayerOneCellsCount > this.PlayerTwoCellsCount
              ? Owner.playerOne
              : Owner.playerTwo;
        }

        return true;
      }
    } else if (freeNeighborsColors.length === 0) {
      this.winner =
        player === Owner.playerOne ? Owner.playerTwo : Owner.playerOne;

      return false;
    } else {
      return false;
    }

    return true;
  }
}
