import React, { useEffect, useRef, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { useReactToPrint } from "react-to-print";
import { Button } from "../../../../components";

import userInfo from "../../../../utils/userInfo";

import styles from "./StudyReportPage.module.scss";
import {
  getInstitutions,
  getKafedra,
  getStudyReport,
} from "../../../../service/ReportService";
import { useDispatch } from "react-redux";
import StudyPlanTable from "./components/StudyPlanTable";
import GlobalSelect from "../../../../hooks/GlobalSelect/GlobalSelect";
import { typeOfClass, years } from "../../../../constants/DropDownTypes";
import StudyPlanAllTable from "./components/StudyPlanAllTable";

const StudyReportPage = ({ setChoose }) => {
  const user = userInfo();
  let data;
  let data2;
  const componentRef = useRef();
  const [responseInfo, setResponseInfo] = useState(null);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const [institute_data, setInstitutionData] = useState(null);
  const [department_data, setDepartmentData] = useState(null);

  const [institute_id, setInstitutionId] = useState(null);
  const [department_id, setDepartmentId] = useState(null);

  const [form, setForm] = useState(null);
  const [year, setYear] = useState(null);

  const getInstitutionsData = async () => {
    try {
      let response = await getInstitutions(data);
      setInstitutionData(response.data);
    } catch (error) {}
  };

  const getData = async () => {
    let response = await getStudyReport({
      institute_id,
      department_id,
      form,
      year,
    });
    getInstitutionsData();
    // setResponseInfo(response.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const getKafedraData = async () => {
    try {
      let response = await getKafedra(institute_id);
      setDepartmentData(response.data);
    } catch (error) {}
  };

  const getAllStudyPlans = async () => {
    try {
      let response = await getStudyReport({
        institute_id,
        department_id,
        form,
        year,
      });
      setResponseInfo(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getKafedraData();
  }, [institute_id]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Simpleraport",
  });
  const handleSubmitReport = async () => {
    try {
      setLoader(true);
      let response = await getStudyReport({
        institute_id,
        department_id,
        form,
        year,
      });
      setResponseInfo(response.data);
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getAllStudyPlans();
  }, []);

  return (
    <>
      {responseInfo === null || !responseInfo.syllabuses ? (
        <div>
          <Button onClick={() => setChoose(0)} style={{ marginBottom: "15px" }}>
            Назад
          </Button>
          <div className={styles.titile__wrapper}>
            <div className={styles.input_box}>
              <GlobalSelect
                data={institute_data}
                setValue={setInstitutionId}
                placeholder={"Институт"}
              />
            </div>
            <div className={styles.input_box}>
              <GlobalSelect
                data={department_data}
                setValue={setDepartmentId}
                placeholder={"Кафедра"}
              />
            </div>
            <div className={styles.input_box}>
              <GlobalSelect
                data={typeOfClass}
                setValue={setForm}
                placeholder={"Форма обучения"}
              />
            </div>
            <div className={styles.input_box}>
              <GlobalSelect
                data={years}
                setValue={setYear}
                placeholder={"Уч.год"}
              />
            </div>
            {!loader ? (
              <Button className={styles.btn_pin} onClick={handleSubmitReport}>
                Создать
              </Button>
            ) : (
              <ScaleLoader color="black" size={30} />
            )}
            <div className={styles.wrapper}>
              <Button
                className="create__statement__btn"
                onClick={handlePrint}
                style={{ marginTop: "15px" }}
              >
                Распечатать
              </Button>
              <style>
                {`
@media print {
  /* Стили, применяемые при печати */
  body {
    background-color: white;
    font-size: 12pt;

  }
  /* Пример стилизации элементов при печати */
  .print-only {
    color: black;
    padding:5px;
  }
  /* Стилизация элемента h4 при печати */
  .print-only h4 {
    color: black !important;
  }
}
`}
              </style>
              <div className="print-only" ref={componentRef}>
                <StudyPlanAllTable data={responseInfo} />
              </div>
            </div>{" "}
          </div>
        </div>
      ) : (
        <div className={styles.wrapper}>
          <style>
            {`
@media print {
  /* Стили, применяемые при печати */
  body {
    background-color: white;
    font-size: 12pt;

  }
  /* Пример стилизации элементов при печати */
  .print-only {
    color: black;
    padding:5px;
  }
  /* Стилизация элемента h4 при печати */
  .print-only h4 {
    color: black !important;
  }
}
`}
          </style>
          <div className={styles.titile__wrapper}>
            <Button
              className="create__statement__btn"
              onClick={() => setChoose(0)}
              style={{ marginLeft: "15px", marginTop: "15px" }}
            >
              Назад
            </Button>
            <Button
              className="create__statement__btn"
              onClick={handlePrint}
              style={{ marginLeft: "15px", marginTop: "15px" }}
            >
              Распечатать
            </Button>
          </div>

          <div className="print-only" ref={componentRef}>
            <StudyPlanTable data={responseInfo} />
          </div>
        </div>
      )}
    </>
  );
};

export default StudyReportPage;
