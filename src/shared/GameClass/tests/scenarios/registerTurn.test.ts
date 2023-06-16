import { IGameDataEmoji, ITableFieldEmoji } from "types";
import { GameClass, Owner } from "shared";

test("incorrect 1", () => {
  const gameData: IGameDataEmoji = {
    matrix: [
      ["🧡", "🔴", "🟢", "🟢"],
      ["🟢", "🟡", "🔴", "🟡"],
      ["🟠", "🔴", "🟣", "🟠"],
      ["🟣", "🟠", "🟢", "🟥"],
    ],
    currentPlayerNumber: 1,
    enemyPlayerNumber: 2,
    playerTurn: 1,
  };

  const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

  const turnRes1 = gameClass.registerTurn({ x: 1, y: 1 }, Owner.playerOne);
  expect(turnRes1).toEqual(false);
  expect(gameClass.gameWinner).toEqual(null);

  const turnRes2 = gameClass.registerTurn({ x: 2, y: 2 }, Owner.playerOne);
  expect(turnRes2).toEqual(false);
  expect(gameClass.gameWinner).toEqual(null);

  const turnRes3 = () =>
    gameClass.registerTurn({ x: -1, y: 0 }, Owner.playerOne);
  expect(turnRes3).toThrow(Error);
  expect(gameClass.gameWinner).toEqual(null);

  const turnRes4 = () =>
    gameClass.registerTurn({ x: 0, y: -1 }, Owner.playerOne);
  expect(turnRes4).toThrow(Error);
  expect(gameClass.gameWinner).toEqual(null);

  const turnRes5 = () =>
    gameClass.registerTurn({ x: 4, y: 0 }, Owner.playerOne);
  expect(turnRes5).toThrow(Error);
  expect(gameClass.gameWinner).toEqual(null);

  const turnRes6 = () =>
    gameClass.registerTurn({ x: 0, y: 4 }, Owner.playerOne);
  expect(turnRes6).toThrow(Error);
  expect(gameClass.gameWinner).toEqual(null);

  const turnRes7 = gameClass.registerTurn({ x: 1, y: 1 }, Owner.playerTwo);
  expect(turnRes7).toEqual(false);
  expect(gameClass.gameWinner).toEqual(null);

  const turnRes8 = gameClass.registerTurn({ x: 2, y: 2 }, Owner.playerTwo);
  expect(turnRes8).toEqual(false);
  expect(gameClass.gameWinner).toEqual(null);

  const turnRes9 = () =>
    gameClass.registerTurn({ x: -1, y: 0 }, Owner.playerTwo);
  expect(turnRes9).toThrow(Error);
  expect(gameClass.gameWinner).toEqual(null);

  const turnRes10 = () =>
    gameClass.registerTurn({ x: 0, y: -1 }, Owner.playerTwo);
  expect(turnRes10).toThrow(Error);
  expect(gameClass.gameWinner).toEqual(null);

  const turnRes11 = () =>
    gameClass.registerTurn({ x: 4, y: 0 }, Owner.playerTwo);
  expect(turnRes11).toThrow(Error);
  expect(gameClass.gameWinner).toEqual(null);

  const turnRes12 = () =>
    gameClass.registerTurn({ x: 0, y: 4 }, Owner.playerTwo);
  expect(turnRes12).toThrow(Error);
  expect(gameClass.gameWinner).toEqual(null);

  const turnRes13 = gameClass.registerTurn({ x: 2, y: 1 }, Owner.playerOne);
  expect(turnRes13).toEqual(true);
  expect(gameClass.gameWinner).toEqual(null);

  const afterTurn5: ITableFieldEmoji = [
    ["❤️", "❤️", "🟢", "🟢"],
    ["🟢", "🟡", "🔴", "🟡"],
    ["🟠", "🔴", "🟣", "🟠"],
    ["🟣", "🟠", "🟢", "🟥"],
  ];
  const matrixAfterTurn5 = GameClass.emojiToMatrixConverter(afterTurn5);
  expect(gameClass.matrixNumbers).toEqual(matrixAfterTurn5);
});

test("incorrect 2", () => {
  const gameData: IGameDataEmoji = {
    matrix: [["🧡", "🟥"]],
    currentPlayerNumber: 1,
    enemyPlayerNumber: 2,
    playerTurn: 2,
  };

  const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

  const isTurnPossible = gameClass.areTherePossibleTurns(Owner.playerTwo);

  const turnRes = gameClass.registerTurn({ x: 0, y: 0 }, Owner.playerTwo);

  expect(isTurnPossible).toEqual(false);
  expect(turnRes).toEqual(false);
});

test("unsuccessful P1 turns", () => {
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

  gameClass.registerTurn({ x: 1, y: 1 }, Owner.playerOne); // Unreachable cell.

  const resEmojiMatrix: ITableFieldEmoji = [
    ["💛", "🟢", "🟦"],
    ["🟣", "🔴", "🟣"],
    ["🟣", "🟣", "🟣"],
  ];
  const matrixAfterTurn1 = GameClass.emojiToMatrixConverter(resEmojiMatrix);

  expect(gameClass.matrixNumbers).toEqual(matrixAfterTurn1);
  expect(gameClass.playerTurn).toEqual(1);
  expect(gameClass.playerOneColor).toEqual(3);

  const reg1 = () => gameClass.registerTurn({ x: 10, y: 10 }, Owner.playerOne); // Out of matrix.
  const reg2 = () => gameClass.registerTurn({ x: -1, y: -1 }, Owner.playerOne); // Out of matrix.
  const reg3 = () => gameClass.registerTurn({ x: 3, y: 3 }, Owner.playerOne); // Out of matrix.

  expect(reg1).toThrow(Error);
  expect(reg2).toThrow(Error);
  expect(reg3).toThrow(Error);
  expect(gameClass.matrixNumbers).toEqual(matrixAfterTurn1);
  expect(gameClass.playerTurn).toEqual(1);
  expect(gameClass.playerOneColor).toEqual(3);
});
