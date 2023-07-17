import { IGameDataEmoji, ITableFieldEmoji } from "@types";
import { GameClass, Color, Owner } from "@shared";

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
