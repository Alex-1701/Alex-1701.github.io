import { IGameDataEmoji } from "types";
import { GameClass } from "shared/GameClass";

test("success", () => {
  const gameData: IGameDataEmoji = {
    matrix: [
      ["🧡", "🔴", "🟢", "🟢"],
      ["🧡", "🟡", "🟥", "🟥"],
      ["🟣", "🟠", "🟢", "🟥"],
    ],
    currentPlayerNumber: 1,
    enemyPlayerNumber: 2,
    playerTurn: 1,
  };

  const gameClass = new GameClass(GameClass.gameDataConverter(gameData));

  const [availableCellsCount, PlayerOneCellsCount, PlayerTwoCellsCount] =
    gameClass.recalculate();

  expect(availableCellsCount).toEqual(12);
  expect(PlayerOneCellsCount).toEqual(2);
  expect(PlayerTwoCellsCount).toEqual(3);
});
