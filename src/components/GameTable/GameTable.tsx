import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@hooks";
import { GameClass, Player, Owner } from "@shared";
import { ICoordinates, IGameDataNumeric } from "@types";
import { requestGameData, updateState } from "@store";
import { easyBot } from "@enemy";
import { TableCell } from "../TableCell";

import styles from "./GameTable.module.scss";

export function GameTable() {
  const [gameInstance, setGameInstance] = useState<GameClass>();
  const [isGameLoaded, setIsGameLoaded] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { gameField, PlayerTurn, winner } = useAppSelector(
    (state) => state.game
  );

  useEffect(() => {
    const fetchGameData = async () => dispatch(requestGameData()).unwrap();

    fetchGameData().then((data: IGameDataNumeric) => {
      setGameInstance(() => new GameClass(data));
    });
  }, [dispatch]);

  useEffect(() => {
    if (gameInstance && !isGameLoaded) {
      const gameData = gameInstance?.returnMainData();
      if (gameData) {
        dispatch(updateState(gameData));
      }
      setIsGameLoaded(true);
    }
  }, [dispatch, gameInstance, isGameLoaded]);

  const handleTurn = useMemo(() => {
    return (turn: ICoordinates | null, player: Player) => {
      if (gameInstance && !winner) {
        const clone = gameInstance.clone();
        const isTurnSuccessful = clone.registerTurn(turn, player);
        setGameInstance(clone);
        const gameData = clone.returnMainData();
        if (gameData && isTurnSuccessful) {
          dispatch(updateState(gameData));
        }
      }
    };
  }, [dispatch, gameInstance, winner]);

  useEffect(() => {
    if (PlayerTurn === Owner.playerTwo && gameInstance && !winner) {
      setTimeout(() => {
        handleTurn(easyBot(gameInstance), Owner.playerTwo);
      }, 10);
    }
  }, [PlayerTurn, gameInstance, handleTurn, winner]);

  const onUserClick = useMemo(() => {
    return (x: number, y: number) => {
      // I need to clone game class on every turn because there is type error.
      // If I try to change class fields (even by it's own methods) when
      // class Instance somehow "bind" to store or to useState, I see
      // TypeError: Cannot assign to read only property 'owner' of object '#<Object>'
      // Because register turn methods use assign to property of class property object.
      handleTurn({ x, y }, Owner.playerOne);
    };
  }, [handleTurn]);

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
  }, [gameField, onUserClick]);

  return (
    <table className={styles.gameTable}>
      <tbody>{listRows}</tbody>
    </table>
  );
}
