export type IOwner = 0 | 1 | 2 | 3;

export enum Owner {
  unavailable = 0,
  playerOne = 1,
  playerTwo = 2,
  free = 3,
}

export type IPlayer = Owner.playerOne | Owner.playerTwo;
