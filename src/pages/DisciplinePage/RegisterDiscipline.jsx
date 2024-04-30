import React, { useState, useEffect } from "react";
import styles from "./DisciplinePage.module.scss";
import { Layout } from "../../components";
import {
  getDiscipline,
  getDisciplineInfo,
  getSyllabusBase,
} from "../../service/DisciplineService";

import userInfo from "../../utils/userInfo";
import RegisterDisciplineTable from "./components/DisciplineTable/RegisterDisciplineTable";

const RegisterDiscipline = () => {
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
        let response = await getSyllabusBase(data);
        setData(response.data);
      } catch (error) {
        
      }
    }
  };

  useEffect(() => {
    getData();
    setRender(false);
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
        <div className={styles.menu__wrapper}>
          <div className={styles.title}>Регистрация на дисциплины</div>
        </div>

        <RegisterDisciplineTable
          data={data}
          setRender={setRender}
          setId={setId}
        />
      </div>
    </Layout>
  );
};

export default RegisterDiscipline;
