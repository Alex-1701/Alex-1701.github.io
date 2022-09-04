import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { GameTable } from "./components";
import { requestGameData } from "./store";

import styles from "./App.module.scss";
import { recalculate } from "./store/game/gameActions";

export function App() {
  const dispatch = useAppDispatch();

  const { availableCellsCount, PlayerOneCellsCount, PlayerTwoCellsCount, PlayerTurn } =
    useAppSelector((state) => state.game);

  useEffect(() => {
    const initiateGameField = async () => {
      await dispatch(requestGameData());
      await dispatch(recalculate());
    };
    initiateGameField();
  }, []);

  return (
    <div className={styles.App}>
      <div className={styles.content}>
        <div>Turn: {PlayerTurn}</div>
        <div>All: {availableCellsCount}</div>
        <div>P1: {PlayerOneCellsCount}</div>
        <div>P2: {PlayerTwoCellsCount}</div>
        <GameTable />
      </div>
    </div>
  );
}
