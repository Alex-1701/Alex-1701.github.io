import React from "react";
import styles from "./Layout.modules.scss";

export interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  return <div className={styles.content}>{children}</div>;
}
