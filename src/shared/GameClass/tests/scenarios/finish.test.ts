import { IGameDataEmoji, ITableFieldEmoji } from "types";
import { GameClass, Owner } from "shared";

test("successful P1 - P2 turn simple", () => {
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

  gameClass.registerTurn({ x: 1, y: 0 }, Owner.playerOne);

  const afterTurn1: ITableFieldEmoji = [
    ["❤️", "❤️", "🟢", "🟢"],
    ["🟢", "🟡", "🔴", "🟡"],
    ["🟠", "🔴", "🟣", "🟠"],
    ["🟣", "🟠", "🟢", "🟥"],
  ];
  const matrixAfterTurn1 = GameClass.emojiToMatrixConverter(afterTurn1);
  expect(gameClass.matrixNumbers).toEqual(matrixAfterTurn1);
  expect(gameClass.gameWinner).toEqual(null);

  gameClass.registerTurn({ x: 3, y: 2 }, Owner.playerTwo);
  const afterTurn2: ITableFieldEmoji = [
    ["❤️", "❤️", "🟢", "🟢"],
    ["🟢", "🟡", "🔴", "🟡"],
    ["🟠", "🔴", "🟣", "🟧"],
    ["🟣", "🟠", "🟢", "🟧"],
  ];
  const matrixAfterTurn2 = GameClass.emojiToMatrixConverter(afterTurn2);
  expect(gameClass.matrixNumbers).toEqual(matrixAfterTurn2);
  expect(gameClass.gameWinner).toEqual(null);

  gameClass.registerTurn({ x: 2, y: 0 }, Owner.playerOne);
  const afterTurn3: ITableFieldEmoji = [
    ["💚", "💚", "💚", "💚"],
    ["💚", "🟡", "🔴", "🟡"],
    ["🟠", "🔴", "🟣", "🟧"],
    ["🟣", "🟠", "🟢", "🟧"],
  ];
  const matrixAfterTurn3 = GameClass.emojiToMatrixConverter(afterTurn3);
  expect(gameClass.matrixNumbers).toEqual(matrixAfterTurn3);
  expect(gameClass.gameWinner).toEqual(null);

  gameClass.registerTurn({ x: 2, y: 2 }, Owner.playerTwo);
  const afterTurn4: ITableFieldEmoji = [
    ["💚", "💚", "💚", "💚"],
    ["💚", "🟡", "🔴", "🟡"],
    ["🟠", "🔴", "🟪", "🟪"],
    ["🟣", "🟠", "🟢", "🟪"],
  ];
  const matrixAfterTurn4 = GameClass.emojiToMatrixConverter(afterTurn4);
  expect(gameClass.matrixNumbers).toEqual(matrixAfterTurn4);
  expect(gameClass.gameWinner).toEqual(null);

  gameClass.registerTurn({ x: 1, y: 1 }, Owner.playerOne);
  const afterTurn5: ITableFieldEmoji = [
    ["💛", "💛", "💛", "💛"],
    ["💛", "💛", "🔴", "💛"],
    ["🟠", "🔴", "🟪", "🟪"],
    ["🟣", "🟠", "🟢", "🟪"],
  ];
  const matrixAfterTurn5 = GameClass.emojiToMatrixConverter(afterTurn5);
  expect(gameClass.matrixNumbers).toEqual(matrixAfterTurn5);
  expect(gameClass.gameWinner).toEqual(null);

  gameClass.registerTurn({ x: 2, y: 1 }, Owner.playerTwo);
  const afterTurn6: ITableFieldEmoji = [
    ["💛", "💛", "💛", "💛"],
    ["💛", "💛", "🟥", "💛"],
    ["🟠", "🟥", "🟥", "🟥"],
    ["🟣", "🟠", "🟢", "🟥"],
  ];
  const matrixAfterTurn6 = GameClass.emojiToMatrixConverter(afterTurn6);
  expect(gameClass.matrixNumbers).toEqual(matrixAfterTurn6);
  expect(gameClass.gameWinner).toEqual(null);

  gameClass.registerTurn({ x: 0, y: 2 }, Owner.playerOne);
  const afterTurn7: ITableFieldEmoji = [
    ["🧡", "🧡", "🧡", "🧡"],
    ["🧡", "🧡", "🟥", "🧡"],
    ["🧡", "🟥", "🟥", "🟥"],
    ["🟣", "🟠", "🟢", "🟥"],
  ];
  const matrixAfterTurn7 = GameClass.emojiToMatrixConverter(afterTurn7);
  expect(gameClass.matrixNumbers).toEqual(matrixAfterTurn7);
  expect(gameClass.gameWinner).toEqual(null);

  gameClass.registerTurn({ x: 2, y: 3 }, Owner.playerTwo);
  const afterTurn8: ITableFieldEmoji = [
    ["🧡", "🧡", "🧡", "🧡"],
    ["🧡", "🧡", "🟩", "🧡"],
    ["🧡", "🟩", "🟩", "🟩"],
    ["🟣", "🟠", "🟩", "🟩"],
  ];
  const matrixAfterTurn8 = GameClass.emojiToMatrixConverter(afterTurn8);
  expect(gameClass.matrixNumbers).toEqual(matrixAfterTurn8);
  expect(gameClass.gameWinner).toEqual(null);

  gameClass.registerTurn({ x: 0, y: 3 }, Owner.playerOne);
  const afterTurn9: ITableFieldEmoji = [
    ["💜", "💜", "💜", "💜"],
    ["💜", "💜", "🟩", "💜"],
    ["💜", "🟩", "🟩", "🟩"],
    ["💜", "🟠", "🟩", "🟩"],
  ];
  const matrixAfterTurn9 = GameClass.emojiToMatrixConverter(afterTurn9);
  expect(gameClass.matrixNumbers).toEqual(matrixAfterTurn9);
  expect(gameClass.gameWinner).toEqual(null);

  gameClass.registerTurn({ x: 1, y: 3 }, Owner.playerTwo);
  const afterTurn10: ITableFieldEmoji = [
    ["💜", "💜", "💜", "💜"],
    ["💜", "💜", "🟧", "💜"],
    ["💜", "🟧", "🟧", "🟧"],
    ["💜", "🟧", "🟧", "🟧"],
  ];
  const matrixAfterTurn10 = GameClass.emojiToMatrixConverter(afterTurn10);
  expect(gameClass.matrixNumbers).toEqual(matrixAfterTurn10);
  expect(gameClass.gameWinner).toEqual(Owner.playerOne);
});

