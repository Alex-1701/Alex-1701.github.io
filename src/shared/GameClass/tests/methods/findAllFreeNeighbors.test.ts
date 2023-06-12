import { ICoordinates, IGameDataEmoji } from "types";
import { GameClass } from "shared/GameClass";

test("correct", () => {
  const gameData: IGameDataEmoji = {
    matrix: [
      ["🧡", "🔴", "🟥"],
      ["🧡", "🟡", "🟣"],
      ["🟣", "🟠", "🟥"],
    ],
    currentPlayerNumber: 1,
    enemyPlayerNumber: 2,
    playerTurn: 1,
  };

  const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

  const playerOneNeighbors: ICoordinates[] = [
    { x: 1, y: 0 },
    { x: 0, y: 2 },
    { x: 1, y: 1 },
  ];

  const playerTwoNeighbors: ICoordinates[] = [
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 1, y: 0 },
  ];

  expect(gameClass.findAllFreeNeighbors(1)).toEqual(
    expect.arrayContaining(playerOneNeighbors)
  );
  expect(gameClass.findAllFreeNeighbors(2)).toEqual(
    expect.arrayContaining(playerTwoNeighbors)
  );
});
