import React from "react";
import styles from "./KpiEmployees.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCriteriaHead } from "../../../../service/PublicationService";
import { setKpiHead } from "../../../../store/slices/PublicationSlice";
import Notification from "../../../../utils/Notifications";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../../../components";
import { useEffect, useState } from "react";

export default function KpiEmployees() {
  // states

  let data;
  const [render, setRender] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // functions

  const getData = async () => {
    try {
      let response = await getCriteriaHead(data);
      dispatch(
        setKpiHead({
          KpiHead: response.data,
        })
      );
    } catch (error) {
      
    }
  };
  useEffect(() => {
    getData();
    setRender(false);
  }, [render]);
  const kpiHead = useSelector((state) => state.publications.KpiHead);

  return (
    <div>
                        <Divider>Все сотрудники</Divider>

         <div className={styles.employees_wrapper}>
                {kpiHead.length !== 0 ? (
                  <div className={styles.kpi__body}>
                    <div className={styles.table__row}>
                      <div className={styles.head__name}>
                        <p>Все </p>
                      </div>
                      <div className={styles.head__item}>
                        <p>B-1</p>
                      </div>
                      <div className={styles.head__item}>
                        <p>B-2</p>
                      </div>
                      <div className={styles.head__item}>
                        <p>B-3</p>
                      </div>
                      <div className={styles.head__item}>
                        <p>B-4</p>
                      </div>
                      <div className={styles.head__item}>
                        <p>B-5</p>
                      </div>
                      <div className={styles.head__item}>
                        <p>Общий балл</p>
                      </div>
                    </div>
                    <div className={styles.table__body}>
                      {kpiHead?.map((item) => (
                        <div
                          className={styles.table__row}
                          onClick={() =>
                            navigate(`/kpi-employee/${item.user_id}`)
                          }
                        >
                          <div className={styles.body__name}>
                            <div className={styles.kpi__person}>
                              <img
                                src={item?.image}
                                className={styles.size}
                                alt=""
                              />
                              <p>{item?.employee_name}</p>
                            </div>
                          </div>
                          <div className={styles.body__item}>
                            <p style={{paddingLeft: '30px'}}>{item?.criteria_1}</p>
                          </div>
                          <div className={styles.body__item}>
                            <p style={{paddingLeft: '30px'}}>{item?.criteria_2}</p>
                          </div>
                          <div className={styles.body__item}>
                            <p style={{paddingLeft: '30px'}}>{item?.criteria_3}</p>
                          </div>
                          <div className={styles.body__item}>
                            <p style={{paddingLeft: '30px'}} >{item?.criteria_4}</p>
                          </div>
                          <div className={styles.body__item}>
                            <p style={{paddingLeft: '30px'}}>{item?.criteria_5}</p>
                          </div>
                          <div style={{paddingLeft: '55px', paddingTop: '17px'}} className={styles.body__item}>
                            <span style={{display: 'flex', alignItems: 'center', }}>

                            <p style={{padding: '0', color: 'red'}}>{item?.potential_points} </p> / <p style={{padding: '0', color: 'green'}}> {item?.score}</p>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                    <p>У вас нет сотрудников</p>
                )}
              </div>
    </div>
  );
}
