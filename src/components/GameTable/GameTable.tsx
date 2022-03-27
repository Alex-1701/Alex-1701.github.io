import React, { useState } from "react";
// import { TableCell } from "../TableCell";
import styles from "./GameTable.module.scss";

// interface Props {
//   tableData: string;
// }

const tableData = {
  matrixWidth: 6,
  matrixHeight: 6,
  matrix: [
    [
      [1, 1],
      [1, 1],
      [3, 3],
      [3, 3],
      [5, 3],
      [4, 3],
    ],
    [
      [1, 1],
      [1, 1],
      [0, 0],
      [0, 0],
      [3, 3],
      [1, 3],
    ],
    [
      [4, 3],
      [3, 3],
      [0, 0],
      [0, 0],
      [1, 3],
      [3, 3],
    ],
    [
      [2, 3],
      [5, 3],
      [0, 0],
      [0, 0],
      [4, 2],
      [4, 2],
    ],
    [
      [1, 3],
      [3, 3],
      [4, 3],
      [3, 3],
      [4, 2],
      [4, 2],
    ],
  ],
};

export function GameTable() {
  let [dataObject, setDataObject] = useState(tableData);

  // Цвета должны быть адаптивными к входящему объекту.
  // Или нет XD
  const COLORS = {
    0: "grey",
    1: "rgb(255, 0, 0)", // red
    2: "orange",
    3: "yellow",
    4: "blue",
    5: "green",
    6: "MediumVioletRed",
  };

  console.log(dataObject);

  const listRows = <div>lol</div>;

  return (
    <div className={styles.gameTable}>
      <div>{listRows}</div>
    </div>
  );
}
