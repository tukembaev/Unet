import React from "react";
import styles from "./UpcomingEvents.module.scss";
import moment from "moment";
import "moment/locale/ru";
const UpcomingEvents = ({ all, semester, edication, up_next }) => {
  moment.locale("ru");
  const today = new Date();

  const filteredEvents = up_next
    .filter((event) => {
      const eventEndDate = new Date(event.end);
      return eventEndDate >= today;
    })
    .sort((a, b) => {
      const startDateA = new Date(a.start);
      const startDateB = new Date(b.start);
      return startDateA - startDateB;
    });

  return (
    <>
      <h2>Ближайщие события</h2>
      <div className={styles.upcoming_wrapper}>
        {filteredEvents.length === 0
          ? "Ближайщих событий нет"
          : filteredEvents.map((item) => {
              if (
                item.title.includes("Регистрация на дисциплины") &&
                semester
              ) {
                return (
                  <div className={styles.event}>
                    <p>{item.title}</p>
                    <div>
                      <p
                        style={{
                          display: "flex",
                          gap: "15px",
                          flexDirection: "column",
                        }}
                        className={styles.event__text}
                      >
                        {" "}
                        <span
                          style={{ background: `${item.color}` }}
                          className={styles.event_color}
                        >
                          {" "}
                        </span>
                        {moment(item.start).startOf("day").format("LL")}
                      </p>
                    </div>
                  </div>
                );
              }
              if (item.title.includes("Экзамены") && edication) {
                return (
                  <div className={styles.event}>
                    <p>{item.title}</p>
                    <div>
                      <p
                        style={{
                          display: "flex",
                          gap: "15px",
                          flexDirection: "column",
                        }}
                      >
                        {" "}
                        <span
                          style={{ background: `${item.color}` }}
                          className={styles.event_color}
                        >
                          {" "}
                        </span>
                        {moment(item.start).startOf("day").format("LL")}
                      </p>
                    </div>
                  </div>
                );
              }
              if (
                !item.title.includes("Регистрация на дисциплины") &&
                !item.title.includes("Экзамены") &&
                all
              ) {
                return (
                  <div className={styles.event}>
                    <p>{item.title}</p>
                    <div>
                      <p
                        style={{
                          display: "flex",
                          gap: "15px",
                          flexDirection: "column",
                        }}
                      >
                        {" "}
                        <span
                          style={{ background: `${item.color}` }}
                          className={styles.event_color}
                        >
                          {" "}
                        </span>
                        {moment(item.start).startOf("day").format("LL")}
                      </p>
                    </div>
                  </div>
                );
              }
            })}
      </div>
    </>
  );
};

export default UpcomingEvents;
