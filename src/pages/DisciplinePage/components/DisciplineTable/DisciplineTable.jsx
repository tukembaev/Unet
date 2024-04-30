import React, { useState, useEffect } from "react";
import styles from "./../../../FlowPage/components/FlowPageTable/FlowPageTable.module.scss";

const DisciplineTable = ({ data, setRender, setId }) => {
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
      {!data || Object.keys(data).length === 0 ? (
        <h2 style={{ color: "black", marginLeft: "15px" }}>
          Список дисциплин пуст
        </h2>
      ) : (
        <>
          {Object.keys(data).map((semester) => (
            <React.Fragment key={semester}>
              <button className={styles.btn_pin_close}>
                {" "}
                {semester} семестр
              </button>

              <table className={styles.table__wrapper}>
                <thead className={styles.table__head}>
                  <tr className={styles.table__row}>
                    <th className={styles.table__item}>
                      <span className={styles.table__title}>Предмет</span>
                    </th>
                    <th className={styles.table__item}>
                      <span className={styles.table__title}>Направление</span>
                    </th>
                    <th className={styles.table__item}>
                      <span className={styles.table__title}>
                        Форма обучения
                      </span>
                    </th>
                    <th className={styles.table__item}>
                      <span className={styles.table__title}>Годы обучения</span>
                    </th>
                  </tr>
                </thead>
                <tbody className={styles.table__body}>
                  {data[semester].map((item) => (
                    <tr
                      key={item.id}
                      className={styles.table__row}
                      onClick={() =>
                        setId({
                          subject_id: item.subject_id,
                          subject_name: item.subject,
                        })
                      }
                    >
                      <td className={styles.table__item}>
                        <span className={styles.table__title}>
                          {item.subject}
                        </span>
                      </td>
                      <td className={styles.table__item}>
                        <span className={styles.table__title}>
                          {item.syllabus}
                        </span>
                      </td>
                      <td className={styles.table__item}>
                        <span className={styles.table__title}>
                          {item.form_education}
                        </span>
                      </td>
                      <td className={styles.table__item}>
                        <span className={styles.table__title}>{item.year}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
};

export default DisciplineTable;
