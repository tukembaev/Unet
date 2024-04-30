import React, { useState, useEffect } from "react";
import styles from "./DisciplinePage.module.scss";
import { useNavigate } from "react-router-dom";

import { Layout } from "../../components";

import {
  getDiscipline,
  getDisciplineInfo,
  getStudentDiscipline,
} from "../../service/DisciplineService";
import userInfo from "../../utils/userInfo";
import DisciplineTable from "./components/DisciplineTable/DisciplineTable";
import ThemeTable from "./components/DisciplineTable/ThemeTable";
import StudentDisciplineTable from "./components/DisciplineTable/StudentDisciplineTable";

const DisciplinePage = () => {
  const user = userInfo();
  const [id, setId] = useState({
    subject_id: "",
    subject_name: "",
  });
  let [dataDiscrip, setDiscrip] = useState("");
  const [render, setRender] = useState(false);
  const [renderTheme, setRenderTheme] = useState(false);
  const [back, goBack] = useState(false);

  const [data, setData] = useState();

  const getData = async () => {
    if (user.user_type === "E") {
      try {
        let response = await getDiscipline(data);
        setData(response.data);
      } catch (error) {
        
      }
    } else if (user.user_type === "S") {
      try {
        let response = await getStudentDiscipline(data);
        setData(response.data);
      } catch (error) {
        
      }
    }
  };

  useEffect(() => {
    getData();
  }, [render, back]);

  const getDataInfo = async () => {
    try {
      let response = await getDisciplineInfo(id.subject_id, dataDiscrip);

      setDiscrip(response.data);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getDataInfo();
    setRenderTheme(false);
  }, [id, renderTheme]);

  useEffect(() => {
    setDiscrip("");
    setId({ subject_id: "", subject_name: "" });
    goBack(false);
  }, [back]);

  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className={styles.titile__wrapper}>
          <div className={styles.title}>
            {" "}
            {id.subject_name === "" ? "Мои дисциплины" : id.subject_name}
          </div>
        </div>

        <div style={{ padding: "0 15px 0 0" }}>
          {id.subject_id === "" && user.user_type === "E" ? (
            <DisciplineTable data={data} setRender={setRender} setId={setId} />
          ) : id.subject_id === "" && user.user_type === "S" ? (
            <StudentDisciplineTable
              data={data}
              setRender={setRender}
              setId={setId}
            />
          ) : (
            ""
          )}
          {id.subject_id !== "" ? (
            <ThemeTable
              subject={id.subject_id}
              data={dataDiscrip}
              setRenderTheme={setRenderTheme}
              goBack={goBack}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DisciplinePage;
