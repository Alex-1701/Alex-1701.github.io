// This is bad idea, should remove this redundant code.
// TODO remove
/**
 * 0 - draw,
 * 1 - player one won,
 * 2 - player two won,
 * null - not finished yet,
 */
export type IWinner = 0 | 1 | 2 | null

export enum Winner {
  draw = 0,
  one = 1,
  two = 2,
}
