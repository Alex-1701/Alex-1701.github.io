import {
  IGameDataEmoji,
  IGameDataNumeric,
  ITableField,
  ITableFieldEmoji,
} from "@types";
import { Color, GameClass, Owner } from "@shared";

test("correct", () => {
  // blue circle is ignored.
  const initialMatrix: ITableFieldEmoji = [
    ["💛", "🟢", "🟢"],
    ["🟠", "🟣", "🟢"],
    ["🟡", "🟥", "🟥", "🔵"],
    ["🟣", "🟠", "🟥"],
    ["❌", "❌", "❌"],
  ];

  const gameData: IGameDataEmoji = {
    matrix: initialMatrix,
    currentPlayerNumber: 1,
    enemyPlayerNumber: 2,
    playerTurn: 1,
  };

  const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

  // prettier-ignore
  const resMatrix: ITableField = [
    [
      {color: Color.yellow, owner: Owner.playerOne},
      {color: Color.green, owner: Owner.free},
      {color: Color.green, owner: Owner.free}
    ], [
      {color: Color.orange, owner: Owner.free},
      {color: Color.violet, owner: Owner.free},
      {color: Color.green, owner: Owner.free}
    ], [
      {color: Color.yellow, owner: Owner.free},
      {color: Color.red, owner: Owner.playerTwo},
      {color: Color.red, owner: Owner.playerTwo}
    ], [
      {color: Color.violet, owner: Owner.free},
      {color: Color.orange, owner: Owner.free},
      {color: Color.red, owner: Owner.playerTwo}
    ], [
      {color: Color.gray, owner: Owner.unavailable},
      {color: Color.gray, owner: Owner.unavailable},
      {color: Color.gray, owner: Owner.unavailable}
    ],
  ];

  expect(gameClass.matrix).toEqual(resMatrix);
  expect(gameClass.matrixNumbers).toEqual(
    GameClass.emojiToMatrixConverter(initialMatrix)
  );
  expect(gameClass.matrixHeight).toEqual(5);
  expect(gameClass.matrixWidth).toEqual(3);
  expect(gameClass.playerTurn).toEqual(1);
  expect(gameClass.playerOneColor).toEqual(Color.yellow);
  expect(gameClass.playerTwoColor).toEqual(Color.red);
  expect(gameClass.returnMainData().PlayerOneCellsCount).toEqual(1);
  expect(gameClass.returnMainData().PlayerTwoCellsCount).toEqual(3);
  expect(gameClass.returnMainData().availableCellsCount).toEqual(12);
  expect(gameClass.gameWinner).toEqual(null);
});

test("error: missing player", () => {
  const initialMatrix1: ITableFieldEmoji = [
    ["💛", "🟢"],
    ["🟠", "🔵"],
  ];

  const gameData1: IGameDataEmoji = {
    matrix: initialMatrix1,
    currentPlayerNumber: 1,
    enemyPlayerNumber: 2,
    playerTurn: 1,
  };

  const gameClassInvoke1 = () =>
    new GameClass(GameClass.gameDataConverter(gameData1));
  expect(gameClassInvoke1).toThrow(Error);

  const initialMatrix2: ITableFieldEmoji = [
    ["🟡", "🟢"],
    ["🟠", "🟦"],
  ];

  const matrix2 = GameClass.emojiToMatrixConverter(initialMatrix2);

  const gameData2: IGameDataNumeric = {
    matrix: matrix2,
    currentPlayerNumber: 1,
    enemyPlayerNumber: 2,
    playerTurn: 1,
  };

  const gameClassInvoke2 = () => new GameClass(gameData2);
  expect(gameClassInvoke2).toThrow(Error);
});
