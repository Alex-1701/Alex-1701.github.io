import { Color, IWinner, Owner, Player } from "@shared"

export interface ITableCell {
  color: Color
  owner: Owner
}

type ITableCellEmoji = string

export interface ITableCellNumeric {
  [index: number]: number
}

export interface ITableLine extends Array<ITableCell> {
  [index: number]: ITableCell
}

export interface ITableLineEmoji extends Array<string> {
  [index: number]: ITableCellEmoji
}

export interface ITableLineNumeric extends Array<ITableCellNumeric> {
  [index: number]: ITableCellNumeric
}

export interface ITableField extends Array<ITableLine> {
  [index: number]: ITableLine
}

export interface ITableFieldEmoji extends Array<ITableLineEmoji> {
  [index: number]: ITableLineEmoji
}

export interface ITableFieldNumeric extends Array<ITableLineNumeric> {
  [index: number]: ITableLineNumeric
}

export interface ICoordinates {
  x: number
  y: number
}

export type Turn = ICoordinates | null

export interface IGameData {
  currentPlayerNumber: number
  enemyPlayerNumber: number
  playerTurn: Player
}

export interface IGameDataNumeric extends IGameData {
  matrix: ITableFieldNumeric
}

export interface IGameDataNumericForStore extends IGameData {
  matrix: string
}

export interface IGameDataEmoji extends IGameData {
  matrix: ITableFieldEmoji
}

export interface IGameDataForDisplay {
  gameField: ITableField
  availableCellsCount: number
  PlayerOneCellsCount: number
  PlayerTwoCellsCount: number
  PlayerTurn: number
  winner: IWinner
}
