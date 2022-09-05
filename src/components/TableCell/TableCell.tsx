import React from "react";
import clsx from "clsx";
import styles from "./TableCell.module.scss";
import { PLAYER_ONE, PLAYER_TWO } from "../../shared/constants";

interface Props {
  x: number;
  y: number;
  color: number;
  owner: number;
  onUserClick: (x: number, y: number) => void;
}

const OWNERS = ["neutral", "player", "enemy", "free"];

export function TableCell({ x, y, color, owner, onUserClick }: Props) {
  function handleClick() {
    onUserClick(x, y);
  }

  const colorClass = `color_${color}`;
  const ownerClass = OWNERS[owner];

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
    <td
      className={clsx(styles[colorClass], styles[ownerClass])}
      onClick={handleClick}
    >
      <div>
        {owner === PLAYER_TWO && "💀"}
        {owner === PLAYER_ONE && "😀"}
      </div>
    </td>
  );
}
