import React from "react";
import clsx from "clsx";
import styles from "./TableCell.module.scss";

interface Props {
  x: number;
  y: number;
  color: number;
  owner: number;
  onUserClick: (x: number, y: number) => void;
}

const OWNERS = ["neutral", "player", "enemy", "free"];

export function TableCell({ x, y, color, owner, onUserClick }: Props) {
  function click() {
    // console.log("click", x, y);
    onUserClick(x, y);
  }

  const colorClass = `color_${color}`;
  const ownerClass = OWNERS[owner];

  // let onClick = props.onClick;
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
    <td
      className={clsx(styles[colorClass], styles[ownerClass])}
      onClick={click}
    >
      <div>{`${owner}-${color}`}</div>
    </td>
  );
}
