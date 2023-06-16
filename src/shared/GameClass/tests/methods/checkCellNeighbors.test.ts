import { IGameDataEmoji } from "types";
import { GameClass } from "shared";

test("correct", () => {
  const gameData: IGameDataEmoji = {
    matrix: [
      ["💛", "💚", "🟠"],
      ["🟠", "🔵", "🟡"],
      ["🟣", "🔴", "🟥"],
    ],
    currentPlayerNumber: 1,
    enemyPlayerNumber: 2,
    playerTurn: 1,
  };

  const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

  expect(gameClass.checkCellNeighbors(1, 1, 1, "color")).toBe(true);
  expect(gameClass.checkCellNeighbors(1, 1, 2, "color")).toBe(true);
  expect(gameClass.checkCellNeighbors(1, 1, 3, "color")).toBe(true);
  expect(gameClass.checkCellNeighbors(1, 1, 4, "color")).toBe(false);
  expect(gameClass.checkCellNeighbors(1, 1, 5, "color")).toBe(true);
  expect(gameClass.checkCellNeighbors(1, 1, 6, "color")).toBe(false);
  expect(gameClass.checkCellNeighbors(1, 1, 7, "color")).toBe(false);
  expect(gameClass.checkCellNeighbors(1, 1, 8, "color")).toBe(false);

  expect(gameClass.checkCellNeighbors(1, 1, 1, "owner")).toBe(true);
  expect(gameClass.checkCellNeighbors(1, 1, 2, "owner")).toBe(false);
  expect(gameClass.checkCellNeighbors(1, 1, 3, "owner")).toBe(true);
  expect(gameClass.checkCellNeighbors(1, 1, 4, "owner")).toBe(false);

  expect(gameClass.checkCellNeighbors(0, 0, 1, "owner")).toBe(true);
  expect(gameClass.checkCellNeighbors(1, 0, 1, "color")).toBe(false);

  expect(gameClass.checkCellNeighbors(2, 2, 2, "owner")).toBe(false);

  expect(gameClass.checkCellNeighbors(10, 10, 0, "owner")).toBe(false);
  expect(gameClass.checkCellNeighbors(10, 10, 1, "owner")).toBe(false);
  expect(gameClass.checkCellNeighbors(10, 10, 2, "owner")).toBe(false);
  expect(gameClass.checkCellNeighbors(10, 10, 3, "owner")).toBe(false);
});
