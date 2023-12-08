import { IGameDataEmoji, ITableFieldEmoji } from "@types";
import { GameClass, Owner } from "@shared";

test("correct", () => {
  const gameData: IGameDataEmoji = {
    matrix: [
      ["🟡", "🧡", "🟥"],
      ["🧡", "🟥", "🟢"],
      ["🧡", "🟥", "🟢"],
    ],
    currentPlayerNumber: 1,
    enemyPlayerNumber: 2,
    playerTurn: 1,
  };

  const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

  gameClass.joinIsolatedAreas(Owner.playerOne);
  const afterJoin1: ITableFieldEmoji = [
    ["🧡", "🧡", "🟥"],
    ["🧡", "🟥", "🟢"],
    ["🧡", "🟥", "🟢"],
  ];

  const matrixAfterJoin1 = GameClass.emojiToMatrixConverter(afterJoin1);
  expect(gameClass.matrixNumbers).toEqual(matrixAfterJoin1);

  gameClass.joinIsolatedAreas(Owner.playerTwo);
  const afterJoin2: ITableFieldEmoji = [
    ["🧡", "🧡", "🟥"],
    ["🧡", "🟥", "🟥"],
    ["🧡", "🟥", "🟥"],
  ];

  const matrixAfterJoin2 = GameClass.emojiToMatrixConverter(afterJoin2);
  expect(gameClass.matrixNumbers).toEqual(matrixAfterJoin2);
});

test("joinIsolatedAreas 2", () => {
  const gameData: IGameDataEmoji = {
    matrix: [
      ["❤️", "🟣", "🟢", "🟢"],
      ["🟢", "🟡", "🔴", "🟡"],
      ["🟠", "🔴", "🟣", "🟠"],
      ["🟣", "🟠", "🟢", "🟩"],
    ],
    currentPlayerNumber: 1,
    enemyPlayerNumber: 2,
    playerTurn: 1,
  };

  const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

  gameClass.joinIsolatedAreas(Owner.playerOne);

  const afterJoin1: ITableFieldEmoji = [
    ["❤️", "❤️", "❤️", "❤️"],
    ["❤️", "❤️", "❤️", "❤️"],
    ["❤️", "❤️", "❤️", "❤️"],
    ["❤️", "❤️", "❤️", "🟩"],
  ];

  const matrixAfterJoin1 = GameClass.emojiToMatrixConverter(afterJoin1);
  expect(gameClass.matrixNumbers).toEqual(matrixAfterJoin1);
});