test("finish game with isolated areas", () => {
  const gameData: IGameDataEmoji = {
    matrix: [
      ["🧡", "🧡", "🟢", "🟢"],
      ["🧡", "🧡", "🧡", "🔵"],
      ["🟡", "🧡", "🟥", "🟥"],
      ["🟣", "🧡", "🟥", "🟥"],
    ],
    currentPlayerNumber: 1,
    enemyPlayerNumber: 2,
    playerTurn: 1,
  };

  const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

  gameClass.registerTurn({ x: 3, y: 1 }, Owner.playerOne);

  const afterTurn: ITableFieldEmoji = [
    ["💙", "💙", "💙", "💙"],
    ["💙", "💙", "💙", "💙"],
    ["💙", "💙", "🟥", "🟥"],
    ["💙", "💙", "🟥", "🟥"],
  ];

  const matrixAfterTurn = GameClass.emojiToMatrixConverter(afterTurn);
  expect(gameClass.gameWinner).toEqual(Owner.playerOne);
  expect(gameClass.matrixNumbers).toEqual(matrixAfterTurn);
});

test("finish game with impossible turn", () => {
  const gameData: IGameDataEmoji = {
    matrix: [
      ["🔵", "🟡", "🔵"],
      ["🟡", "🔵", "🟢"],
      ["💙", "🟢", "🟥"],
    ],
    currentPlayerNumber: 1,
    enemyPlayerNumber: 2,
    playerTurn: 1,
  };

  const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

  const isTurnSuccessful = gameClass.registerTurn(
    { x: 1, y: 2 },
    Owner.playerOne
  );

  const matrixAfterTurn: ITableFieldEmoji = [
    ["💚", "💚", "💚"],
    ["💚", "💚", "💚"],
    ["💚", "💚", "🟥"],
  ];

  expect(isTurnSuccessful).toEqual(true);
  expect(gameClass.gameWinner).toEqual(Owner.playerOne);
  expect(gameClass.matrixNumbers).toEqual(
    GameClass.emojiToMatrixConverter(matrixAfterTurn)
  );
});

test("finish game with impossible turn 2", () => {
  const gameData: IGameDataEmoji = {
    matrix: [
      ["🔵", "🟡", "🔵", "❌"],
      ["🟡", "🔵", "🟢", "❌"],
      ["💙", "🟢", "🟥", "🟢"],
      ["❌", "❌", "🟢", "🟡"],
    ],
    currentPlayerNumber: 1,
    enemyPlayerNumber: 2,
    playerTurn: 1,
  };

  const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

  const isTurnSuccessful = gameClass.registerTurn(
    { x: 1, y: 2 },
    Owner.playerOne
  );

  const matrixAfterTurn: ITableFieldEmoji = [
    ["💚", "💚", "💚", "❌"],
    ["💚", "💚", "💚", "❌"],
    ["💚", "💚", "🟥", "🟥"],
    ["❌", "❌", "🟥", "🟥"],
  ];

  expect(isTurnSuccessful).toEqual(true);
  expect(gameClass.matrixNumbers).toEqual(
    GameClass.emojiToMatrixConverter(matrixAfterTurn)
  );
  expect(gameClass.gameWinner).toEqual(Owner.playerOne);
});
