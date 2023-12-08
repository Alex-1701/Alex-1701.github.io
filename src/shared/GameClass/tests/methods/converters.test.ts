import { ITableFieldEmoji, ITableFieldNumeric } from "@types";
import { GameClass } from "@shared";

const matrixEmoji: ITableFieldEmoji = [
  ["❤️", "🧡", "💛", "💙", "💚", "💜"],
  ["🔴", "🟠", "🟡", "🔵", "🟢", "🟣"],
  ["🟥", "🟧", "🟨", "🟦", "🟩", "🟪"],
  ["❌", "❌", "❌", "❌", "❌", "❌"],
];

// prettier-ignore
const matrixNumber: ITableFieldNumeric = [
  [[1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1]],
  [[1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3]],
  [[1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2]],
  [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
]

test("emoji to numeric", () => {
  const matrix = GameClass.emojiToMatrixConverter(matrixEmoji);
  expect(matrix).toEqual(matrixNumber);
});

test("numeric to emoji", () => {
  const matrix = GameClass.matrixToEmojiConverter(matrixNumber);
  expect(matrix).toEqual(matrixEmoji);
});
