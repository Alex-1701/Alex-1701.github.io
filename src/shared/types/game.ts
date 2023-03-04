// import {ITurn} from "../constants";
import {IWinner} from "../constants/winner";

export interface ITableCell {
  color: number;
  owner: number;
}

type ITableCellEmoji = string;

export interface ITableCellNumeric {
  [index: number]: number;
}

export interface ITableLine extends Array<ITableCell> {
  [index: number]: ITableCell;
}

export interface ITableLineEmoji extends Array<string> {
  [index: number]: ITableCellEmoji;
}

export interface ITableLineNumeric extends Array<ITableCellNumeric> {
  [index: number]: ITableCellNumeric;
}

export interface ITableField extends Array<ITableLine> {
  [index: number]: ITableLine;
}

export interface ITableFieldEmoji extends Array<ITableLineEmoji> {
  [index: number]: ITableLineEmoji;
}

export interface ITableFieldNumeric extends Array<ITableLineNumeric> {
  [index: number]: ITableLineNumeric;
}

export interface ICoordinates {
  x: number;
  y: number;
}

export interface IGameData {
  matrix: ITableFieldNumeric;
  currentPlayerNumber: number;
  enemyPlayerNumber: number;
  playerTurn: number;
}

export interface IGameDataForDisplay {
  gameField: ITableField;
  availableCellsCount: number;
  PlayerOneCellsCount: number,
  PlayerTwoCellsCount: number,
  PlayerTurn: number,
  winner: IWinner,
}
