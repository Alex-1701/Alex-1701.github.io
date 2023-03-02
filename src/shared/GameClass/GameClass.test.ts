import { GameClass } from "./GameClass";
import { ICoordinates, ITableField, ITableFieldEmoji } from "../types";

describe("test", () => {
  test("constructor", () => {
    const gameData = {
      // prettier-ignore
      matrix: [
        [[3, 1], [5, 3]],
        [[2, 3], [4, 3]],
        [[6, 3], [1, 2]],
      ],
      currentPlayerNumber: 1,
      enemyPlayerNumber: 2,
      playerTurn: 1,
    };

    const gameClass = new GameClass(gameData);

    // prettier-ignore
    const resMatrix: ITableField = [
      [{color: 3, owner: 1}, {color: 5, owner: 3},],
      [{color: 2, owner: 3}, {color: 4, owner: 3},],
      [{color: 6, owner: 3}, {color: 1, owner: 2},],
    ];

    expect(gameClass.matrix).toEqual(resMatrix);
    expect(gameClass.matrixHeight).toEqual(3);
    expect(gameClass.matrixWidth).toEqual(2);
  });

  test("successful P1 turn simple", () => {
    const gameData = {
      // prettier-ignore
      matrix: [
        [[3, 1], [5, 3], [1, 3]],
        [[6, 3], [1, 3], [2, 3]],
        [[1, 3], [2, 3], [3, 3]],
      ],
      currentPlayerNumber: 1,
      enemyPlayerNumber: 2,
      playerTurn: 1,
    };

    const gameClass = new GameClass(gameData);

    gameClass.registerPlayerOneTurn({ x: 1, y: 0 }); // Reachable cell.

    // prettier-ignore
    const resMatrix: ITableField = [
      [{color: 5, owner: 1}, {color: 5, owner: 1}, {color: 1, owner: 3}],
      [{color: 6, owner: 3}, {color: 1, owner: 3}, {color: 2, owner: 3}],
      [{color: 1, owner: 3}, {color: 2, owner: 3}, {color: 3, owner: 3}],
    ];

    expect(gameClass.matrix).toEqual(resMatrix);
    expect(gameClass.playerTurn).toEqual(2);
    expect(gameClass.playerOneColor).toEqual(5);
  });

  test("successful P1 turn difficult", () => {
    const gameData = {
      // prettier-ignore
      matrix: [
        [[3, 1], [5, 3], [1, 3]],
        [[6, 3], [1, 3], [6, 3]],
        [[6, 3], [6, 3], [6, 3]],
      ],
      currentPlayerNumber: 1,
      enemyPlayerNumber: 2,
      playerTurn: 1,
    };

    const gameClass = new GameClass(gameData);

    gameClass.registerPlayerOneTurn({ x: 2, y: 2 }); // Reachable area.

    // prettier-ignore
    const resMatrix: ITableField = [
      [{color: 6, owner: 1}, {color: 5, owner: 3}, {color: 1, owner: 3}],
      [{color: 6, owner: 1}, {color: 1, owner: 3}, {color: 6, owner: 1}],
      [{color: 6, owner: 1}, {color: 6, owner: 1}, {color: 6, owner: 1}],
    ];

    expect(gameClass.matrix).toEqual(resMatrix);
    expect(gameClass.playerTurn).toEqual(2);
    expect(gameClass.playerOneColor).toEqual(6);
  });

  test("unsuccessful P1 turns", () => {
    const gameData = {
      // prettier-ignore
      matrix: [
        [[3, 1], [5, 3], [1, 3]],
        [[6, 3], [1, 3], [6, 3]],
        [[6, 3], [6, 3], [6, 3]],
      ],
      currentPlayerNumber: 1,
      enemyPlayerNumber: 2,
      playerTurn: 1,
    };

    const gameClass = new GameClass(gameData);

    gameClass.registerPlayerOneTurn({ x: 1, y: 1 }); // Unreachable cell.

    // prettier-ignore
    const resMatrix: ITableField = [
      [{color: 3, owner: 1}, {color: 5, owner: 3}, {color: 1, owner: 3}],
      [{color: 6, owner: 3}, {color: 1, owner: 3}, {color: 6, owner: 3}],
      [{color: 6, owner: 3}, {color: 6, owner: 3}, {color: 6, owner: 3}],
    ];

    expect(gameClass.matrix).toEqual(resMatrix);
    expect(gameClass.playerTurn).toEqual(1);
    expect(gameClass.playerOneColor).toEqual(3);

    gameClass.registerPlayerOneTurn({ x: 10, y: 10 }); // Out of matrix.
    gameClass.registerPlayerOneTurn({ x: -1, y: -1 }); // Out of matrix.
    gameClass.registerPlayerOneTurn({ x: 3, y: 3 }); // Out of matrix.

    expect(gameClass.matrix).toEqual(resMatrix);
    expect(gameClass.playerTurn).toEqual(1);
    expect(gameClass.playerOneColor).toEqual(3);
  });
});

