import React from "react";
import styles from "./ScheduleCard.module.scss";

const ScheduleCard = ({ title, data, getSubject, setOpen }) => {
  // states
  // functions

  return (
    <div className={styles.card_wrapper}>
      <h1 className={styles.card__title}>{title}</h1>
      {data?.length === 0 ? (
        <div className={styles.schedule_wrapper}> Нет расписания </div>
      ) : (
        data?.map((item) => {
          let color;
          if (item.lesson_type === "Практическая") {
            color = "green";
          } else if (item.lesson_type === "Лекция") {
            color = "blue";
          } else if (item.lesson_type === "Лабаротория") {
            color = "blueviolet";
          } else {
            color = "grey";
          }

          return (
            <div
              style={{ borderLeft: `6px solid ${color}`, cursor: "pointer" }}
              onClick={() => {
                getSubject(item);
                setOpen(true);
              }}
              className={styles.schedule_wrapper}
            >
              <div className={styles.card_header}>
                <h3>{item.lesson_type}</h3>
                <h3 className={styles.card__text}>{item.auditorium_num}</h3>
              </div>
              <div className={styles.card_body}>
                <h2 className={styles.card__text}>{item.lesson}</h2>
              </div>
              <div className={styles.card_footer}>
                <h4>{item.time}</h4>
                <h4>{item.lecturer_name}</h4>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ScheduleCard;
