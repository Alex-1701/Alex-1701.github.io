import { IGameDataEmoji } from "@types"
import { Color, GameClass, Owner } from "@shared"

const gameData: IGameDataEmoji = {
  matrix: [
    ["💛", "🟢"],
    ["🟣", "🟥"],
    ["❌", "❌"],
  ],
  currentPlayerNumber: 1,
  enemyPlayerNumber: 2,
  playerTurn: 1,
}

const gameClass = new GameClass(GameClass.gameDataConverter(gameData))

test("check correct", () => {
  expect(gameClass.checkCell(0, 0, Color.yellow, "color")).toBe(true)
  expect(gameClass.checkCell(1, 0, Color.green, "color")).toBe(true)
  expect(gameClass.checkCell(0, 1, Color.violet, "color")).toBe(true)
  expect(gameClass.checkCell(1, 1, Color.blue, "color")).toBe(false)
  expect(gameClass.checkCell(0, 2, Color.gray, "color")).toBe(true)
  expect(gameClass.checkCell(1, 2, Color.gray, "color")).toBe(true)

  expect(gameClass.checkCell(0, 0, Owner.playerOne, "owner")).toBe(true)
  expect(gameClass.checkCell(1, 0, Owner.free, "owner")).toBe(true)
  expect(gameClass.checkCell(0, 1, Owner.free, "owner")).toBe(true)
  expect(gameClass.checkCell(1, 1, Owner.playerTwo, "owner")).toBe(true)
  expect(gameClass.checkCell(0, 2, Owner.unavailable, "owner")).toBe(true)
  expect(gameClass.checkCell(1, 2, Owner.playerOne, "owner")).toBe(false)
})

test("check out of boundary", () => {
  expect(gameClass.checkCell(10, 10, Owner.playerOne, "owner")).toBe(false)
  expect(gameClass.checkCell(10, 10, Owner.playerTwo, "owner")).toBe(false)
  expect(gameClass.checkCell(10, 10, Owner.unavailable, "owner")).toBe(false)

  expect(gameClass.checkCell(-1, -1, Owner.playerOne, "owner")).toBe(false)
  expect(gameClass.checkCell(-1, -1, Owner.playerTwo, "owner")).toBe(false)
  expect(gameClass.checkCell(-1, -1, Owner.unavailable, "owner")).toBe(false)

  expect(gameClass.checkCell(0, 1, Owner.playerOne, "owner")).toBe(false)
  expect(gameClass.checkCell(0, 1, Owner.playerTwo, "owner")).toBe(false)
  expect(gameClass.checkCell(0, 1, Owner.unavailable, "owner")).toBe(false)

  expect(gameClass.checkCell(1, 3, Owner.playerOne, "owner")).toBe(false)
  expect(gameClass.checkCell(1, 3, Owner.playerTwo, "owner")).toBe(false)
  expect(gameClass.checkCell(1, 3, Owner.unavailable, "owner")).toBe(false)
})
