import { ICoordinates, IGameDataEmoji } from "@types";
import { GameClass } from "@shared";

test("correct", () => {
  const gameData: IGameDataEmoji = {
    matrix: [
      ["🧡", "🟥", "🟢"],
      ["🧡", "🟡", "🟢"],
    ],
    currentPlayerNumber: 1,
    enemyPlayerNumber: 2,
    playerTurn: 1,
  };

  const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

  const coordinates: ICoordinates[] = [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 2, y: 0 },
    { x: 2, y: 1 },
  ];
  const colors = gameClass.selectColorsFromArray(coordinates);

  expect([2, 5]).toEqual(expect.arrayContaining(colors));
  expect(colors).toEqual(expect.arrayContaining([2, 5]));
});

test("correct 2", () => {
  const gameData: IGameDataEmoji = {
    matrix: [["🧡", "🔴", "🟢", "🟣", "🟥"]],
    currentPlayerNumber: 1,
    enemyPlayerNumber: 2,
    playerTurn: 1,
  };

  const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

  const coordinates: ICoordinates[] = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ];
  const colors = gameClass.selectColorsFromArray(coordinates);

  expect([1, 2, 5]).toEqual(expect.arrayContaining(colors));
  expect(colors).toEqual(expect.arrayContaining([1, 2, 5]));
});

test("incorrect", () => {
  const gameData: IGameDataEmoji = {
    matrix: [
      ["🧡", "🔴", "🟢"],
      ["🟠", "🟡", "🟥"],
    ],
    currentPlayerNumber: 1,
    enemyPlayerNumber: 2,
    playerTurn: 1,
  };

  const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

  const coordinates: ICoordinates[] = [
    { x: -1, y: -1 },
    { x: 3, y: 0 },
    { x: 0, y: 2 },
    { x: 3, y: 2 },
  ];
  const colors = gameClass.selectColorsFromArray(coordinates);

  expect([]).toEqual(expect.arrayContaining(colors));
  expect(colors).toEqual(expect.arrayContaining([]));
});
