import { IGameDataEmoji } from "types";
import { GameClass } from "shared";

const gameData: IGameDataEmoji = {
  matrix: [
    ["💛", "🟢"],
    ["🟣", "🔵"],
    ["🟠", "🟥"],
  ],
  currentPlayerNumber: 1,
  enemyPlayerNumber: 2,
  playerTurn: 1,
};

const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

test("correct", () => {
  expect(gameClass.cell(0, 0)).toEqual({ owner: 1, color: 3 });
  expect(gameClass.cell(1, 1)).toEqual({ owner: 3, color: 4 });
  expect(gameClass.cell(1, 2)).toEqual({ owner: 2, color: 1 });
});

test("incorrect", () => {
  expect(gameClass.cell(-1, -1)).toBe(null);
  expect(gameClass.cell(0, -1)).toBe(null);
  expect(gameClass.cell(1, -1)).toBe(null);
  expect(gameClass.cell(2, -1)).toBe(null);
  expect(gameClass.cell(2, 0)).toBe(null);
  expect(gameClass.cell(2, 1)).toBe(null);
  expect(gameClass.cell(2, 2)).toBe(null);
  expect(gameClass.cell(2, 3)).toBe(null);
  expect(gameClass.cell(1, 3)).toBe(null);
  expect(gameClass.cell(0, 3)).toBe(null);
  expect(gameClass.cell(-1, 3)).toBe(null);
  expect(gameClass.cell(-1, 2)).toBe(null);
  expect(gameClass.cell(-1, 1)).toBe(null);
  expect(gameClass.cell(-1, 0)).toBe(null);
});
