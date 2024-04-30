import React, { useEffect, useState } from "react";
import {} from "../../components";
import { getStudentsForLoad } from "../../service/LoadService";
import styles from "./LoadPage.module.scss";
import { useDispatch } from "react-redux";
const LoadStudentTable = ({ id, setId }) => {
  const [render, setRender] = useState(false);
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      let response = await getStudentsForLoad(id, data);
      setData(response.data);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getData();
    setRender(false);
  }, [render]);

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);
  return (
    <>
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "10px",
          overflow: " scroll",
          
        }}
      >
        <div
          style={{ width: "1356px", flexWrap: "row", }}
          className={styles.kpi__body}
        >
          <div className={styles.head__name}>
            <p>Студенты</p>
          </div>
          <div className={styles.table__row} style={{ flexWrap: "row" }}>
            <div className={styles.head__name}>
              <p>ФИО </p>
            </div>
            <div className={styles.head__item}>
              <p>Номер телефона</p>
            </div>
            <div className={styles.head__item}>
              <p>Электронная почта</p>
            </div>

            <div className={styles.head__item}>
              <p>Группа</p>
            </div>
          </div>

          <div className={styles.table__body}>
            {data?.map((item) => (
              <div className={styles.table__row}>
                <div className={styles.body__name}>
                  <div className={styles.kpi__person}>
                    <img
                      src={item?.student_image}
                      className={styles.size}
                      alt=""
                    />
                    <p>{item?.student_name}</p>
                  </div>
                </div>
                <div className={styles.body__item}>
                  <p>{item?.student_number_phone}</p>
                </div>
                <div className={styles.body__item}>
                  <p>{item?.student_email}</p>
                </div>

                <div className={styles.body__item}>
                  <p>{item?.student_group}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadStudentTable;
