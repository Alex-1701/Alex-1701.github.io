import { IGameDataEmoji } from "types";

export const mockGameData: IGameDataEmoji = {
  // prettier-ignore
  // matrix: [
  //   ["💛", "🟢", "🟠", "🔴", "🔵", "🟣", "🟠", "🔴", "🟠", "🟢", "🟠", "🔴", "🟡", "🟢", "🟠"],
  //   ["🟣", "🔴", "🔵", "🟢", "🟡", "🟠", "🔵", "🟠", "🔴", "🟡", "🔵", "🟠", "🟢", "🟢", "🔵"],
  //   ["🟡", "🔵", "🟢", "🟠", "🔵", "🟠", "🟣", "🔴", "🟢", "🟠", "🟢", "🟡", "🔵", "🟠", "🔴"],
  //   ["🟠", "🟠", "🔵", "🟠", "🟢", "🟠", "🟣", "🔵", "🟢", "🟡", "🔵", "🟡", "🔵", "🟡", "🟠"],
  //   ["❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "🟢", "🔴", "🟢", "🟠"],
  //   ["🟠", "🔴", "🟡", "🟡", "🔴", "🟢", "🟠", "🔵", "🟢", "🟡", "🟠", "🟡", "🟠", "🟠", "🟢"],
  //   ["🟡", "🟢", "🟠", "🟠", "🔵", "🟢", "🔵", "🔵", "🟡", "🟢", "🟢", "🟡", "🔴", "🟠", "🔵"],
  //   ["🟠", "🟣", "🟢", "🟡", "🟣", "🟠", "🔵", "🟢", "🔵", "🟠", "🟠", "🔵", "🔴", "🟡", "🔴"],
  //   ["🔴", "🟢", "🔵", "🟡", "🟣", "🟠", "🟣", "🟡", "🟡", "🟡", "🔵", "🟢", "🟢", "🔵", "🔴"],
  //   ["🔵", "🟠", "🟠", "🔵", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌", "❌"],
  //   ["🟡", "🔴", "🔵", "🔵", "🟢", "🟣", "🟢", "🟡", "🔴", "🟣", "🟢", "🟠", "🟠", "🔴", "🟡"],
  //   ["🟣", "🟠", "🔴", "🔵", "🟣", "🔵", "🟢", "🔵", "🟢", "🟡", "🟣", "🟡", "🟠", "🟣", "🟢"],
  //   ["🟢", "🟣", "🟣", "🟡", "🟢", "🔴", "🟢", "🟡", "🔵", "🟡", "🟠", "🔵", "🟠", "🔴", "🔵"],
  //   ["🔵", "🟣", "🟢", "🟢", "🟣", "🟡", "🔵", "🟡", "🔵", "🟠", "🔵", "🟠", "🟢", "🟡", "🟥"]
  // ],

  // matrix: [
  //   ["🧡", "🔴", "🟢"],
  //   ["🟠", "🟡", "🟣"],
  //   ["🟣", "🟠", "🟥"],
  // ],

  matrix: [
    ["🧡", "🔴", "🟢", "🔵"],
    ["🔴", "🟡", "🟣", "🟢"],
    ["🟠", "🔵", "🟡", "🔵"],
    ["🟣", "🟠", "🟣", "🟥"],
  ],

  currentPlayerNumber: 1,
  enemyPlayerNumber: 2,
  playerTurn: 1,
};
