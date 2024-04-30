import React, { useState, useEffect } from "react";
import styles from "./../FlowPage/components/FlowPageTable/FlowPageTable.module.scss";

const LoadTable = ({ data, setRender, setId }) => {
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

  let total_hours = [];

  if (!data || Object.keys(data).length === 0) {
    return null;
  } else {
    {
      Object.keys(data)?.map((semester) => {
        {
          data[semester].map((item) => {
            total_hours.push(item?.total_hours);
          });
        }
      });
    }
  }

  const FilterTotalHours = total_hours.filter((elem) => elem !== undefined);
 

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
              {data[semester].map((item) =>
                item.total_hours ? (
                  <button style={{ border: "none", background: 'none' , marginLeft: "10px" }}>
                    Общее количество часов : {item?.total_hours}
                  </button>
                ) : null
              )}
              <div style={{ overflow: "auto" }}>
                <table className={styles.table__wrapper}>
                  <thead className={styles.table__head}>
                    <tr className={styles.table__row}>
                      <th className={styles.table__item}>
                        <span className={styles.table__title}>Предмет</span>
                      </th>
                      <th className={styles.table__item}>
                        <span className={styles.table__title}>Вид</span>
                      </th>
                      <th className={styles.table__item}>
                        <span className={styles.table__title}>Часы</span>
                      </th>
                      <th className={styles.table__item}>
                        <span className={styles.table__title}>Поток</span>
                      </th>
                      <th className={styles.table__item}>
                        <span className={styles.table__title}>
                          Кол-во студентов
                        </span>
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
                            subject_stream: item.stream,
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
                            {item.lesson_type}
                          </span>
                        </td>
                        <td className={styles.table__item}>
                          <span className={styles.table__title}>
                            {item.hours}
                          </span>
                        </td>
                        <td className={styles.table__item}>
                          <span className={styles.table__title}>
                            {item.stream_number}
                          </span>
                        </td>

                        <td className={styles.table__item}>
                          <span className={styles.table__title}>
                            {item.students_count}
                          </span>
                        </td>
             
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
};

export default LoadTable;
