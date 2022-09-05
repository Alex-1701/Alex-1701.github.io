import React, { useEffect, useMemo } from "react";
import { TableCell } from "../TableCell";
import styles from "./GameTable.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  recalculate,
  registerPlayerOneTurn,
  registerPlayerTwoTurn,
} from "../../store/game/gameActions";
import { PLAYER_TWO } from "../../shared/constants";
import { EasyBot } from "../../enemy";

export function GameTable() {
  const dispatch = useAppDispatch();

  const { gameField, PlayerTurn, PlayerOneColor } = useAppSelector(
    (state) => state.game
  );

  useEffect(() => {
    if (PlayerTurn === PLAYER_TWO) {
      setTimeout(() => {
        dispatch(registerPlayerTwoTurn(EasyBot(gameField, PlayerOneColor)));
      }, 200);
    }
  }, [PlayerTurn]);

  const onUserClick = async (x: number, y: number) => {
    await dispatch(registerPlayerOneTurn({ x, y }));
    await dispatch(recalculate());
  };

  const listRows = useMemo(() => {
    if (gameField) {
      let x = 0;
      let y = 0;

      /* eslint-disable react/no-array-index-key */
      return gameField.map((row, rowIndex) => {
        x = 0;
        const resRow = (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => {
              const resCell = (
                <TableCell
                  key={cellIndex}
                  color={cell.color}
                  owner={cell.owner}
                  x={x}
                  y={y}
                  onUserClick={onUserClick}
                />
              );
              x += 1;
              return resCell;
            })}
          </tr>
        );
        y += 1;
        return resRow;
      });
    }

    return [];
  }, [gameField]);

  return (
    <table className={styles["game-table"]}>
      <tbody>{listRows}</tbody>
    </table>
  );
}
