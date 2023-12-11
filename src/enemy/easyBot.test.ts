import { IGameDataEmoji, Turn } from "@types";
import { GameClass } from "@shared";
import { easyBot } from "./easyBot";

describe("easy bot", () => {
  test("can't make a turn", () => {
    const gameData: IGameDataEmoji = {
      matrix: [["🧡", "🧡", "🧡", "🟥"]],
      currentPlayerNumber: 1,
      enemyPlayerNumber: 2,
      playerTurn: 2,
    };

    const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

    const turn = easyBot(gameClass);

    expect(turn).toEqual(null);
  });

  test("can make a turn", () => {
    const gameData: IGameDataEmoji = {
      matrix: [["🧡", "🔵", "🟠", "🟥"]],
      currentPlayerNumber: 1,
      enemyPlayerNumber: 2,
      playerTurn: 2,
    };

    const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

    const turn = easyBot(gameClass);

    expect(turn).toEqual({ x: 2, y: 0 });
  });

  test("can't make a turn 2", () => {
    const gameData: IGameDataEmoji = {
      matrix: [["🧡", "🟥", "🟠"]],
      currentPlayerNumber: 1,
      enemyPlayerNumber: 2,
      playerTurn: 2,
    };

    const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

    const turn = easyBot(gameClass);

    expect(turn).toEqual(null);
  });

  test("choose right cell for turn", () => {
    const gameData: IGameDataEmoji = {
      matrix: [
        ["🧡", "🟣", "🟢"],
        ["🟡", "🟥", "🔵"],
        ["🔴", "🟢", "🟣"],
      ],
      currentPlayerNumber: 1,
      enemyPlayerNumber: 2,
      playerTurn: 2,
    };

    const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

    const turnAbleCells: Turn[] = [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 2, y: 1 },
      { x: 1, y: 2 },
    ];

    // Why not lol
    for (let i = 0; i < 100; i++) {
      const turn = easyBot(gameClass);
      expect(turnAbleCells).toEqual(
        expect.arrayContaining([expect.objectContaining(turn)])
      );
    }
  });
});
