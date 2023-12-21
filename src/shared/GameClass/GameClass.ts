import {
  ICoordinates,
  IGameDataEmoji,
  IGameDataForDisplay,
  IGameDataNumeric,
  IGameDataNumericForStore,
  ITableCell,
  ITableField,
  ITableFieldEmoji,
  ITableFieldNumeric,
  ITableLine,
  ITableLineEmoji,
  ITableLineNumeric,
} from "@types"
import { Color, emojiCells, IWinner, Owner, Player, Winner } from "@shared"
import { mock_labyrinth } from "./mockGameData"

export class GameClass {
  private gameField: ITableField = []
  private PlayerTurn: Player = 1
  private PlayerOneColor: Color = 0
  private PlayerTwoColor: Color = 0
  private availableCellsCount = 0
  private PlayerOneCellsCount = 0
  private PlayerTwoCellsCount = 0
  private PlayerOneAvailableColors: number[] | null = null
  private PlayerTwoAvailableColors: number[] | null = null
  private winner: IWinner = null
  private readonly MatrixHeight: number
  private readonly MatrixWidth: number

  public constructor(gameData?: IGameDataNumeric) {
    const { matrix, playerTurn } =
      gameData || GameClass.gameDataConverter(mock_labyrinth)

    // Matrix should be rectangle!!!

    this.MatrixHeight = matrix.length
    this.MatrixWidth = matrix[0].length

    for (let i = 0; i < this.MatrixHeight; i += 1) {
      const newLine: ITableLine = []
      for (let j = 0; j < this.MatrixWidth; j += 1) {
        newLine.push({
          color: matrix[i][j][0],
          owner: matrix[i][j][1],
        })
      }
      this.matrix.push(newLine)
    }

    this.PlayerTurn = playerTurn

    // Now we know color of each player.
    for (const line of this.matrix) {
      for (const cell of line) {
        if (cell.owner === Owner.playerOne) {
          this.PlayerOneColor = cell.color
        }
        if (cell.owner === Owner.playerTwo) {
          this.PlayerTwoColor = cell.color
        }
      }
    }

    this.recalculate()

    if (this.PlayerOneColor === 0 || this.PlayerTwoColor === 0)
      throw new Error()
  }

  public static generateMatrix = (
    width: number,
    height: number
  ): ITableField => {
    const matrix: ITableField = []
    const pureMatrix: ITableFieldNumeric = []

    for (let i = 0; i < height; i += 1) {
      const newLine: ITableLine = []
      const pureLine: number[][] = []
      for (let j = 0; j < width; j += 1) {
        const color = this.randomInt(1, 6)
        const owner = Owner.free

        newLine.push({
          color,
          owner,
        })

        pureLine.push([color, owner])
      }
      matrix.push(newLine)
      pureMatrix.push(pureLine)
    }
    return matrix
  }

  public static randomInt = (min: number, max: number): number =>
    Math.round(Math.random() * (max - min) + min)

  public clone(): GameClass {
    return new GameClass({
      matrix: this.matrixNumbers,
      currentPlayerNumber: 1,
      enemyPlayerNumber: 2,
      playerTurn: this.PlayerTurn,
    })
  }

  public get matrix(): ITableField {
    return this.gameField
  }

  /**
   * Safe method to access cell.
   * @param x
   * @param y
   */
  public cell(x: number, y: number): ITableCell | null {
    if (x >= 0 && x < this.MatrixWidth && y >= 0 && y < this.MatrixHeight) {
      return this.matrix[y][x]
    }
    return null
  }

  public get matrixNumbers(): ITableFieldNumeric {
    const resMatrix: ITableFieldNumeric = []
    for (let i = 0; i < this.matrixHeight; i += 1) {
      const newLine: number[][] = []
      for (let j = 0; j < this.matrixWidth; j += 1) {
        const { color, owner } = this.matrix[i][j]
        newLine.push([color, owner])
      }
      resMatrix.push(newLine)
    }
    return resMatrix
  }

  public get gameWinner(): IWinner {
    return this.winner
  }

  public get playerTurn(): number {
    return this.PlayerTurn
  }

  public get playerOneColor(): number {
    return this.PlayerOneColor
  }

