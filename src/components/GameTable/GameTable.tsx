import React, { useState } from "react";
import { TableCell } from "../TableCell";
import styles from "./GameTable.module.scss";

// interface Props {
//   tableData: string;
// }

const tableData = {
  matrixWidth: 6,
  matrixHeight: 6,
  // prettier-ignore
  matrix: [
    [[1, 1], [1, 1], [3, 3], [3, 3], [5, 3], [4, 3],],
    [[1, 1], [1, 1], [0, 0], [0, 0], [3, 3], [1, 3],],
    [[4, 3], [3, 3], [0, 0], [0, 0], [1, 3], [3, 3],],
    [[2, 3], [5, 3], [0, 0], [0, 0], [4, 2], [4, 2],],
    [[1, 3], [3, 3], [4, 3], [3, 3], [4, 2], [4, 2],],
  ],
};

export function GameTable() {
  const [dataObject] = useState(tableData);

  // Цвета должны быть адаптивными к входящему объекту.
  // Или нет XD
  // const COLORS = [
  //   "grey",
  //   "rgb(255, 0, 0)", // red
  //   "orange",
  //   "yellow",
  //   "blue",
  //   "green",
  //   "MediumVioletRed",
  // ];

  // console.log(dataObject);

  const randomKey = (length: number): string => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const onUserClick = (x: number, y: number) => {
    console.log(x, y);
  };

  let x = 0;
  let y = 0;
  const listRows = dataObject.matrix.map((row) => {
    x = 0;
    const resRow = (
      <tr key={randomKey(3)}>
        {row.map((cell) => {
          const resCell = (
            <TableCell
              key={randomKey(3)}
              color={cell[0]}
              owner={cell[1]}
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

  return (
    <table className={styles["game-table"]}>
      <tbody>{listRows}</tbody>
    </table>
  );
}
