export interface ITableCell {
  color: number;
  owner: number;
}

export interface ITableLine extends Array<ITableCell> {
  [index: number]: ITableCell;
}

export interface ITableLineEmoji extends Array<string> {
  [index: number]: string;
}

export interface ITableField extends Array<ITableLine> {
  [index: number]: ITableLine;
}

export interface ITableFieldEmoji extends Array<ITableLineEmoji> {
  [index: number]: ITableLineEmoji;
}

export interface IMockGameData {
  matrix: number[][][];
  currentPlayerNumber: number;
  enemyPlayerNumber: number;
  playerTurn: number;
}

export interface ICoordinates {
  x: number;
  y: number;
}

export interface IGameData {
  matrix: number[][][],
  currentPlayerNumber: number,
  enemyPlayerNumber: number,
  playerTurn: number,
}
