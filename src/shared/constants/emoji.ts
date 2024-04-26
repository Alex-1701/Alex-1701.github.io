import { Owner } from "./owners"
import { Color } from "./color"

export interface EmojiCell {
  emoji: string
  cell: number[]
}

export const emojiCells: EmojiCell[] = [
  // 0
  { emoji: "❌", cell: [Color.gray, Owner.unavailable] },

  // 1
  { emoji: "❤️", cell: [Color.red, Owner.playerOne] },
  { emoji: "🟥", cell: [Color.red, Owner.playerTwo] },
  { emoji: "🔴", cell: [Color.red, Owner.free] },

  // 2
  { emoji: "🧡", cell: [Color.orange, Owner.playerOne] },
  { emoji: "🟧", cell: [Color.orange, Owner.playerTwo] },
  { emoji: "🟠", cell: [Color.orange, Owner.free] },

  // 3
  { emoji: "💛", cell: [Color.yellow, Owner.playerOne] },
  { emoji: "🟨", cell: [Color.yellow, Owner.playerTwo] },
  { emoji: "🟡", cell: [Color.yellow, Owner.free] },

  // 4
  { emoji: "💙", cell: [Color.blue, Owner.playerOne] },
  { emoji: "🟦", cell: [Color.blue, Owner.playerTwo] },
  { emoji: "🔵", cell: [Color.blue, Owner.free] },

  // 5
  { emoji: "💚", cell: [Color.green, Owner.playerOne] },
  { emoji: "🟩", cell: [Color.green, Owner.playerTwo] },
  { emoji: "🟢", cell: [Color.green, Owner.free] },

  // 6
  { emoji: "💜", cell: [Color.violet, Owner.playerOne] },
  { emoji: "🟪", cell: [Color.violet, Owner.playerTwo] },
  { emoji: "🟣", cell: [Color.violet, Owner.free] },
]

export interface EmojiOwner {
  emoji: string
  owner: Owner
}

export const emojiOwners: EmojiOwner[] = [
  { emoji: "", owner: Owner.playerOne },
  { emoji: "😀", owner: Owner.playerTwo },
  { emoji: "💀", owner: Owner.playerTwo },
  { emoji: "", owner: Owner.playerTwo },
]
