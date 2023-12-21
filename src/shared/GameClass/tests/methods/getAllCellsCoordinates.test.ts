import { ICoordinates, IGameDataEmoji } from "@types"
import { GameClass } from "@shared"

test("get all cells", () => {
  const gameData: IGameDataEmoji = {
    matrix: [
      ["🧡", "🔴", "🟢"],
      ["🔵", "🟡", "🟥"],
    ],
    currentPlayerNumber: 1,
    enemyPlayerNumber: 2,
    playerTurn: 1,
  }

  const gameClass = new GameClass(GameClass.gameDataConverter(gameData))

  const cells: ICoordinates[] = gameClass.getAllCellsCoordinates()

  expect(cells.length).toEqual(6)

  // prettier-ignore
  expect(cells).toEqual([
    {x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0},
    {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1},
  ]);
})
