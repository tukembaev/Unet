import React from "react";
import styles from "./HistoryCard.module.scss";

const HistoryCard = ({ data }) => {

  return (
    <div className={styles.history_wrapper}>
      <div className={styles.history_header}>
        <h3>Активность</h3>
      </div>
      <div className={styles.history_body}>
        {data?.map((item) => (
          <div className={styles.card}>
            <div className={styles.card__item}>
              <p className={styles.circle}>
                {item.index} {item.type_doc}{" "}
              </p>
            </div>
            <hr />
            <div className={styles.card__item}>
              <p className={styles.circle}>{item.text}</p>
            </div>
            <hr />
            <div className={styles.card__item}>
              <p className={styles.circle}>{item.date_zayavki}</p>
            </div>
            <hr />
            <div className={styles.card__item}>
              <p className={styles.circle}>{item.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryCard;
