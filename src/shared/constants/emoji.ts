export interface EmojiCell {
  emoji: string;
  cell: number[];
}

export const emojiCells: EmojiCell[] = [
  { emoji: "❤️", cell: [1, 1] },
  { emoji: "🟥", cell: [1, 2] },
  { emoji: "🔴", cell: [1, 3] },

  { emoji: "🧡", cell: [2, 1] },
  { emoji: "🟧", cell: [2, 2] },
  { emoji: "🟠", cell: [2, 3] },

  { emoji: "💛", cell: [3, 1] },
  { emoji: "🟨", cell: [3, 2] },
  { emoji: "🟡", cell: [3, 3] },

  { emoji: "💙", cell: [4, 1] },
  { emoji: "🟦", cell: [4, 2] },
  { emoji: "🔵", cell: [4, 3] },

  { emoji: "💚", cell: [5, 1] },
  { emoji: "🟩", cell: [5, 2] },
  { emoji: "🟢", cell: [5, 3] },

  { emoji: "💜", cell: [6, 1] },
  { emoji: "🟪", cell: [6, 2] },
  { emoji: "🟣", cell: [6, 3] },
];
