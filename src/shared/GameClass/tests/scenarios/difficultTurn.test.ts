import { IGameDataEmoji, ITableFieldEmoji } from "@types";
import { GameClass, Owner } from "@shared";

test("correct", () => {
  const gameData: IGameDataEmoji = {
    matrix: [
      ["💛", "🟢", "🟦"],
      ["🟣", "🔴", "🟣"],
      ["🟣", "🟣", "🟣"],
    ],
    currentPlayerNumber: 1,
    enemyPlayerNumber: 2,
    playerTurn: 1,
  };

  const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

  gameClass.registerTurn({ x: 2, y: 2 }, Owner.playerOne); // Reachable area.

  // prettier-ignore
  const resMatrix: ITableFieldEmoji = [
    ["💜", "🟢", "🟦"],
    ["💜", "🔴", "💜"],
    ["💜", "💜", "💜"],
  ];

  expect(gameClass.matrixNumbers).toEqual(
    GameClass.emojiToMatrixConverter(resMatrix)
  );
  expect(gameClass.playerTurn).toEqual(2);
  expect(gameClass.playerOneColor).toEqual(6);
});

test("correct 2", () => {
  const gameData: IGameDataEmoji = {
    matrix: [
      ["💛", "🟣", "🟣"],
      ["🟣", "🟦", "🟣"],
      ["🟣", "🟣", "🟣"],
    ],
    currentPlayerNumber: 1,
    enemyPlayerNumber: 2,
    playerTurn: 1,
  };

  const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

  gameClass.registerTurn({ x: 2, y: 2 }, Owner.playerOne); // Reachable area.

  // prettier-ignore
  const resMatrix: ITableFieldEmoji = [
    ["💜", "💜", "💜"],
    ["💜", "🟦", "💜"],
    ["💜", "💜", "💜"],
  ];

  expect(gameClass.matrixNumbers).toEqual(
    GameClass.emojiToMatrixConverter(resMatrix)
  );
  expect(gameClass.playerTurn).toEqual(2);
  expect(gameClass.playerOneColor).toEqual(6);
});
