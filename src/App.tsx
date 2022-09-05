import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { GameTable } from "./components";
import {generateGameData, requestGameData} from "./store";
// import { recalculate } from "./store/game/gameActions";

import styles from "./App.module.scss";

export function App() {
  const dispatch = useAppDispatch();

  const {
    availableCellsCount,
    PlayerOneCellsCount,
    PlayerTwoCellsCount,
    PlayerTurn,
  } = useAppSelector((state) => state.game);

  useEffect(() => {
    const initiateGameField = async () => {
      await dispatch(requestGameData());

      // await dispatch(generateGameData());
      // await dispatch(recalculate());
    };
    initiateGameField();
  }, []);

  return (
    <div className={styles.App}>
      <div className={styles.content}>
        <div>Turn: {PlayerTurn === 1 ? "PLAYER 1" : "PLAYER 2"}</div>
        <div>All: {availableCellsCount}</div>
        <div>P1: {PlayerOneCellsCount}</div>
        <div>P2: {PlayerTwoCellsCount}</div>
        <GameTable />
      </div>
    </div>
  );
}
