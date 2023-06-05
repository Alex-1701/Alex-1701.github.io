export enum Owner {
  unavailable = 0,
  playerOne = 1,
  playerTwo = 2,
  free = 3,
}

export type IPlayer = Owner.playerOne | Owner.playerTwo;
