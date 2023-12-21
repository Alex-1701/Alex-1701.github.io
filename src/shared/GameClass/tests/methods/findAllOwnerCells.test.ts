import { ICoordinates, IGameDataEmoji } from "@types"
import { GameClass, Owner } from "@shared"

test("get all cells for owner", () => {
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

  const freeCells: ICoordinates[] = gameClass.findAllOwnerCells(Owner.free)
  const P1Cells: ICoordinates[] = gameClass.findAllOwnerCells(Owner.playerOne)
  const P2Cells: ICoordinates[] = gameClass.findAllOwnerCells(Owner.playerTwo)

  expect(freeCells.length).toEqual(4)
  expect(P1Cells.length).toEqual(1)
  expect(P2Cells.length).toEqual(1)

  expect(freeCells).toEqual([
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ])

  expect(P1Cells).toEqual([{ x: 0, y: 0 }])

  expect(P2Cells).toEqual([{ x: 2, y: 1 }])
})

test("findAllFreeCells", () => {
  const gameData: IGameDataEmoji = {
    matrix: [
      ["🧡", "🔴", "🟢", "🟢"],
      ["🧡", "🟡", "🟥", "🟥"],
      ["🟣", "🟠", "🟢", "🟥"],
    ],
    currentPlayerNumber: 1,
    enemyPlayerNumber: 2,
    playerTurn: 1,
  }

  const gameClass = new GameClass(GameClass.gameDataConverter(gameData))

  const freeCells: ICoordinates[] = gameClass.findAllFreeCells()

  expect(freeCells.length).toEqual(7)

  expect(freeCells).toContainEqual({ x: 0, y: 2 })
  expect(freeCells).toContainEqual({ x: 1, y: 0 })
  expect(freeCells).toContainEqual({ x: 1, y: 1 })
  expect(freeCells).toContainEqual({ x: 1, y: 2 })
  expect(freeCells).toContainEqual({ x: 2, y: 0 })
  expect(freeCells).toContainEqual({ x: 2, y: 2 })
  expect(freeCells).toContainEqual({ x: 3, y: 0 })
})
