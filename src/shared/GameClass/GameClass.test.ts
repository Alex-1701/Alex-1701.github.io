import {
  ICoordinates,
  IGameDataEmoji,
  ITableField,
  ITableFieldEmoji,
} from "types";
import { GameClass } from "./GameClass";
import { Color, Owner } from "../constants";

describe("test", () => {
  test("successful P1 turn simple", () => {
    const gameData: IGameDataEmoji = {
      matrix: [
        ["💛", "🟢", "🔴"],
        ["🟣", "🔴", "🟠"],
        ["🔴", "🟠", "🟥"],
      ],
      currentPlayerNumber: 1,
      enemyPlayerNumber: 2,
      playerTurn: 1,
    };

    const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

    gameClass.registerTurn({ x: 1, y: 0 }, Owner.playerOne); // Reachable cell.

    // prettier-ignore
    const resMatrix: ITableField = [
      [{color: 5, owner: 1}, {color: 5, owner: 1}, {color: 1, owner: 3}],
      [{color: 6, owner: 3}, {color: 1, owner: 3}, {color: 2, owner: 3}],
      [{color: 1, owner: 3}, {color: 2, owner: 3}, {color: 1, owner: 2}],
    ];

    expect(gameClass.matrix).toEqual(resMatrix);
    expect(gameClass.playerTurn).toEqual(2);
    expect(gameClass.playerOneColor).toEqual(5);
  });

  test("successful P1 turn difficult", () => {
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
    const resMatrix: ITableField = [
      [{color: 6, owner: 1}, {color: 5, owner: 3}, {color: 4, owner: 2}],
      [{color: 6, owner: 1}, {color: 1, owner: 3}, {color: 6, owner: 1}],
      [{color: 6, owner: 1}, {color: 6, owner: 1}, {color: 6, owner: 1}],
    ];

    expect(gameClass.matrix).toEqual(resMatrix);
    expect(gameClass.playerTurn).toEqual(2);
    expect(gameClass.playerOneColor).toEqual(6);
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

    // prettier-ignore
    const resMatrix: ITableField = [
      [{color: 3, owner: 1}, {color: 5, owner: 3}, {color: 4, owner: 2}],
      [{color: 6, owner: 3}, {color: 1, owner: 3}, {color: 6, owner: 3}],
      [{color: 6, owner: 3}, {color: 6, owner: 3}, {color: 6, owner: 3}],
    ];

    const resEmojiMatrix: ITableFieldEmoji = [
      ["💛", "🟢", "🟦"],
      ["🟣", "🔴", "🟣"],
      ["🟣", "🟣", "🟣"],
    ];
    const matrixAfterTurn1 = GameClass.emojiToMatrixConverter(resEmojiMatrix);

    expect(gameClass.matrixNumbers).toEqual(matrixAfterTurn1);
    expect(gameClass.playerTurn).toEqual(1);
    expect(gameClass.playerOneColor).toEqual(3);

    gameClass.registerTurn({ x: 10, y: 10 }, Owner.playerOne); // Out of matrix.
    gameClass.registerTurn({ x: -1, y: -1 }, Owner.playerOne); // Out of matrix.
    gameClass.registerTurn({ x: 3, y: 3 }, Owner.playerOne); // Out of matrix.

    expect(gameClass.matrixNumbers).toEqual(matrixAfterTurn1);
    expect(gameClass.playerTurn).toEqual(1);
    expect(gameClass.playerOneColor).toEqual(3);
  });

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
        ["💚", "💚", "🟥"],
      ],
      currentPlayerNumber: 1,
      enemyPlayerNumber: 2,
      playerTurn: 1,
    };

    const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

    const isTurnPossible = gameClass.registerTurn(null, Owner.playerTwo);

    expect(isTurnPossible).toEqual(true);
    expect(gameClass.gameWinner).toEqual(Owner.playerOne);
    // expect(gameClass.matrixNumbers).toEqual(matrixAfterTurn);
  });
});

