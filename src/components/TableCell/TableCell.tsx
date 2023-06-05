import React from "react";
import clsx from "clsx";
import { Owner } from "shared";

import styles from "./TableCell.module.scss";

interface Props {
  x: number;
  y: number;
  color: number;
  owner: number;
  onUserClick: (x: number, y: number) => void;
}

export function TableCell({ x, y, color, owner, onUserClick }: Props) {
  function handleClick() {
    onUserClick(x, y);
  }

  const colorClass = `color_${color}`;
  const ownerClass = Owner[owner];

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
    <td
      className={clsx(styles[colorClass], styles[ownerClass])}
      onClick={handleClick}
    >
      <div>
        {owner === Owner.playerTwo && "💀"}
        {owner === Owner.playerOne && "😀"}
      </div>
    </td>
  );
}