describe("methods", () => {
  test("emojiToMatrixConverter", () => {
    const matrixEmoji1: ITableFieldEmoji = [
      ["🧡", "🔴", "🟢"],
      ["🟠", "🟡", "🟣"],
      ["🟣", "🟠", "🟥"],
    ];
    const matrix1 = GameClass.emojiToMatrixConverter(matrixEmoji1);
    // prettier-ignore
    const matrixNumber1: number[][][] = [
      [[2, 1], [1, 3], [5, 3]],
      [[2, 3], [3, 3], [6, 3]],
      [[6, 3], [2, 3], [1, 2]],
    ]
    expect(matrix1).toEqual(matrixNumber1);

    const matrixEmoji2: ITableFieldEmoji = [
      ["🧡", "🔴", "🟢", "🟣"],
      ["🟠", "🟡", "🟣", "🟥"],
    ];
    const matrix2 = GameClass.emojiToMatrixConverter(matrixEmoji2);
    // prettier-ignore
    const matrixNumber2: number[][][] = [
      [[2, 1], [1, 3], [5, 3], [6, 3]],
      [[2, 3], [3, 3], [6, 3], [1, 2]],
    ]
    expect(matrix2).toEqual(matrixNumber2);
  });

  test("matrixToEmojiConverter", () => {
    // prettier-ignore
    const matrixNumber1: number[][][] = [
      [[2, 1], [1, 3], [5, 3]],
      [[2, 3], [3, 3], [6, 3]],
      [[6, 3], [2, 3], [1, 2]],
    ]
    const matrix1 = GameClass.matrixToEmojiConverter(matrixNumber1);
    const matrixEmoji1: ITableFieldEmoji = [
      ["🧡", "🔴", "🟢"],
      ["🟠", "🟡", "🟣"],
      ["🟣", "🟠", "🟥"],
    ];
    expect(matrix1).toEqual(matrixEmoji1);

    // prettier-ignore
    const matrixNumber2: number[][][] = [
      [[2, 1], [1, 3], [5, 3], [6, 3]],
      [[2, 3], [3, 3], [6, 3], [1, 2]],
    ]
    const matrix2 = GameClass.matrixToEmojiConverter(matrixNumber2);
    const matrixEmoji2: ITableFieldEmoji = [
      ["🧡", "🔴", "🟢", "🟣"],
      ["🟠", "🟡", "🟣", "🟥"],
    ];
    expect(matrix2).toEqual(matrixEmoji2);
  });

  test("checkCell", () => {
    const gameData = {
      // prettier-ignore
      matrix: [
        [[3, 1], [5, 3]],
        [[2, 3], [4, 3]],
        [[6, 3], [1, 2]],
      ],
      currentPlayerNumber: 1,
      enemyPlayerNumber: 2,
      playerTurn: 1,
    };

    const gameClass = new GameClass(gameData);

    expect(gameClass.checkCell(0, 0, 3, "color")).toBe(true);
    expect(gameClass.checkCell(1, 0, 4, "color")).toBe(false);
    expect(gameClass.checkCell(1, 1, 3, "owner")).toBe(true);
    expect(gameClass.checkCell(1, 2, 1, "owner")).toBe(false);
  });

  test("checkCellNeighbors", () => {
    const gameData = {
      // prettier-ignore
      matrix: [
        [[3, 1], [5, 1], [2, 3]],
        [[2, 3], [4, 3], [3, 3]],
        [[6, 3], [1, 3], [1, 2]],
      ],
      currentPlayerNumber: 1,
      enemyPlayerNumber: 2,
      playerTurn: 1,
    };

    const gameClass = new GameClass(gameData);

    expect(gameClass.checkCellNeighbors(1, 1, 1, "color")).toBe(true);
    expect(gameClass.checkCellNeighbors(1, 1, 2, "color")).toBe(true);
    expect(gameClass.checkCellNeighbors(1, 1, 3, "color")).toBe(true);
    expect(gameClass.checkCellNeighbors(1, 1, 4, "color")).toBe(false);
    expect(gameClass.checkCellNeighbors(1, 1, 5, "color")).toBe(true);
    expect(gameClass.checkCellNeighbors(1, 1, 6, "color")).toBe(false);
    expect(gameClass.checkCellNeighbors(1, 1, 7, "color")).toBe(false);
    expect(gameClass.checkCellNeighbors(1, 1, 8, "color")).toBe(false);

    expect(gameClass.checkCellNeighbors(1, 1, 1, "owner")).toBe(true);
    expect(gameClass.checkCellNeighbors(1, 1, 2, "owner")).toBe(false);
    expect(gameClass.checkCellNeighbors(1, 1, 3, "owner")).toBe(true);
    expect(gameClass.checkCellNeighbors(1, 1, 4, "owner")).toBe(false);

    expect(gameClass.checkCellNeighbors(0, 0, 1, "owner")).toBe(true);
    expect(gameClass.checkCellNeighbors(1, 0, 1, "color")).toBe(false);
  });

  test("findAllFreeNeighbors", () => {
    const matrixEmoji: ITableFieldEmoji = [
      ["🧡", "🔴", "🟢"],
      ["🟠", "🟡", "🟣"],
      ["🟣", "🟠", "🟥"],
    ];

    const matrix = GameClass.emojiToMatrixConverter(matrixEmoji);

    const gameData = {
      matrix,
      currentPlayerNumber: 1,
      enemyPlayerNumber: 2,
      playerTurn: 1,
    };

    const gameClass = new GameClass(gameData);

    const playerOneNeighbors: ICoordinates[] = [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ];

    const playerTwoNeighbors: ICoordinates[] = [
      { x: 2, y: 1 },
      { x: 1, y: 2 },
    ];

    expect(gameClass.findAllFreeNeighbors(1)).toEqual(playerOneNeighbors);
    expect(gameClass.findAllFreeNeighbors(2)).toEqual(playerTwoNeighbors);
  });

  test("selectColorsFromArray", () => {
    const matrixEmoji: ITableFieldEmoji = [
      ["🧡", "🔴", "🟢"],
      ["🟠", "🟡", "🟣"],
      ["🟣", "🟠", "🟥"],
    ];

    const matrix = GameClass.emojiToMatrixConverter(matrixEmoji);

    const gameData = {
      matrix,
      currentPlayerNumber: 1,
      enemyPlayerNumber: 2,
      playerTurn: 1,
    };

    const gameClass = new GameClass(gameData);

    const cells: ICoordinates[] = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 2, y: 2 },
      { x: 2, y: 1 },
    ];
    const colorArray = gameClass.selectColorsFromArray(cells);

    expect([2, 1, 6]).toEqual(colorArray);
  });
});
