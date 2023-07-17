import React from "react";
import { useAppSelector } from "@hooks";
import { GameTable } from "@components";
import {
  dbCollections,
  FirestoreAPI,
  GameClass,
  mock_fortress,
  Winner,
} from "@shared";

import styles from "./App.module.scss";

export function App() {
  const {
    availableCellsCount,
    PlayerOneCellsCount,
    PlayerTwoCellsCount,
    PlayerTurn,
    winner,
  } = useAppSelector((state) => state.game);

  const request = () => {
    const gameData = GameClass.gameDataConverter(mock_fortress);
    const data = GameClass.gameDataNumericForStore(gameData);
    // FirestoreAPI.pushDoc(
    //   collections.MAPS,
    //   data
    // );
    // FirestoreAPI.getDocs(dbCollections.MAPS);
    FirestoreAPI.getAllDocs(dbCollections.MAPS);

    // FirestoreAPI.setDocDB(dbCollections.MAPS, "lol kek", data);
  };

  return (
    <div className={styles.App}>
      <div className={styles.content}>
        <div>
          <button type="button" onClick={request}>
            button
          </button>
          <div>Turn: {PlayerTurn === 1 ? "PLAYER 1" : "PLAYER 2"}</div>
          <div>All: {availableCellsCount}</div>
          <div>P1: {PlayerOneCellsCount}</div>
          <div>P2: {PlayerTwoCellsCount}</div>
          <div>
            Winner:
            {winner === Winner.one && "PLAYER 1 😀"}
            {winner === Winner.two && "PLAYER 2 💀"}
            {winner === Winner.draw && "Draw"}
          </div>
        </div>
        <GameTable />
        <div className={styles.description}>
          <h3>Description:</h3>
          <p>This is the noname mini game.</p>
          <p>
            Your cells marked with 😀 emoji, and your enemy cells marked with
            💀.
          </p>
          <p>Your goal is to take more cells than your enemy.</p>
          <p>Now your enemy is silly bot that chose actions randomly.</p>
          <p>
            To expand your territory just choose color to repaint. And tap any
            cell with this color.
          </p>
          <p>
            Note that you can only choose colors which cells are connected with
            your territory.
          </p>
        </div>
      </div>
    </div>
  );
}
