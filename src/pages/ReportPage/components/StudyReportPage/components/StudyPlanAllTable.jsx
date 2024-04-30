import React from "react";
import styles from "./StudyPlanTable.module.scss";
import excel from "./../../../../../assets/icons/excelIcon.png";
import word from "./../../../../../assets/icons/wordIcon.png";
import pdf from "./../../../../../assets/icons/pdfIcon.png";
import { useNavigate } from "react-router-dom";
import { getStudyPlanExcel } from "../../../../../service/ReportService";
const StudyPlanAllTable = ({ data }) => {
  const navigate = useNavigate();
  const handleSubmitReport = async (syllabus, e) => {
    e.stopPropagation();
    try {
      let response = await getStudyPlanExcel(syllabus);
      const excelFileUrl = response.data.excel_file;
      const downloadLink = document.createElement("a");
      downloadLink.href = excelFileUrl;
      downloadLink.download = "study_plan.xlsx";
      downloadLink.click();
    } catch (error) {}
  };
  return (
    <div style={{ overflow: "auto" }}>
      {data?.map((item, index) => {
        return (
          <>
            {item.syllabuses.length === 0 ? null : (
              <>
                <h2>{item?.institute}</h2>
                <table className={styles.table__wrapper}>
                  <thead className={styles.table__head}>
                    <tr className={styles.table__row}>
                      <th className={styles.table__item}>
                        <span className={styles.table__title}>#</span>
                      </th>
                      <th className={styles.table__item} colspan="2">
                        <span className={styles.table__title}>
                          Название специальности
                        </span>
                      </th>
                      <th className={styles.table__item}>
                        <span className={styles.table__title}>
                          Длит.обучения
                        </span>
                      </th>
                      <th className={styles.table__item}>
                        <span className={styles.table__title}>
                          Годы обучения
                        </span>
                      </th>
                      <th className={styles.table__item}>
                        <span className={styles.table__title}>
                          Кл.Предметов
                        </span>
                      </th>
                      <th className={styles.table__item}>
                        <span className={styles.table__title}>
                          Кл.Семестров
                        </span>
                      </th>
                      <th className={styles.table__item}>
                        <span className={styles.table__title}>Всего часов</span>
                      </th>
                      <th
                        className={styles.table__item}
                        style={{ borderRight: "0.5px solid black" }}
                      >
                        <span className={styles.table__title}>
                          Скачать Excel
                        </span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className={styles.table__body}>
                    {item.syllabuses?.map((item, index) => {
                      return (
                        <tr
                          className={styles.table__row}
                          onClick={() => navigate(`/study-plan/${item.id}/`)}
                        >
                          <td className={styles.table__item}>
                            <span className={styles.table__title}>
                              {index + 1}
                            </span>
                          </td>
                          <td className={styles.table__item}>
                            <span className={styles.table__title}>
                              {item.cipher}
                            </span>
                          </td>
                          <td className={styles.table__item}>
                            <span className={styles.table__title}>
                              {item.direction}
                            </span>
                          </td>
                          <td className={styles.table__item}>
                            <span className={styles.table__title}>
                              {item.duration === 1
                                ? item.duration + " год"
                                : item.duration > 1 && item.duration < 5
                                ? item.duration + " года"
                                : item.duration + " лет"}
                            </span>
                          </td>
                          <td className={styles.table__item}>
                            <span className={styles.table__title}>
                              {item.years}
                            </span>
                          </td>
                          <td className={styles.table__item}>
                            <span className={styles.table__title}>
                              {item.semesters}
                            </span>
                          </td>
                          <td className={styles.table__item}>
                            <span className={styles.table__title}>
                              {item.subjects}{" "}
                            </span>
                          </td>
                          <td className={styles.table__item}>
                            <span className={styles.table__title}>
                              {item.hours}
                            </span>
                          </td>
                          <td
                            className={styles.table__item}
                            style={{ borderRight: "0.5px solid black" }}
                            onClick={(e) => handleSubmitReport(item.id, e)}
                          >
                            <span className={styles.table__title}>
                              <img src={excel} alt="" />
                            </span>
                          </td>
                          {/* <td className={styles.table__item}>
                  <span className={styles.table__title}>
                    {" "}
                    <img src={word} alt="" />
                  </span>
                </td>
                <td
                  className={styles.table__item}
        
                >
                  <span className={styles.table__title}>
                    {" "}
                    <img src={pdf} alt="" />
                  </span>
                </td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}{" "}
          </>
        );
      })}
    </div>
  );
};

export default StudyPlanAllTable;
