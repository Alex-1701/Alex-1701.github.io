import React, { useEffect, useMemo } from "react";
import { TableCell } from "../TableCell";
import styles from "./GameTable.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  registerPlayerTwoTurn,
} from "../../store/game/gameActions";
import { Owner } from "../../shared/constants";
import { EasyBot } from "../../enemy";
import {GameClass} from "../../shared/GameClass";

export function GameTable() {
  const dispatch = useAppDispatch();

  const { gameField, PlayerTurn, PlayerOneColor } = useAppSelector(
    (state) => state.game
  );

  useEffect(() => {
    if (PlayerTurn === Owner.playerTwo) {
      setTimeout(() => {
        dispatch(registerPlayerTwoTurn(EasyBot(gameField, PlayerOneColor)));
        // dispatch(recalculate());
      }, 200);
    }
  }, [PlayerTurn]);

  const onUserClick = async (x: number, y: number) => {
    GameClass.registerTurn({x, y}, Owner.playerOne);
    // await dispatch(registerPlayerOneTurn({ x, y }));

    // await dispatch(recalculate());
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
