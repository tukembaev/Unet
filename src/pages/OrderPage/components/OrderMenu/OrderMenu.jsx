import React from "react";
import styles from "./OrderMenu.module.scss";

function OrderMenu({ first, second, third, four, five, setFilterChoose }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.list__wrapper}>
        <div className={styles.list__item}>
          <p className={styles.list__link} onClick={() => setFilterChoose(0)}>
            {first}
          </p>
        </div>
        <div className={styles.list__item}>
          <p className={styles.list__link} onClick={() => setFilterChoose(1)}>
            {second}
          </p>
        </div>
        <div className={styles.list__item}>
          <p className={styles.list__link} onClick={() => setFilterChoose(2)}>
            {third}
          </p>
        </div>
        <div className={styles.list__item}>
          <p className={styles.list__link} onClick={() => setFilterChoose(3)}>
            {four}
          </p>
        </div>
        <div className={styles.list__item}>
          <p className={styles.list__link} onClick={() => setFilterChoose(4)}>
            {five}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderMenu;
