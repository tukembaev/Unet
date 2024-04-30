import React from "react";
import styles from "./TaskWidgetItem.module.scss";

function TaskWidgetItem(props) {
  return (
    <div className={styles.item}>
      <span className={styles.item_text}>{props.title}</span>
      <span className={styles.item_right}>
        <span className={styles.item_index}>{props.index}</span>
        <span className={styles.item_counter}>{props.counter}</span>
      </span>
    </div>
  );
}

export default TaskWidgetItem;
