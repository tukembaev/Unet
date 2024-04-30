import React, { useState, useEffect } from "react";
import styles from "./FlowPageTable.module.scss";

const FlowPageTable = ({ data, setRender, setId, setOpenModal2 }) => {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  return (
    <div>
      {data?.length === 0 ? (
        <div className={styles.empty_flow}>
          <h2>Список потоков пуст</h2>
        </div>
      ) : (
        <table className={styles.table__wrapper}>
          <thead className={styles.table__head}>
            <tr className={styles.table__row}>
              <th className={styles.table__item}>
                <span className={styles.table__title}>Номер</span>
              </th>
              <th className={styles.table__item}>
                <span className={styles.table__title}>Лектор</span>
              </th>
              <th className={styles.table__item}>
                <span className={styles.table__title}>Дисциплина</span>
              </th>
              <th className={styles.table__item}>
                <span className={styles.table__title}>Направление</span>
              </th>
              <th className={styles.table__item}>
                <span className={styles.table__title}>Семестр</span>
              </th>
              <th className={styles.table__item}>
                <span className={styles.table__title}>Год</span>
              </th>
            </tr>
          </thead>
          <tbody className={styles.table__body}>
            {data?.map((item, index) => {
              const [startYear, endYear] = item.year
                .split("-")
                .map((year) => new Date(year).getFullYear());
              return (
                <tr
                  key={index}
                  className={styles.table__row}
                  onClick={() => {
                    setId(item.id);
                  }}
                >
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>
                      Поток {item.number}
                    </span>
                  </td>
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>
                      {item.responsible}
                    </span>
                  </td>
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>
                      {item.subject_name}
                    </span>
                  </td>
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>
                      {item.syllabus_name}
                    </span>
                  </td>
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>{item.semester}</span>
                  </td>
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>
                      {startYear} - {endYear}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FlowPageTable;
