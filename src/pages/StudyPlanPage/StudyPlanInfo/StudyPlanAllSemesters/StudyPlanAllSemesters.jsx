import React, { useEffect, useRef, useState } from "react";
import styles from "../StudyPlanInfo.module.scss";
import print from "../../../../assets/icons/print.png";
import { useReactToPrint } from "react-to-print";
import kstu from "../../../../assets/img/kstu.png";
import userInfo from "../../../../utils/userInfo";

const StudyPlanAllSemesters = ({ data , tableRef }) => {


  return (
    <div className={styles.all_semesters}>
      <div className={styles.all_semesters_table}>
        {/* <div
          className={styles.all_semesters_content}
        >
          <div className={styles.сonfirming_wrapper}>
            <div className={styles.сonfirming}>
              <p style={{ fontSize: "20px", fontWeight: "600" }}>
                Утверждающий:
              </p>
              <p>{studyDataInfo?.сonfirming?.employee}</p>
            </div>
          </div>
          <div className={styles.content_text}>
            <h3>Министерство образования и науки Кыргызской Республики</h3>
            <p>Кыргызский государственный технический университет</p>
            <p>{studyDataInfo?.faculty}</p>
            <p>Кафедра: "{studyDataInfo?.direction}"</p>
            <p>Профиль: "{studyDataInfo?.profile}"</p>
            <img src={kstu} alt="" />
          </div>
          <StudyPlanAllSemesters data={studyDataInfo} tableRef={tableRef}/>
          <div
            className={printing ? styles.water_mark : ""}
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              <p style={{ color: "grey" }}> {uslRef} | </p>
              <p style={{ color: "grey" }}>
                {" "}
                {day}.{month}.{year}
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <p style={{ color: "grey" }}>{user.uniqueCodeUser} </p>
              <p style={{ color: "grey" }}>
                {user.surName} {user.firstName}{" "}
              </p>
            </div>
          </div>
        </div> */}
        <div className={styles.all_semester_report}>
          <p className={styles.report_title}>Общий отчет</p>
          <table className={styles.table__wrapper}>
          <thead className={styles.table__head}>
          <tr className={styles.table__row}>
            <th className={styles.table__item}>
              <span className={styles.table__title}>Кредит</span>
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>
                Общие академические часы
              </span>
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>На лекцию</span>
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>На практику</span>
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>На лаб.работы</span>
            </th>
            <th className={styles.table__item}>
              <span className={styles.table__title}>СРС</span>
            </th>
            <th className={styles.table__item} >
              <span className={styles.table__title}>Всего</span>
            </th>
          </tr>
        </thead>
            <tbody className={styles.table__body}>
              <tr className={styles.table__row}>
                <td className={styles.table__item}>
                  <span className={styles.table__title}>
                    {data?.all_credits}
                  </span>
                </td>
                <td className={styles.table__item}>
                  <span className={styles.table__title}>
                    {data?.all_amount_hours}
                  </span>
                </td>
                <td className={styles.table__item}>
                  <span className={styles.table__title}>
                    {data?.all_lecture_hours}
                  </span>
                </td>
                <td className={styles.table__item}>
                  <span className={styles.table__title}>
                    {data?.all_practice_hours}
                  </span>
                </td>
                <td className={styles.table__item}>
                  <span className={styles.table__title}>
                    {data?.all_lab_hours}
                  </span>
                </td>
                <td className={styles.table__item}>
                  <span className={styles.table__title}>{data?.all_srs}</span>
                </td>
                <td className={styles.table__item}>
                  <span className={styles.table__title}>
                    {data?.all_subject_hours}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div className={styles.сoordinating_wrapper}>
            <div className={styles.сoordinating_parent}>
              {data?.сoordinating?.map((elem) => (
                <div className={styles.сoordinating_child}>
                  <h2>
                    <p>Согласует</p> <p>{elem?.employee}</p>
                  </h2>
                  <h3>Должность: {elem?.position}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanAllSemesters;
