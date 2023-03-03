import React, { useEffect, useMemo, useState } from "react";
import { TableCell } from "../TableCell";
import styles from "./GameTable.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Owner } from "../../shared/constants";
import { GameClass } from "../../shared/GameClass";
import { requestGameData } from "../../store";
import { IGameData } from "../../shared/types";

export function GameTable() {
  const [gameInstance, setGameInstance] = useState<GameClass>();

  const dispatch = useAppDispatch();
  const { gameField, PlayerTurn } = useAppSelector((state) => state.game);

  useEffect(() => {
    setGameInstance(() => new GameClass());
    const fetchGameData = async () => dispatch(requestGameData()).unwrap();

    fetchGameData().then((data: IGameData) => {
      gameInstance?.initGame(data);
    });
  }, []);

  useEffect(() => {
    if (PlayerTurn === Owner.playerTwo) {
      setTimeout(() => {
        // gameInstance.registerTurn(Owner.playerTwo);
        // dispatch(registerPlayerTwoTurn(EasyBot(gameField)));
        // dispatch(recalculate());
      }, 200);
    }
  }, [PlayerTurn]);

  const onUserClick = async (x: number, y: number) => {
    gameInstance?.registerTurn({ x, y }, Owner.playerOne);
    // dispatch(recalculate());
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
