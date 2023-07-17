import { ICoordinates, IGameDataEmoji } from "@types";
import { GameClass, Owner } from "@shared";

test("get all neighbors", () => {
  const gameData: IGameDataEmoji = {
    matrix: [
      ["🧡", "🧡", "🧡", "🟥"],
      ["🧡", "🧡", "🟥", "🟥"],
      ["🟠", "🔴", "🟣", "🟥"],
      ["🟣", "🟠", "🟥", "🟥"],
    ],
    currentPlayerNumber: 1,
    enemyPlayerNumber: 2,
    playerTurn: 1,
  };

  const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

  const P1Neighbours: ICoordinates[] = gameClass.findAllNeighbors(
    Owner.playerOne
  );

  const P2Neighbours: ICoordinates[] = gameClass.findAllNeighbors(
    Owner.playerTwo
  );

  expect(P1Neighbours.length).toEqual(4);
  expect(P2Neighbours.length).toEqual(4);

  expect(P1Neighbours).toEqual(
    expect.arrayContaining([
      { x: 3, y: 0 },
      { x: 2, y: 1 },
      { x: 1, y: 2 },
      { x: 0, y: 2 },
    ])
  );

  expect([
    { x: 3, y: 0 },
    { x: 2, y: 1 },
    { x: 1, y: 2 },
    { x: 0, y: 2 },
  ]).toEqual(expect.arrayContaining(P1Neighbours));

  expect(P2Neighbours).toEqual(
    expect.arrayContaining([
      { x: 1, y: 1 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
      { x: 1, y: 3 },
    ])
  );

  expect([
    { x: 1, y: 1 },
    { x: 2, y: 0 },
    { x: 2, y: 2 },
    { x: 1, y: 3 },
  ]).toEqual(expect.arrayContaining(P2Neighbours));
});