  public get playerTwoColor(): number {
    return this.PlayerTwoColor
  }

  public get matrixHeight(): number {
    return this.MatrixHeight
  }

  public get matrixWidth(): number {
    return this.MatrixWidth
  }

  public returnMainData(): IGameDataForDisplay {
    return {
      gameField: this.matrix,
      availableCellsCount: this.availableCellsCount,
      PlayerOneCellsCount: this.PlayerOneCellsCount,
      PlayerTwoCellsCount: this.PlayerTwoCellsCount,
      PlayerTurn: this.PlayerTurn,
      winner: this.winner,
    }
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

  public color(x: number, y: number): Color | null {
    return this.cell(x, y)?.color || null
  }

  public owner(x: number, y: number): Owner | null {
    return this.cell(x, y)?.owner || null
  }

  public checkCell = (
    x: number,
    y: number,
    target: number,
    type: "color" | "owner"
  ): boolean => {
    if (
      y >= 0 &&
      y < this.matrix.length &&
      x >= 0 &&
      x < this.matrix[y].length
    ) {
      return this.matrix[y][x][type] === target
    }
    return false
  }

  public checkCellNeighbors = (
    x: number,
    y: number,
    target: number,
    type: "color" | "owner"
  ): boolean =>
    this.checkCell(x, y - 1, target, type) ||
    this.checkCell(x, y + 1, target, type) ||
    this.checkCell(x + 1, y, target, type) ||
    this.checkCell(x - 1, y, target, type)

  /**
   * get coordinates of all matrix cells
   */
  public getAllCellsCoordinates = (): ICoordinates[] => {
    const coords: ICoordinates[] = []

    for (let i = 0; i < this.MatrixHeight; i += 1) {
      for (let j = 0; j < this.MatrixWidth; j += 1) {
        coords.push({ x: j, y: i })
      }
    }

    return coords
  }

  /**
   * get all cells of matrix
   */
  public getAllCells = (): ITableCell[] => {
    const cells: ITableCell[] = []

    this.getAllCellsCoordinates().forEach((cellCoordinate) => {
      const cell = this.cell(cellCoordinate.x, cellCoordinate.y)
      if (cell) {
        cells.push(cell)
      }
    })

    return cells
  }

  /**
   * get all cells of targeted owner
   * @param owner
   */
  public findAllOwnerCells = (owner: Owner): ICoordinates[] => {
    const res: ICoordinates[] = []

    this.getAllCellsCoordinates().forEach((cell) => {
      if (this.matrix[cell.y][cell.x].owner === owner)
        res.push({ x: cell.x, y: cell.y })
    })

    return res
  }

  /**
   * finds coordinates of all free cells.
   */
  public findAllFreeCells = (): ICoordinates[] => {
    return this.findAllOwnerCells(Owner.free)
  }

  /**
   * finds coordinates of all cells by player owner
   * @param player Player number
   */
  public findAllPlayerCells = (player: Player): ICoordinates[] => {
    return this.findAllOwnerCells(player)
  }

  /**
   * Gets all cells that are neighbors with target.
   * @param player
   */
  public findAllNeighbors = (player: Player): ICoordinates[] => {
    const allCells = this.getAllCellsCoordinates().filter((cell) =>
      this.checkCellNeighbors(cell.x, cell.y, player, "owner")
    )

    return allCells.filter(
      (cell) => this.matrix[cell.y][cell.x].owner !== player
    )
  }

  /**
   * Gets all cells that are neighbors and enemy with target .
   * @param player
   */
  public findAllEnemyNeighbors = (player: Player): ICoordinates[] => {
    const allNeighbors = this.findAllNeighbors(player)

    const enemy = player === Owner.playerOne ? Owner.playerTwo : Owner.playerOne

    return allNeighbors.filter(
      (cell) => this.matrix[cell.y][cell.x].owner === enemy
    )
  }

  public findAllFreeNeighbors = (target: Player): ICoordinates[] => {
    return this.findAllFreeCells().filter((cell) =>
      this.checkCellNeighbors(cell.x, cell.y, target, "owner")
    )
  }

  /**
   * Gives array of colors for passed coords.
   * @param coordinates
   */
  public selectColorsFromArray = (coordinates: ICoordinates[]): Color[] => {
    const colors: Color[] = []
    for (let i = 0; i < coordinates.length; i += 1) {
      const cell = this.cell(coordinates[i].x, coordinates[i].y)
      if (cell && !colors.includes(cell.color)) {
        colors.push(cell.color)
      }
    }
    return colors
  }

  /**
   * calculate new count after turn.
   * @returns {Array} playableCells, playerOneCells, playerTwoCells
   */
  public recalculate = (): number[] => {
    let availableCellsCount = 0
    let PlayerOneCellsCount = 0
    let PlayerTwoCellsCount = 0

    this.getAllCells().forEach((cell) => {
      if (cell.owner !== Owner.unavailable) {
        availableCellsCount += 1
      }

      if (cell.owner === Owner.playerOne) {
        PlayerOneCellsCount += 1
      }

      if (cell.owner === Owner.playerTwo) {
        PlayerTwoCellsCount += 1
      }
    })

    this.availableCellsCount = availableCellsCount
    this.PlayerOneCellsCount = PlayerOneCellsCount
    this.PlayerTwoCellsCount = PlayerTwoCellsCount

    return [availableCellsCount, PlayerOneCellsCount, PlayerTwoCellsCount]
  }

  public static emojiToMatrixConverter(
    emojiMatrix: ITableFieldEmoji
  ): ITableFieldNumeric {
    const resMatrix: ITableFieldNumeric = []
    for (let i = 0; i < emojiMatrix.length; i += 1) {
      const newLine: ITableLineNumeric = []
      for (let j = 0; j < emojiMatrix[0].length; j += 1) {
        const emojiCell = emojiCells.find(
          (cell) => cell.emoji === emojiMatrix[i][j]
        )
        const newCell: number[] = emojiCell
          ? emojiCell.cell
          : emojiCells[0].cell
        newLine.push(newCell)
      }
      resMatrix.push(newLine)
    }
    return resMatrix
  }

  public static matrixToEmojiConverter(
    matrix: ITableFieldNumeric
  ): ITableFieldEmoji {
    const resEmojiMatrix: ITableFieldEmoji = []
    for (let i = 0; i < matrix.length; i += 1) {
      const newEmojiLine: ITableLineEmoji = []
      for (let j = 0; j < matrix[0].length; j += 1) {
        const emojiCell = emojiCells.find(
          (cell) =>
            cell.cell[0] === matrix[i][j][0] && cell.cell[1] === matrix[i][j][1]
        )
        const newCell: string = emojiCell
          ? emojiCell.emoji
          : emojiCells[0].emoji
        newEmojiLine.push(newCell)
      }
      resEmojiMatrix.push(newEmojiLine)
    }
    return resEmojiMatrix
  }

  public static gameDataConverter(gameData: IGameDataEmoji): IGameDataNumeric {
    return {
      currentPlayerNumber: gameData.currentPlayerNumber,
      enemyPlayerNumber: gameData.enemyPlayerNumber,
      playerTurn: gameData.playerTurn,
      matrix: this.emojiToMatrixConverter(gameData.matrix),
    }
  }

  public static gameDataNumericForStore(
    gameData: IGameDataNumeric
  ): IGameDataNumericForStore {
    const { matrix, currentPlayerNumber, enemyPlayerNumber, playerTurn } = {
      ...gameData,
    }

    return {
      currentPlayerNumber,
      enemyPlayerNumber,
      playerTurn,
      matrix: JSON.stringify(matrix),
    }
  }

  public joinAllIsolatedAreas() {
    this.joinIsolatedAreas(Owner.playerOne)
    this.joinIsolatedAreas(Owner.playerTwo)

    this.recalculate()
  }

  public joinIsolatedAreas(player: Player) {
    let freeNeighbors: ICoordinates[] = this.findAllFreeNeighbors(player)

    do {
      for (let i = 0; i < freeNeighbors.length; i += 1) {
        this.matrix[freeNeighbors[i].y][freeNeighbors[i].x].owner = player
        this.matrix[freeNeighbors[i].y][freeNeighbors[i].x].color =
          player === Owner.playerOne ? this.PlayerOneColor : this.PlayerTwoColor
      }

      freeNeighbors = this.findAllFreeNeighbors(player)
    } while (freeNeighbors.length)
  }

  /**
   * Repaint all cells for chosen player in chosen color
   * @param player
   * @param newColor
   */
  public repaintForPlayer(player: Player, newColor: Color) {
    this.getAllCellsCoordinates().forEach((cell) => {
      if (this.matrix[cell.y][cell.x].owner === player)
        this.matrix[cell.y][cell.x].color = newColor
    })
  }

  /**
   * Checks if player can make a turn or not.
   * @param player
   */
  public areTherePossibleTurns(player: Player): boolean {
    const allEnemyNeighbors = this.findAllEnemyNeighbors(player)
    const allFreeNeighbors = this.findAllFreeNeighbors(player)

    const allEnemyNeighborsColors =
      this.selectColorsFromArray(allEnemyNeighbors)

    const allFreeNeighborsColors = this.selectColorsFromArray(allFreeNeighbors)

    const allAvailableColors = allFreeNeighborsColors.filter(
      (color) => !allEnemyNeighborsColors.includes(color)
    )

    return allAvailableColors.length !== 0
  }

  public finishGame() {
    const freeNeighborsOne = this.findAllFreeNeighbors(Owner.playerOne)
    const freeNeighborsTwo = this.findAllFreeNeighbors(Owner.playerTwo)

    if (freeNeighborsOne.length === 0 || freeNeighborsTwo.length === 0) {
      this.joinAllIsolatedAreas()
      // this.repaintForPlayer(player, chosenColor);
      if (this.PlayerOneCellsCount === this.PlayerTwoCellsCount) {
        this.winner = Winner.draw
      } else {
        this.winner =
          this.PlayerOneCellsCount > this.PlayerTwoCellsCount
            ? Owner.playerOne
            : Owner.playerTwo
      }
    }
  }

  /**
   * @return is turn successful
   * @param turn
   * @param player
   */
  public registerTurn(turn: ICoordinates | null, player: Player): boolean {
    const isCurrentTurnMightBePossible = this.areTherePossibleTurns(player)

    let isTurnExecuted = false

    if (turn === null || !isCurrentTurnMightBePossible) {
      this.finishGame()
      return false
    }

    const { x, y } = turn
    const chosenColor = this.color(x, y)
    if (!chosenColor || !Color[chosenColor]) {
      throw new Error()
    }

    let freeNeighbors: ICoordinates[] = this.findAllFreeNeighbors(player)
    let freeNeighborsColors = this.selectColorsFromArray(freeNeighbors)

    if (
      // if turn possible
      this.PlayerTurn === player &&
      this.cell(x, y)?.owner === Owner.free &&
      freeNeighborsColors.includes(chosenColor)
    ) {
      do {
        for (let i = 0; i < freeNeighbors.length; i += 1) {
          if (
            this.color(freeNeighbors[i].x, freeNeighbors[i].y) === chosenColor
          ) {
            this.matrix[freeNeighbors[i].y][freeNeighbors[i].x].owner =
              this.PlayerTurn
          }
        }

        freeNeighbors = this.findAllFreeNeighbors(player)

        freeNeighborsColors = this.selectColorsFromArray(freeNeighbors)
      } while (freeNeighborsColors.includes(chosenColor))

      // Перекраска в новый цвет.
      this.repaintForPlayer(player, chosenColor)

      // This is for initiate next turn.
      this.PlayerTurn =
        player === Owner.playerOne ? Owner.playerTwo : Owner.playerOne

      if (player === Owner.playerOne) {
        this.PlayerOneColor = chosenColor
      } else {
        this.PlayerTwoColor = chosenColor
      }

      this.recalculate()
      isTurnExecuted = true
    }

    const enemyPlayer =
      player === Owner.playerOne ? Owner.playerTwo : Owner.playerOne
    const isNextTurnPossible = this.areTherePossibleTurns(enemyPlayer)

    if (!isNextTurnPossible) {
      this.joinAllIsolatedAreas()
      this.finishGame()
    }

    return isTurnExecuted
  }
}
