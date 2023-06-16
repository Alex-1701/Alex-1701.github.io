import { IGameDataEmoji } from "types";
import { GameClass, Owner } from "shared";

test("correct", () => {
  const gameData: IGameDataEmoji = {
    matrix: [
      ["💛", "🔴", "🟠"],
      ["🟠", "🔵", "🟡"],
      ["🟣", "🟢", "🟥"],
    ],
    currentPlayerNumber: 1,
    enemyPlayerNumber: 2,
    playerTurn: 1,
  };

  const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

  expect(gameClass.areTherePossibleTurns(Owner.playerOne)).toBe(true);
  expect(gameClass.areTherePossibleTurns(Owner.playerTwo)).toBe(true);
});

test("correct", () => {
  const gameData: IGameDataEmoji = {
    matrix: [
      ["💛", "🟥"],
      ["🟥", "🟥"],
    ],
    currentPlayerNumber: 1,
    enemyPlayerNumber: 2,
    playerTurn: 1,
  };

  const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

  expect(gameClass.areTherePossibleTurns(Owner.playerOne)).toBe(false);
  expect(gameClass.areTherePossibleTurns(Owner.playerTwo)).toBe(false);
});

test("blocking position 1", () => {
  const gameData: IGameDataEmoji = {
    matrix: [["🧡", "🟥", "🟠"]],
    currentPlayerNumber: 1,
    enemyPlayerNumber: 2,
    playerTurn: 2,
  };

  const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

  expect(gameClass.areTherePossibleTurns(Owner.playerTwo)).toBe(false);
  expect(gameClass.areTherePossibleTurns(Owner.playerOne)).toBe(false);
});

test("blocking position 2", () => {
  const gameData: IGameDataEmoji = {
    matrix: [
      ["🔵", "🟡", "🔵"],
      ["🟡", "🔵", "🟢"],
      ["💚", "💚", "🟥"],
    ],
    currentPlayerNumber: 1,
    enemyPlayerNumber: 2,
    playerTurn: 2,
  };

  const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

  expect(gameClass.areTherePossibleTurns(Owner.playerTwo)).toBe(false);
  expect(gameClass.areTherePossibleTurns(Owner.playerOne)).toBe(true);
});

test("not blocking position", () => {
  const gameData: IGameDataEmoji = {
    matrix: [
      ["🔵", "🟡", "🔵", "❌"],
      ["🟡", "🔵", "🟢", "❌"],
      ["💚", "💚", "🟥", "🔵"],
      ["❌", "❌", "🟡", "🟢"],
    ],
    currentPlayerNumber: 1,
    enemyPlayerNumber: 2,
    playerTurn: 2,
  };

  const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

  expect(gameClass.areTherePossibleTurns(Owner.playerTwo)).toBe(true);
  expect(gameClass.areTherePossibleTurns(Owner.playerOne)).toBe(true);
});
