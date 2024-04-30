import React from "react";
import styles from "./KpiList.module.scss";
import Divider from "@mui/material/Divider";
import { useState, useEffect } from "react";
import { getKpiList } from "../../../../service/PublicationService";
import { setKpiList } from "../../../../store/slices/PublicationSlice";
import { useDispatch, useSelector } from "react-redux";
import userInfo from "../../../../utils/userInfo";
import { useNavigate } from "react-router-dom";

const KpiList = ({data}) => {
  // states
  const dispatch = useDispatch();
  const [render, setRender] = useState(false);
  const user = userInfo();
  const id = user?.employeeId;
  const navigate = useNavigate();
  // functions

  const filteredData = data?.slice(0 , 6);
  
  const rowStyle = {
    borderBottom: '1px solid black', // Задайте нужные вам стили
  };

  return (
    <div className={styles.list_wrapper}>
      <div className={styles.list_table}>
        <table className={styles.table__wrapper}>
          <thead className={styles.table__head}>
            <tr style={rowStyle} className={styles.table__row}>
              <th className={styles.table__item}>
                <span className={styles.table__title}>№</span>
              </th>
              <th className={styles.table__item}>
                <span className={styles.table__title}>Наименование</span>
              </th>
              <th className={styles.table__item}>
                <span className={styles.table__title}>Плановое значение</span>
              </th>
              <th className={styles.table__item}>
                <span className={styles.table__title}>
                  Фактическое значение
                </span>
              </th>
              <th className={styles.table__item}>
                <span className={styles.table__title}>
                  Индекс достижения (ИД)
                </span>
              </th>
              <th className={styles.table__item}>
                <span className={styles.table__title}>Независимая оценка </span>
              </th>
            </tr>
          </thead>
          <tbody className={styles.table__body}>
            {filteredData?.length !== 0 ? (
              <>
                {filteredData?.map((item , index) =>(
              <tr className={styles.table__row} key={item?.id}>
                <td className={styles.table__item}>
                  <span className={styles.table__title}>{index + 1}</span>
                </td>
                <td className={styles.table__item}>
                  <span className={styles.table__title}>{item?.category_name}</span>
                </td>
                <td className={styles.table__item}>
                  <span className={styles.table__title}>{item?.planned_value}</span>
                </td>
                <td className={styles.table__item}>
                  <span className={styles.table__title}>{item?.actual}</span>
                </td>
                <td className={styles.table__item}>
                  <span className={styles.table__title}>{item?.goal_achievement}%</span>
                </td>
                <td className={styles.table__item}>
                  <span className={styles.table__title}></span>
                </td>
              </tr>
                ))}
              </>
            ) : 
            <div className={styles.empty}>
              <p>Таблица не заполнена</p>
            </div>
            }
          </tbody>
        </table>
      </div>
      <div className={styles.list_more}>
        <button
          className={styles.list_btn}
          onClick={() => navigate(`/kpi-more/`)}
        >
          Подробнее
        </button>
      </div>
    </div>
  );
};

export default KpiList;
