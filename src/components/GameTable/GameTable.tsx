import React, { useEffect, useMemo, useState } from "react";
import { TableCell } from "../TableCell";
import styles from "./GameTable.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Owner } from "../../shared/constants";
import { GameClass } from "../../shared/GameClass";
import { requestGameData } from "../../store";
import { ICoordinates, IGameData } from "../../shared/types";
import { updateState } from "../../store/game/gameActions";
import { EasyBot } from "../../enemy";

export function GameTable() {
  const [gameInstance, setGameInstance] = useState<GameClass>();

  const dispatch = useAppDispatch();
  const { gameField, PlayerTurn } = useAppSelector((state) => state.game);

  useEffect(() => {
    const fetchGameData = async () => dispatch(requestGameData()).unwrap();

    fetchGameData().then((data: IGameData) => {
      setGameInstance(() => new GameClass(data));
    });
  }, []);

  useEffect(() => {
    if (gameInstance) {
      const gameData = gameInstance?.returnMainData();
      if (gameData) {
        dispatch(updateState(gameData));
      }
    }
  }, [gameInstance]);

  const handleTurn = (
    turn: ICoordinates,
    player: Owner.playerOne | Owner.playerTwo
  ) => {
    if (gameInstance) {
      const clone = gameInstance.clone();
      clone.registerTurn(turn, player);
      setGameInstance(clone);
      const gameData = clone.returnMainData();
      if (gameData) {
        dispatch(updateState(gameData));
      }
    }
  };

  useEffect(() => {
    if (PlayerTurn === Owner.playerTwo && gameInstance) {
      setTimeout(() => {
        handleTurn(EasyBot(gameInstance), Owner.playerTwo);
      }, 200);
    }
  }, [PlayerTurn]);

  const onUserClick = async (x: number, y: number) => {
    // I need to clone game class on every turn because there is type error.
    // If I try to change class fields (even by it's own methods) when
    // class Instance somehow "bind" to store or to useState, I see
    // TypeError: Cannot assign to read only property 'owner' of object '#<Object>'
    // Because register turn methods use assign to property of class property object.
    handleTurn({ x, y }, Owner.playerOne);
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
