import { GameClass } from "./GameClass";
import { ITableField } from "../types";

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
