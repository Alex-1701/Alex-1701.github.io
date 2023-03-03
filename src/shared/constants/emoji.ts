import { Owner } from "./owners";
import { Color } from "./color";

export interface EmojiCell {
  emoji: string;
  cell: number[];
}

export const emojiCells: EmojiCell[] = [
  { emoji: "❌", cell: [Color.gray, Owner.unavailable] },

  { emoji: "❤️", cell: [Color.red, Owner.playerOne] },
  { emoji: "🟥", cell: [Color.red, Owner.playerTwo] },
  { emoji: "🔴", cell: [Color.red, Owner.free] },

  { emoji: "🧡", cell: [Color.orange, Owner.playerOne] },
  { emoji: "🟧", cell: [Color.orange, Owner.playerTwo] },
  { emoji: "🟠", cell: [Color.orange, Owner.free] },

  { emoji: "💛", cell: [Color.yellow, Owner.playerOne] },
  { emoji: "🟨", cell: [Color.yellow, Owner.playerTwo] },
  { emoji: "🟡", cell: [Color.yellow, Owner.free] },

  { emoji: "💙", cell: [Color.blue, Owner.playerOne] },
  { emoji: "🟦", cell: [Color.blue, Owner.playerTwo] },
  { emoji: "🔵", cell: [Color.blue, Owner.free] },

  { emoji: "💚", cell: [Color.green, Owner.playerOne] },
  { emoji: "🟩", cell: [Color.green, Owner.playerTwo] },
  { emoji: "🟢", cell: [Color.green, Owner.free] },

  { emoji: "💜", cell: [Color.violet, Owner.playerOne] },
  { emoji: "🟪", cell: [Color.violet, Owner.playerTwo] },
  { emoji: "🟣", cell: [Color.violet, Owner.free] },
];
