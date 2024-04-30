import React from "react";
import styles from "./SheduleSubject.module.scss";

import { getStudentDiscipline } from "../../../../service/DisciplineService";
import { useState } from "react";
import { useEffect } from "react";
function SheduleSubject({ subject, setClose }) {
  const [data, setData] = useState();
  const [render, setRender] = useState(false);
  const getData = async () => {
    try {
      let response = await getStudentDiscipline(data);
      setData(response.data);
    } catch (error) {
      ;
    }
  };
  useEffect(() => {
    getData();
  }, [render]);

  return (
    <>
      {!data || Object.keys(data).length === 0 ? null : (
        <div className={styles.table__wrapper}>
          <div className={styles.table}>
            <div className={styles.table__head}>
              <div className={styles.head__item}>Тема</div>
              <div className={styles.head__item}>Описание</div>
              <div className={styles.head__item}>Часы</div>
              <div className={styles.head__item}>Файл</div>
            </div>
            {Object.keys(data).map((semester) => (
              <React.Fragment key={semester}>
                {data &&
                  data[semester].map((item) => (
                    <React.Fragment>
                      {item.name_subject === subject.lesson ? (
                        <>
                          {item?.themes.map((link) => (
                            <div className={styles.table__body}>
                              <div className={styles.body__item}>
                                {link?.theme}
                              </div>
                              <div div className={styles.body__item}>
                                {link?.description}
                              </div>
                              <div div className={styles.body__item}>
                                {link?.theme_hours}
                              </div>
                              <div div className={styles.body__item}>
                                <a href={link?.file} download>
                                  Скачать{" "}
                                </a>
                              </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <p>{null}</p>
                      )}
                    </React.Fragment>
                  ))}
              </React.Fragment>
            ))}
          </div>
          <div>
            <button
              className={styles.table__btn}
              onClick={() => setClose(false)}
            >
              Назад
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default SheduleSubject;
