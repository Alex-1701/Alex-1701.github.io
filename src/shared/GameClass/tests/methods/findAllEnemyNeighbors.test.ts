import { ICoordinates, IGameDataEmoji } from "@types";
import { GameClass, Owner } from "@shared";

test("get all enemy neighbors", () => {
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

  const P1EnemyNeighbours: ICoordinates[] = gameClass.findAllEnemyNeighbors(
    Owner.playerOne
  );

  const P2EnemyNeighbours: ICoordinates[] = gameClass.findAllEnemyNeighbors(
    Owner.playerTwo
  );

  expect(P1EnemyNeighbours.length).toEqual(2);
  expect(P2EnemyNeighbours.length).toEqual(2);

  expect(P1EnemyNeighbours).toEqual(
    expect.arrayContaining([
      { x: 3, y: 0 },
      { x: 2, y: 1 },
    ])
  );

  expect(P2EnemyNeighbours).toEqual(
    expect.arrayContaining([
      { x: 2, y: 0 },
      { x: 1, y: 1 },
    ])
  );
});