describe("methods", () => {
  test("registerTurn restrictions", () => {
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

    const turnRes3 = gameClass.registerTurn({ x: -1, y: 0 }, Owner.playerOne);
    expect(turnRes3).toEqual(false);
    expect(gameClass.gameWinner).toEqual(null);

    const turnRes4 = gameClass.registerTurn({ x: 0, y: -1 }, Owner.playerOne);
    expect(turnRes4).toEqual(false);
    expect(gameClass.gameWinner).toEqual(null);

    const turnRes5 = gameClass.registerTurn({ x: 4, y: 0 }, Owner.playerOne);
    expect(turnRes5).toEqual(false);
    expect(gameClass.gameWinner).toEqual(null);

    const turnRes6 = gameClass.registerTurn({ x: 0, y: 4 }, Owner.playerOne);
    expect(turnRes6).toEqual(false);
    expect(gameClass.gameWinner).toEqual(null);

    const turnRes7 = gameClass.registerTurn({ x: 1, y: 1 }, Owner.playerTwo);
    expect(turnRes7).toEqual(false);
    expect(gameClass.gameWinner).toEqual(null);

    const turnRes8 = gameClass.registerTurn({ x: 2, y: 2 }, Owner.playerTwo);
    expect(turnRes8).toEqual(false);
    expect(gameClass.gameWinner).toEqual(null);

    const turnRes9 = gameClass.registerTurn({ x: -1, y: 0 }, Owner.playerTwo);
    expect(turnRes9).toEqual(false);
    expect(gameClass.gameWinner).toEqual(null);

    const turnRes10 = gameClass.registerTurn({ x: 0, y: -1 }, Owner.playerTwo);
    expect(turnRes10).toEqual(false);
    expect(gameClass.gameWinner).toEqual(null);

    const turnRes11 = gameClass.registerTurn({ x: 4, y: 0 }, Owner.playerTwo);
    expect(turnRes11).toEqual(false);
    expect(gameClass.gameWinner).toEqual(null);

    const turnRes12 = gameClass.registerTurn({ x: 0, y: 4 }, Owner.playerTwo);
    expect(turnRes12).toEqual(false);
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

  test("unable to take turn", () => {
    const gameData: IGameDataEmoji = {
      matrix: [["🧡", "🟥"]],
      currentPlayerNumber: 1,
      enemyPlayerNumber: 2,
      playerTurn: 2,
    };

    const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

    const isTurnPossible = gameClass.registerTurn(
      { x: 0, y: 0 },
      Owner.playerTwo
    );

    expect(isTurnPossible).toEqual(false);
  });

  test("joinIsolatedAreas 1", () => {
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

  test("repaint cells for new owner", () => {
    const gameData: IGameDataEmoji = {
      matrix: [
        ["❤️", "🧡", "🟢", "🟢"],
        ["💙", "💛", "🟩", "🟡"],
        ["🟢", "💙", "🟨", "🟩"],
        ["🟣", "🔵", "🟪", "🟥"],
        ["🟡", "🟢", "🟦", "🟩"],
      ],
      currentPlayerNumber: 1,
      enemyPlayerNumber: 2,
      playerTurn: 1,
    };

    const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

    gameClass.repaintForPlayer(Owner.playerOne, Color.orange);

    const afterRepaint1: ITableFieldEmoji = [
      ["🧡", "🧡", "🟢", "🟢"],
      ["🧡", "🧡", "🟩", "🟡"],
      ["🟢", "🧡", "🟨", "🟩"],
      ["🟣", "🔵", "🟪", "🟥"],
      ["🟡", "🟢", "🟦", "🟩"],
    ];

    const matrixAfterRepaint1 = GameClass.emojiToMatrixConverter(afterRepaint1);
    expect(gameClass.matrixNumbers).toEqual(matrixAfterRepaint1);

    gameClass.repaintForPlayer(Owner.playerTwo, Color.red);
    const afterRepaint2: ITableFieldEmoji = [
      ["🧡", "🧡", "🟢", "🟢"],
      ["🧡", "🧡", "🟥", "🟡"],
      ["🟢", "🧡", "🟥", "🟥"],
      ["🟣", "🔵", "🟥", "🟥"],
      ["🟡", "🟢", "🟥", "🟥"],
    ];
    const matrixAfterRepaint2 = GameClass.emojiToMatrixConverter(afterRepaint2);
    expect(gameClass.matrixNumbers).toEqual(matrixAfterRepaint2);
  });

  test("get all cells", () => {
    const gameData: IGameDataEmoji = {
      matrix: [
        ["🧡", "🔴", "🟢"],
        ["🔵", "🟡", "🟥"],
      ],
      currentPlayerNumber: 1,
      enemyPlayerNumber: 2,
      playerTurn: 1,
    };

    const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

    const cells: ICoordinates[] = gameClass.getAllCellsCoordinates();

    expect(cells.length).toEqual(6);

    // prettier-ignore
    expect(cells).toEqual([
      {x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0},
      {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1},
    ]);
  });

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
});
