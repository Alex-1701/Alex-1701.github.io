import React from "react";
import { GameTable } from "./components/GameTable";

import styles from "./App.module.scss";

export function App() {
  return (
    <div className={styles.App}>
      <div className={styles.content}>
        <div>my app</div>
        <GameTable />
      </div>
    </div>
  );
}
